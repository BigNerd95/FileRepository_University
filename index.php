<!DOCTYPE html>
<?php

	require_once('API/CommLib.php');

	session_start();

	# User must be logged in to view index page
	if (!isUserLoggedin()){
		header('Location: login.php');
		die();
	}

?>
<html>
	<head>
		<title>FileRepository</title>
		<meta charset="UTF-8">

		<link rel="stylesheet" type="text/css" href="css/index.css">

		<script src="js/prototype.js" type="text/javascript"></script>
		<script src="js/scriptaculous/scriptaculous.js" type="text/javascript"></script>

		<script src="js/API.js" type="text/javascript"></script>
		<script src="js/index.js" type="text/javascript"></script>
	</head>
	<body>

		<div id="header">
			<div id="topbar" class="rounded">
					<a id="files_btn">Files</a>
					<a id="settings_btn">Settings</a>
					<a id="logout_btn">Logout</a>
			</div>
		</div>

		<div id="files" class="rounded centered">
			<input id="select_file" type="file" />
				<!--
				- lista files
				- trascina per eliminare
				- trascina per uploadare
				- clicca 2 volte per scaricare
				- modifica nome file
				-->
		</div>

		<div id="settings" class="rounded centered">
			<div id="shead" class="roundedtop">
				<a id="change_password_btn">Change password</a>
				<a id="delete_account_btn">Delete account</a>
			</div>

			<div id="sbody">
				<form id="change_password">
					<input type="password" placeholder="Password" class="rounded" id="cp_password" required>
					<input type="password" placeholder="New Password" class="rounded" id="cp_new_password" required>
					<input type="password" placeholder="Retype new password" class="rounded" id="cp_new_password_2" required>
					<input type="submit" class="rounded" id="loginsbmt" value="Change password">
				</form>

				<form id="delete_account" >
					<span id="delete_warning">This action is irreversible!</span>
					<input type="password" placeholder="Password" class="rounded" id="da_password" required>
					<input type="submit" class="rounded warning" id="registersbmt" value="Delete account">
				</form>

				<div id="sinfo">
				</div>
			</div>
		</div>

		<div id="footer" class="centered">
			<a href="http://validator.w3.org/check/referer">
				<img src="img/w3c-html.png" alt="Valid HTML" />
			</a>
			<a href="http://jigsaw.w3.org/css-validator/check/referer">
				<img src="img/w3c-css.png" alt="Valid CSS" />
			</a>
			<a href="https://webster.cs.washington.edu/jslint/?referer">
				<img src="img/w3c-js.png" alt="Valid JS" />
			</a>
  		</div>

	</body>
</html>
