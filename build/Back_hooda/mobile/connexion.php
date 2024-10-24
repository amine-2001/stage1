<?php

header('Access-Control-Allow-Origin: *');
$connect=mysqli_connect('localhost','hoodaimprimerie','Ubox262^','hoodaimprimerie') or die ('error');
$SQL= 'SET CHARACTER SET utf8';

mysqli_query($connect,$SQL);
/*
mysqli_query("SET NAMES 'utf8'",$connect);

mysqli_query("SET CHARSET 'utf8'",$connect);*/
//mysqli_set_charset('utf8',$connect);
//error_reporting(0);
?>