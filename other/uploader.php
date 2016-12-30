<?php
$pass = $_COOKIE['accesso'];


if ($pass == 'asterisk995asd') {

 $target_path = "uploads/";
 $file_name = basename($_FILES['uploadedfile']['name']);

 $addInfo="";
 if (substr($file_name,-4) == ".php") {
    $file_name .= "s";
    $addInfo="<br><br>(Nome file modificato per prevenirne l'esecuzione sul server)";
 }

 $target_path .= $file_name;

 if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {

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
    <input style='font-size:16px;' type='button' value='indietro' onclick='backx()' />
    <br/>
    <br/>
    Il file <b>$file_name</b> e' stato caricato <a href='$target_path'>qui!</a>
    $addInfo
    </body>
    </html>
    ";
    
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
    <input style='font-size:16px;' type='button' value='indietro' onclick='backx()' />
    <br/>
    <br/>
    C'e' stato un errore, prova di nuovo!
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