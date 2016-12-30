<?php
$pass = $_COOKIE['accesso'];

if ($pass == 'asterisk995asd') {

    function elencafiles($dirname){
        $arrayfiles=Array();
        if(file_exists($dirname)){
            $handle = opendir($dirname);
            while (false !== ($file = readdir($handle))) { 
                if(is_file($dirname.$file)){
                    array_push($arrayfiles,$file);
                }
            }
            $handle = closedir($handle);
        }
        sort($arrayfiles);
        return $arrayfiles;
    }

    $arrayfile=array();
    $arrayfile=elencafiles("uploads/");

    if ($arrayfile) {

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
        <table border=1 rules=all align=center>
        <tr>
        <th align=center>File Name</th><th align=center>Actions</th>
        </tr> 
        ";

        $color="99CDC9";

        foreach($arrayfile as $valore) {
            echo "<tr bgcolor=$color>";
            echo "<td>$valore</td>";
            echo "<td><a href='uploads/$valore'>View</a> or <a href='download.php?doc=$valore'>Download</a></td>";
            echo "</tr>";
            if($color!=""){
                $color="";
            } else {
                $color="99CDC9";
            }
        }
      
        echo "
        </table>
        <br>
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
        Nessun file!
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
