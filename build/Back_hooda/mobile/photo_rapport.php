<?php
include('connexion.php');
$client_id = $_POST['client_id'];
$datetime = date("Y-m-d--H-i-s");
$id_rapport = $_POST['id_rapport'];
$key = $_POST['key'];
$type = $_POST['type'];
	$photo_name =$datetime."-".$id_rapport.'-'.$key.".jpg"; 
$dir = 'images/';
move_uploaded_file($_FILES["image"]["tmp_name"],
      $dir. $photo_name);
	
$rs2 = mysqli_query($connect,"INSERT INTO `photovisites`(`id`, `visite_id`, `photo`) VALUES ('','$id_rapport','$photo_name')");
	

echo json_encode($rs);
?>