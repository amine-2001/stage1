<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$clientId = $_REQUEST['clientId'];
$commercialId = $_REQUEST['commercialId'];
$dateDebut = $_REQUEST['dateDebut'];
$dateFin = $_REQUEST['dateFin'];
$nbr_element_page = $_REQUEST['limit'];
$numero_page_maintenant = $_REQUEST['page'];
$page = isset($numero_page_maintenant) ? $numero_page_maintenant : '';
$debut = ($page - 1) * $nbr_element_page;
//
$arrayData = array();
$arrayEl = array();
// Recuperer 
$query = "SELECT DISTINCT date FROM visites WHERE etat = 0";
if ($clientId != '') {
    $query = $query . " AND client_id = $clientId";
}
if ($commercialId != '') {
    $query = $query . " AND commercial_id = $commercialId";
}
if ($dateDebut != '' && $dateFin != '') {
    $query = $query . " AND (date >= '$dateDebut' AND date <= '$dateFin')";
} elseif ($dateDebut != '' && $dateFin == '') {
    $query = $query . " AND (date >= '$dateDebut')";
} elseif ($dateDebut == '' && $dateFin != '') {
    $query = $query . " AND (date <= '$dateFin')";
}
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $date = $ligne['date'];
    $req = "SELECT v.id AS idVisite,v.datetime,v.commercial_id,co.nom AS commercial,v.client_id,c.responsable,v.remarque FROM visites v,commercials co,clients c WHERE v.commercial_id = co.id AND v.client_id = c.id AND v.date = '$date'";
    if ($clientId != '') {
        $req = $req . " AND v.client_id = $clientId";
    }
    if ($commercialId != '') {
        $req = $req . " AND v.commercial_id = $commercialId";
    }
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
