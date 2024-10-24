<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array(); // Initialize $retour as an empty array

$id = $_REQUEST['id'];
$dateDebut = $_REQUEST['dateDebut'];
    $dateFin = $_REQUEST['dateFin'];
//$date=$_REQUEST['date'];


$query = "SELECT  f.id AS idfact, f.client_id AS client_id , f.date, f.montantTotal,f.montantRegle FROM facture f WHERE f.client_id ='$id'";

if ($dateDebut != '' && $dateFin != '') {
   
    $query = $query . " AND (r.date >= '$dateDebut' AND r.date <= '$dateFin')";
} elseif ($dateDebut != '' && $dateFin == '') {
    $query = $query . " AND (r.date >= '$dateDebut')";
} elseif ($dateDebut == '' && $dateFin != '') {
    $query = $query . " AND (r.date<= '$dateFin')";
}

$res = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($lign = mysqli_fetch_array($res)) {
    $idfact = $lign['idfact'];
    

    $quer = "SELECT r.id AS idreg, r.date AS datreg, li.montant_reglement, pr.type_pay 
    FROM reglement r
    JOIN lignereglement li ON r.id = li.id_reglement
    JOIN  piece_reglement pr ON pr.id_reglement = li.id_reglement
    WHERE r.client_id ='$id' AND li.facture_id = $idfact 
    GROUP BY li.id, pr.type_pay,pr.id"; 
    

$resi = mysqli_query($connect, $quer) or die(mysqli_error($connect));

// Initialize the montant_reglement_array outside the loop
$montant_reglement_array = array();

while ($ligne = mysqli_fetch_array($resi)) {
$idreg = $ligne['idreg'];

if (!isset($montant_reglement_array[$idfact])) {
   $montant_reglement_array[$idfact] = array();
}

$montant_reglement_array[$idfact][] = array(
   "montant_reglement" => $ligne['montant_reglement'],
   "type" => $ligne['type_pay']
);


    }
    $reglement = array(
        "numfact" => $lign['idfact'],
        "client_id" => $lign['client_id'],
        "mntTotal" => $lign['montantTotal'],
        "totalPayer"=>$lign['montantRegle'],
        "date" => $lign['date'],
        "reste"=>($lign['montantTotal'] ) - $lign['montantRegle'],
        "mntAPayer"=>0,   
        "montant_reglement"=>$montant_reglement_array[$idfact]
       
    );

    array_push($retour, $reglement);
}

http_response_code(200);
echo json_encode($retour);
?>
