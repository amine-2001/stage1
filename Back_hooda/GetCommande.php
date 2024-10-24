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

  
$query = "SELECT commande.*, commercials.nom AS nomCommercial, clients.raisonsocial AS nomClient 
          FROM commande
          INNER JOIN commercials ON commande.commercial_id = commercials.id
          INNER JOIN clients ON commande.client_id = clients.id
          group by id
          LIMIT $debut, $nbr_element_page";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $commande = array(
        "id"=>$ligne['id'],
        "commande" => sprintf('%05d',$ligne['id']),
        "account" => $ligne['Account'],
        "idClient" => $ligne['client_id'],
        "idCommercial" => $ligne['commercial_id'],
        "nomCommercial" => $ligne['nomCommercial'],
        "nomClient" => $ligne['nomClient']
    );
    array_push($retour, $commande);
}
// number data
$query = "SELECT COUNT(*) FROM commande WHERE (Account LIKE '%" . $filter . "%'  OR client_id LIKE '%" . $filter . "%' OR commercial_id LIKE '%" . $filter . "%'  )";
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
