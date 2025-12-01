<?php
// process_contact.php (PHPMailer)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // composer autoload
$config = require __DIR__ . '/config.php'; // ajuste o caminho se necessário

// inputs
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// validações
if (!$name || !$email || !$subject || !$message) {
    header('Location: contato.html?error=' . urlencode('Por favor, preencha todos os campos.'));
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: contato.html?error=' . urlencode('Email inválido.'));
    exit;
}
if (preg_match("/[\r\n]|%0A|%0D/", $name.$email.$subject)) {
    header('Location: contato.html?error=' . urlencode('Dados inválidos.'));
    exit;
}

// sanitização para o corpo do email
function sanitize($s) {
    return htmlspecialchars(strip_tags($s), ENT_QUOTES, 'UTF-8');
}

try {
    $mail = new PHPMailer(true);
    // servidor SMTP
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ou 'tls'
    $mail->Port = $config['smtp_port'];

    // remetente e destinatário
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email']); // para onde vai a mensagem
    $mail->addReplyTo($email, $name);

    // conteúdo
    $mail->isHTML(true);
    $mail->Subject = 'Contato do site: ' . sanitize($subject);
    $body  = "<p><strong>Nome:</strong> " . sanitize($name) . "</p>";
    $body .= "<p><strong>Email:</strong> " . sanitize($email) . "</p>";
    $body .= "<p><strong>Assunto:</strong> " . sanitize($subject) . "</p>";
    $body .= "<p><strong>Mensagem:</strong><br>" . nl2br(sanitize($message)) . "</p>";

    $mail->Body = $body;

    $mail->send();
    header('Location: contato.html?success=' . urlencode('Mensagem enviada com sucesso! Obrigado pelo contato.'));
    exit;
} catch (Exception $e) {
    // você pode logar $mail->ErrorInfo em arquivo de log
    header('Location: contato.html?error=' . urlencode('Erro ao enviar: ' . $mail->ErrorInfo));
    exit;
}
