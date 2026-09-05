<?php
/** Utilidades de respuesta HTTP: CORS y JSON. */

require_once __DIR__ . '/config.php';

/** Envía las cabeceras CORS solo si el origen está autorizado. */
function cors(): void
{
    $permitidos = array_filter(array_map('trim', explode(',', cfg('CORS_ORIGINS'))));
    $origen = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origen !== '' && in_array($origen, $permitidos, true)) {
        header("Access-Control-Allow-Origin: $origen");
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    }
}

function json_salida(array $datos, int $codigo = 200)
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * IP real del visitante. Detrás del proxy del hosting, REMOTE_ADDR es
 * siempre 127.0.0.1, así que el límite por IP sería un límite global.
 */
function ip_cliente(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP'] as $c) {
        if (!empty($_SERVER[$c])) {
            $ip = trim(explode(',', $_SERVER[$c])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}
