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
$query = "SELECT * FROM clients WHERE (raisonsocial LIKE '%" . $filter . "%' OR responsable LIKE '%" . $filter . "%' OR telephone LIKE '%" . $filter . "%' OR Email LIKE '%" . $filter . "%' ) LIMIT $debut,$nbr_element_page";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $client = array(
        "idClient" => $ligne['id'],
        "raisonSocial" => $ligne['raisonsocial'],
        "responsable" => $ligne['responsable'],
        "telephone" => $ligne['telephone'],
        "email" => $ligne['Email']
    );
    array_push($retour, $client);
}
// number data
$query = "SELECT COUNT(*) FROM clients WHERE (raisonsocial LIKE '%" . $filter . "%' OR responsable LIKE '%" . $filter . "%' OR telephone LIKE '%" . $filter . "%' OR Email LIKE '%" . $filter . "%' )";
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
