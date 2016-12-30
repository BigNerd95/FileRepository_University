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

	function setPassword($id, $password) {
		$query =   "UPDATE users
					SET password = '%s'
					WHERE id = %d";
		$result = dbQuery($query, [$password, $id]);
		return $result;
	}

	function editPassword($newPassword){
		if(!setPassword($_SESSION['userid'], $newPassword))
			json_response(CL_FAILED_ACTION);
	}

	function deleteAccount() {
		if(!delUser($_SESSION['userid']))
			json_response(CL_FAILED_ACTION);
		if(!deleteDirectory($_SESSION['userid']))
			json_response(CL_FAILED_ACTION);
		# sql query che cancelli tutti i file referenziati nel db
		logout();
	}

	# --- Main starts here ---

	session_start();

	# User must be logged in to make changes
	if (!isUserLoggedin())
		json_response(CL_NOT_LOGGEDIN);

	# User must provide his password to make changes
	$password = getParam('password');
	if (!checkPassword($password))
		json_response(CL_WRONG_CREDENTIALS);

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
			json_response(CL_UNKNOWN_ACTION);
			break;
	}

	json_response(CL_NO_ERROR);

?>
