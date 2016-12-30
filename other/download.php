<?php

	$pass = $_COOKIE['accesso'];

	if($pass=='asterisk995asd'){
		
		$FileReq=$_GET['doc'];
		$privatePath='uploads/'.$FileReq;

		if($FileReq){
			if(!file_exists($privatePath)){
				echo 'Sorry, file '.$FileReq.' not found!';
			} else {
				header("Content-Disposition: attachment; filename=".$FileReq);
				header("Content-Description: File Transfer");
				header('Content-Type: application/force-download');
				header("Content-Transfer-Encoding: binary");
				readfile($privatePath);
			}
		} else {
			echo "
        	<html>
        	<head>
        	<title>Salvataggio Remoto 2.0 | BigNerd95</title>
        	<meta http-equiv='Cache-Control' content='no-cache'>
        	<meta http-equiv='Pragma' content='no-cache'>
        	<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />
        	<script>
        	function backx(){window.open('contenuto.php','_self');}
        	</script>
        	</head>
        	<body>
        	<input style='font-size:16px;' type='button' value='indietro' onclick='backx()' />
        	<br/>
        	<br/>
        	Nome file mancante
        	</body>
        	</html>
        	";
		}
	} else {
   
    	echo "
    	<html>
   		<head>
    	<title>Salvataggio Remoto 2.0 | BigNerd95</title>
    	<meta http-equiv='Cache-Control' content='no-cache'>
    	<meta http-equiv='Pragma' content='no-cache'>
    	<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />
    	<script>
    	function backx(){window.open('index.php','_self');}
    	</script>
    	</head>
    	<body>
    	<input style='font-size:16px;' type='button' value='accedi' onclick='backx()' />
    	<br/>
    	<br/>
    	Non hai i permessi per accedere
    	</body>
    	</html>  
    	";
	}
?>