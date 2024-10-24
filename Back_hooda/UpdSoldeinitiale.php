<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
//
$Montantinitial = $_REQUEST['Montantinitial'];
$date = $_REQUEST['date'];
$idClients = $_REQUEST['idClients'];
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    // modification admin
    $query = "UPDATE soldeinitial SET Montant_initial = '$Montantinitial', date = '$date',client_id = '$idClients' WHERE id = $id";
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
