<?php
include('connexion.php');
include('SMTP.php');
$arr = array();
$date = date("Y-m-d");
 $insert='false';

 
 	$smtp_serveur = 'smtp-relay.sendinblue.com';
$smtp_login =  'chokri@mtd-digital.com';
$smtp_passe =  'aCNFBJp5DER3tZsU';
//$smtp_domain = 'mail.internetsoft.ovh';
 $headers = "From:nesrine@mtd-application.com\r\n" .
    "Reply-To: nesrine@mtd-application.com\r\n" .
    'X-Mailer: PHP/' . phpversion(). "\r\n".
	"Content-Type: text/html; charset=utf-8\r\n";


 $objet='';
 




//mail($email, $objet, $messagesend, $headers);
$smtp = new SMTP($smtp_serveur, $smtp_login, $smtp_passe, 587, '');
 	 $smtp->smtp_mail($emailreception, $objet, $messagesend);


  

  // Initialisation du propriétaire
  $smtp->set_from($emailenvoi, $emailenvoi);


  // Contenu du mail (texte, html...) (txt , html, txt/html)
  $smtp->ContentType = 'html';

	 
	 
	 
	 


echo json_encode ($insert);


?>