<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$id = $_REQUEST['id'];
// 
$query = "UPDATE devis SET Etat = 0 WHERE id = $id";
$upd = mysqli_query($connect, $query) or die(mysqli_error($connect));
if ($upd) {
    $mise_a_jour = array(
        "Result" => "OK"
    );
    http_response_code(200);
} else {
    $mise_a_jour = array(
        "Result" => "KO"
    );
    http_response_code(500);
}
mysqli_close($connect);
echo json_encode($mise_a_jour);