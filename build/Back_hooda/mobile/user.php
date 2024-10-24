<?php
include("connexion.php");
$arr = array();
$login=$_REQUEST['login'];
$mp=$_REQUEST['password'];
$date = date("Y-m-d");


	$query = "SELECT * from commercials   where  login='$login' and pswd='$mp'";
$rs = mysqli_query($connect,$query);
while($obj = mysqli_fetch_object($rs)) {

	$arr["user"] = $obj	;	   
}

	/*$query = "SELECT * from adherents   where  login='$login' and mp='$mp' and valide=0 ";
$rs = mysqli_query($connect,$query);
while($obj = mysqli_fetch_object($rs)) {

	$arr["nonvalide"] = $obj;	   
}*/
echo  json_encode($arr);

?>