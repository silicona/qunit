<?php

class Cld_lopd {


	public function __construct(){}

	public function guardar_lopd($link, $hash, $obj_form){

		$id_cliente = coger_dato( $link, 'id_cliente', 'cld_usuarios', 'hash', $hash);
		if( $id_cliente == null ){

			return array(
				'status' => 'ko',
				'error' => 'No hay cliente asociado',
			);
			exit();
		}

		start_transaction( $link );
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
		foreach( $obj_form as $campo => $valor ){
			
			$posicion = in_array($campos_form, $campo);
			if( $posicion != -1 ){

				$valores_form[$posicion] = $valor;
				unset($obj_form[$campo]);
			}
		}

		$where = ' WHERE id_cliente = ' . $id_cliente;
		$cliente_act = sql_update($link, 'cld_clientes', $campos_form, $valores_form, $where);

		if( !$cliente_act ){ $rollback = true; }

		$campos_lopd = array();
		$valores_lopd = array();
		foreach( $obj_form as $campo => $valor ){

			$campos_lopd[] = $campo;
			$valores_lopd[] = $valor;
		}

		$lopd_hecha = coger_dato( $link, 'lopd', 'cld_clientes', 'id_cliente', $id_cliente);

		if( $lopd_hecha == 0 ){

			array_unshift( $campos_lopd, 'id_cliente' );
			array_unshift( $valores_lopd, $id_cliente );

			$id_lopd = sql_insert( $link, 'cld_lopd', $campos_lopd, $valores_lopd);

			if( $id_lopd > 0 ){ 
				$id_lopd = sql_update( $link, 'cld_clientes', ['lopd'], ['1'], ' WHERE id_cliente = ' . $id_cliente );
			}

		} elseif($lopd_hecha == 1) {

			$id_lopd = sql_update( $link, 'cld_lopd', $campos_lopd, $valores_lopd, ' WHERE id_cliente = ' . $id_cliente );
		}

		if( $id_lopd == FALSE ){ $rollback = true; }

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

		 	$error = 'Ha habido un error al guardar sus datos. Contacte con nuestros técnicos para procesar sus informes de la LOPD.';
			
			return array(
				'status' => 'ko',
				'error' => $error,
			);

		} else {

			commit_transaction($link);

			$mensaje = 'Sus datos se han guardado correctamente. Un técnico los revisará y se pondrá en contacto con usted próximamente.';

			return array(
				'status' => 'ok',
				'mensaje' => $mensaje
			);
		}
		
	}


	public $textos = array(
		'text1' => 'Tratamiento de clientes',
		'text2' => 'Tratamiento de futuros clientes',
		'text3' => 'Tratamiento de empleados',
		'text4' => 'Tratamiento de candidatos',
		'text5' => 'Tratamiento de proveedores',
		'text6' => 'Tratamiento de videoseguridad',
		'text7' => 'perfil de usuario y una contraseña',
		'text8' => ' - Parrafo para el informe de adaptación con la obligación de identificación u autentificación - ',
		'text9' => 'Servidores',
		'text10' => 'una empresa especializada y autorizada por la dirección',
		'text11' => 'Todos los terminales están protegidos contra el intento reiterado y se bloquea el acceso automáticamente a los intentos retirados fallidos. Para desbloquear el sistema, debe intervenir la persona autorizada para ello.',
		'text12' => ' - Parrafo para informe de adaptación de la necesidad de incluir bloqueo del usuario al introducir tres veces mal la contraseña - ',
		'text13' => 'Protocolo de cambio de contraseñas cada <%dias%> días proximadamente.',
		'text14' => 'Todos los papeles de caracter personal deben estar guardados bajo llave.',
		'text15' => ' - Parrafada para informe de adaptación de la necesidad de guardar los datos personales de formato papel bajo llave. - ',
		'text16' => 'Las contraseñas de acceso son de uso personal e intransferible y no pueden ser compartidas. Las contraseñas deben cambiarse cada <%DIAS%> días.<br>Las contraseñas tienen que ser conocidas exclusivamente por el usuario propietario de ésta y tratadas como información personal en intransferible.<br>Es responsabilidad de usuario asegurar la confidencialidad y custodia de la contraseña.',
		'text17' => 'Los datos físicos se almacenan protegidos con cerradura con llave y permanecen cerrados, excepto en el momento de necesitar acceder a la documentación, previa anotación correspondiente en el registro de acceso.',
		'text18' => 'Se deberían establecer ciertas consideraciones en el momento de escoger una contraseña que deberán ser aplicadas por todos los usuarios del sistema:<br><ol><li>Se evitará nombre comunes o cualquier combinación que pueda identificar al usuario, fecha de nacimiento, matrícula de vehículos, etc.</li><li>Las contraseñas contendrán un mínimo de seis caracteres alfanuméricos.</li><li>Deberá cambiarse periódicamente.</li><li>Se evitara la comunicación escrita que revele la contraseña de cualquier usuario.</li></ol>',
		'text19' => 'Ficheros en papel.<br>El acceso a la documentación se limita exclusivamente al personal autorizado.</li></ol>',
		'text20' => 'En caso de gestión automatizada se indicará en este punto el sistema informático utilizado.',

	);




}

?>