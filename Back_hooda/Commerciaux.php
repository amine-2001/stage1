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
$query = "SELECT * FROM commercials WHERE (UPPER(nom) LIKE '%" . $filter . "%' OR telephone LIKE '%" . $filter . "%') LIMIT $debut,$nbr_element_page";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $famille = array(
        "idCommercial" => $ligne['id'],
        "nom" => $ligne['nom'],
        "tel" => $ligne['telephone']
    );
    array_push($retour, $famille);
}
// number data
$query = "SELECT COUNT(*) FROM commercials WHERE (UPPER(nom) LIKE '%" . $filter . "%' OR telephone LIKE '%" . $filter . "%')";
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
