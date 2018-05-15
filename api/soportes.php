<?php
	
	/*

		WEBSERVICE DE SOPORTE

		RECIBE: hash, id_soporte, tipo (soporte o proveedor), obj_soporte, accion = modificar || guardar || eliminar
		DEVUELVE: Obj. json con datos del soporte(s)
	
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
			
			- Si obj_soporte.id_soporte = 0 o no existe
	
		Si accion = eliminar
	

	*/

	require_once '../lib/config.php';
	require_once '../lib/entidades/4887_entidad_soporte.php';
	
	$id_soporte      = (int) $_POST['id_soporte'];
	$opcion          = limpia_varchar($_POST['opcion']);
	
	$accion          = limpia_varchar($_POST['accion']);
	$parametro       = limpia_varchar($_POST['parametro']);
	$hash            = limpia_varchar($_POST['hash']);

	$texto                = str_replace('"', '~', $_POST['obj_soporte']['texto']);
	$obj_soporte          = limpia_undefined($_POST['obj_soporte']);
	$obj_soporte['texto'] = limpia_text( $texto );
	$obj_soporte['texto'] = stripslashes( $texto );

	$nombre_archivo  = limpia_varchar($_POST['nombre_archivo']);

	salir_si_no_hash($link, $hash);
	
	$es_tecnico   = comprueba_si_tecnico($link, $hash);

	$cerrado = $_POST['cerrado'];
	$id_tipo_soporte            = limpia_varchar($_POST['id_tipo_soporte']);

	if($accion == 'calcular_soportes_ptes'){

		salir_si_no_hash($link, $hash);
		echo soporte::calcular_soportes_ptes($hash, $id_tipo_soporte);	
		
	}



	if( ($accion == 'consultar') || ($accion == '') ){

		if($opcion == 'num_adjudicaciones'){

			echo soporte::devuelve_num_adjudicaciones($hash);
			exit;

		}


		if($opcion == 'adjudicaciones'){
			
			echo soporte::json_adjudicaciones($hash, '');
			exit;

		}

		// Si el tipo no es baja y la tarifa es mini, devolver un array vacío
		if( $parametro != 'baja' ){
			
			if( comprueba_si_tarifa_mini($link, $hash) == true ){
				echo_json( array() );
				exit;
			}

		}

		if($id_soporte > 0){

			// generar json del soporte


			// Comprobar que el hash del cliente le permite ver esa solicitud de soporte
			if( $hash != HASH_ADMIN && !$es_tecnico ){

				$id_cliente          = (int) devuelve_id_cliente($link, $hash);
				$id_cliente_soporte  = (int) coger_campo_misma_tabla($link,'id_cliente', '4887_soportes', 'id_soporte', $id_soporte);
				
				if( ($id_cliente != $id_cliente_soporte ) || ($id_cliente == 0) ){
					echo_json( array() );
					exit;
				}

			}

			$ent_soporte = new soporte($id_soporte, $hash);
			echo_json( $ent_soporte);
			exit;

		}else{
			
			echo soporte::json_soportes($parametro, $hash);
			exit;

		}

	} // fin modificar

	if($accion == 'guardar'){

		// Si el tipo no es baja y la tarifa es mini, devolver un array vacío
		if( $parametro != 'baja' ){
			if( comprueba_si_tarifa_mini($link, $hash) == true ){
				echo_json( array() );
				exit;
			}
		}

		if( $hash != HASH_ADMIN && !$es_tecnico ){
			
			$id_cliente = devuelve_id_cliente($link, $hash);
			$id_usuario = devuelve_id_usuario($link, $hash);

			$obj_soporte['id_cliente'] = $id_cliente;
			$obj_soporte['id_usuario'] = $id_usuario;
			
		}


		echo soporte::guardar_soporte($obj_soporte, $hash);

	} // fin si guardar

	if($accion == 'eliminar'){
		
		if($hash == HASH_ADMIN || $es_tecnico ){
			echo soporte::eliminar_soporte($id_soporte, $hash);	
		}
		

	} // fin si eliminar

	if($accion == 'toggle_consulta'){

		// Cierra o reabre una consulta
		salir_si_no_hash($link, $hash);

		// clientes o empleados sólo pueden cerrar o reabrir sus solicitudes de soporte
		if( $hash != HASH_ADMIN ){
			i('no admin');

			if(es_cliente($link, $hash)){
				$id_usuario_hash = devuelve_id_usuario( $link, $hash );

				$sql = 'SELECT id_soporte_detalle
					FROM 4887_soportes_detalles
					WHERE id_soporte = ' . $id_soporte . '
						AND id_usuario = ' . $id_usuario_hash;
			
				$res = mysqli_query($link, $sql);

				if(mysqli_num_rows($res) == 0){
					echo json_encode(
						array(
							'status' => 'ko',
							'error'  => 'El usuario no tiene permisos para hacer esta operación.'
						)
					);
					exit;
				}
			}			

		}

		echo soporte::toggle_consulta($id_soporte, $cerrado, $hash);	
		
	}


	if($accion == 'marcar_como_leido'){
		echo soporte::marcar_como_leido($obj_soporte, $hash);
	}


	if($accion == 'actualizar_en_proceso'){

		if( $hash == HASH_ADMIN || $es_tecnico ){
			echo soporte::actualizar_en_proceso($obj_soporte, $hash);
		}

	}


	if($accion == 'eliminar_archivo'){
		
		if($hash == HASH_ADMIN || $es_tecnico ){
			echo soporte::eliminar_archivo($nombre_archivo, $hash);	
		}
		

	} // fin si eliminar

?>