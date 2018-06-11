<?php

require_once 'helper.php';

class CalidadTest extends \PHPUnit\Framework\Testcase {

	public static $conexion;

	public static function setUpBeforeClass(){

		self::$conexion = new mysqli( $GLOBALS['DB_HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'], $GLOBALS['DB_NAME']);

		mysqli_query( self::$conexion, 'SET NAMES "utf-8"' );
	}

	public static function tearDownBeforeClass(){

		self::$conexion = NULL;
	}
	
	public function setUp(){

		$sql = 'START TRANSACTION;';
		$resultado = mysqli_query( self::$conexion, $sql );
	
		$this -> assertTrue( $resultado, 'No se ha iniciado la transaction: ' . mysqli_connect_error() );

		$this -> hash_admin = Helper::acceder_como_admin( self::$conexion );
		$this -> assertNotNull( $this -> hash_admin, 'El cliente no ha accedido' );

		$this -> hash_cliente = Helper::acceder_como_cliente( self::$conexion );
		$this -> assertNotNull( $this -> hash_cliente, 'El cliente no ha accedido' );
	}

	public function tearDown(){

		$logout = Helper::log_out( self::$conexion, $this -> hash_cliente );
		$this -> assertTrue( $logout, 'El cliente de test no ha hecho log_out' );
		$this -> hash_cliente = null;

		$logout = Helper::log_out( self::$conexion, $this -> hash_admin );
		$this -> assertTrue( $logout, 'El admin de test no ha hecho log_out' );
		$this -> hash_admin = null;

		$sql = 'ROLLBACK;';
		$resultado = mysqli_query( self::$conexion, $sql );

		$this -> assertTrue( $resultado, 'No ha finalizado la transaction' );
	}


	public function test_devuelve_id_usuario(){

		$link = self::$conexion;
		$hash = $this -> hash_admin;
		//public function devuelve_id_usuario($link, $hash){

		// devuelve el id de un usuario a partir de su hash

		if($hash == ''){
			//return 0;
			$this -> assertNotNull( $hash, 'El hash de test no debería estar vacio. Corrígelo.' );
		}

		$id_usuario = coger_campo_misma_tabla( $link, 'id_usuario', 'cld_usuarios', 'hash', $hash);

		//return (int) $id_usuario;
		$resultado = (int) $id_usuario;

		$this -> assertSame( $resultado, 1, 'Debería ser el primer usuario.' );
		
		$this -> assertSame( Calidad::devuelve_id_usuario($link,$hash), $resultado, 'La función debería devolver el resultado.' );
	}


	public function test_es_cliente(){
		//$this -> assertNotNull( $this -> hash_cliente, 'El cliente no ha accedido' );

		//public function es_cliente($link, $hash_o_id_usuario){

		//if($hash_o_id_usuario == HASH_ADMIN){return false;}

		$link = self::$conexion;
		$arr_ejemplo = array(
			$this -> hash_admin,
			$this -> hash_cliente
		);


		$this -> assertNotNull( $this -> hash_cliente, 'Hash de cliente es null');

		foreach( $arr_ejemplo as $indice => $hash_o_id_usuario ){

			$salida_return = false;

			if( is_integer($hash_o_id_usuario) ){

				$id_usuario = $hash_o_id_usuario;

			}else{

				$id_usuario = Calidad::devuelve_id_usuario($link, $hash_o_id_usuario);
			}

			$this -> assertGreaterThan( 0, $id_usuario, 'Id de usuario es 0 o similar');


			$sql = 'SELECT *
					FROM cld_usuarios
					WHERE id_usuario = ' . $id_usuario . '
						AND activo = 1';


			$res = mysqli_query($link, $sql);
			if( mysqli_num_rows($res) > 0 ){

				while($e = mysqli_fetch_array($res)){
					
						// Preparando Multi-usuario
					if( $e['cal_cliente'] == 1 && $e['cal_ad'] == 0 && $e['cal_tecnico'] == 0 ){ 
						
						//return true;
						$resultado = 'cliente';
						$this -> assertTrue( Calidad::es_cliente( $link, $hash_o_id_usuario), 'La función debería ser True con ' . $resultado );
						$salida_return = true;
						
					}
				}
			}

			//return false;
			if( !$salida_return ){
				$resultado = 'admin';
				$this -> assertFalse( Calidad::es_cliente( $link, $hash_o_id_usuario), 'La función debería ser False con ' . $resultado );
			}

		}

	}

}

?>