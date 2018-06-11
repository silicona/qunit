<?php

//require_once '../lib/bbdd.php';
//require_once '../api/entidades/Cld_lopd.php';
require_once '../api/entidades/Cld_cliente.php';

require_once 'helper.php';

class Cld_clienteTest extends \PHPUnit\Framework\Testcase {

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

		$this -> hash_cliente = Helper::acceder_como_cliente( self::$conexion );
		$this -> assertNotNull( $this -> hash_cliente, 'El cliente no ha accedido' );
	}

	public function tearDown(){

		$logout = Helper::log_out( self::$conexion, $this -> hash_cliente );
		$this -> assertTrue( $logout, 'El cliente de test no ha hecho log_out' );
		$this -> hash_cliente = null;

		$sql = 'ROLLBACK;';
		$resultado = mysqli_query( self::$conexion, $sql );

		$this -> assertTrue( $resultado, 'No ha finalizado la transaction' );
	}


	public function test_json_clientes(){

		$hash = $this -> hash_admin;
		$opcion = '';

		// devuelve un json con los clientes de un cliente
		//$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
		$link = self::$conexion;

		$arr_clientes = array();

		$id_cliente = 0;
		$and = '';
			
		//$es_comercial = comprueba_si_comercial($link, $hash);
		//$es_tecnico   = comprueba_si_tecnico($link, $hash);

		//if( ($hash != HASH_ADMIN) && ( !$es_comercial ) && ( !$es_tecnico ) ){
		if( Calidad::es_cliente($link, $hash) ){

			$id_cliente = Calidad::devuelve_id_cliente($link, $hash);

			if($id_cliente > 0){

				$where = ' WHERE id_cliente = ' . $id_cliente;
				$limit = ' LIMIT 1';

			} else {

				return json_encode(
					array(
						'status' => 'ko',
						'error' => 'No existe cliente'
					)
				);

				$resultado = json_encode(
					array(
						'status' => 'ko',
						'error' => 'No existe cliente'
					)
				);
			}


		} else {

			// MODO ADMIN
			$arr_ids_clientes = array();				

			if( ($opcion == 'todos') || ($opcion == '') ){
				$where = '';
			}

		}

		$sql = 'SELECT * 
				FROM cld_clientes '
				. $where . '
				ORDER BY empresa '
				. $limit ;
		
		$res = mysqli_query($link, $sql);
		while($e = mysqli_fetch_array($res)){
	    	
	    	$arr_clientes_aux = array();
	        foreach ($e as $key => $value) {
				if( !is_long($key) ){
					$arr_clientes_aux[$key] = $value;
				}
			}

			array_push($arr_clientes, $arr_clientes_aux);
			
		}

		
		//return json_encode($arr_clientes);
		$resultado = $arr_clientes;

		$this -> assertGreaterThan(1, count($resultado), 'El resultado debería ser mayor que 1' );
		$this -> assertSame( $resultado[0]['empresa'], 'Empresa test', 'El primero debería ser Empresa test: ' . $resultado[0]['empresa'] );

		$this -> assertSame( Cld_cliente::json_clientes($link, $hash), json_encode($resultado), 'La función debería devolver el resultado' );

	}

}

?>