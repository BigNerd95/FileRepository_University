<?php
	/*
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	*/
	
	# Include Communication Library
	require_once('../CommLib.php');

	function listFiles($name){
		$dir_path = PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name;
		if (!is_dir($dir_path))
			json_response(API_INVALID_DIRECTORY);
		$files = scandir($dir_path, SCANDIR_SORT_NONE);
		$files = array_diff($files, [".",".."]); # Removes unwanted files
		return array_values($files); # be sure to return an array
	}

	# --- Main starts here ---

	# Start session to initialize $_SESSION dictionary
	session_start();

	# Check if the user is authenticated
	if (!isUserLoggedin())
		json_response(API_NOT_LOGGEDIN);

	$list = listFiles($_SESSION['userid']);

	json_response(API_NO_ERROR, ['files' => $list]);

?>
