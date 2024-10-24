<?php
include('connexion.php');

$client = $_REQUEST['client'];
$latitude = $_REQUEST['latitude'];
$longitude = $_REQUEST['longitude'];
$commercial = $_REQUEST['commercial'];
$observation = $_REQUEST['observation'];
$datetime = $_REQUEST['datetime'];
$date = date("Y-m-d");
$disponibilite = $_REQUEST['disponibilite'];
$req3 = mysqli_query($connect,"INSERT INTO `visites`(`id`, `date`, `datetime`, `commercial_id`, `client_id`, `remarque`) VALUES ('','$date','$datetime','$commercial','$client','$observation')");

$id_rapport = mysqli_insert_id($connect);



echo json_encode($id_rapport) ;
	

?>