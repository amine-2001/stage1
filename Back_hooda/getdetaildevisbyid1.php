<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$retour = array();

$id = $_REQUEST['id'];

// data
$quer = "SELECT devis.*, clients.raisonsocial AS client ,clients.Email AS email  
          FROM devis 
          INNER JOIN clients ON devis.client_id = clients.id
          where devis.id='$id'";
        

        $affi = mysqli_query($connect, $quer) or die(mysqli_error($connect));
    $lignes = mysqli_fetch_array($affi);

$query = "SELECT lignedevis.*, article.nom_article AS nomarticle,article.Montant_Article AS Montant, article.Montant_Article AS montant 
          FROM lignedevis 
          INNER JOIN article ON lignedevis.id_articles = article.id
        

          where lignedevis.id_Devis='$id'";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $devis = array(
        "idDevis" => $id,
        "Montant_article" => $ligne['Montant'],
        "quantite" =>$ligne['Quantite'],
        "nomarticle" => $ligne['nomarticle'],
        "nomClient"=>$lignes['client'],
        "email"=>$lignes['email'],
    );
    array_push($retour, $devis);
}
// number data

// all data


http_response_code(200);
echo json_encode($retour);
