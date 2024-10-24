<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT d.id AS idDevis,d.Montant_Devis,d.commercial_id,co.nom AS commercial,c.latitude,c.longitude FROM devis d,commercials co,clients v WHERE d.commercial_id = co.id AND d.id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $devis = array(
        "idDevis" => $ligne['idDevis'],
        "MontantDevis" => $ligne['Montant_Devis'],
        "etat" => $ligne['etat'],
        "commercial" => array(
            "label" => $ligne['commercial'],
            "value" => $ligne['commercial_id']
        ),
        "client" => array(
            "label" => $ligne['client'],
            "value" => $ligne['client_id']
        ),
        "latitude" => $ligne['latitude'],
        "longitude" => $ligne['longitude']
    );
}
http_response_code(200);
echo json_encode($devis);
