<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();
$query = "SELECT DISTINCT c.id AS idCom,c.nom AS commercial FROM commercials c,visites v WHERE v.commercial_id = c.id";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $commercial = array(
        "value" => $ligne['idCom'],
        "label" => $ligne['commercial']
    );
    array_push($retour, $commercial);
}
http_response_code(200);
echo json_encode($retour);
