<?php
	
	/*

		WEBSERVICE DE CLIENTES

		RECIBE: hash, id_usuario, tipo (usuario o proveedor), obj_usuario, accion = modificar || guardar || eliminar
		DEVUELVE: Obj. json con datos del usuario(s)
	
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
			
			- Si obj_usuario.id_usuario = 0 o no existe
	
		Si accion = eliminar
	

	*/

	require_once '../lib/config.php';
	require_once '../lib/entidades/4887_entidad_usuario.php';
	
	$id_usuario_post = (int) $_POST['id_usuario'];
	$obj_usuario     = limpia_undefined($_POST['obj_usuario']);
	$accion          = limpia_varchar($_POST['accion']);

	$opcion          = limpia_varchar($_POST['opcion']);

	$usuario         = limpia_varchar($_POST['usuario']);
	$password        = limpia_varchar($_POST['password']);

	$hash            = limpia_varchar($_POST['hash']);	



	i($_POST, 'post');

	if( ($accion == 'consultar') || ($accion == '') ){
		
		salir_si_no_hash($link, $hash);
		
		$id_usuario_hash = 0;

		if( $hash == HASH_ADMIN ){
			
			if($id_usuario_post > 0){
				// generar json del usuario
				$ent_usuario = new usuario($id_usuario_post);
				echo_json( $ent_usuario);
				exit;

			}else{

				echo usuario::json_usuarios($hash, $opcion);
				exit;
			
			}

		}else{
			
			// Si devolvemos los datos sólo del usuario
			$id_usuario_hash = devuelve_id_usuario($link, $hash);
			
			if($id_usuario_hash > 0){

				if($opcion == 'clientes'){
					
					echo usuario::json_usuarios($hash, $opcion);
					exit;
				
				}else{

					// generar json del usuario

					if($id_usuario_post > 0){
						
						// comprobar que el usuario del post es del cliente;
						$id_cliente_hash = devuelve_id_cliente($link, $hash);
						$id_cliente_post = coger_campo_misma_tabla($link,'id_cliente','4887_usuarios','id_usuario',$id_usuario_post);

						if( ($id_cliente_hash == 0) || ($id_cliente_hash != $id_cliente_post) ){
							echo json_encode(
								array(
									'status' => 'ko',
									'error'  => 'No se pudo mostrar el usuario. Por favor inténtelo de nuevo.'
								)
							);
							exit;
						}

						$ent_usuario = new usuario($id_usuario_post);

					}else{

						$ent_usuario = new usuario($id_usuario_hash);
					
					}

					echo_json( $ent_usuario);
					exit;	
				}

			}	

		}
		

	} // fin modificar

	if($accion == 'guardar'){

		if( $hash != HASH_ADMIN) {
			
			// comprobar que el usuario es del cliente
			$id_cliente_bbdd = (int) devuelve_id_cliente($link, $hash);

			if( ($id_cliente_bbdd != $obj_usuario['id_cliente']) || ($id_cliente_bbdd == 0) ){

				echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se pudo guardar el usuario. Por favor inténtelo de nuevo.'
					)
				);
				exit;

			}
			
		}	

		echo usuario::guardar_usuario($obj_usuario, $hash);

	} // fin si guardar

	if($accion == 'eliminar'){

		require_once '../lib/entidades/4887_entidad_usuario.php';

		$obj_usuario = new usuario($id_usuario_post);
		$obj_usuario = (array) $obj_usuario;

		// Comprobar si se puede eliminar el usuario
		if( $obj_usuario['id_cliente'] > 0){

			// comprobar que hay al menos otro cliente admin en la empresa
			$sql = 'SELECT id_usuario
					FROM 4887_usuarios
					WHERE id_cliente = '. $obj_usuario['id_cliente'] . '
						AND cliente_admin = 1 
						AND activo = 1 
						AND id_usuario != ' . $obj_usuario['id_usuario'];
			
			$res = mysqli_query($link, $sql);
		
			if(mysqli_num_rows($res) == 0){

				echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Tiene que existir al menos un usuario admin y activo para cada cliente. No es posible eliminar. '
					)
				);
				exit;

			}

		}


		// comprobar que el usuario se corresponde con el del hash
		if($hash != HASH_ADMIN){

			$id_cliente_hash = coger_campo_misma_tabla($link,'id_cliente','4887_usuarios','hash', $hash);
			if( $id_cliente_hash != $obj_usuario['id_cliente'] ){

				echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se pudo guardar el usuario. Por favor inténtelo de nuevo.'
					)
				);
				exit;

			}


		}



		echo usuario::eliminar_usuario($id_usuario_post);

	} // fin si eliminar
	

	

?>