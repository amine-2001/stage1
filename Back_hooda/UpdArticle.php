<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//
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
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // modification admin
    $query = "UPDATE article SET nom_article = '$Article',Montant_Article = '$Montant',format='$format',poids='$poids',papier='$papier',prepresse='$prepresse',impression='$impression',finition='$finition',faconnage='$faconnage',paquetage='$paquetage',livraison='$livraison' WHERE id = $id";
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
