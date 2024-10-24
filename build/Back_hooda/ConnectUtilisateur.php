<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");

$userName = $_REQUEST['userName'];
$userPasse = $_REQUEST['userPasse'];
// Connect user
$sql = "SELECT * FROM utilisateurs WHERE login = '$userName' AND pswd = '$userPasse'";
$result = mysqli_query($connect, $sql);
$count = $result->num_rows;
if ($count > 0) {
    $connect = array(
        "connexion" => "OK"
    );
    http_response_code(200);
} else {
    $connect = array(
        "connexion" => "KO"
    );
}
echo json_encode($connect);
