<?php

	# Communication Library
	# This file contains common API functions to talk with clients

	require_once(__DIR__.'/../config.php');

	// Session errors
	const CL_ALREADY_LOGGEDIN = -2;
	const CL_NOT_LOGGEDIN = -1;

	const CL_NO_ERROR = 0;

	// API errors
	const CL_MISSING_PARAMETER = 1;
	const CL_WRONG_CREDENTIALS = 2;
	const CL_USER_ALREADY_EXISTS = 3;
	const CL_REGISTRATION_FAILED = 4;
	const CL_FAILED_ACTION = 5;
	const CL_UNKNOWN_ACTION = 6;


	function login($userid, $username) {
		$_SESSION['userid'] = $userid;
		$_SESSION['username'] = $username;
	}

	function logout() {
		unset($_SESSION['userid']);
		unset($_SESSION['username']);
		session_destroy();
	}

	function isUserLoggedin() {
		return (isset($_SESSION['userid']) && isset($_SESSION['username']));
	}

	function getParam($param){
		if (isset($_POST[$param]))
			return $_POST[$param];
		else
			json_response(CL_MISSING_PARAMETER, ['param' => $param]);
	}

	function createDirectory($name){
		if (empty($name))
			return False;
		return mkdir(PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name, 0777);
	}

	function deleteDirectory($name){
		if (empty($name))
			return False;
		return rrmdir(PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name);
	}

	function rrmdir($path) {
		if (empty($path))
			return False;
		$files = glob($path . '/*');
		foreach ($files as $file) {
			(is_dir($file) && !is_link($dir)) ? rrmdir($file) : unlink($file);
		}
		return rmdir($path);
	}

	function json_response($error_code, $keyvalues = []) {
		$response = array();
		$response['error'] = $error_code;
		foreach ($keyvalues as $key => $value) {
			$response[$key] = $value;
		}
		header('Content-type: application/json');
		echo json_encode($response);
		die();
	}

?>
