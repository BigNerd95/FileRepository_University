<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once('../../config.php');

	//echo PROJECT_BASE_DIR;
	$name = "123";
	echo PROJECT_BASE_DIR.'/'.REPOSITORY_DIR.'/'.$name;


	var_dump($_FILES);
?>
