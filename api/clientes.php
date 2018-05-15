<?php
	
	/*

		WEBSERVICE DE CLIENTES

		RECIBE: hash, id_cliente, tipo (cliente o proveedor), obj_cliente, accion = modificar || guardar || eliminar
		DEVUELVE: Obj. json con datos del cliente(s)
	
		PROCEDIMIENTO:
		
		Si no hay accion o accion = consultar

			COGER ID_USUARIO A PARTIR DEL HASH.
				- SI EXISTE ID_USUARIO, 
					
					COMPROBAR QUE EL CONTACTO ES DEL USUARIO 

					- SI EXISTE ID - CONSTRUIR ENTIDAD CONTACTO
					- SI NO EXISTE ID - CONSTRUIR LISTADO DE CONTACTOS

				- SI NO EXISTE
					DEVUELVE OBJ JSON DE ERROR

		Si accion = guardar
			
			- Si obj_cliente.id_cliente = 0 o no existe
	
		Si accion = eliminar
	

	*/

	require_once '../lib/config.php';
	require_once '../lib/entidades/4887_entidad_cliente.php';
	
	$id_cliente       = (int) $_POST['id_cliente'];
	$opcion           = limpia_varchar($_POST['opcion']);
	$obj_cliente      = limpia_undefined($_POST['obj_cliente']);
	$accion           = limpia_varchar($_POST['accion']);
	
	$usuario          = limpia_varchar($_POST['usuario']);
	$password         = limpia_varchar($_POST['password']);
	
	
	$hash             = limpia_varchar($_POST['hash']);
	
	$comercial        = limpia_varchar($_POST['comercial']);
	
	$id_concurso      = (int) $_POST['id_concurso'];
	$anadir_o_quitar  = limpia_varchar($_POST['anadir_o_quitar']);
	
	$cod_enlace       = limpia_varchar($_POST['cod_enlace']);
	$iban             = limpia_varchar($_POST['iban'] );
	$cod_contratacion = limpia_varchar($_POST['cod_contratacion']);

	if($accion == 'contratar'){

		echo cliente::contratar($cod_enlace, $iban, $cod_contratacion);
		exit;
		
	}

	if($accion == 'check_cod_enlace'){
		echo cliente::devuelve_json_cod_enlace($cod_enlace);
		exit;
	}

	if( ($accion == 'consultar') || ($accion == '') ){
		
		salir_si_no_hash($link, $hash);
	
		if( ($hash != HASH_ADMIN) && ( !comprueba_si_comercial($link, $hash ) )  ){
			
			// Si devolvemos los datos sólo del cliente
			$id_cliente = devuelve_id_cliente($link, $hash);
			
		}

		if($id_cliente > 0){

			// generar json del cliente
			$ent_cliente = new cliente($id_cliente);
			echo_json( $ent_cliente);
			exit;

		}else{

			echo cliente::json_clientes($hash, $opcion);
			exit;

		}

	} // fin modificar

	if($accion == 'guardar'){

		// comerciales y técnicos no pueden guardar
		if( comprueba_si_tecnico($link, $hash) || comprueba_si_comercial($link, $hash) ){
			echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No tiene permisos para guardar el cliente. Por favor consulte con administración.'
					)
				);
				exit;
		}

		if( $hash != 'alta_web' ){
			salir_si_no_hash($link, $hash);	
		}
		
		if( ($hash != HASH_ADMIN) && ( $hash != 'alta_web' ) ){
			
			$id_cliente = devuelve_id_cliente($link, $hash);
			
			if( $id_cliente > 0 ){

				$obj_cliente['id_cliente'] = $id_cliente;

			}else{

				echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se pudo guardar el cliente. Por favor inténtelo de nuevo.'
					)
				);
				exit;

			}
			
		}	

		echo cliente::guardar_cliente($obj_cliente, $hash);

	} // fin si guardar


	if($accion == 'actualizar_favorito'){

		echo cliente::actualizar_favorito($hash, $id_concurso, $anadir_o_quitar);

	} // fin si actualizar favoritio

	
	if($accion == 'actualizar_leido'){

		echo cliente::actualizar_leido($hash, $id_concurso);

	} // fin si actualizar favoritio	


	/*
	if($accion == 'eliminar'){

		echo cliente::eliminar_cliente($id_cliente, $hash);

	} // fin si eliminar
	*/

	/*
	if($accion == 'check_login'){

		echo cliente::check_login($usuario, $password);

	} // fin si check login
	*/
	

?>