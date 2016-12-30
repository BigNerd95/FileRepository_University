<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');
	require_once('../DBLib.php');


	# --- Main starts here ---

	session_start();

	# If user is already logged in, user must logout before register a new user
	if (isUserLoggedin())
		json_response(CL_ALREADY_LOGGEDIN);

	// Check if username parameter is missing
	$username = getParam('username');

	// Check if username is available
	if (userExists($username))
		json_response(CL_USER_ALREADY_EXISTS);

	json_response(CL_NO_ERROR);

?>
