<?php
/**
 * Límite de peticiones por IP.
 *
 * A diferencia de Flask, PHP no mantiene un proceso vivo entre
 * peticiones, así que el contador no puede vivir en memoria: se guarda
 * en MySQL. Sale ganando — el límite ya no se pierde al reiniciar ni se
 * multiplica por el número de procesos del servidor.
 */

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/respuesta.php';

/**
 * Corta la petición con 429 si la IP superó el cupo.
 *
 * @param string $ruta      identificador de la ruta limitada
 * @param int    $maximo    peticiones permitidas
 * @param int    $ventana   duración de la ventana en segundos
 */
function limitar(string $ruta, int $maximo, int $ventana): void
{
    // La IP se guarda hasheada: es un dato personal y para contar
    // peticiones basta con poder compararla, no con poder leerla.
    $huella = hash('sha256', ip_cliente() . '|' . $ruta);
    $ahora = time();

    $pdo = conexion();
    $pdo->prepare('DELETE FROM rate_limit WHERE expira_en < ?')->execute([$ahora]);

    $fila = $pdo->prepare('SELECT usos, expira_en FROM rate_limit WHERE huella = ?');
    $fila->execute([$huella]);
    $actual = $fila->fetch();

    if ($actual === false) {
        $pdo->prepare('INSERT INTO rate_limit (huella, usos, expira_en) VALUES (?, 1, ?)')
            ->execute([$huella, $ahora + $ventana]);
        return;
    }

    if ((int) $actual['usos'] >= $maximo) {
        header('Retry-After: ' . max(1, (int) $actual['expira_en'] - $ahora));
        json_salida(['error' => 'Demasiados intentos. Espera un momento antes de reintentar.'], 429);
    }

    $pdo->prepare('UPDATE rate_limit SET usos = usos + 1 WHERE huella = ?')->execute([$huella]);
}
