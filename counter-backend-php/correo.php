<?php
/** Envío del formulario de contacto. */

require_once __DIR__ . '/config.php';

/**
 * Envía el mensaje con la función mail() del servidor.
 *
 * En hosting compartido esto sale por el MTA local del propio dominio,
 * que ya tiene SPF y DKIM configurados, así que la entrega es mejor que
 * autenticando por SMTP desde fuera.
 *
 * El remitente es el buzón propio, nunca el del visitante: si se pusiera
 * su dirección en From, SPF lo trataría como suplantación y acabaría en
 * spam. Su correo va en Reply-To, así responder es un clic.
 */
function enviar_contacto(string $nombre, string $correo, string $mensaje): bool
{
    $destino = cfg('CONTACT_TO');
    $remitente = cfg('SMTP_USER');
    if ($destino === '' || $remitente === '') {
        return false;
    }

    $asunto = '=?UTF-8?B?' . base64_encode("Portfolio — mensaje de $nombre") . '?=';
    $cuerpo = "De: $nombre <$correo>\n\n$mensaje\n";

    // El nombre se sanea: un salto de línea en una cabecera permitiría
    // inyectar destinatarios adicionales.
    $nombre_limpio = str_replace(["\r", "\n"], ' ', $nombre);

    $cabeceras = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        "From: Portfolio <$remitente>",
        "Reply-To: $nombre_limpio <$correo>",
        'X-Mailer: PHP/' . phpversion(),
    ];

    return mail($destino, $asunto, $cuerpo, implode("\r\n", $cabeceras));
}
