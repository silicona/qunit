<?php

require_once '../lib/bbdd.php';
require_once '../api/entidades/Cld_lopd.php';
require_once '../api/entidades/Cld_login.php';

require_once 'helper.php';

class Cld_lopdTest extends \PHPUnit\Framework\Testcase {

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


	public function suministra_lopd(){

		$obj_form = array(
			array( array(
				'empresa'              => 'miempresa',
				'direccion'            => 'mi calle, 12',
				'localidad'            => 'madrid',
				'cp'                   => '28011',
				'cif'                  => '12345678Q',
				'telefono'             => '666666666',
				'email'                => 'miemail@empresa.com',
				'nombre_responsable'   => '',
				'email_lopd'           => 'miemail_lopd@empresa.com',
				'sector'               => '1',
				'descripcion'          => '',
				'estru_acceso_digital' => 'checked',
				'estru_acceso_fisico'  => 'checked',
				'estru_backup'         => '0',
				'estru_borrado'        => '0',
				'estru_discos'         => '0',
				'estru_electronica'    => 'checked',
				'estru_fisica'         => 'checked',
				'estru_imagenes'       => '1',
				'estru_mantenimiento'  => '0',
				'estru_ordenadores'    => '0',
				'estru_pendrives'      => '0',
				'estru_propio'         => '1',
				'estru_servidores'     => '0',
				'clientes_academicos'      => 'checked',
				'clientes_bancarios'       => 'checked',
				'clientes_bancos'          => 'checked',
				'clientes_caracteristicas' => 'checked',
				'clientes_facturar'        => 'checked',
				'clientes_gestoria'        => 'checked',
				'clientes_identificacion'  => 'checked',
				'clientes_otros'           => 'checked',
				'clientes_post'            => 'checked',
				'clientes_publicidad'      => 'checked',
				'clientes_seguridad'       => 'checked',
				'clientes_servicio'        => 'checked',
				'clientes_sino'            => '1',
				'clientes_ss'              => 'checked',
				'clientes_tributaria'      => 'checked',
				'futuros_academicos'       => 'checked',
				'futuros_agencia'          => 'checked',
				'futuros_caracteristicas'  => 'checked',
				'futuros_exclusivo'        => 'checked',
				'futuros_identificacion'   => 'checked',
				'futuros_imprenta'         => 'checked',
				'futuros_propio'           => 'checked',
				'futuros_sino'             => '1',
				'futuros_tercera'          => 'checked',
				'empleados_academicos'       => 'checked',
				'empleados_bancos'           => 'checked',
				'empleados_caracteristicas'  => 'checked',
				'empleados_formacion'        => 'checked',
				'empleados_formar'           => '1',
				'empleados_gestion'          => '2',
				'empleados_identificacion'   => 'checked',
				'empleados_mutua'            => '1',
				'empleados_nomina'           => 'checked',
				'empleados_prevencion'       => '1',
				'empleados_profesion'        => 'checked',
				'empleados_propio'           => 'checked',
				'empleados_relacion'         => 'checked',
				'empleados_sino'             => '1',
				'empleados_tercera'          => 'checked',
				'candidatos_academicos'      => 'checked',
				'candidatos_borrado'         => '2',
				'candidatos_caracteristicas' => 'checked',
				'candidatos_curriculum'      => 'checked',
				'candidatos_form'            => 'checked',
				'candidatos_identificacion'  => 'checked',
				'candidatos_profesion'       => 'checked',
				'candidatos_sino'            => '1',
				'candidatos_web'             => 'checked',
				'proveedores_bancos'         => 'checked',
				'proveedores_factura'        => 'checked',
				'proveedores_identificacion' => 'checked',
				'proveedores_pedido'         => 'checked',
				'proveedores_sino'           => '1',
			) ),
			array( array(
				'empresa'              => 'ejemplo de error',
				'direccion'            => 'mi calle, 12',
				'localidad'            => 'madrid',
				'cp'                   => '28011',
				'cif'                  => '12345678Q',
				'telefono'             => '666666666',
				'email'                => 'miemail@empresa.com',
				'nombre_responsable'   => '',
				'email_lopd'           => 'miemail_lopd@empresa.com',
				'sector'               => '1',
				'descripcion'          => '',
				'estru_acceso' => 'checked',		// Erroneo
				'estru_acceso_fisico'  => 'checked',
				'estru_backup'         => '0',
				'estru_borrado'        => '0',
				'estru_discos'         => '0',
				'estru_electronica'    => 'checked',
				'estru_fisica'         => 'checked',
				'estru_imagenes'       => '1',
				'estru_mantenimiento'  => '0',
				'estru_ordenadores'    => '0',
				'estru_pendrives'      => '0',
				'estru_propio'         => '1',
				'estru_servidores'     => '0',
				'clientes_academicos'      => 'checked',
				'clientes_bancarios'       => 'checked',
				'clientes_bancos'          => 'checked',
				'clientes_caracteristicas' => 'checked',
				'clientes_facturar'        => 'checked',
				'clientes_gestoria'        => 'checked',
				'clientes_identificacion'  => 'checked',
				'clientes_otros'           => 'checked',
				'clientes_post'            => 'checked',
				'clientes_publicidad'      => 'checked',
				'clientes_seguridad'       => 'checked',
				'clientes_servicio'        => 'checked',
				'clientes_sino'            => '1',
				'clientes_ss'              => 'checked',
				'clientes_tributaria'      => 'checked',
				'futuros_academicos'       => 'checked',
				'futuros_agencia'          => 'checked',
				'futuros_caracteristicas'  => 'checked',
				'futuros_exclusivo'        => 'checked',
				'futuros_identificacion'   => 'checked',
				'futuros_imprenta'         => 'checked',
				'futuros_propio'           => 'checked',
				'futuros_sino'             => '1',
				'futuros_tercera'          => 'checked',
				'empleados_academicos'       => 'checked',
				'empleados_bancos'           => 'checked',
				'empleados_caracteristicas'  => 'checked',
				'empleados_formacion'        => 'checked',
				'empleados_formar'           => '1',
				'empleados_gestion'          => '2',
				'empleados_identificacion'   => 'checked',
				'empleados_mutua'            => '1',
				'empleados_nomina'           => 'checked',
				'empleados_prevencion'       => '1',
				'empleados_profesion'        => 'checked',
				'empleados_propio'           => 'checked',
				'empleados_relacion'         => 'checked',
				'empleados_sino'             => '1',
				'empleados_tercera'          => 'checked',
				'candidatos_academicos'      => 'checked',
				'candidatos_borrado'         => '2',
				'candidatos_caracteristicas' => 'checked',
				'candidatos_curriculum'      => 'checked',
				'candidatos_form'            => 'checked',
				'candidatos_identificacion'  => 'checked',
				'candidatos_profesion'       => 'checked',
				'candidatos_sino'            => '1',
				'candidatos_web'             => 'checked',
				'proveedores_bancos'         => 'checked',
				'proveedores_factura'        => 'checked',
				'proveedores_identificacion' => 'checked',
				'proveedores_pedido'         => 'checked',
				'proveedores_sino'           => '1',
			) ),
		);

		return $obj_form;
	}

