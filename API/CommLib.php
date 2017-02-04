<?php

	# Communication Library
	# This file contains common API functions to talk with clients

	require_once(__DIR__.'/../config.php');

	// API general errors
	const API_NO_ERROR = "NO_ERROR";
	const API_DB_ERROR = "DB_ERROR";
	const API_FAILED_ACTION = "FAILED_ACTION";
	const API_UNKNOWN_ACTION = "UNKNOWN_ACTION";
	const API_MISSING_PARAMETER = "MISSING_PARAMETER";

	// API user errors
	const API_NOT_LOGGEDIN = "NOT_LOGGEDIN";
	const API_ALREADY_LOGGEDIN = "ALREADY_LOGGEDIN";
	const API_WRONG_CREDENTIALS = "WRONG_CREDENTIALS";
	const API_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
	const API_REGISTRATION_FAILED = "REGISTRATION_FAILED";
	const API_INVALID_USERNAME = "INVALID_USERNAME";
	const API_INVALID_PASSWORD = "INVALID_PASSWORD";

	// API file errors
	const API_UPLOAD_FAILED = "UPLOAD_FAILED";
	const API_INVALID_DIRECTORY = "INVALID_DIRECTORY";
	const API_FILE_NOT_FOUND = "FILE_NOT_FOUND";

	// login the user
	function login($userid, $username) {
		$_SESSION['userid'] = $userid;
		$_SESSION['username'] = $username;
	}

	// logout the user
	function logout() {
		unset($_SESSION['userid']);
		unset($_SESSION['username']);
		session_destroy();
	}

	// check if the user is logged in
	function isUserLoggedin() {
		return (isset($_SESSION['userid']) && isset($_SESSION['username']));
	}

	// check if the username is valid
	function checkUserValidity($username){
		$min = 4;
		$max = 20;
		if (strlen($username) < $min || strlen($username) > $max){
			json_response(API_INVALID_USERNAME, ['min' => $min, 'max' => $max]);
		}
	}

	// check if the password is valid
	function checkPassValidity($password){
		$min = 8;
		$max = 20;
		if (strlen($password) < $min || strlen($password) > $max){
			json_response(API_INVALID_PASSWORD, ['min' => $min, 'max' => $max]);
		}
	}

	// get the given param from the post request and send an error if it is missing
	function getParam($param){
		if (isset($_POST[$param]))
			return $_POST[$param];
		else
			json_response(API_MISSING_PARAMETER, ['param' => $param]);
	}

	// create the direcotry for user files
	function createDirectory($name){
		if (empty($name))
			return False;
		return mkdir(PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name, 0777); // 0777 o 0700
	}

	// delete the user directory (called whend an account is deleted)
	function deleteDirectory($name){
		if (empty($name))
			return False;
		return rrmdir(PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name);
	}

	// function to empty a directory before deleting it
	function rrmdir($path) {
		if (empty($path))
			return False;
		$files = glob($path . '/*');
		foreach ($files as $file) {
			(is_dir($file) && !is_link($dir)) ? rrmdir($file) : unlink($file);
		}
		return rmdir($path);
	}

	// filter filename for security reasons
	function safeFilename($name){
		$name = str_replace( '/', '', $name);
		$name = str_replace('\\', '', $name);
		$name = str_replace('..', '', $name);
		return $name;
	}

	// generate the file name path based on the owner's account id
	function filePath($name){
		$userdir = $_SESSION['userid'];
		return PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$userdir.'/'.$name;
	}

	// check if a file exists
	function check_file($name){
		$path = filePath($name);
		return file_exists($path);
	}

	// send the json result, when this is called the page execution is stopped
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
