<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//
$nom = $_REQUEST['nom'];
$login = $_REQUEST['login'];
$pswd = $_REQUEST['pswd'];
// Insert admin 
$query = "INSERT INTO utilisateurs (nom,login,pswd) VALUES ('$nom','$login','$pswd')";
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
