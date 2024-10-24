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
$quer = "SELECT commande.*, clients.raisonsocial AS client ,clients.Email AS email
          FROM commande
          INNER JOIN clients ON commande.client_id = clients.id
          where commande.id='$id'";
        $affi = mysqli_query($connect, $quer) or die(mysqli_error($connect));
    $lignes = mysqli_fetch_array($affi);
$query = "SELECT lignecommandes.*, article.nom_article AS nomarticle,article.Montant_Article AS Montant, article.Montant_Article AS montant
          FROM lignecommandes
          INNER JOIN article ON lignecommandes.id_articles = article.id
          where lignecommandes.id_commande='$id'";
$affichage = mysqli_query($connect, $query) or die(mysqli_error($connect));
while ($ligne = mysqli_fetch_array($affichage)) {
    $commande = array(
        "idCommande" => $id,
        "commande" => sprintf('%05d',$lignes['id']),
        "Montant_article" => $ligne['Montant'],
        "quantite" =>$ligne['quantite'],
        "nomarticle" => $ligne['nomarticle'],
        "nomClient"=>$lignes['client'],
        "email"=>$lignes['email'],
    );
    array_push($retour, $commande);
}
// number data
// all data
http_response_code(200);
echo json_encode($retour);







