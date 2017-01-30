<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');

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
