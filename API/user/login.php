<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');
	require_once('../DBLib.php');

	# --- Main starts here ---

	session_start();

	# If user is already logged in, user must logout before login again
	if (isUserLoggedin())
		json_response(CL_ALREADY_LOGGEDIN, ['username' => $_SESSION['username']]);

	# Gets needed parameters
	$username = getParam('username');
	$password = getParam('password');

	# Check if credentials are correct and gets userid
	if ( !($userid = getUserID($username, $password)) )
		json_response(CL_WRONG_CREDENTIALS);

	# Credentials are correct and user is logged in
	login($userid, $username);
	json_response(CL_NO_ERROR);

?>
