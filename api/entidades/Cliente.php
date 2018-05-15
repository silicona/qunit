<?php
    /**
     *  CLASE QUE DEFINE UN CONTACTO
     *  a partir de un id_cliente
     */
    
    session_start();
    
    
    class cliente{
         
		function __construct($id_cliente){
		 
			$this -> cargar_cliente($id_cliente);

		} // end __construct

		private function cargar_cliente($id_cliente){

			// variables de error
			$this -> error = '';

			// CREA UN OBJETO QUE REPRESENTA UN INMUEBLE
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$this -> id_cliente = $id_cliente;

			// COGER DATOS DE 4887_clientes
			$sql = 'SELECT *
					FROM 4887_clientes
					WHERE id_cliente = '.$id_cliente . '
					LIMIT 1';
			
			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				$this -> error = 'El cliente no ha podido ser encontrado.';

			}else{
				
				foreach (mysqli_fetch_array($res) as $key => $value) {
					if( !is_long($key) ){
						$this -> $key = $value;
					}
				}

			}

			$this -> cod_enlace = md5( $this -> email );
			
			$this -> tipo_contrato = devuelve_tipo_contrato( $this -> id_tipo_contrato);
			
			i($this, 'obj_cliente');

		} // fin método cargar_cliente
		

		public static function json_clientes($hash, $opcion = ''){

			// devuelve un json con los clientes de un cliente
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$arr_clientes = array();

			$id_cliente = 0;
			$and = '';
			
			// Determinar fecha límite de baja			

			$es_comercial = comprueba_si_comercial($link, $hash);
			$es_tecnico   = comprueba_si_tecnico($link, $hash);

			if( ($hash != HASH_ADMIN) && ( !$es_comercial ) && ( !$es_tecnico ) ){

				$id_cliente = devuelve_id_cliente($link, $hash);

				if($id_cliente > 0){

					$where = ' WHERE id_cliente = ' . $id_cliente;
					$limit = ' LIMIT 1';

				}else{

					return json_encode(
						array(
							'status' => 'ko',
							'error' => 'No existe cliente'
						)
					);
				}


			}else{

				// MODO ADMIN
				$arr_ids_clientes = array();				

				if($opcion == 'demos'){
					$where = ' WHERE id_tipo_contrato = 0 AND f_baja >= CURDATE() ';
				}

				if($opcion == 'pasados'){
					$where = ' WHERE (f_baja < CURDATE() AND (f_baja != "0000-00-00") ) ';
				}

				if($opcion == 'premium'){
					$where = ' WHERE ( f_baja >= CURDATE() AND id_tipo_contrato = 3 ) ';
				}

				if($opcion == 'reducida'){
					$where = ' WHERE ( f_baja >= CURDATE() AND (id_tipo_contrato = 1 OR id_tipo_contrato = 2 OR id_tipo_contrato = 4 OR id_tipo_contrato = 5 OR id_tipo_contrato = 6 ) )';
				}

				if($opcion == 'clasificadas'){
					$where = ' WHERE ( f_baja >= CURDATE() AND id_tipo_contrato = 7 ) ';
				}

				if($opcion == 'mini'){
					$where = ' WHERE ( f_baja >= CURDATE() AND id_tipo_contrato = 8 ) ';
				}

				if( ($opcion == 'todos') || ($opcion == '') ){
					$where = '';
				}

			}

			$sql = 'SELECT * 
					FROM 4887_clientes '
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

			
			return json_encode($arr_clientes);

		}


		public static function eliminar_cliente($id_cliente){

			/*
			// eliminar un cliente
			// - 1.- Comprobar que el cliente no tiene facturas asociadas
			// - 2.- Si no hay factuaras asociadas, eliminar el cliente.

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$status_transaction = 'ok';
			
			
			$tabla   = '4887_clientes';
			$where   = ' id_cliente = ' . $id_cliente;
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
		*/
        
		} // fin eliminar cliente
		

		public static function guardar_cliente($obj_cliente, $hash){



			// añade o modifica un cliente
			// devuelve un json con los datos del cliente o con un mensaje de error
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$id_cliente = (int) $obj_cliente['id_cliente'];

			$obj_cliente['cif']  = strtoupper(trim($obj_cliente['cif']));

			// Prevenir pérdida del iban al guardar el cliente sus datos
			$iban_actual = coger_campo_misma_tabla($link, 'iban', '4887_clientes', 'cif', $obj_cliente['cif'] );
			if( ($iban_actual != '') && ( strlen( $obj_cliente['iban'] ) < 23 ) ){
				$obj_cliente['iban'] = $iban_actual;
			}

			$obj_cliente['iban'] = strtoupper(trim($obj_cliente['iban']));
			
			// comprobaciones del cliente
			$str_error  = '';

			// Si hay código promocional, f_alta = fecha actual + 7 días
			// Si no hay código, requerir IBAN

			
			// comprobar que existen campos obligatorios
			$arr_campos_oblig = array('nombre','apellido1','email','empresa','cif','direccion','cp','login','password');
			
			if( $obj_cliente['alta_web'] == true ){
				
				$obj_cliente['obs'] = 'Dado de alta desde la web.';
				$obj_cliente['notificaciones'] = 1;
				
				// grabar cliente como premium si tiene código de contratación correcto
				$obj_cliente['id_tipo_contrato'] = 0; //demo

				if( $obj_cliente['cod_contratacion'] == 'CON30'){
					$obj_cliente['id_tipo_contrato'] = 1;
				}
				
				if( $obj_cliente['cod_contratacion'] == 'CON120'){
					$obj_cliente['id_tipo_contrato'] = 2;
				}

				if( $obj_cliente['cod_contratacion'] == 'CON2000'){
					$obj_cliente['id_tipo_contrato'] = 3;
				}

				if( $obj_cliente['cod_contratacion'] == 'CON60'){
					$obj_cliente['id_tipo_contrato'] = 4;
				}

				if( $obj_cliente['cod_contratacion'] == 'CON6'){
					$obj_cliente['id_tipo_contrato'] = 5;
				}

				if( $obj_cliente['cod_contratacion'] == 'CON3'){
					$obj_cliente['id_tipo_contrato'] = 6;
				}

				if( $obj_cliente['cod_contratacion'] == 'CLASIF'){
					$obj_cliente['id_tipo_contrato'] = 7;
				}

				if( $obj_cliente['cod_contratacion'] == 'CON50'){
					$obj_cliente['id_tipo_contrato'] = 8;
				}
				
				if( strlen($obj_cliente['iban']) > 23 && $obj_cliente['id_tipo_contrato'] > 0 ){
					$obj_cliente['f_baja'] = '31/12/2100';
				}else{
					$obj_cliente['f_baja'] = date( 'd/m/Y', strtotime("+7 day") );
					$obj_cliente['iban']   = '';
				}

			}else{

				// $login    = $obj_cliente['login'];
				// $password = $obj_cliente['password'];

				// añadir la fecha de baja si no existe,
				// esto ocurre cuando el cliente guarda sus datos
				if( $obj_cliente['f_baja'] == '' ){
					$obj_cliente['f_baja'] = coger_campo_misma_tabla($link, 'f_baja', '4887_clientes', 'id_cliente', $id_cliente);
					$obj_cliente['f_baja'] = cambiaf_a_normal( $obj_cliente['f_baja'] );
				}
				
			}


			for( $i = 0; $i < $arr_campos_oblig.length; $i++ ){
				$str_error .= str_check_oblig( $obj_cliente[ $arr_campos_oblig[$i] ], 3, $arr_campos_oblig[$i] );
			}

			if($str_error != ''){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar. ' . $str_error
					)
				);
			}

			

			// guardar el cliente
			$status_transaction = 'ok';
			start_transaction($link);

			$tabla = '4887_clientes';
			$campos = array(
				'nombre',
				'apellido1',
				'apellido2',
				'email',
				'telefono',
				'empresa',
				'cif',
				'direccion',
				'actividad',
				'cp',
				'poblacion',
				'iban',
				'cods_clasificaciones',
				'cods_cpv',
				'cods_cpv_ignorar',
				'lugares',
				'importe_min',
				'importe_max',
				'f_baja',
				'normas_iso',
				'comercial',
				'obs',
				'notificaciones'
			);

			$valores = array(
				$obj_cliente['nombre'],
				$obj_cliente['apellido1'],
				$obj_cliente['apellido2'],
				$obj_cliente['email'],
				$obj_cliente['telefono'],
				$obj_cliente['empresa'],
				$obj_cliente['cif'],
				$obj_cliente['direccion'],
				$obj_cliente['actividad'],
				$obj_cliente['cp'],
				$obj_cliente['poblacion'],
				$obj_cliente['iban'],
				$obj_cliente['cods_clasificaciones'],
				$obj_cliente['cods_cpv'],
				$obj_cliente['cods_cpv_ignorar'],
				$obj_cliente['lugares'],
				(int) $obj_cliente['importe_min'],
				(int) $obj_cliente['importe_max'],
				cambiaf_a_mysql( $obj_cliente['f_baja'] ),
				$obj_cliente['normas_iso'],
				$obj_cliente['comercial'],
				$obj_cliente['obs'],
				$obj_cliente['notificaciones']
			);



			if( ($obj_cliente['alta_web'] == true) || ($hash == HASH_ADMIN) ){

				array_push($campos, 'id_tipo_contrato', 'emails_notificaciones');
				array_push($valores, $obj_cliente['id_tipo_contrato'], $obj_cliente['emails_notificaciones'] );
			
			}


			if($id_cliente > 0){

				/*******/

					// FALTA METERLE EL GUARDADO DE COMERCIAL Y ACTIVO SI ADMIN

				/*******/

				if($hash == HASH_ADMIN) {

					array_push($campos,'f_alta');
					array_push($valores, cambiaf_a_mysql( $obj_cliente['f_alta']) );
				
				}

				// modificar
				$where = ' WHERE id_cliente = ' . $id_cliente;
				if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction='error';}

			}else{
				
				/*
				// comprobar que el login no existe ya
				if( $obj_cliente['alta_web'] != true ){

					if( check_exists($link, $tabla, 'login', $login) ){
						return json_encode(
							array(
								'status' => 'ko',
								'error'  => 'El login ya existe. No es posible continuar.'
							)
						);
					}

				} // fin check login
				*/

				// comprobar que el email no existe ya
				if( check_exists($link, $tabla, 'email', $obj_cliente['email']) ){
					return json_encode(
						array(
							'status' => 'ko',
							'error'  => 'El email ya existe. No es posible continuar.'
						)
					);
				}

				// comprobar que el CIF no existe ya
				if( check_exists($link, $tabla, 'cif', $obj_cliente['cif']) ){
					return json_encode(
						array(
							'status' => 'ko',
							'error'  => 'El CIF ya existe. No es posible continuar.'
						)
					);
				}

				// $hash = cliente::genera_hash($id_cliente, time() );

				array_push($campos,'f_alta');
				array_push($valores, date('Y-m-d H:i:s'));

				$id_cliente = sql_insert($link,$tabla,$campos,$valores);

				if($id_cliente == false){$status_transaction='error';}
			
			}


			if($status_transaction == 'ok'){
                
                commit_transaction($link);
                
                if( $obj_cliente['alta_web'] == true ){


					// CREAR UN NUEVO USUARIO
					unset( $arr_campos_oblig['login']) ;
					unset( $arr_campos_oblig['password']) ;

					$login    = $obj_cliente['email'];
					$password = createRandomPassword();
					

					i($hash, 'hash');

					$tabla = '4887_usuarios';

					$campos = array(
						'nombre',
						'email',
						'login',
						'password',
						'comercial',
						'tecnico',
						'cliente_admin',
						'id_cliente',
						'activo'
					);

					$valores = array(
						$obj_cliente['nombre'] . ' ' . $obj_cliente['apellido1'],
						$obj_cliente['email'],
						$login,
						$password,
						0,
						0,
						1,
						$id_cliente,
						1
					);

					$id_usuario = sql_insert($link,$tabla,$campos,$valores);

					if($id_usuario > 0){

						$hash     = cliente::genera_hash($id_usuario, time() );

						// enviar email con las claves
	                	$email_enviar_a  = $obj_cliente['email'];
		                $nombre_enviar_a = $obj_cliente['nombre'] . ' ' . $obj_cliente['apellido1'];
		                $asunto = 'Email desde Oclem Concursos: Alta';

		                $mensaje  = '<p>En Rivas Vaciamadrid, a ' . date('d/m/Y') . '<br><br><br><br><br></p>';
		                $mensaje .= '<p>Estimado asociado:</p>';

		                $mensaje .= '<p>Agradecerle la confianza que ha depositado en nuestro Grupo.</p>';
						$mensaje .= 'Adjunto le envío los datos que le van a permitir tener acceso a nuestra plataforma de Concurso Público, donde podrá obtener todo el soporte y asesoramiento, referente a las distintas licitaciones de su interés.</p>';
						$mensaje .= 'Con el fin de garantizar la confidencialidad, le recordamos que el uso de esta clave es personal e intransferible.</p>';
						$mensaje .= 'A continuación le facilitamos las claves de acceso:<br>';

		                $mensaje .= 'Enlace: <a href="' . BASE_URL . '#login">' . BASE_URL . '#login</a><br>';
		                $mensaje .= 'Login: '      . $login     . '<br>';
		                $mensaje .= 'Password: '   . $password  . '<br></p>';

		                $mensaje .= '<p>Aprovechamos la ocasión para ponernos todo el equipo de Grupo Oclem a su disposición.<br>';

		                $mensaje .= '<p>Reciba un cordial saludo.<br><br><br><br></p>';

		                $mensaje .= 'Grupo Oclem.';
		                $mensaje .= 'Dpto. Concurso Público';

	                	if( !enviar_email($email_enviar_a, $nombre_enviar_a, $asunto, $mensaje) ){

	                		// Avisar a Noelia de que ha habido un problema con el envío del email.
	                		$mensaje_error = 'El usuario ' . $obj_cliente['nombre'] . ' ' . $obj_cliente['apellido1'] . '<' . $obj_cliente['email'] . '> ha sido dado de alta, pero no le ha llegado el email de acceso. <br>Por favor, pónganse en contato con él.';
	 						
	 						enviar_email(EMAIL_ADMINISTRACION, NOMBRE_EMAIL_ADMINISTRACION, 'Error en el envío de un correo de alta', $mensaje_error );	

			                return json_encode(
								array(
									'status' => 'ko',
									'error'  => 'La cuenta ha sido dada de alta, pero no se ha podido enviar el email con las claves. Tal vez el email es erróneo. Por favor, consulte con el administrador.'
								)
							);
	 			

		                }else{
		                	
		                	// Si se envió el email, enviar copia a Noelia
		                	$asunto   = 'Cliente dado de alta en la plataforma.';

		                	$mensaje  = '<p>Se ha creado el siguiente cliente:</p>';
		                	$mensaje .= 'Nombre: '        . $nombre_enviar_a        . '<br>';
							$mensaje .= 'Empresa: '       . $obj_cliente['empresa'] . '<br>';
		               		$mensaje .= 'Email / Login: ' . $login                  . '<br>';
		               		$mensaje .= 'Password: '      . $password               . '<br>';

		                	enviar_email(EMAIL_ADMINISTRACION, NOMBRE_EMAIL_ADMINISTRACION, $asunto, $mensaje );	
			                
		                }

					}else{

						return json_encode(
							array(
								'status' => 'ko',
								'error'  => 'La cuenta ha sido dada de alta, pero no se ha podido crear el usuario. Por favor, consulte con el administrador.'
							)
						);

					}

                }

                // Si se ha procesado el alta, enviar email a administración
                
                
                // Devuelve el objeto cliente
                return json_encode( registro_a_array($link, $tabla, 'id_cliente', $id_cliente));

            }else{
                
                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }
			
		}

		public function actualizar_favorito($hash, $id_concurso, $anadir_o_quitar){

			// Actualiza el campo de concursos de un cliente

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$id_cliente = devuelve_id_cliente($link, $hash);
			if($id_cliente == 0){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Cliente no válido.'
					)
				);
			}

			$str_favoritos = coger_campo_misma_tabla( $link, 'favoritos', '4887_clientes','id_cliente', $id_cliente);
			$arr_favoritos = explode(',', $str_favoritos);

			if( $anadir_o_quitar == 'anadir'){
				array_push($arr_favoritos, $id_concurso);
				$arr_favoritos = array_unique( $arr_favoritos );
			}

			if( $anadir_o_quitar == 'quitar'){
				
				$key = array_search($id_concurso, $arr_favoritos);
				if ($key !== false) {
				    unset($arr_favoritos[$key]);
				}

			}

			$tabla   = '4887_clientes';
			$campos  = array('favoritos');
			$valores = array( implode(',', $arr_favoritos) );
			$where   = ' WHERE id_cliente = ' . $id_cliente;
			if( sql_update($link, $tabla, $campos, $valores, $where) ){
				
				return json_encode(
					array(
						'status' => 'ok',
						'error'  => 'Favorito actualizado con éxito.'
					)
				);

			}

			return json_encode(
				array(
					'status' => 'ko',
					'error'  => 'Error al guardar la transacción.'
				)
			);

		}

		public function actualizar_leido($hash, $id_concurso){

			// Actualiza el campo de concursos de un cliente

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$id_cliente = devuelve_id_cliente($link, $hash);
			if($id_cliente == 0){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Cliente no válido.'
					)
				);
			}

			$str_leidos = coger_campo_misma_tabla( $link, 'leidos', '4887_clientes','id_cliente', $id_cliente);
			$arr_leidos = explode(',', $str_leidos);

			array_push($arr_leidos, $id_concurso);
			$arr_leidos = array_unique( $arr_leidos );
			
			$tabla   = '4887_clientes';
			$campos  = array('leidos');
			$valores = array( implode(',', $arr_leidos) );
			$where   = ' WHERE id_cliente = ' . $id_cliente;
			if( sql_update($link, $tabla, $campos, $valores, $where) ){
				
				return json_encode(
					array(
						'status' => 'ok',
						'error'  => 'Leído actualizado con éxito.'
					)
				);

			}

			return json_encode(
				array(
					'status' => 'ko',
					'error'  => 'Error al guardar la transacción.'
				)
			);

		}

		public static function genera_hash($id_usuario, $password){
			
			// devuelve el hash de un nuevo cliente

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


		public static function devuelve_json_cod_enlace($cod_enlace){

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$sql = 'SELECT nombre, apellido1, id_tipo_contrato
					FROM 4887_clientes
					WHERE md5(email) = "' . $cod_enlace . '"
					LIMIT 1';

			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				i('NO SE CRUZA EL CÓDIGO');

				return json_encode(
					array(
						'status'    => 'ko',
						'error'     => 'Imposible encontrar el cliente'
					)
				);

			}else{
				
				while($e = mysqli_fetch_array($res)){
			    	
					return json_encode(
						array(
							'status'    => 'ok',
							'nombre'    => $e['nombre'],
							'apellido1' => $e['apellido1']
						)
					);

				}

			}

		} // fin devuelve_json_cod_enlace


		public static function contratar($cod_enlace, $iban, $cod_contratacion){

			// determina el cliente a partir del código de enlace y 
			// graba el IBAN y actualiza la fecha de fin de servicio

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			if($iban != ''){
				if( strlen( str_replace(' ','', $iban) ) != 24){
					return json_encode(
						array(
							'status' => 'ko',
							'error'  => 'IBAN no válido'
						)
					);				
				}	
			}
			

			$sql = 'SELECT id_cliente
					FROM 4887_clientes
					WHERE md5(email) = "' . $cod_enlace . '"
					LIMIT 1';

			// grabar cliente como premium si tiene código de contratación correcto
			$id_tipo_contrato = 0; //demo
			
			$time_baja = strtotime ( '-3 day' , strtotime ('now') ) ;
			$f_baja = date ( 'Y-m-d' , $time_baja );

			if( $cod_contratacion == 'DEMO01' ){
				$f_baja = date( 'Y-m-d', strtotime('+1 week') );	
			}else{
				$f_baja = '2100-12-31';
			}

			if( $cod_contratacion == 'CON30'){
				$id_tipo_contrato = 1;
			}

			if( $cod_contratacion == 'CON120'){
				$id_tipo_contrato = 2;
			}

			if( $cod_contratacion == 'CON2000'){
				$id_tipo_contrato = 3;
			}

			if( $cod_contratacion == 'CON60'){
				$id_tipo_contrato = 4;
			}

			if( $cod_contratacion == 'CON6'){
				$id_tipo_contrato = 5;
			}

			if( $cod_contratacion == 'CON3'){
				$id_tipo_contrato = 6;
			}

			if( $cod_contratacion == 'CLASIF'){
				$id_tipo_contrato = 7;
			}

			if( $cod_contratacion == 'CON50'){
				$id_tipo_contrato = 8;
			}

			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				i('Cliente no encontrado');

				return json_encode(
					array(
						'status'    => 'ko',
						'error'     => 'Imposible encontrar el cliente'
					)
				);

			}else{
				
				while($e = mysqli_fetch_array($res)){

			    	$status_transaction = 'ok';

			    	$id_cliente = $e['id_cliente'];

			    	$tabla = '4887_clientes';

					$campos = array(
						'iban',
						'f_baja',
						'id_tipo_contrato'
					);

					$valores = array(
						$iban,
						$f_baja,
						$id_tipo_contrato // contrato de un año por defecto
					);

					$where = ' WHERE id_cliente = ' . $id_cliente;
					if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction='error';}

					if( $status_transaction == 'ok' ){

						return json_encode(
							array(
								'status'    => 'ok'
							)
						);

					}else{

						return json_encode(
							array(
								'status'    => 'ko',
								'error'     => 'Imposible guardar la operación. Por favor, consulte con soporte técnico.'
							)
						);
					
					}


				}

			}

		} // fin devuelve_json_cod_enlace


    } // fin clase cliente
    
?>