<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$filter = strtoupper($_REQUEST['query']);
$nbr_element_page = $_REQUEST['limit'];
$numero_page_maintenant = $_REQUEST['page'];
$page = isset($numero_page_maintenant) ? $numero_page_maintenant : '';
$debut = ($page - 1) * $nbr_element_page;
//
$arrayData = array();
$arrayEl = array();
// Recuperer 
$query = "SELECT DISTINCT date FROM visites";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $date = $ligne['date'];
    $req = "SELECT v.id AS idVisite,v.datetime,v.commercial_id,co.nom AS commercial,v.client_id,c.responsable,v.remarque FROM visites v,commercials co,clients c WHERE v.commercial_id = co.id AND v.client_id = c.id AND v.date = '$date'";
    $affich = mysqli_query($connect, $req) or die(mysqli_error($connect));
    while ($data = mysqli_fetch_array($affich)) {
        $el = array(
            "commercial" => $data['commercial'],
            "client" => $data['responsable'],
            "date" => $data['datetime'],
            "remarque" => $data['remarque'],
            "idRappVisite" => $data['idVisite']
        );
        array_push($arrayEl, $el);
    }
    $data['date'] = $date;
    $data['detail'] = $arrayEl;
    array_push($arrayData, $data);
    $arrayEl = array();
}
// number data 
if (sizeof($arrayData) <= $nbr_element_page) {
    $nombreDeChamp = sizeof($arrayData);
} elseif (sizeof($arrayData) > $nbr_element_page) {
    $start = intval($debut);
    $length = intval($nbr_element_page);
    $ancienArray = $arrayData;
    $arrayData = array_splice($arrayData, $start, $length);
    $nombreDeChamp = sizeof($ancienArray);
}
// all data
$tous = array(
    "data" => $arrayData,
    "total" => $nombreDeChamp
);
http_response_code(200);
echo json_encode($tous);
