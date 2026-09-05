<?php
/**
 * Carga el .env y expone la configuración.
 *
 * El archivo vive junto a este, y el .htaccess impide servirlo por HTTP.
 * Se usa un parser propio en vez de parse_ini_file() porque este último
 * trata caracteres como ! o = de forma especial y rompe contraseñas.
 */

function cargar_env(string $ruta): array
{
    $valores = [];
    if (!is_readable($ruta)) {
        return $valores;
    }
    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        $linea = trim($linea);
        if ($linea === '' || strpos($linea, '#') === 0) {
            continue;
        }
        $partes = explode('=', $linea, 2);
        if (count($partes) !== 2) {
            continue;
        }
        $valores[trim($partes[0])] = trim($partes[1]);
    }
    return $valores;
}

$env = cargar_env(__DIR__ . '/.env');

/** Lee una variable: primero del entorno real, luego del .env. */
function cfg(string $clave, string $defecto = ''): string
{
    global $env;
    $v = getenv($clave);
    if ($v !== false && $v !== '') {
        return $v;
    }
    return $env[$clave] ?? $defecto;
}
