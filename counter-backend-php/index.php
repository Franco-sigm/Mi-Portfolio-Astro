<?php
/**
 * Enrutador de la API de métricas y contacto.
 *
 * Mantiene el mismo contrato que la versión anterior en Flask —mismas
 * rutas y mismas respuestas JSON— para que el frontend no cambie.
 *
 *   GET  /api/stats    → {"visitas": n, "corazones": n}
 *   POST /api/visit    → {"visitas": n}
 *   POST /api/like     → {"corazones": n}
 *   POST /api/contact  → {"ok": true}
 */

declare(strict_types=1);

require_once __DIR__ . '/respuesta.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/limite.php';
require_once __DIR__ . '/correo.php';

cors();

// El navegador pregunta antes de un POST con Content-Type JSON
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$ruta = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$ruta = rtrim($ruta, '/') ?: '/';
$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    // ---------- estadísticas ----------
    if ($ruta === '/api/stats' && $metodo === 'GET') {
        limitar('stats', 60, 60);
        $fila = conexion()->query('SELECT visitas, corazones FROM metricas WHERE id = 1')->fetch();
        json_salida([
            'visitas'   => (int) ($fila['visitas'] ?? 0),
            'corazones' => (int) ($fila['corazones'] ?? 0),
        ]);
    }

    // ---------- visita ----------
    if ($ruta === '/api/visit' && $metodo === 'POST') {
        limitar('visit', 30, 3600);
        $pdo = conexion();
        $pdo->exec('UPDATE metricas SET visitas = visitas + 1 WHERE id = 1');
        $fila = $pdo->query('SELECT visitas FROM metricas WHERE id = 1')->fetch();
        json_salida(['visitas' => (int) ($fila['visitas'] ?? 0)]);
    }

    // ---------- me gusta ----------
    if ($ruta === '/api/like' && $metodo === 'POST') {
        limitar('like', 10, 3600);
        $pdo = conexion();
        $pdo->exec('UPDATE metricas SET corazones = corazones + 1 WHERE id = 1');
        $fila = $pdo->query('SELECT corazones FROM metricas WHERE id = 1')->fetch();
        json_salida(['corazones' => (int) ($fila['corazones'] ?? 0)]);
    }

    // ---------- formulario de contacto ----------
    if ($ruta === '/api/contact' && $metodo === 'POST') {
        limitar('contact', 3, 3600);

        $datos = json_decode(file_get_contents('php://input') ?: '[]', true) ?: [];

        // Honeypot: campo oculto que solo rellenan los bots. Se responde
        // éxito para no darles la pista de que fueron detectados.
        if (!empty($datos['web'])) {
            json_salida(['ok' => true]);
        }

        $nombre  = trim((string) ($datos['nombre'] ?? ''));
        $correo  = trim((string) ($datos['email'] ?? ''));
        $mensaje = trim((string) ($datos['mensaje'] ?? ''));

        if ($nombre === '' || $correo === '' || $mensaje === '') {
            json_salida(['error' => 'Faltan campos obligatorios.'], 400);
        }
        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            json_salida(['error' => 'El correo no tiene un formato válido.'], 400);
        }
        if (mb_strlen($nombre) > 120 || mb_strlen($correo) > 200 || mb_strlen($mensaje) > 5000) {
            json_salida(['error' => 'El contenido es demasiado largo.'], 400);
        }

        if (!enviar_contacto($nombre, $correo, $mensaje)) {
            error_log('Falló el envío del correo de contacto');
            json_salida(['error' => 'No se pudo enviar el mensaje. Inténtalo más tarde.'], 502);
        }

        json_salida(['ok' => true]);
    }

    json_salida(['error' => 'Ruta no encontrada.'], 404);

} catch (Throwable $e) {
    // El detalle va al log del servidor, nunca al navegador
    error_log('API: ' . $e->getMessage());
    json_salida(['error' => 'Error interno del servidor.'], 500);
}
