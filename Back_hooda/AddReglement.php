<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
$comercialId =$_REQUEST['comercialId'];
$clientId = $_REQUEST['clientId'];
$datePay = $_REQUEST['datePay'];
$sommeTot = $_REQUEST['sommeTot'];
if (isset($_REQUEST['reglement'])) {
    $reglement = $_REQUEST['reglement'];
} else {
    $reglement = array();
}

$modPay = $_REQUEST['modPay'];
// $echeanceChec = $_REQUEST['echeanceChec'];


//

$addLigneRegEnsFor = false;

$payf=0;
$sommFr=0;
$Sommeres=0;
$sommFrl=0;
$Sommeresl=0;


for ($i = 0; $i < sizeof($reglement); $i++) {
if (isset($reglement)) {
if($reglement[$i]['mntAPayer']!=0){
    $payf = $reglement[$i]['mntAPayer'];
    $date=$reglement[$i]['date'];
}
}



 

if (($payf != 0) ) {

    // reglement client:
    $query = "INSERT INTO reglement (client_id,commercial_id,Montant_totale,date) VALUES ('$clientId','$comercialId','$sommeTot','$datePay')";
    $addRegclient = mysqli_query($connect, $query);
    $regclientId = mysqli_insert_id($connect);
    
    $query = "SELECT MontantRegle FROM facture f WHERE client_id = '$clientId' AND f.date = 'date'";
    $res = mysqli_query($connect, $query);
    
if (!$res) {
     die('Error executing the query: ' . mysqli_error($connect));
}
  
    $ligne = mysqli_fetch_assoc($res);
    
        $Sommeres = $ligne['MontantRegle'];
        $sommFr=$Sommeres + $sommeTot;
    //update montant regle facture 
    $queryGetId = "SELECT id FROM facture f WHERE client_id = '$clientId' AND f.date='$date'";
  $result = mysqli_query($connect, $queryGetId);

if ($result) {
    
    $row = mysqli_fetch_assoc($result);
    $invoiceId = $row['id'];
}
    $queryup = "UPDATE facture f SET montantRegle = '$sommFr' WHERE client_id = '$clientId' AND f.date='$date' ";
    $upd = mysqli_query($connect, $queryup);
    //
    $queryl = "SELECT mntRegle FROM lignefacture WHERE id_facture = '$invoiceId'";
    $resi = mysqli_query($connect, $queryl);
    
if (!$resi) {
     die('Error executing the query: ' . mysqli_error($connect));
}
    
    $lignes = mysqli_fetch_assoc($resi);
    
        $Sommeresl = $lignes['mntRegle'];
        $sommFrl=$Sommeresl + $sommeTot;
    //

    $queryupl = "UPDATE lignefacture SET mntRegle = '$sommFr' WHERE id_facture = '$invoiceId' ";
    $updl = mysqli_query($connect, $queryupl);

    // Ajout piece reglement client
    for ($v = 0; $v < sizeof($modPay); $v++) {
        $modePaiement = $modPay[$v]['modPay']['label'];
        if ($modePaiement === "Chéque") {
            $mntChec = $modPay[$v]['mntModPay'];
            $numPiece = $modPay[$v]['numCheque'];
            // Convert date cheque : 
            $echeanceChec = substr($modPay[$v]['echeanceChec'], 0, 24);
            $echeanceChec = date("Y-m-d", strtotime($echeanceChec));
            //
            $query = "INSERT INTO piece_reglement (id_reglement,montant,type_pay,echeance,numero) VALUES ('$regclientId','$mntChec',2,'$echeanceChec','$numPiece')";
            $addPieceRegclient = mysqli_query($connect, $query);
            $pieceRegclientId = mysqli_insert_id($connect);
            
        } else {
            $mntEspece = $modPay[$v]['mntModPay'];
            $query = "INSERT INTO piece_reglement (id_reglement,montant,type_pay) VALUES ('$regclientId','$mntEspece',1)";
            $addPieceRegclient = mysqli_query($connect, $query);
            $pieceRegclientId = mysqli_insert_id($connect);
        }
    }
    // ligne reglement 
    for ($i = 0; $i < sizeof($reglement); $i++) {
        
        if (isset($reglement[$i])) {
            $pay = $reglement[$i]['mntAPayer'];
            
         

            if ($pay > 0) {
                // ligne reglement client
                $query = "INSERT INTO lignereglement (id_reglement,montant_reglement,facture_id) VALUES ('$regclientId','$pay','$invoiceId')";
                $addLigneRegclientFor = mysqli_query($connect, $query);
                $ligneRegclientIdFor = mysqli_insert_id($connect);
                
            }
        }
       
       
    }
    
  
}
}


if ($addRegclient && $addPieceRegclient  && $addLigneRegclientFor) {
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
