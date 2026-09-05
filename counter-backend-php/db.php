<?php
/** Conexión a MySQL mediante PDO, a partir del DATABASE_URL del .env. */

require_once __DIR__ . '/config.php';

function conexion(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $url = cfg('DATABASE_URL');
    if ($url === '') {
        throw new RuntimeException('Falta DATABASE_URL en el .env');
    }

    $p = parse_url($url);
    if ($p === false || !isset($p['host'])) {
        throw new RuntimeException('DATABASE_URL mal formada');
    }

    // urldecode: la contraseña viaja porcentaje-codificada dentro de la
    // URL, así que una clave con !, @ o : llegaría mal a MySQL sin esto.
    $host = $p['host'];
    $puerto = $p['port'] ?? 3306;
    $base = ltrim($p['path'] ?? '', '/');
    $usuario = urldecode($p['user'] ?? '');
    $clave = urldecode($p['pass'] ?? '');

    $dsn = "mysql:host=$host;port=$puerto;dbname=$base;charset=utf8mb4";
    $pdo = new PDO($dsn, $usuario, $clave, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    return $pdo;
}
