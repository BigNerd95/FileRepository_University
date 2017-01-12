<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');
	require_once('../DBLib.php');


	function createAccount($username, $password) {
		# Check if username is available
		if (userExists($username))
			json_response(API_USER_ALREADY_EXISTS);

		# Add user
		if (!addUser($username, $password))
			json_response(API_REGISTRATION_FAILED);

		# Gets id of added user
		$userid = getUserID($username, $password);

		# Create directory for files
		if (!createDirectory($userid)){
			delUser($userid);
			json_response(API_REGISTRATION_FAILED);
		}

		login($userid, $username);
	}


	# --- Main starts here ---

	session_start();

	# User must be logged out to register a new account
	if (isUserLoggedin())
		json_response(API_ALREADY_LOGGEDIN, ['username' => $_SESSION['username']]);

	$username = getParam('username');
	$password = getParam('password');

	# Register a new account
	createAccount($username, $password);

	json_response(API_NO_ERROR);

?>
