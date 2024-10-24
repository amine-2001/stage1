<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();
$query = "SELECT DISTINCT c.id AS idClient,c.raisonsocial FROM clients c,commande cm WHERE cm.client_id = c.id";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $client = array(
        "value" => $ligne['idClient'],
        "label" => $ligne['raisonsocial']
    );
    array_push($retour, $client);
}
http_response_code(200);
echo json_encode($retour);