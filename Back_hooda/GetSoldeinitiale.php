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
/*echo($numero_page_maintenant);
echo($nbr_element_page);
echo($filter);*/
$query = "SELECT soldeinitial.*,  clients.raisonsocial AS nomClient 
          FROM soldeinitial
          INNER JOIN commande ON soldeinitial.client_id = commande.client_id
          INNER JOIN clients ON commande.client_id = clients.id 
          group by id
          LIMIT $debut, $nbr_element_page";

$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $client = array(
        "idSoldeinitiale" => $ligne['id'],
        "nomClient" => $ligne['nomClient'],
        "soldeinitial" => $ligne['Montant_initial'],
        "date" => $ligne['date']

    );
    array_push($retour, $client);
}
// number data
$query = "SELECT COUNT(*) FROM soldeinitial WHERE (client_id LIKE '%" . $filter . "%' OR Montant_initial LIKE '%" . $filter . "%' OR date LIKE '%" . $filter . "%'  ) ";
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
