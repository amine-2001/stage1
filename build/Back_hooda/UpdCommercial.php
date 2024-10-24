<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//
$nom = $_REQUEST['nom'];
$tel = $_REQUEST['tel'];
$login = $_REQUEST['login'];
$pswd = $_REQUEST['pswd'];
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // modification
    $query = "UPDATE commercials SET nom = '$nom',telephone='$tel',login = '$login',pswd = '$pswd' WHERE id = $id";
    $upd = mysqli_query($connect, $query);
    if ($upd) {
        $mise_a_jour = array(
            "Result" => "OK"
        );
        http_response_code(200);
    } else {
        $mise_a_jour = array(
            "Result" => "KO"
        );
    }
} else {
    $mise_a_jour = array(
        "Result" => "KO"
    );
    http_response_code(400);
}
echo json_encode($mise_a_jour);
