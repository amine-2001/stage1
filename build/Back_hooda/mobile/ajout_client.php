<?php
include('connexion.php');
$commercial = $_POST['commercial'];
$datetime = date("Y-m-d--H-i-s");
$raisonsocial = $_POST['raisonsocial'];
$responsable = $_POST['responsable'];
$telephone = $_POST['telephone'];
$adresse = $_POST['adresse'];
$mf = $_POST['mf'];
$ville = $_POST['ville'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

	
$rs2 = mysqli_query($connect,"INSERT INTO `clients`(`id`, `raisonsocial`, `responsable`, `telephone`, `adresse`, `mf`, `commercial_id`, `latitude`, `longitude`, `ville_id`, `photo`) VALUES ('','$raisonsocial','$responsable','$telephone','$adresse','$mf','$commercial','$latitude','$longitude','$ville','')");
$id_client = mysqli_insert_id($connect);

echo json_encode($id_client);
?>