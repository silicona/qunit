<?php

	require_once 'funciones.php';

	class Bbdd extends Funciones {

		private static $host;
		private static $user;
		private static $pass;
		private static $nombre;

		private static $variables;

		public static function obtener_instancia(){

			return new Bbdd();
		}

		public static function obtener_link(){

			$instancia = new Bbdd();

			return $instancia -> link;
		}

		private function __construct(){

			$this -> devuelve_entorno();

			$link = new mysqli( self::$host, self::$user, self::$pass, self::$nombre ) or die( 'No se pudo conectar con la BBDD: ' . mysqli_connect_error() );
			//$link = new mysqli( $this -> host, $this -> user, $this -> pass, $this -> nombre ) or die( 'No se pudo conectar con la BBDD: ' . mysqli_connect_error() );

			mysqli_query( $link, 'SET NAMES "utf-8"' );

			$this -> link = $link;

			return $this;
		}

		private function devuelve_entorno(){

			//$arr_variables = self::devuelve_variables_entorno();
			$arr_variables = $this -> devuelve_variables_entorno();

			if( !defined('INM_ENTORNO') ){

				define( 'INM_DOMINIO', $arr_variables['dominio'] );
				define( 'INM_CARPETA', $arr_variables['carpeta'] );
				define( 'INM_ENTORNO', $arr_variables['entorno'] );

				$base_url = INM_DOMINIO . '/' . INM_CARPETA;
			    
			    $base_file = $_SERVER['DOCUMENT_ROOT'].'/'. INM_CARPETA;
			    
			    define('BASE_URL', $base_url);
			    define('BASE_FILE', $base_file);
			    //define('NOFOTO', BASE_URL . 'images/no_foto.jpg');
			}

			if( !defined('DB_HOST') ){

				self::$host = $arr_variables['host'];
				self::$user = $arr_variables['user'];
				self::$pass = $arr_variables['pass'];
				self::$nombre = $arr_variables['nombre'];

				// $this -> host = $arr_variables['host'];
				// $this -> user = $arr_variables['user'];
				// $this -> pass = $arr_variables['pass'];
				// $this -> nombre = $arr_variables['nombre'];

				define( 'DB_HOST', $arr_variables['host'] );
				define( 'DB_USER', $arr_variables['user'] );
				define( 'DB_PASS', $arr_variables['pass'] );
				define( 'DB_NOMBRE', $arr_variables['nombre'] );
			}
		}

		private function devuelve_variables_entorno(){

			$arr_variables = array();

			//if( strpos(__FILE__, '/var/www/html/clientes_require/') !== false ){ 
			if( preg_match('/var\/www\/html\/clientes_require/', __FILE__) ){ 
        
		        /*******************************************************************************************/
		        ///   ENTORNO DE PRUEBAS           ////
		        /*******************************************************************************************/
		        error_reporting(E_ALL ^ E_NOTICE);
		        
		        $arr_variables['dominio'] = 'http://localhost/';
		        $arr_variables['carpeta'] = 'clientes_require/';
		        $arr_variables['entorno'] = 'pruebas';

		        $arr_variables['host'] = 'localhost';
		        //$arr_variables['host'] = '127.0.0.1';
		        $arr_variables['user'] = 'usuario';
		        $arr_variables['pass'] = 'pass';
		        $arr_variables['nombre'] = 'clientes';
		        
		        //$arr_variables['div_pruebas'] = '<div id="div_pruebas"><p class="text_center"><i class="fa fa-info-circle fa-lg" style="color:#333;font-size:18px;"></i> ESTÁS EN EL SERVIDOR DE PRUEBAS</p></div>';
		    }

		    self::$variables = $arr_variables;
		    //$this -> variables = $arr_variables;

		    return $arr_variables;
		}

		public static function leer_entorno(){

			//return $this -> variables;
			return self::$variables;
		}

		public static function sql_insert($link,$tabla,$campos,$valores){
			
			//GENERA UNA CONSULTA INSERT A PARTIR DE UNA TABLA, CAMPOS, TIPO DE DATO(NUMERICO O TEXTO) Y VALORES	
			//INSERT INTO `mueblesviuda`.`categorias` (`id_categoria`, `categoria`, `titulo_categoria`, `subtitulo_categoria`, `texto_categoria`, `foto_categoria`, `id_idioma`, `num_orden`) VALUES ('4', 'Proyectos', 'Título proyectos', 'Subtitulo proyectos', 'texto proyectos', '', '1', '4');
			
			// mysqli_query($link, "SET NAMES 'utf8'"); //para que los nombres con acentos y demás salgan bien
			
			$sql_insert = 'INSERT INTO ' . $tabla . ' (';
			
			for($i=0;$i<count($campos);$i++){

				$sql_insert.= '`'. Cliente::quitar_espacios($campos[$i]) . '`, ';
			}

			$sql_insert=substr($sql_insert,0,strlen($sql_insert)-2) . ' ';
			
			$sql_insert.= ') VALUES (';
			
			for($i=0;$i<count($campos);$i++){
				
				if( (is_string( $valores[$i]) || ($valores[$i] == '') ) ){

					$sql_insert.= '"' . Cliente::limpiar_comillas($valores[$i]) . '", ';

				} else {

					$sql_insert.= $valores[$i] . ', ';
				}

				$valores[$i] ;
			}
			
			$sql_insert = substr($sql_insert,0,strlen($sql_insert)-2) . ' ';
			
			$sql_insert.= ');';
			//Cliente::i($sql_insert);
			
			$mi_tabla_insert = mysqli_query($link, $sql_insert);
			
			if($mi_tabla_insert == false){

				echo $sql_insert. '<br/>'.chr(13).mysqli_error($link).chr(13).' Error al insertar./n/r<br>';
				return false;
			} else {

				return mysqli_insert_id($link);
			}
		}	
	}

?>