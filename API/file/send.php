<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	ini_set('upload_max_filesize', '2G');
	ini_set('post_max_size', '3G');
	ini_set('max_input_time', 300);
	ini_set('max_execution_time', 300);

	print(ini_get('upload_max_filesize'));

	# Include Communication Library
	require_once('../CommLib.php');

	function uploadPath($filename){
		$dir = PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$_SESSION['userid'].'/';
		$filename = safeFilename($filename);
		$filename = checkFilename($dir, $filename);
		return $dir.$filename;
	}

	function checkFilename($dir, $name){
		$file = pathinfo($name);
		$filename = $file['filename'];
		$ext = (isset($file['extension'])? '.'.$file['extension'] : '');
		$i = 1;
		while(file_exists($dir.$filename.$ext)){
			$filename = $file['filename']." ($i)";
			$i++;
		}
		return $filename.$ext;
	}

	session_start();

	//print_r($_FILES);

	# Check if the user is authenticated
	if (!isUserLoggedin())
		json_response(CL_NOT_AUTHENTICATED);


	if (!isset($_FILES['file']))
		json_response(CL_UPLOAD_FAILED);

	$file = $_FILES['file'];
	if ($file['error'] == UPLOAD_ERR_OK){
		$path = uploadPath($file["name"]);
		move_uploaded_file($file["tmp_name"], $path);
		json_response(CL_NO_ERROR);
	} else {
		json_response(CL_UPLOAD_FAILED);
	}

?>
