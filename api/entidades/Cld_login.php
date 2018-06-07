<?php

	/**
	 *  Clase constructora del Login
	 *
	*/

	require_once '../lib/PasswordHash.php';


	class login {

		function __construct(){

		}

		public static function genera_hash($link, $id_usuario, $password){
				
			// genera y devuelve un nuevo hash para un asesor

			// 1.- GENERAR HASH
			$hasher = new PasswordHash(8, false);

	        // Passwords should never be longer than 72 characters to prevent DoS attacks
	        if (strlen($password) > 72) { die("El password es demasiado largo"); }
	        
	        
	        // The $hash variable will contain the hash of the password
	        $hash = $hasher -> HashPassword($password);

	        if( strlen($hash) < 10 ){ return false; }

	        // 2.- GUARDAR HASH EN BBDD
			$tabla   = 'cld_usuarios';
			$campos  = array('hash');
			$valores = array($hash);
			$where   = ' WHERE id_usuario = ' . $id_usuario;

			$bool    = sql_update($link,$tabla,$campos,$valores,$where);

			if($bool == true){

				return $hash;

			} else {

				return false;
			}

		}

		public static function logout($link, $hash){

			// Elimina la sesión en el hash
			$id_usuario = coger_campo_misma_tabla($link, 'id_usuario', '4887_usuarios', 'hash', $hash);

			$tabla = 'cld_usuarios';
			$campos = array('hash','datos_locales');
			$valores = array('','');
			$where = ' WHERE id_usuario = ' . $id_usuario;

			$rdo_logout = sql_update($link, $tabla, $campos, $valores, $where);

			$rdo_logout == true ? $status = 'ok' : $status = 'ko';

			echo json_encode(
				array(
					'status' => (string) $status
				)
			);

		}

		public static function check_login($link, $login, $password){

			// DEVUELVE UN ARRAY CON LOS VALORES DEL ACCESO SI EL USUARIO Y PASSWORD
			// COINCIDEN CON EL ADMIN, CONCESIÓN O CLIENTE

			//i('Dentro');
			//return 'Dentro';
			$es_admin = false;

			// COMPROBAR SI CLIENTE
			$sql = 'SELECT *
						FROM cld_usuarios
						WHERE login = "' . $login . '"
							AND password = "' . $password . '"
							AND activo = 1
						LIMIT 1';

			$res = mysqli_query($link, $sql);

			if(mysqli_num_rows($res) == 0){

				// no existe usuario
				echo json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Usuario o password no válidos.'
					)
				);
				exit;

			} else {

				while($e = mysqli_fetch_array($res)){

					$es_admin = $e['id_perfil'] == 1;

					// comprobar si asociado activo,
					// sólo si no abogado ni fiscal

					if( $e['id_cliente'] > 0){

						$activo = coger_campo_misma_tabla($link, 'activo', 'cld_clientes', 'id_cliente', $e['id_cliente']);

						if($activo == 0){
							// asociado inactivo
							echo json_encode(
								array(
									'status' => 'ko',
									'error'  => 'Usuario o password no válidos: cliente inactivo.'
								)
							);
							exit;
						}
					}

					/* evitar que si no se actualiza el hash de error de acceso */
					$antiguo_hash = '';
					$sql2 = 'SELECT hash
							FROM cld_usuarios
							WHERE login = "' . $login . '"
								AND password = "' . $password . '"
								AND login != ""
								AND password != "" 
							LIMIT 1';

					$res2 = mysqli_query($link, $sql2);
					while($e2 = mysqli_fetch_array($res2)){
						$antiguo_hash = $e2['hash'];
					}

					$hash = login::genera_hash($link, $e['id_usuario'], $e['password'] . time() );

					if( $hash == false ){
						// hubo un error al actualizar
						$hash = $antiguo_hash;
					}


					$arr_datos_usuario = array(
						'status'        => 'ok',
						'id_usuario'    => $e['id_usuario'],
						'nombre'        => $e['nombre'],
						//'contrato'      => $e['contrato'],
						'hash'          => $hash,
						'id_perfil'     => $e['id_perfil']
					);

					// if($e['id_perfil'] == 7 ){ // comprador
					// 	$id_propiedad = coger_campo_misma_tabla($link, 'id_propiedad', '4887_propiedades', 'id_usuario', $e['id_usuario']);

					// 	$arr_datos_usuario['id_propiedad'] = $id_propiedad;

					// }

					// No dar acceso si el usuario no tiene permisos de nada y no es cliente
					if($e['id_perfil'] == 0){

						echo json_encode(
								array(
									'status' => 'ko',
									'error'  => 'El usuario no tiene ningún permiso de acceso. No es posible acceder.'
								)
							);
						exit;
					}
					
					$id_cliente = $e['id_cliente'];

					//$arr_datos_usuario['telefono_asociado'] = coger_campo_misma_tabla($link, 'telefono_asociado', '4887_asociados','id_asociado',$id_asociado);

				}

			}



			

			return $arr_datos_usuario;
		
		} // fin function check login

	}

?>