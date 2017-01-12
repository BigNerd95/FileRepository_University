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
		json_response(API_NOT_LOGGEDIN);

	$filename = getParam('filename');
	if (check_file($filename)){
		header("Content-Disposition: attachment; filename=$filename");
		header("Content-Description: File Transfer");
		header('Content-Type: application/force-download');
		header("Content-Transfer-Encoding: binary");
		readfile(filePath($filename));
	} else {
		header("HTTP/1.0 404 File $filename Not Found");
	}

?>
