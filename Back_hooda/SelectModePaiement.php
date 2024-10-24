<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();

$query = "SELECT * FROM modepaiements";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $modePaiement = array(
        "value" => $ligne['id'],
        "label" => $ligne['mode']
    );
    array_push($retour, $modePaiement);
}

http_response_code(200);
echo json_encode($retour);
