<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();
$query = "SELECT * FROM villes";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $ville = array(
        "value" => $ligne['id'],
        "label" => $ligne['nom']
    );
    array_push($retour, $ville);
}
http_response_code(200);
echo json_encode($retour);
