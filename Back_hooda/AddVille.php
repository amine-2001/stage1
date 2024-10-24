<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$ville = $_REQUEST['ville'];
//
$query = "INSERT INTO villes (nom) VALUES ('$ville')";
$add = mysqli_query($connect, $query);
if ($add) {
    $ajout = array(
        "Result" => "OK"
    );
    http_response_code(200);
} else {
    $ajout = array(
        "Result" => "KO"
    );
}
echo json_encode($ajout);
