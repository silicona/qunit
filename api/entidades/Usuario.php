<?php
    /**
     *  CLASE QUE DEFINE UN CONTACTO
     *  a partir de un id_usuario
     */
    
    session_start();
    
    
    class usuario{
         
		function __construct($id_usuario){
		 
			$this -> cargar_usuario($id_usuario);

		} // end __construct

		private function cargar_usuario($id_usuario){

			// variables de error
			$this -> error = '';

			// CREA UN OBJETO QUE REPRESENTA UN INMUEBLE
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$this -> id_usuario = $id_usuario;

			// COGER DATOS DE 4887_usuarios
			$sql = 'SELECT *
					FROM 4887_usuarios
					WHERE id_usuario = '.$id_usuario . '
					LIMIT 1';
			
			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				$this -> error = 'El usuario no ha podido ser encontrado.';

			}else{
				
				foreach (mysqli_fetch_array($res) as $key => $value) {
					if( !is_long($key) ){
						$this -> $key = $value;
					}
				}

				$this -> empresa = coger_campo_misma_tabla($link, 'empresa', '4887_clientes', 'id_cliente', $this -> id_cliente);

			}

			//i($this, 'obj_usuario');

		} // fin método cargar_usuario
		

		public static function json_usuarios($hash, $opcion = '', $id_usuario = 0){

			// devuelve un json con los usuarios de un usuario
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$arr_usuarios = array();

			$id_usuario = 0;
			$and = '';
			

			// Determinar fecha límite de baja			

			if( $hash != HASH_ADMIN){

				if($opcion == ''){

					$where = ' WHERE id_usuario = ' . $id_usuario;
					$limit = ' LIMIT 1';

				}else{

					$id_cliente = devuelve_id_cliente($link, $hash);
					$where = ' WHERE id_cliente = ' . $id_cliente;
				}

				$and = ' AND id_cliente > 0';
			

			}else{

				// MODO ADMIN

				if($opcion == 'empleados'){
					$where = ' WHERE id_cliente = 0';
				}


			}

			$sql = 'SELECT * 
					FROM 4887_usuarios '
					. $where . $and . '
					ORDER BY nombre DESC '
					. $limit ;
			i($sql, 'sql usuarios');

			
			$res = mysqli_query($link, $sql);
			while($e = mysqli_fetch_array($res)){
		    	
		    	$arr_usuarios_aux = array();
		        foreach ($e as $key => $value) {
					if( !is_long($key) ){
						$arr_usuarios_aux[$key] = $value;
					}
				}

				$arr_usuarios_aux['empresa'] = coger_campo_misma_tabla($link, 'empresa', '4887_clientes', 'id_cliente', $arr_usuarios_aux['id_cliente']);

				if( ($opcion == 'empleados') && ($hash == HASH_ADMIN) ){
					$arr_usuarios_aux['empresa'] = 'Oclem Concursos';
				}

				array_push($arr_usuarios, $arr_usuarios_aux);
				
			}

			
			return json_encode($arr_usuarios);

		}


		public static function eliminar_usuario($id_usuario){

			// eliminar un usuario
			// - 1.- Comprobar que el usuario no tiene facturas asociadas
			// - 2.- Si no hay factuaras asociadas, eliminar el usuario.

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$status_transaction = 'ok';
			
			$tabla   = '4887_usuarios';
			$where   = ' id_usuario = ' . $id_usuario;
			if(sql_delete($link, $tabla, $where) == false){$status_transaction = 'error';}
	
			if($status_transaction == 'ok'){
                
                commit_transaction($link);
                
                return json_encode(
					array(
						'status' => 'ok',
						'error'  => ''
					)
				);

            }else{
                
                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }
		
        
		} // fin eliminar usuario
		

		public static function guardar_usuario($obj_usuario, $hash){


			// añade o modifica un usuario
			// devuelve un json con los datos del usuario o con un mensaje de error
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$id_usuario = (int) $obj_usuario['id_usuario'];

			
			// nombre al menos 3 letras
			if( strlen( $obj_usuario['nombre'] ) < 4 ) {
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'El nombre debe tener al menos 4 letras. '
					)
				);	
			}

			if( ( strlen( $obj_usuario['login'] ) < 6 ) || ( strlen( $obj_usuario['password'] ) < 6 ) ){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'El login y el password deben tener al menos 6 letras, y no pueden ser sólo números'
					)
				);	
			}

			// login y password no pueden ser numéricos
			if( is_numeric($obj_usuario['login'])  || is_numeric($obj_usuario['password']) ){
				

				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Login y password no pueden ser numéricos. Introduzca alguna letra o signo. ' . $str_error
					)
				);	
			}



			// Si no somos admin, forzar que el usuario es del cliente que guarda
			if( $hash != HASH_ADMIN ){

				$id_cliente_hash = devuelve_id_cliente($link, $hash);
				
				$obj_usuario['id_cliente'] = $id_cliente_hash;

			}
			


			// Si estamos añadiendo, 
			i($obj_usuario, 'obj_usuario');
			if( $id_usuario == 0){

				// comprobar que no existe el login
				$login_tabla = coger_campo_misma_tabla($link, 'id_usuario', '4887_usuarios', 'login', $obj_usuario['login']);
				
				if($login_tabla != ''){
					return json_encode(
						array(
							'status' => 'ko',
							'error'  => 'El login ya existe. Por favor, elija otro. Los datos no se han podido guardar. '
						)
					);
				}

			}else{
				
				// Si estamos modificando

				// si Cliente Admin es 0, comprobar que hay al menos otro cliente admin en la empresa
				if( ( ($obj_usuario['activo'] == 0) || ($obj_usuario['cliente_admin'] == 0) ) && ($obj_usuario['id_cliente'] > 0) ){
					
					$sql = 'SELECT id_usuario
							FROM 4887_usuarios
							WHERE id_cliente = '. $obj_usuario['id_cliente'] . '
								AND cliente_admin = 1 
								AND activo = 1 
								AND id_usuario != ' . $obj_usuario['id_usuario'];
					i($sql, 'sql');

					$res = mysqli_query($link, $sql);
				
					if(mysqli_num_rows($res) == 0){

						return json_encode(
							array(
								'status' => 'ko',
								'error'  => 'Tiene que existir al menos un usuario admin y activo. Los datos no se guardarán. '
							)
						);

					}
				}


				// Si hay id_cliente, poner comer
			}


			// guardar el usuario
			$hash_usuario = usuario::genera_hash($id_usuario, time() );

			$status_transaction = 'ok';
			start_transaction($link);

			$tabla = '4887_usuarios';
			$campos = array(
				'nombre',
				'email',
				'login',
				'password',
				'hash',
				'cliente_admin',
				'activo'
			);

			$valores = array(
				$obj_usuario['nombre'],
				$obj_usuario['email'],
				$obj_usuario['login'],
				$obj_usuario['password'],
				$hash_usuario,
				$obj_usuario['cliente_admin'],
				$obj_usuario['activo']
			);

			if( $hash == HASH_ADMIN) {

				array_push($campos, 'comercial','tecnico','id_cliente');
				array_push($valores, $obj_usuario['comercial'], $obj_usuario['tecnico'], $obj_usuario['id_cliente']);
			
			}else{

				array_push($campos, 'id_cliente');
				array_push($valores, $id_cliente_hash);
			
			}


			if($id_usuario > 0){

				/*******/

					// FALTA METERLE EL GUARDADO DE COMERCIAL Y ACTIVO SI ADMIN

				/*******/

				// modificar
				$where = ' WHERE id_usuario = ' . $id_usuario;
				if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction='error';}

			}else{
				
				// comprobar que el login no existe ya
				if( $obj_usuario['alta_web'] != true ){

					if( check_exists($link, $tabla, 'login', $login) ){
						return json_encode(
							array(
								'status' => 'ko',
								'error'  => 'El login ya existe. No es posible continuar.'
							)
						);
					}

				} // fin check login
				

				$id_usuario = sql_insert($link,$tabla,$campos,$valores);

				if($id_usuario == false){$status_transaction='error';}
			
			}


			if($status_transaction == 'ok'){
                
                commit_transaction($link);
                
                // Devuelve el objeto usuario
                return json_encode( registro_a_array($link, $tabla, 'id_usuario', $id_usuario));

            }else{
                
                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }
			
		}


		public static function genera_hash($id_usuario, $password){
			
			// devuelve el hash de un nuevo usuario

			require_once BASE_FILE . 'lib/PasswordHash.php';

			// 1.- GENERAR HASH
			$hasher = new PasswordHash(8, false);

	        // Passwords should never be longer than 72 characters to prevent DoS attacks
	        if (strlen($password) > 72) { die("El password es demasiado largo"); }
	        
	        
	        // The $hash variable will contain the hash of the password
	        $hash = $hasher -> HashPassword($password);

	        // 2.- GUARDAR HASH EN BBDD
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$tabla   = '4887_usuarios';
			$campos  = array('hash');
			$valores = array($hash);
			$where   = ' WHERE id_usuario = ' . $id_usuario;
			$bool    = sql_update($link,$tabla,$campos,$valores,$where);

			if($bool == true){
				return $hash;
			}else{
				return false;
			}

		}




    } // fin clase usuario
    
?>