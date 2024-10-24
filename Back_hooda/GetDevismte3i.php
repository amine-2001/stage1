<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();

$nbr_element_page = $_REQUEST['limit'];
$numero_page_maintenant = $_REQUEST['page'];
$page = isset($numero_page_maintenant) ? $numero_page_maintenant : '';
$debut = ($page - 1) * $nbr_element_page;
// data
$query = "SELECT devis.*, commercials.nom AS nomCommercial, clients.raisonsocial AS nomClient 
          FROM devis
          INNER JOIN commercials ON devis.commercial_id = commercials.id
          INNER JOIN clients ON devis.client_id = clients.id";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $devis = array(
        "idDevis" => $ligne['id'],
        "MontantDevis" => $ligne['Montant_Devis'],
        "date" => $ligne['date'],
        "etat" => $ligne['Etat'],
        "idClient" => $ligne['client_id'],
        "idCommercial" => $ligne['commercial_id'],
        "nomCommercial" => $ligne['nomCommercial'],
        "nomClient" => $ligne['nomClient']
    );
    array_push($retour, $devis);
}
// number data
$query = "SELECT COUNT(*) FROM devis ";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
$ligne = mysqli_fetch_array($affichage);
$nombreDeChamp = intval($ligne['0']);
// all data
$tous = array(
    "data" => $retour,
    "total" => $nombreDeChamp
);
http_response_code(200);
echo json_encode($tous);
