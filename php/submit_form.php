<?php

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json');

$config = require __DIR__ . '/mail_config.php';

$allowedServices = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'Mobile App Development (React Native)',
    'WordPress',
    'Shopify',
    'Webflow',
    'Bubble.io',
    'Other',
];

function respond($success, $message, $status = 200) {
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if ($name === '' || mb_strlen($name) < 2) {
    $errors[] = 'Please enter your name.';
} elseif (mb_strlen($name) > 100) {
    $errors[] = 'Name must be 100 characters or fewer.';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if ($service === '') {
    $errors[] = 'Please select a service.';
} elseif (!in_array($service, $allowedServices, true)) {
    $errors[] = 'Please select a valid service.';
}

if ($message === '' || mb_strlen($message) < 10) {
    $errors[] = 'Please enter a message with at least 10 characters.';
} elseif (mb_strlen($message) > 3000) {
    $errors[] = 'Message must be 3000 characters or fewer.';
}

if (!empty($errors)) {
    respond(false, implode(' ', $errors), 422);
}

$mailSubject = 'New Contact Inquiry: ' . $service;

$mailBody = "You have received a new message from your portfolio contact form.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Service: {$service}\n\n"
    . "Message:\n{$message}\n";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->Port = $config['port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['recipient']);
    $mail->addReplyTo($email, $name);

    $mail->Subject = $mailSubject;
    $mail->Body = $mailBody;

    $mail->send();
    respond(true, 'Your message has been sent successfully. Thank you!');
} catch (PHPMailerException $e) {
    respond(false, 'Sorry, something went wrong while sending your message. Please try again later.', 500);
}
