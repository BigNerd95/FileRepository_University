<?php
	/*
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	*/
	
	require_once('../CommLib.php');

	session_start();

	if (!isUserLoggedin())
		json_response(API_NOT_LOGGEDIN);

	$filename = getParam('filename');
	if (!check_file($filename))
		json_response(API_FILE_NOT_FOUND);

	json_response(API_NO_ERROR);
	//json_response(API_NO_ERROR, ['filename' => $filename]);

?>
