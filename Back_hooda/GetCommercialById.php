<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT nom,telephone,login,pswd FROM commercials WHERE id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $admin = array(
        "nom" => $ligne['nom'],
        "tel" => $ligne['telephone'],
        "login" => $ligne['login'],
        "pswd" => $ligne['pswd']
    );
}
http_response_code(200);
echo json_encode($admin);
