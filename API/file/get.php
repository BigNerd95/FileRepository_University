<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('CommLib.php');

	session_start();

	if (!isset($_SESSION['loggedin']))
		echo json_response(NOT_AUTHENTICATED);


	

?>
