<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();
$filter = strtoupper($_REQUEST['query']);
$nbr_element_page = $_REQUEST['limit'];
$numero_page_maintenant = $_REQUEST['page'];
$page = isset($numero_page_maintenant) ? $numero_page_maintenant : '';
$debut = ($page - 1) * $nbr_element_page;
// data

  
$query = "SELECT facture.*, commercials.nom AS nomCommercial, clients.raisonsocial AS nomClient 
          FROM facture
          INNER JOIN commercials ON facture.commercial_id = commercials.id
          INNER JOIN clients ON facture.client_id = clients.id ORDER BY `facture`.`id` ASC
          LIMIT $debut, $nbr_element_page";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $commande = array(
        "facture" =>sprintf('%05d',$ligne['id']) ,
        "idfacture" =>$ligne['id'],
        "date"=>$ligne['date'],
        "idClient" => $ligne['client_id'],
        "idCommercial" => $ligne['commercial_id'],
        "nomCommercial" => $ligne['nomCommercial'],
        "nomClient" => $ligne['nomClient'],
        "montantRegle"=>$ligne['montantRegle'],
        "montantTotal"=>$ligne['montantTotal']
    );
    array_push($retour, $commande);
}
// number data
$query = "SELECT COUNT(*) FROM facture WHERE (    client_id LIKE '%" . $filter . "%' OR commercial_id LIKE '%" . $filter . "%'  )";
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
