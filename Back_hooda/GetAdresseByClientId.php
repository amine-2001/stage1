<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT latitude,longitude FROM clients WHERE id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $adresse = array(
        "latitude" => $ligne['latitude'],
        "longitude" => $ligne['longitude']
    );
}
http_response_code(200);
echo json_encode($adresse);
