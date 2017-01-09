<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');

	function filePath($name){
		$userdir = $_SESSION['userid'];
		return PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$userdir.'/'.$name;
	}

	function check_file($name){
		$path = filePath($name);
		return file_exists($path);
	}

	session_start();

	if (!isUserLoggedin())
		json_response(CL_NOT_LOGGEDIN);

	$filename = getParam('filename');
	if (!check_file($filename))
		json_response(CL_FILE_NOT_FOUND);

	json_response(CL_NO_ERROR);
	//json_response(CL_NO_ERROR, ['filename' => $filename]);

?>
