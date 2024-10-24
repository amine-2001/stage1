<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array(); // Initialize $retour as an empty array
if ($_GET['id']) {
    $id = $_GET['id'];
}
if ($_GET['dateDebut']) {
    $dateDebut = $_GET['dateDebur'];}

    if ($_GET['dateFin']) {
        $dateFin = $_GET['dateFin'];
    }
//$id = $_REQUEST['id'];
//$dateDebut = $_REQUEST['dateDebut'];
  //  $dateFin = $_REQUEST['dateFin'];
//$date=$_REQUEST['date'];


$query = "SELECT  f.id AS idfact, f.client_id AS client_id , f.date, f.montantTotal,f.montantRegle,r.date AS datereg ,pr.type_pay FROM facture f,reglement r,lignereglement li,piece_reglement pr WHERE f.client_id ='$id' AND f.id =li.facture_id AND pr.id_reglement=r.id group by f.date";

if ($dateDebut != '' && $dateFin != '') {
   
    $query = $query . " AND (r.date >= '$dateDebut' AND r.date <= '$dateFin')";
} elseif ($dateDebut != '' && $dateFin == '') {
    $query = $query . " AND (r.date >= '$dateDebut')";
} elseif ($dateDebut == '' && $dateFin != '') {
    $query = $query . " AND (r.date<= '$dateFin')";
}

$res = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($res)) {
    $reglement = array(
        "numfact" => $ligne['idfact'],
        "client_id" => $ligne['client_id'],
        "mntTotal" => $ligne['montantTotal'],
        "totalPayer"=>$ligne['montantRegle'],
        "date" => $ligne['date'],
        "reste"=>($ligne['montantTotal'] ) - $ligne['montantRegle'],
        "mntAPayer"=>0,   
        "typepay"=>$ligne['type_pay'],
        "datreg"=>$ligne['datereg']
    );

    array_push($retour, $reglement);
}

http_response_code(200);
echo json_encode($retour);
?>
