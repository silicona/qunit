<?php
    
    require_once 'bbdd.php';
    require_once 'RES_FirePHP.php';

    require_once 'funciones.php';
    require_once 'formularios.php';

    require_once 'Calidad.php';


    //  CAMBIAR EN PRODUCCIÓN
    /*************************/
    // define('LOGIN_ADMIN',           'VVAdmin');
    // define('PASSWORD_ADMIN',        'Vicente2016p');
    // define('HASH_ADMIN',            '181-74er82314asp');
    // define('NOMBRE_ADMIN',          'Administrador');

    define('LOGIN_DEMO',           'DEMO');
    define('PASSWORD_DEMO',        'DEMO');
    define('HASH_DEMO',            'DEMO');
    define('NOMBRE_DEMO',          'Invitado');


    // define('EMAIL_ADMIN',           'cesar@respirainternet.com');
    // define('EMAIL_ADMIN',           'admin@dp.com');
    // define('NOMBRE_EMAIL_ADMIN',    'César Chas');

    define('EMAIL_ADMIN',           'cesar@respirainternet.com');
    define('NOMBRE_EMAIL_ADMIN',    'César Chas');

    define('EMAIL_ADMINISTRACION',           'calidad@oclem.com');
    define('NOMBRE_EMAIL_ADMINISTRACION', 'Calidad Oclem');

    define('EMAIL_INFO',           'calidad@oclem.com');
    define('NOMBRE_EMAIL_INFO',    'Calidad Oclem');

    //define('EMAIL_SOLICITUDES',          'jrobledo@abogadosyarbitraje.com');
    //define('NOMBRE_EMAIL_SOLICITUDES',   'Julio Robledo');
    //define('TFNO_SOLICITUDES',          '+34605451052');
    
    /*
    define('EMAIL_SOLICITUDES',          'cesar@respirainternet.com');
    define('NOMBRE_EMAIL_SOLICITUDES',   'Julio Robledo');
    define('TFNO_SOLICITUDES',          '+34677561633');
    */

    /* localhost */
    if( strpos(__FILE__, 'Applications/MAMP') !== false ){ 
        
        /*******************************************************************************************/
        ///   ENTORNO DE PRUEBAS           ////
        /*******************************************************************************************/
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        
        define('INM_DOMINIO', 'http://localhost:8888');
        define('INM_CARPETA', 'dp/plataforma/');

        define('INM_ENTORNO', 'pruebas');
        
        $db_host    = "localhost"; 
        $db_nombre  = "divipatr"; 
        $db_user    = "root"; 
        $db_pass    = "root"; 

        
        $div_pruebas = '<div id="div_pruebas"><p class="text_center"><i class="fa fa-info-circle fa-lg" style="color:#333;font-size:18px;"></i> ESTÁS EN EL SERVIDOR DE PRUEBAS</p></div>';
    
    }

    if( strpos(__FILE__, 'var/www/html') !== false || strpos(__FILE__, 'opt/lampp') !== false ){ 
        
        /*******************************************************************************************/
        ///   ENTORNO DE PRUEBAS           ////
        /*******************************************************************************************/
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        
        define('INM_DOMINIO', 'http://localhost');
        define('INM_CARPETA', 'oclemcalidad/');

        define('INM_ENTORNO', 'pruebas');
        
        $db_host    = "localhost"; 
        $db_nombre  = "oclemcalidad_bbdd";
        $db_user    = "usuario"; 
        $db_pass    = "pass";
        
        $div_pruebas = '<div id="div_pruebas"><p class="text_center"><i class="fa fa-info-circle fa-lg" style="color:#333;font-size:18px;"></i> ESTÁS EN EL SERVIDOR DE PRUEBAS</p></div>';
    
    }

    if( strpos(__FILE__, 'Applications/XAMPP') !== false || strpos(__FILE__, 'opt/lampp') !== false ){ 
        
        /*******************************************************************************************/
        ///   ENTORNO DE PRUEBAS           ////
        /*******************************************************************************************/
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        
        define('INM_DOMINIO', 'http://localhost');
        define('INM_CARPETA', 'oclemcalidad/');

        define('INM_ENTORNO', 'pruebas');
        
        $db_host    = "localhost"; 
        $db_nombre  = "oclemcalidad_bbdd";
        $db_user    = "root"; 
        $db_pass    = "";
        
        $div_pruebas = '<div id="div_pruebas"><p class="text_center"><i class="fa fa-info-circle fa-lg" style="color:#333;font-size:18px;"></i> ESTÁS EN EL SERVIDOR DE PRUEBAS</p></div>';
    
    }

    if( strpos(__FILE__, '/home/respira') !== false ){ 
        
        /*******************************************************************************************/
        ///   ENTORNO DE PRUEBAS      ////
        /*******************************************************************************************/
        
        // SI PONEMOS EL ENTORNO EN PRUEBAS NO FUNCIONARÁN LOS SCRIPTS AUTOMATICOS

        // error_reporting(0);
        // error_reporting(E_ALL ^ E_NOTICE);

        define('INM_DOMINIO', 'http://respirainternet.com');
        define('INM_CARPETA', 'demo/dp/plataforma/');
        
        // define('INM_ENTORNO', 'pruebas');
        i('La consola está activa');

        $db_host   = "localhost";         
        $db_nombre = "respira_divipatr";
        $db_user   = "respira_sonia";
        $db_pass   = "OREAV-854477irefd";     
        
        $div_pruebas = '<div id="div_pruebas"><p class="text_center">ESTÁS EN EL SERVIDOR DE PRUEBAS</p></div>';

    }
    /*
    if( strpos(__FILE__, '/home/abogadosyarbitra') !== false ){ 
     */   
        /*******************************************************************************************/
        ///   ENTORNO DE PRODUCCIÓN      ////
        /*******************************************************************************************/
        
        // SI PONEMOS EL ENTORNO EN PRUEBAS NO FUNCIONARÁN LOS SCRIPTS AUTOMATICOS
        /*
        error_reporting(0);
        // error_reporting(E_ALL ^ E_NOTICE);

        define('INM_DOMINIO', 'https://abogadosyarbitraje.com');
        define('INM_CARPETA', 'plataforma/');
        
        define('INM_ENTORNO', 'produccion');
        i('La consola está activa');

        $db_host   = "localhost";         
        $db_nombre = "abogados_bbdd";
        $db_user   = "abogados_vicente";
        $db_pass   = "ORIEV-858447eij"; 
        
        $div_pruebas = '';

    }
    */


    $base_url = INM_DOMINIO . '/' . INM_CARPETA;
    
    $base_file = $_SERVER['DOCUMENT_ROOT'].'/'. INM_CARPETA;
    
    define('BASE_URL',  $base_url);
    define('BASE_FILE', $base_file);
    define('NOFOTO',    BASE_URL . 'images/no_foto.jpg');
    
    
    // CONEXIÓN CON BBDD
    define('DB_HOST',   $db_host);
    define('DB_NOMBRE', $db_nombre);
    define('DB_USER',   $db_user);
    define('DB_PASS',   $db_pass);
    
    $link = dblink();
    

?>