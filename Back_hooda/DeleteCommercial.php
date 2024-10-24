<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

include 'Connect.php';

if (isset($_GET['id']) && $_GET['id']) {
    $id = $_GET['id'];
    $query = "DELETE FROM commercials WHERE id = $id";
    $modif = mysqli_query($connect, $query) or die(mysqli_error($connect));
    if ($modif) {
        $mise_a_jour = array(
            "Result" => "OK"
        );
        http_response_code(200);
    } else {
        $mise_a_jour = array(
            "Result" => "KO"
        );
        http_response_code(500);
    }
} else {
    $mise_a_jour = array(
        "Result" => "KO"
    );
    http_response_code(400);
}
mysqli_close($connect);
echo json_encode($mise_a_jour);
