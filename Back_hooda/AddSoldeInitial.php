<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//

$idClients = $_REQUEST['idClients'];
$Montantinitial = $_REQUEST['Montantinitial'];
$date = $_REQUEST['date'];
// Insert admin 
$query = "INSERT INTO Soldeinitial (client_id,Montant_initial,date) VALUES ('$idClients','$Montantinitial','$date')";
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