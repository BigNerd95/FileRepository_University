<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');
	require_once('../DBLib.php');

	function checkPassword($password) {
		$user_id = getUserID($_SESSION['username'], $password);
		return ($user_id == $_SESSION['userid']);
	}

	function editPassword($newPassword){
		if(!setPassword($_SESSION['userid'], $newPassword))
			json_response(API_FAILED_ACTION);
	}

	function deleteAccount() {
		if(!delUser($_SESSION['userid']))
			json_response(API_FAILED_ACTION);
		if(!deleteDirectory($_SESSION['userid']))
			json_response(API_FAILED_ACTION);
		logout();
	}

	# --- Main starts here ---

	session_start();

	# User must be logged in to make changes
	if (!isUserLoggedin())
		json_response(API_NOT_LOGGEDIN);

	# User must provide his password to make changes
	$password = getParam('password');
	if (!checkPassword($password))
		json_response(API_WRONG_CREDENTIALS);

	# User must specify what he want to change
	$action = getParam('action');
	switch ($action) {
		case 'editPassword':
			$newPassword = getParam('newPassword');
			editPassword($newPassword);
			break;

		case 'deleteAccount':
			deleteAccount();
			break;

		default:
			json_response(API_UNKNOWN_ACTION);
			break;
	}

	json_response(API_NO_ERROR);

?>
