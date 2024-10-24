<?php
include('connexion.php');

$client = $_REQUEST['client'];
$latitude = $_REQUEST['latitude'];
$longitude = $_REQUEST['longitude'];

$qq = "update  clients set latitude='$latitude', longitude='$longitude' where id=".$client."";
$req3 = mysqli_query($connect,$qq);

echo json_encode($qq) ;
	

?>