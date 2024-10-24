<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$Article = $_REQUEST['Article'];
$Montant = $_REQUEST['Montant'];
$format = $_REQUEST['format'];
$poids = $_REQUEST['poids'];
$papier = $_REQUEST['papier'];
$prepresse = $_REQUEST['prepresse'];
$impression = $_REQUEST['impression'];
$finition = $_REQUEST['finition'];
$faconnage = $_REQUEST['faconnage'];
$paquetage = $_REQUEST['paquetage'];
$livraison = $_REQUEST['livraison'];
//
$query = "INSERT INTO article (nom_article,Montant_Article,format,poids,papier,prepresse,impression,finition,faconnage,paquetage,livraison) VALUES ('$Article','$Montant','$format','$poids','$papier','$prepresse','$impression','$finition','$faconnage','$paquetage','$livraison')";
$add = mysqli_query($connect, $query);
if ($add) {
    $ajout = array(
        "Result" => "OK"
    );
    http_response_code(200);
} else {
    $ajout = array(
        "Result" => "KO"
    );
}
echo json_encode($ajout);