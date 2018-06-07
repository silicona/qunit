<?php
	
	/*

		WEBSERVICE DE LOGIN

		
	*/

	require_once '../lib/config.php';

	$login           = limpia_varchar($_POST['usuario']);
	$password        = limpia_varchar($_POST['password']);
	$accion          = limpia_varchar($_POST['accion']);
	
	

	function check_login($login, $password){

		// DEVUELVE UN ARRAY CON LOS VALORES DEL ACCESO SI EL USUARIO Y PASSWORD 
		// COINCIDEN CON EL ADMIN, CONCESIÓN O CLIENTE

		// COMPROBAR SI ADMIN
		if( ($login == LOGIN_ADMIN) && ($password == PASSWORD_ADMIN) ){

			echo json_encode(
				array(
					'status'          => 'ok',
					'nombre'          => NOMBRE_ADMIN,
					'hash'            => HASH_ADMIN,
					'oclem_admin'     => 'true'
				)
			);

			exit;

		}

		$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);


		// COMPROBAR SI CLIENTE
		$sql = 'SELECT id_cliente, nombre, comercial, tecnico, cliente_admin, hash
					FROM 4887_usuarios
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

		}else{

			// comprobar si la fecha de baja es correcta o si es técnico
			while($e = mysqli_fetch_array($res)){

				$id_cliente    = $e['id_cliente'];
				$nombre        = $e['nombre'];
				$hash          = $e['hash'];

				$comercial     = false;
				$tecnico       = false;
				$cliente_admin = false;

				($e['comercial']     == 1) ? $comercial     = true : $comercial     = false;
				($e['tecnico']       == 1) ? $tecnico       = true : $tecnico       = false;
				($e['cliente_admin'] == 1) ? $cliente_admin = true : $cliente_admin = false;

				// Si no es tecnico ni admin, comprobar fecha de baja
				if( $tecnico == false && $hash != HASH_ADMIN){

					$f_baja = coger_campo_misma_tabla($link, 'f_baja', '4887_clientes', 'id_cliente', $e['id_cliente']);

					if( strtotime($f_baja) < strtotime( date('Y-m-d') . ' 00:00:00' ) ){
						echo json_encode(
							array(
								'status' => 'ko',
								'error'  => 'Su período de prueba ha expirado. Por favor, consulte con administración.'
							)
						);
						exit;
					}

				}



				if( $id_cliente == 0 ){
					
					$empresa = 'Oclem Concursos';

				}else{
					
					$sql2 = 'SELECT empresa
						FROM 4887_clientes
						WHERE id_cliente = ' . $id_cliente . ' 
							AND ( (f_baja = "0000-00-00") OR ( DATE(f_baja) >= CURDATE() ) )
						LIMIT 1';
					
					$res2 = mysqli_query($link, $sql2);
			
					if(mysqli_num_rows($res2) == 0){
						
						// no pasó la valiación
						sleep(0.2);

						echo json_encode(
							array(
								'status' => 'ko',
								'error'  => 'Período de prueba expirado.'
							)
						);
						exit;

					}else{

						while($e2 = mysqli_fetch_array($res2)){
				    		$empresa    = $e2['empresa'];
				    	}

					}

				}
				
				echo json_encode(
					array(
						'status'        => 'ok',
						'nombre'        => $nombre,
						'empresa'       => $empresa,
						'hash'          => $hash,
						'comercial'     => $comercial,
						'tecnico'       => $tecnico,
						'cliente_admin' => $cliente_admin,
						'oclem_admin'   => false,
					)
				);

			}
		}	

		
	} // fin si check login

	if($accion == 'check_login'){
		check_login($login, $password);	
	}
	

?>