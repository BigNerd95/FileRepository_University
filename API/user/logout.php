<?php
	/*
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	*/
	
	require_once('../CommLib.php');

	# --- Main starts here ---

	session_start();

	if (!isUserLoggedin())
		json_response(API_NOT_LOGGEDIN);

	logout();

	json_response(API_NO_ERROR);

?>
