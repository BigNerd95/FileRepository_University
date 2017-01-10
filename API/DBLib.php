<?php

	require_once(__DIR__.'/../config.php');
	require_once('CommLib.php');

	# -------- Database access functions ---------

    function dbQuery($query, $values=[]){
		# Connects to database
		$db = dbConnect();
		# Quotes all values
		$values = array_map(function($value) use ($db){
			return dbQuote($db, $value);
        }, $values);
		# Makes the complete query string
		$query = vsprintf($query, $values);
		# Makes query and return result object
		return mysqli_query($db, $query);
    }

	function dbConnect(){
		$conn = @mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
		if ($conn) {
			return $conn;
		} else {
			json_response(CL_DB_ERROR);
		}
    }

    function dbQuote($db, $value){
		return $db->real_escape_string($value);
    }

    function dbRowFetch($res){
		return $res->fetch_assoc();
    }

    function dbRowCount($res){
		return $res->num_rows;
    }

	# ----------- Database Query -------------

	# Adds a new user, returns TRUE if registration was successful
	function addUser($username, $password) {
		$query =   "INSERT INTO users
					(username, password)
					VALUES ('%s', '%s')";
		$result = dbQuery($query, [$username, $password]);
		return $result;
	}

	# Delete a user, returns TRUE if deletion was successful
	function delUser($userid){
		$query =   "DELETE FROM users
					WHERE id = %d";
		$result = dbQuery($query, [$userid]);
		return $result;
	}

	# Gets user id from username and password
	function getUserID($username, $password) {
		$query_login = "SELECT id
						FROM users
						WHERE username = '%s'
						AND password = '%s'
						LIMIT 0,1";
		$query_result = dbQuery($query_login, [$username, $password]);
		if (dbRowCount($query_result) == 1) {
			return dbRowFetch($query_result)['id'];
		} else {
			return NULL;
		}
	}

	# Returns TRUE if the username already exists
	function userExists($username) {
		$query_username =  "SELECT id
							FROM users
							WHERE username = '%s'
							LIMIT 0,1";
		$query_result = dbQuery($query_username, [$username]);
		return (dbRowCount($query_result) > 0);
	}

?>
