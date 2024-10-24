<?php
include("connexion.php");
$arr = array();
$com=$_REQUEST['com'];
$mp=$_REQUEST['password'];
$id_client=$_REQUEST['id_client'];
$date = date("Y-m-d");


	//$query = "SELECT * from magasins   ";
$query = "SELECT * FROM clients where id='$id_client'  ";
$rs = mysqli_query($connect,$query);
while($obj = mysqli_fetch_object($rs)) {

	$arr["detail"] = array(
	"id" =>$obj->id,
	"raisonsocial"=>$obj->raisonsocial,
	"responsable"=>$obj->responsable,
	"telephone"=>$obj->telephone,
	"adresse"=>$obj->adresse,
	"latitude"=>$obj->latitude,
	"longitude"=>$obj->longitude,
	"ville"=>mysqli_fetch_object(mysqli_query($connect,"select nom from villes where id=".$obj->ville_id))->nom,
	);   
}


echo  json_encode($arr);

?>