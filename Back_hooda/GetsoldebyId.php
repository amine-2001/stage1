<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
$solde=array();
$id=$_REQUEST['client'];
    
    // Data 
    $query = "SELECT * FROM soldeinitial WHERE client_id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $solde= array(
        "id"=>$ligne['id'],
        "montant" => $ligne['Montant_initial'],
        "date" => $ligne['date'],

    );

http_response_code(200);
echo json_encode($solde);