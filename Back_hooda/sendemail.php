<?php
$to = 'houcemdzr@gmail.com'; // Email address of the recipient
$subject = 'Validation!'; // Subject of the email
$message = 'validation.'; // Body of the email

// Additional headers
$headers = 'From: houcemdzr@gmail.com' . "\r\n" .
    'Reply-To: houcemdzr@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send the email
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo 'Email sent successfully.';
} else {
    echo 'Failed to send email.';
}
?>







