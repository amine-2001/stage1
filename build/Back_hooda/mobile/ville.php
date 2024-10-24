<?php
include("connexion.php");
$arr = array();
$com=$_REQUEST['com'];
$mp=$_REQUEST['password'];
$date = date("Y-m-d");


	//$query = "SELECT * from magasins   ";
$query = "SELECT * FROM villes ";
$rs = mysqli_query($connect,$query);
while($obj = mysqli_fetch_object($rs)) {

	$arr["ville"][] = $obj;   
}

	/*$query = "SELECT * from adherents   where  login='$login' and mp='$mp' and valide=0 ";
$rs = mysqli_query($connect,$query);
while($obj = mysqli_fetch_object($rs)) {

	$arr["nonvalide"] = $obj;	   
}*/
echo  json_encode($arr);

?>