	/**
	 * @dataProvider suministra_lopd
	 */
	public function test_guardar_lopd($obj_form){

		$this -> assertArraySubset( ['localidad' => 'madrid'], $obj_form );

		$link = self::$conexion;
		$hash = $this -> hash_cliente;
		//$hash = 'hash_erroneo';

		$id_cliente = coger_dato( $link, 'id_cliente', 'cld_usuarios', 'hash', $hash);
		if( $id_cliente == null ){

			// echo array(
			// 	'status' => 'ko',
			// 	'error' => 'No hay cliente asociado',
			// );
			// exit();

			$resultado = array(
				'status' => 'ko',
				'error' => 'No hay cliente asociado',
			);

			$this -> assertSame( Cld_lopd::guardar_lopd($link, $hash, $obj_form), $resultado, 'La función debería dar error si no hay cliente con el hash de usuario');
			return true;
		}

		$this -> assertSame($id_cliente, '1', 'El id_cliente debería ser 1: ' . $id_cliente);
		
		start_transaction( $link );
		$error_rollback = '';
		$rollback = false;

		$campos_form = array(
			'empresa',
			'direccion',
			'localidad',
			'cp',
			'cif',
			'telefono',
			'email',
			'nombre_responsable',
			'email_lopd',
			'sector',
			'descripcion',
		);

		$valores_form = array();
		$numero = 0;
		foreach( $obj_form as $campo => $valor ){

			$numero++;
			$posicion = array_search($campo, $campos_form);

			if( $posicion !== false ){
				$valores_form[$posicion] = $valor;
				unset($obj_form[$campo]);
			}
		}


		$this -> assertEquals( $numero, 77, 'El número de campos de obj_form no es 77: ' . $numero );
		$this -> assertSame( count($valores_form), 11, 'El número de valores_form no es 11: ' . count($valores_form) );
		
		$where = ' WHERE id_cliente = ' . $id_cliente;
		$cliente_act = sql_update($link, 'cld_clientes', $campos_form, $valores_form, $where);

		if( !$cliente_act ){ 

			$error_rollback .= "No se actualizó el cliente\n";
			$rollback = true; 
		}
		
		$campos_lopd = array();
		$valores_lopd = array();
		foreach( $obj_form as $campo => $valor ){

			$campos_lopd[] = $campo;
			$valores_lopd[] = $valor;
		}

		$this -> assertSame( count($campos_lopd), 66, 'Número de campos de lopd incorrecto: ' . count($campos_lopd) );

		$lopd_hecha = coger_dato( $link, 'lopd', 'cld_clientes', 'id_cliente', $id_cliente);

		if( $lopd_hecha == 0 ){

			array_unshift( $campos_lopd, 'id_cliente' );
			array_unshift( $valores_lopd, $id_cliente );

			$this -> assertSame( count($campos_lopd), 67, 'El campo id_cliente no se ha añadido a campos_lopd' );
			$this -> assertSame( $valores_lopd[0], $id_cliente, 'El valor id_cliente no se ha añadido bien: ' . $id_cliente );

			$id_lopd = sql_insert( $link, 'cld_lopd', $campos_lopd, $valores_lopd);

			if( $id_lopd > 0 ){ 
				$id_lopd = sql_update( $link, 'cld_clientes', ['lopd'], ['1'], ' WHERE id_cliente = ' . $id_cliente );
			}

		} elseif($lopd_hecha == 1) {

			$id_lopd = sql_update( $link, 'cld_lopd', $campos_lopd, $valores_lopd, ' WHERE id_cliente = ' . $id_cliente );
		}

		if( $id_lopd == FALSE ){ 

			$error_rollback .= "No se ha guardado o actualizado el lopd.\n";
			$rollback = true; 
		}

		if( $rollback ){

		 	rollback_transaction($link);

		 	// Escribir log
		 	$log = PHP_EOL . '*** ' . date('d-m-Y') . ' ***' . PHP_EOL;
		 	$log .= 'Rollback de LOPD del cliente ' . $id_cliente . PHP_EOL;
		 	$log .= 'Error del rollback: ' . $error_rollback . PHP_EOL;
		 	$log .= implode( ", ", $valores_form ) . PHP_EOL;
		 	$log .= implode( ", ", $valores_lopd ) . PHP_EOL;

			$log_file = 'log_lopd.txt';
			file_put_contents($log_file, $log, FILE_APPEND | LOCK_EX);

		 	$error = 'Ha habido un error al guardar sus datos.';

			// return array(
			// 	'status' => 'ko',
			// 	'error' => $error,
		 	// 	);

		 	$resultado = array(
				'status' => 'ko',
				'error' => $error,
		 	);

		} else {

			commit_transaction($link);

			$mensaje = 'Sus datos se han guardado correctamente. Un técnico los revisará y se pondrá en contacto con usted próximamente.';

			// return array(
			// 	'status' => 'ok',
			// 	'mensaje' => $mensaje
			// );

			$resultado = array(
				'status' => 'ok',
				'mensaje' => $mensaje
			);
		}

		if( $valores_form['empresa'] == 'miempresa' ){

			$this -> assertArraySubset(['status' => 'ok'], $resultado, 'El resultado debería ser OK');
			$this -> assertArrayHasKey('mensaje', $resultado, 'El resultado debería tener mensaje de OK');

		} elseif( $valores_form['empresa'] == 'ejemplo de error' ){

			$this -> assertArraySubset(['status' => 'ko'], $resultado, 'El resultado debería ser KO');
			$this -> assertArrayHasKey('error', $resultado, 'El resultado debería tener el error');

		}


		
	}


}

?>
