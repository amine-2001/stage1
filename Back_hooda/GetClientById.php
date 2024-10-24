<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT c.id AS idClient,c.raisonsocial,c.responsable,c.telephone,c.adresse,c.mf,c.Email,c.commercial_id,co.nom AS commercial,c.ville_id,v.nom AS ville,c.latitude,c.longitude FROM clients c,commercials co,villes v WHERE c.commercial_id = co.id AND c.ville_id = v.id AND c.id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $client = array(
        "idClient" => $ligne['idClient'],
        "raisonSocial" => $ligne['raisonsocial'],
        "responsable" => $ligne['responsable'],
        "telephone" => $ligne['telephone'],
        "adresse" => $ligne['adresse'],
        "mf" => $ligne['mf'],
        "email" => $ligne['Email'],
        "commercial" => array(
            "label" => $ligne['commercial'],
            "value" => $ligne['commercial_id']
        ),
        "ville" => array(
            "label" => $ligne['ville'],
            "value" => $ligne['ville_id']
        ),
        "latitude" => $ligne['latitude'],
        "longitude" => $ligne['longitude']
    );
}
http_response_code(200);
echo json_encode($client);
