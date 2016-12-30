<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');

	# --- Main starts here ---

	session_start();

	if (!isUserLoggedin())
		json_response(CL_NOT_LOGGEDIN);

	json_response(CL_NO_ERROR, ['username' => $_SESSION['username']]);

?>
