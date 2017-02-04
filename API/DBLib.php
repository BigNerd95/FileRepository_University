<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

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

    // connects to the database
    function dbConnect(){
        $conn = @mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
        if ($conn) {
            return $conn;
        } else {
            json_response(API_DB_ERROR);
        }
    }

    // filter user input
    function dbQuote($db, $value){
        return $db->real_escape_string($value);
    }

    // get row from database result
    function dbRowFetch($res){
        return $res->fetch_assoc();
    }

    // return number of database result
    function dbRowCount($res){
        return $res->num_rows;
    }

    # ----------- Database Query -------------

    # Adds a new user, returns TRUE if registration was successful
    function addUser($username, $password) {
        $query =   "INSERT INTO users
                    (username, password)
                    VALUES ('%s', '%s')";
        // encrypt password with an md5 hash
        $password = md5($password);
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

    // set password to an user account
    function setPassword($id, $password) {
        $query =   "UPDATE users
                    SET password = '%s'
                    WHERE id = %d";
        // encrypt password with an md5 hash
        $password = md5($password);
        $result = dbQuery($query, [$password, $id]);
        return $result;
    }

    # Gets user id from username and password
    function getUserID($username, $password) {
        $query =   "SELECT id
                    FROM users
                    WHERE username = '%s'
                    AND password = '%s'
                    LIMIT 0,1";
        // encrypt password with an md5 hash
        $password = md5($password);
        $result = dbQuery($query, [$username, $password]);
        if (dbRowCount($result) == 1) {
            return dbRowFetch($result)['id'];
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
