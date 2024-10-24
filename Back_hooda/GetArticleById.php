<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

if ($_GET['id']) {
    $id = $_GET['id'];
    // Data 
    $query = "SELECT nom_article , Montant_Article,format,poids,papier,prepresse,impression,finition,faconnage,paquetage,livraison FROM article WHERE id = $id";
    $res = mysqli_query($connect, $query);
    $ligne = mysqli_fetch_array($res);
    $article= array(
        "nom" => $ligne['nom_article'],
        "montant" => $ligne['Montant_Article'],
        "format" => $ligne['format'],
        "poids" => $ligne['poids'],
        "papier" => $ligne['papier'],
        "prepresse" => $ligne['prepresse'],
        "impression" => $ligne['impression'],
        "finition" => $ligne['finition'],
        "faconnage" => $ligne['faconnage'],
        "paquetage" => $ligne['paquetage'],
        "livraison" => $ligne['livraison'],

    );
}
http_response_code(200);
echo json_encode($article);