<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$id = $_REQUEST['id'];
$date = $_REQUEST['date'];
$idClient = $_REQUEST['idClient'];
$idcom = $_REQUEST['idcommercial'];
$mnt = $_REQUEST['mnt'];
$dat= date('Y-m-d H:i:s');



$query = "UPDATE devis SET Etat = 1 WHERE id = $id";
$upd = mysqli_query($connect, $query) or die(mysqli_error($connect));

$querys = "INSERT INTO commande (Account,client_id,commercial_id,total,date) VALUES (0,'$idClient','$idcom','$mnt','$dat')";
$add = mysqli_query($connect, $querys);

$queryf = "SELECT * FROM lignedevis where id_Devis= $id";
$aff = mysqli_query($connect, $queryf) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($aff)) {

        $id_comm =$ligne['id_Devis'];
        $id_Articles = $ligne['id_Articles'];
        $montant = $ligne['Montant_Articles'];
        $quantite = $ligne['Quantite'];
        $querysi = "INSERT INTO lignecommandes (id_commande,id_articles,Montant_article,quantite) VALUES ('$id_comm','$id_Articles','$montant','$quantite')";
        $add2 = mysqli_query($connect, $querysi);
}

if ($add) {
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
