<?php
//header("Access-Control-Allow-Headers: X-Requested-With");

header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
/*$hostname = 'localhost';
$username = 'id19392791_pickingappuser';
$password = '2SDYC0~Hsmz|ovAi';
$database = 'id19392791_pickingappdb';*/
$hostname = 'localhost';
$username = 'digit335_admin';
$password = 'K@0n_Ju+m0sl';
$database = 'digit335_megalabspicking';

$cn = mysqli_connect($hostname,$username,$password,$database);
/*
if(!$cn){
    die("Connection failed: ". mysqli_connect_error());
}
echo "Connected Successfully";
*/
    //$cn = mysqli_connect("localhost","root","","empresa");
?>