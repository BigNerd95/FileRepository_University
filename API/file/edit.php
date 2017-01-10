<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../CommLib.php');

	function deleteFile($name){
		$userdir = $_SESSION['userid'];
		$dir_path = PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$userdir.'/';
		$filename = safeFilename($name);
		$path = $dir_path.$filename;
		if (file_exists($path))
			unlink($path);
		else
			json_response(CL_FILE_NOT_FOUND);
	}

	session_start();

	if (!isUserLoggedin())
		json_response(CL_NOT_LOGGEDIN);

	$filename = getParam('filename');

	# User must specify what he want to change
	$action = getParam('action');
	switch ($action) {
		/*
		case 'rename':
			$newPassword = getParam('newPassword');
			editPassword($newPassword);
			break;
		*/
		case 'delete':
			deleteFile($filename);
			break;

		default:
			json_response(CL_UNKNOWN_ACTION);
			break;
	}

	json_response(CL_NO_ERROR);


?>
