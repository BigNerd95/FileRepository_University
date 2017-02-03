<?php

	# Communication Library
	# This file contains common API functions to talk with clients

	require_once(__DIR__.'/../config.php');


	const API_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";
	const API_NOT_LOGGEDIN = "NOT_LOGGEDIN";

	const API_NO_ERROR = "NO_ERROR";

	// API errors
	const API_MISSING_PARAMETER = "MISSING_PARAMETER";
	const API_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
	const API_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
	const API_REGISTRATION_FAILED = "REGISTRATION_FAILED";
	const API_FAILED_ACTION = "FAILED_ACTION";
	const API_UNKNOWN_ACTION = "UNKNOWN_ACTION";
	const API_UPLOAD_FAILED = "UPLOAD_FAILED";
	const API_INVALID_DIRECTORY = "INVALID_DIRECTORY";
	const API_DB_ERROR = "DB_ERROR";
	const API_FILE_NOT_FOUND = "FILE_NOT_FOUND";
	const API_INVALID_USERNAME = "INVALID_USERNAME";
	const API_INVALID_PASSWORD = "INVALID_PASSWORD";

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

	function checkUserValidity($username){
		$min = 4;
		$max = 20;
		if (strlen($username) < $min || strlen($username) > $max){
			json_response(API_INVALID_USERNAME, ['min' => $min, 'max' => $max]);
		}
	}

	function checkPassValidity($password){
		$min = 8;
		$max = 20;
		if (strlen($password) < $min || strlen($password) > $max){
			json_response(API_INVALID_PASSWORD, ['min' => $min, 'max' => $max]);
		}
	}

	function getParam($param){
		if (isset($_POST[$param]))
			return $_POST[$param];
		else
			json_response(API_MISSING_PARAMETER, ['param' => $param]);
	}

	function createDirectory($name){
		if (empty($name))
			return False;
		return mkdir(PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name, 0777); // 0777 o 0700
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

	function safeFilename($name){
		$name = str_replace( '/', '', $name);
		$name = str_replace('\\', '', $name);
		$name = str_replace('..', '', $name);
		return $name;
	}

	function filePath($name){
		$userdir = $_SESSION['userid'];
		return PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$userdir.'/'.$name;
	}

	function check_file($name){
		$path = filePath($name);
		return file_exists($path);
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
