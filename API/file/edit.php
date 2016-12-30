<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('CommLib.php');

	session_start();

	if (!isUserLoggedin())
		json_response(CL_NOT_LOGGEDIN);




?>
