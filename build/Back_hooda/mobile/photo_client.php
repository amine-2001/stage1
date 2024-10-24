<?php
include('connexion.php');
$id_client = $_POST['id_client'];
$datetime = date("Y-m-d--H-i-s");
$id_client = $_POST['id_client'];
$key = $_POST['key'];
$type = $_POST['type'];
	$photo_name =$datetime."-".$id_client.".jpg"; 
$dir = 'images/';
move_uploaded_file($_FILES["image"]["tmp_name"],
      $dir. $photo_name);
	
$rs2 = mysqli_query($connect,"update clients set photo='$photo_name' where id=".$id_client);
	

echo json_encode($rs);
?>