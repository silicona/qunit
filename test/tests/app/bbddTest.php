<?php

	require_once '../lib/bbdd.php';
	require_once '../api/entidades/App.php';

	class BbddTest extends \PHPUnit\Framework\TestCase {

		public static $conexion;

		public static function setUpBeforeClass(){

			//self::$conexion = new mysqli( self::$host, self::$user, self::$pass, self::$nombre );
			self::$conexion = new mysqli( $GLOBALS['DB_HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'], $GLOBALS['DB_NAME'] );

			mysqli_query( self::$conexion, 'SET NAMES "utf-8"' );
		}

		public static function tearDownAfterclass(){

			self::$conexion = NULL;
		}

		public function setUp(){

			$sql = 'START TRANSACTION;';
			$resultado = mysqli_query( self::$conexion, $sql );
	
			//$this -> assertEquals( 'oclemcalidad', $GLOBALS['DB_NAME'] );
			$this -> assertTrue( $resultado, 'No se ha iniciado la transaction: ' . mysqli_connect_error() );
			//$this -> assertTrue( self::$conexion );
		}

		public function tearDown(){

			$sql = 'ROLLBACK;';
			$resultado = mysqli_query( self::$conexion, $sql );

			$this -> assertTrue( $resultado, 'No ha finalizado la transaction' );
		}

		public function test_BBDD_BASICO_obtiene_nombre_admin(){

			$arr_link = array(
				self::$conexion,
				//Bbdd::obtener_link(),
			);

			foreach( $arr_link as $link ){

				$sql = 'SELECT login FROM cld_usuarios where id_usuario = 1';

				$res = mysqli_query( $link, $sql );
				
				$cantidad = $res ? mysqli_fetch_row($res)[0] : 0;
				
				//$this -> assertGreaterThan( 0, $cantidad, 'Sin contacto con la BBDD: ' . mysqli_error($link) );
				//print_r($cantidad);
				$this -> assertEquals( 'admin', $cantidad, 'Sin contacto con la BBDD: ' . mysqli_connect_error() );
			}
		}

		public function lll_test_devuelve_variables_entorno(){

			// $clase_refleja = new \ReflectionClass( Bbdd::class );
			// $metodo = $clase_refleja -> getMethod( 'devuelve_variables_entorno' );
			// $this -> assertTrue( $metodo -> isPrivate() );
			//$this -> assertTrue( $metodo );
		}

		public function lll_test_archivo_en_local(){

			// $arr_cobertura = array(
			// 	'var\/www\/html\/clientes_require',
			// );

			// foreach( $arr_cobertura as $ruta ){

			// 	$this -> assertRegExp( '/' . $ruta . '/', __FILE__, 'La carpeta no está cubierta por Bbdd' );

			// }
		}

		public function test_leer_entorno(){

			$arr_keys = array(
				'dominio',	'carpeta',	'entorno',
				'host', 'user', 'pass', 'nombre'
			);

			$arr_variables = App::detectar_entorno();

			$this -> assertNotNull( $arr_variables );
			
			foreach( $arr_keys as $key ){

				//$this -> assertArrayHasKey( $key, $arr_variables );
			}
		}

		public function jjj_test_sql_insert(){

		// 	$link = self::$conexion;
		// 	$tabla = 'clientes';
		// 	$campos = array(
		// 		'nombre',
		// 		'direccion',
		// 		'email',
		// 		'prefijo',
		// 		'telefono',
		// 		'tel_tipo',
		// 		'comentarios'
		// 	);

		// 	$valores = array(
		// 		'Nombre de Test',
		// 		'Domicilio de Test',
		// 		'email@test.com',
		// 		'34',
		// 		'123456789',
		// 		'2',
		// 		'Comentario de Test'
		// 	);

		// 	$this -> assertNotNull( Cliente::sql_insert($link,$tabla,$campos,$valores) );
		// 	$this -> assertGreaterThan( 0, Cliente::sql_insert($link,$tabla,$campos,$valores) );
		}


	}

	// class BbddPrueba extends Bbdd {

	// 	public function devuelve_variables_entorno(){

	// 		return parent::devuelve_variables_entorno();
	// 	}
	// }
?>