<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $nombre   = trim($_POST['nombre'] ?? '');
  $email    = trim($_POST['email'] ?? '');
  $telefono = trim($_POST['telefono'] ?? '');
  $mensaje  = trim($_POST['mensaje'] ?? '');

  if ($nombre === '' || $email === '' || $mensaje === '') {
    echo "Faltan campos obligatorios";
    exit;
  }

  // 📩 Correo que RECIBE el mensaje
  $destino = "HChaparr@incatropicallumber.com";

  // 📌 Asunto
  $asunto = "Nuevo mensaje desde la web";

  // 🧾 Contenido del correo
  $contenido = "
Nombre: $nombre
Correo: $email
Teléfono: $telefono

Mensaje:
$mensaje
  ";

  // ✉️ Cabeceras
  $headers = "From: Web Inca Tropical <web@incatropicallumber.com>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  if (mail($destino, $asunto, $contenido, $headers)) {
    echo "OK";
  } else {
    echo "ERROR";
  }
}
