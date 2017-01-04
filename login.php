<!DOCTYPE html>
<?php

	require_once('API/CommLib.php');

	session_start();

	# User must be logged out to view login page
	if (isUserLoggedin()){
		header('Location: .');
		die();
	}

?>
<html>
	<head>
		<title>FileRepository - Login</title>
		<meta charset="UTF-8">

		<link rel="stylesheet" type="text/css" href="css/login.css">

		<script src="js/prototype.js" type="text/javascript"></script>
		<script src="js/scriptaculous/scriptaculous.js" type="text/javascript"></script>

		<script src="js/API.js" type="text/javascript"></script>
		<script src="js/login.js" type="text/javascript"></script>
	</head>
	<body>

		<div id="header">
			<span>File Repository</span>
		</div>

		<div id="container" class="rounded centered">

			<div id="chead" class="roundedtop">
				<a id="loginbtn">Login</a>
				<a id="registerbtn">Register</a>
			</div>

			<div id="cbody">
				<form id="login">
					<input type="text" placeholder="Username" class="rounded" id="loginuser" required>
					<input type="password" placeholder="Password" class="rounded" id="loginpass" required>
					<input type="submit" class="rounded" id="loginsbmt" value="Login">
				</form>

				<form id="register" >
					<input type="text" placeholder="Username" class="rounded" id="registeruser" required>
					<input type="password" placeholder="Password" class="rounded" id="registerpass" required>
					<input type="password" placeholder="Retype password" class="rounded" id="registerpass2" required>
					<input type="submit" class="rounded" id="registersbmt" value="Register">
				</form>

				<div id="cinfo">
				</div>
			</div>

		</div>

		<div id="footer">
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
