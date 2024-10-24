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
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // modification admin
    $query = "UPDATE clients SET raisonsocial = '$raisonSocial',responsable = '$responsable',telephone = '$telephone',adresse = '$adresse',mf = '$mf',commercial_id = '$idCommercial',ville_id = '$idVille' WHERE id = $id";
    $upd = mysqli_query($connect, $query);
    if ($upd) {
        $mise_a_jour = array(
            "Result" => "OK"
        );
        http_response_code(200);
    } else {
        $mise_a_jour = array(
            "Result" => "KO"
        );
    }
} else {
    $mise_a_jour = array(
        "Result" => "KO"
    );
    http_response_code(400);
}
echo json_encode($mise_a_jour);
