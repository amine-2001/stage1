<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//
$raisonSocial = $_REQUEST['raisonSocial'];
$responsable = $_REQUEST['responsable'];
$telephone = $_REQUEST['telephone'];
$adresse = $_REQUEST['adresse'];
$mf = $_REQUEST['mf'];
$idCommercial = $_REQUEST['idCommercial'];
$idVille = $_REQUEST['idVille'];
// Insert admin 
$query = "INSERT INTO clients (raisonsocial,responsable,telephone,adresse,mf,commercial_id,ville_id) VALUES ('$raisonSocial','$responsable','$telephone','$adresse','$mf','$idCommercial','$idVille')";
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
