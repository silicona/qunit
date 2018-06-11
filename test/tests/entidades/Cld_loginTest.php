<?php

require_once '../lib/bbdd.php';
//require_once '../api/entidades/Cld_lopd.php';
require_once '../api/entidades/Cld_login.php';

require_once 'helper.php';

class Cld_loginTest extends \PHPUnit\Framework\Testcase {

	public static $conexion;

	public static function setUpBeforeClass(){

		self::$conexion = new mysqli( $GLOBALS['DB_HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'], $GLOBALS['DB_NAME']);

		mysqli_query( self::$conexion, 'SET NAMES "utf-8"' );
	}

	public static function teardownBeforeClass(){

		self::$conexion = NULL;
	}
	
	public function setUp(){

		$sql = 'START TRANSACTION;';
		$resultado = mysqli_query( self::$conexion, $sql );
	
		$this -> assertTrue( $resultado, 'No se ha iniciado la transaction: ' . mysqli_connect_error() );

		$this -> hash_cliente = Helper::acceder_como_cliente( self::$conexion );
		$this -> assertNotNull( $this -> hash_cliente, 'El cliente no ha accedido' );
	}

	public function tearDown(){

		//$logout = Helper::log_out( self::$conexion, $this -> hash_cliente );
		//$this -> assertTrue( $logout, 'El cliente de test no ha hecho log_out' );

		$this -> hash_cliente = null;

		$sql = 'ROLLBACK;';
		$resultado = mysqli_query( self::$conexion, $sql );

		$this -> assertTrue( $resultado, 'No ha finalizado la transaction' );
	}

	public function test_logout(){

		//public static function logout($link, $hash){
		$link = self::$conexion;
		$hash = $this -> hash_cliente;

		//$func = login::logout( $link, $hash );

		//$this -> assertNotNull( $func, 'func es nulo');


		// Elimina la sesión en el hash
		$id_usuario = coger_campo_misma_tabla($link, 'id_usuario', 'cld_usuarios', 'hash', $hash);

		$tabla = 'cld_usuarios';
		$campos = array('hash','valores_local');
		$valores = array('','');
		$where = ' WHERE id_usuario = ' . $id_usuario;

		//print_r($id_usuario);

		$rdo_logout = sql_update($link, $tabla, $campos, $valores, $where);

		$rdo_logout == true ? $status = 'ok' : $status = 'ko';

		// echo json_encode(
		// 	array(
		// 		'status' => (string) $status
		// 	)
		// );

		$resultado = array(
			'status' => $status,
		);

		$this -> assertEquals( 'ok', $resultado['status'], 'El resultado no es ok: ' . mysqli_error($link) );

		$hash = Helper::acceder_como_cliente( $link );
		$this -> assertNotNull( $hash, 'El hash es nulo');

		$func = Login::logout( $link, $hash );
		//print_r($func);
		$this -> assertSame( $func, $resultado, 'La función debería devolver el resultado');
		
	}

}

?>