<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$arrayPhoto = array();
$arrayData = array();
if ($_GET['id']) {
    $id = $_GET['id'];
    // Recuperer photos
    $req = "SELECT photo FROM photovisites WHERE visite_id = $id";
    $affichage = mysqli_query($connect, $req);
    while ($data = mysqli_fetch_array($affichage)) {
        array_push($arrayPhoto, $data['photo']);
    }
    // Data 
    $query = "SELECT v.datetime,co.nom AS commercial,c.responsable,v.remarque FROM visites v,commercials co,clients c WHERE v.commercial_id = co.id AND v.client_id = c.id AND v.id = $id";
    $res = mysqli_query($connect, $query);
    while ($ligne = mysqli_fetch_array($res)) {
        $detail = array(
            "date" => $ligne['datetime'],
            "commercial" => $ligne['commercial'],
            "client" => $ligne['responsable'],
            "remarque" => $ligne['remarque'],
            "photo" => $arrayPhoto
        );
    }
}
http_response_code(200);
echo json_encode($detail);
