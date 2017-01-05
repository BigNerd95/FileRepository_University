<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	# Include Communication Library
	require_once('../CommLib.php');

	session_start();

	# Check if the user is authenticated
	if (!isUserLoggedin())
		json_response(CL_NOT_AUTHENTICATED);

	$file = $_FILES['file'];
	if ($file['error'] == UPLOAD_ERR_OK){
		move_uploaded_file($file["tmp_name"], PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$_SESSION['userid'].'/'.$file["name"]);
		json_response(CL_NO_ERROR);
	} else {
		json_response(CL_UPLOAD_FAILED);
	}
	//print_r($_FILES);

?>
