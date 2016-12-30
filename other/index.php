<?php


$pass = $_COOKIE['accesso'];


if ($pass == 'asterisk995asd') {

echo " 

<html>
<head>
<title>Salvataggio Remoto 2.0 | BigNerd95</title>
<meta http-equiv='Cache-Control' content='no-cache'>
<meta http-equiv='Pragma' content='no-cache'>
<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

<script>
function createCookie(name,value,minuti) {
	if (minuti) {
		var date = new Date();
		date.setTime(date.getTime()+(minuti*60*1000));
		var expires = '; expires='+date.toGMTString();
	}
	else var expires = '';
	document.cookie = name+'='+value+expires+'; path=/';
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,'',-1);
}

function escix() {
	eraseCookie('accesso');
    window.open('index.php','_self');
}

function mostra() {
	document.getElementById('text').innerHTML = 'Carico...';
}

function showfile() {
	window.open('contenuto.php','_self');
}

function attiva() {
ff = document.getElementById('fup');
if (ff.value){
    document.getElementById('fnow').disabled=false;
    } else {
    document.getElementById('fnow').disabled=true;
    setTimeout('attiva()',20);
    }
}
</script>

<style>

body {
   font-family: Helvetica;
   }

#title {
 width: 300px;
 position: absolute;
 left: 50%;
 margin-left: -150px;
 text-align: center;
 font-size: 28px;
 top: 50px;
 font-weight: bold;
 color: red;
 text-shadow: rgba(0, 0, 0, 0.5) 1px -1px 3px;
 }
 
#esci {
 position: absolute;
 top: 10px;
 left:10px;
 font-size: 16px;
 }
 
#showfile {
 position: absolute;
 top: 10px;
 right:10px;
 font-size: 16px;
 }
 
#accesso {
 width: 350px;
 position: absolute;
 margin-top: 120px;
 left: 50%;
 margin-left: -155px;
 }

#crea {
 border: solid 1px #999;
 width: 330px;
 height: 150px;
 text-align: center;
 font-size: 20px;
 }
 
#fup {
 margin: 10px;
 font-size: 16px;
 }
 
#fnow {
 margin: 10px;
 font-size: 16px;
 }
</style>

</head>
<body>

<div id='title'>
Salvataggio Remoto
</div>

<input id='esci' onclick='escix();' value='Esci' type='button' />
<input id='showfile' onclick='showfile();' value='Visualizza file' type='button' />

<div id='accesso'>

<div id='crea'>
<form enctype='multipart/form-data' action='uploader.php' onsubmit='mostra()' method='POST'>
<input type='hidden' name='MAX_FILE_SIZE' value='15000000' />
<input id='fup' onclick='attiva();' name='uploadedfile' type='file' />
<br/>
<input id='fnow' disabled type='submit' value='Invia Documento' />
</form>
<div id='text'>Seleziona un file...</div>
</div>

</div>

</body>
</html>

";  


} else {

 if ($pass) {
 $frase = "Password errata!";
 } else {
 $frase = "";
 }

echo " 

<html>
<head>
<title>Salvataggio Remoto 2.0 | BigNerd95</title>
<meta http-equiv='Cache-Control' content='no-cache'>
<meta http-equiv='Pragma' content='no-cache'>
<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

<style>
body {
   font-family: Helvetica;
   }
   
#title {
 width: 300px;
 position: absolute;
 left: 50%;
 margin-left: -150px;
 text-align: center;
 font-size: 28px;
 top: 50px;
 font-weight: bold;
 color: red;
 text-shadow: rgba(0, 0, 0, 0.5) 1px -1px 3px;
 }
 
#accesso {
 width: 300px;
 position: absolute;
 margin-top: 120px;
 left: 50%;
 margin-left: -150px;
 }
 
#frax {
 text-align: center;
 }

#crea {
 border: solid 1px #999;
 width: 300px;
 height: 110px;
 text-align: center;
 font-size: 20px;
 }
 
#pass{
 font-size: 16px;
 }
 
#btnacc{
 font-size: 16px;
 }
</style>

<script>

function createCookie(name,value,minuti) {
	if (minuti) {
		var date = new Date();
		date.setTime(date.getTime()+(minuti*60*1000));
		var expires = '; expires='+date.toGMTString();
	}
	else var expires = '';
	document.cookie = name+'='+value+expires+'; path=/';
}

function readCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,'',-1);
}

function accedi(){
passwd = document.getElementById('pass').value;
createCookie('accesso',passwd,10);
window.open('index.php','_self');
}

sde = 'no';
function actbutton() {
x3 = document.getElementById('pass').value;
if (x3 && sde == 'no') {
 sde = 'si';
 document.getElementById('btnacc').disabled = false;
 } else if (!x3 && sde == 'si') {
 sde = 'no';
 document.getElementById('btnacc').disabled = true;
 }
}


function btnum(event) {
 if(event.keyCode == 13 && document.getElementById('pass').value) {
 accedi();
 document.getElementById('pass').value = '';
  }
 }

 function onloadFunc(){
 	document.getElementById('pass').focus();
 }
</script>


</head>
<body onload='onloadFunc()'>

<div id='title'>
Salvataggio Remoto
</div>

<div id='accesso'>

<div id='crea'>
<p>Accesso</p>
<input onkeyup='actbutton()' onkeydown='btnum(event)' id='pass' type='password' />
<input disabled id='btnacc' type='button' value='accedi' onclick='accedi()' />
</div>
<br/>
<div id='frax'>$frase<div>
</div>


</body>
</html>

";
  
}

?>