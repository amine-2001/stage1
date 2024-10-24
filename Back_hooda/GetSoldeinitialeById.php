<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT s.id AS idSolde,c.raisonsocial AS nomclient,c.id AS client_id,s.Montant_initial AS si ,s.date FROM soldeinitial s,  clients c WHERE s.client_id = c.id AND s.id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $client = array(
        "idSoldeinitiale" => $ligne['idSolde'],
        "Montantinitial" => $ligne['si'],
        "date" => $ligne['date'],
        "client" => array(
            "label" => $ligne['nomclient'],
            "value" => $ligne['client_id']
        )
    );
}
http_response_code(200);
echo json_encode($client);
