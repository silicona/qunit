<?php
    /**
     *  CLASE QUE DEFINE UN CONTACTO
     *  a partir de un id_soporte
     */
    
    session_start();
    
    
    class soporte{
         
		function __construct($id_soporte, $hash){
		 
			$this -> cargar_soporte($id_soporte, $hash);

		} // end __construct

		private function cargar_soporte($id_soporte, $hash = ''){

			// variables de error
			$this -> error = '';

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$this -> id_soporte = $id_soporte;

			// COGER DATOS DE 4887_soportes
			$sql = 'SELECT *
						FROM 4887_soportes
							WHERE id_soporte = '.$id_soporte . '
								LIMIT 1';
			
			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				$this -> error = 'La solicitud de soporte no ha podido ser encontrada.';

			}else{
				
				foreach (mysqli_fetch_array($res) as $key => $value) {
					if( !is_long($key) ){
						$this -> $key = $value;
					}
				}

				$this -> nombre_usuario = coger_campo_misma_tabla($link,'nombre','4887_usuarios','id_usuario', $this -> id_usuario );
				$this -> expediente = coger_campo_misma_tabla($link,'expediente','4887_concursos','id_concurso', $this -> id_concurso);
				$this -> cliente    = coger_campo_misma_tabla($link,'empresa','4887_clientes','id_cliente', $this -> id_cliente);
				$this -> usuario_cierre    = coger_campo_misma_tabla($link,'nombre','4887_usuarios','id_usuario', $this -> id_usuario_cierre);


				// Añadir obs cliente si es técico

		    	if( $hash == HASH_ADMIN || comprueba_si_tecnico($link, $hash) == true ){
		    		$this -> obs         = coger_campo_misma_tabla($link,'obs','4887_clientes','id_cliente', $this -> id_cliente);
		    	}


				// cargar respuestas
				$sql = 'SELECT *
						FROM 4887_soportes_detalles
						WHERE id_soporte = ' . $id_soporte . '
							ORDER BY id_soporte_detalle DESC
						LIMIT 100';

				$res = mysqli_query($link, $sql);
				
				while($e = mysqli_fetch_array($res)){
		    		
		    		$arr_detalle = array();

					$arr_detalle['id_soporte_detalle'] = $e['id_soporte_detalle'];
					$arr_detalle['id_usuario']         = $e['id_usuario'];
					$arr_detalle['f_respuesta']        = $e['f_respuesta'];
					$arr_detalle['hora_respuesta']     = $e['hora_respuesta'];
					$arr_detalle['texto']              = $e['texto'];
					$arr_detalle['es_cliente']         = $e['es_cliente'];

					$arr_detalle['nombre_usuario']     = coger_campo_misma_tabla($link,'nombre','4887_usuarios','id_usuario', $e['id_usuario']);

		    		$this -> arr_detalles[ $e['id_soporte_detalle'] * (-1) ] = $arr_detalle;

		    	}




			}


		} // fin método cargar_soporte
		

		public static function json_soportes($parametro, $hash){
			

			// devuelve un json con los soportes de un usuario
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$arr_soportes = array();
			$where = '';

			if($parametro != ''){
				if($parametro == 'baja'){$id_tipo_soporte = 0;}
				if($parametro == 'tecnico'){$id_tipo_soporte = 1;}
				if($parametro == 'administrativo'){$id_tipo_soporte = 2;}
				if($parametro == 'juridico'){$id_tipo_soporte = 3;}

				$where .= ' WHERE id_tipo_soporte = ' . $id_tipo_soporte ;	
			
			}			

			$es_tecnico   = comprueba_si_tecnico($link, $hash);

			if( $hash != HASH_ADMIN && !$es_tecnico ){
				
				// es un cliente
				$id_cliente = (int) devuelve_id_cliente($link, $hash);
				$where .= ' AND id_cliente = ' . $id_cliente ;	
				
			}

			
			$sql = 'SELECT 4887_soportes.* 
					FROM 4887_soportes  
					' . $where . '
					ORDER BY id_soporte DESC';
			
			
			$res = mysqli_query($link, $sql);
			$num_adjudicaciones = mysqli_num_rows($res);
			$i = 0;

			while($e = mysqli_fetch_array($res)){
				
		    	$arr_soportes_aux = array();
		        foreach ($e as $key => $value) {
					if( !is_long($key) ){
						$arr_soportes_aux[$key] = $value;
					}
				}

				$arr_soportes_aux['cliente']              = coger_campo_misma_tabla($link,'empresa','4887_clientes','id_cliente', $e['id_cliente'] );
				$arr_soportes_aux['id_tipo_contrato']     = coger_campo_misma_tabla($link,'id_tipo_contrato','4887_clientes','id_cliente', $e['id_cliente'] );
				
				$arr_soportes_aux['expediente']           = coger_campo_misma_tabla($link,'expediente','4887_concursos','id_concurso', $e['id_concurso']);
				
				$arr_soportes_aux['cif_adjudicatario']    = coger_campo_misma_tabla($link,'cif_adjudicatario','4887_concursos','id_concurso', $e['id_concurso']);
				$arr_soportes_aux['nombre_adjudicatario'] = coger_campo_misma_tabla($link,'nombre_adjudicatario','4887_concursos','id_concurso', $e['id_concurso']);
				
				$arr_soportes_aux['nombre_usuario']       = coger_campo_misma_tabla($link,'nombre','4887_usuarios','id_usuario', $e['id_usuario'] );
				
				$arr_soportes_aux['respondido']           = devuelve_respondido( $link, $e['id_soporte'], $hash );
				

				// detalles de soportes
				$arr_soportes_aux['arr_detalles'] = array();


				$sql2 = 'SELECT *
							FROM 4887_soportes_detalles
							WHERE id_soporte = ' . $e['id_soporte'] . '
							ORDER BY id_soporte_detalle DESC
							LIMIT 1';
						
				$res2 = mysqli_query($link, $sql2);

				while($e2 = mysqli_fetch_array($res2)){
		    		
		    		$arr_detalle = array();

		    		$arr_detalle['id_soporte_detalle'] = $e2['id_soporte_detalle'];
					$arr_detalle['id_usuario']         = $e2['id_usuario'];
					$arr_detalle['f_respuesta']        = $e2['f_respuesta'];
					$arr_detalle['hora_respuesta']     = $e2['hora_respuesta'];
					$arr_detalle['texto']              = $e2['texto'];
					$arr_detalle['es_cliente']         = $e2['es_cliente'];

					$arr_detalle['nombre_usuario']     = coger_campo_misma_tabla($link,'nombre','4887_usuarios','id_usuario', $e2['id_usuario']);

		    		$arr_soportes_aux[ 'arr_detalles'][$e2['id_soporte_detalle']]  = $arr_detalle;
		    	
		    	}

				array_push($arr_soportes, $arr_soportes_aux);	
				
				
			}

			

			return json_encode($arr_soportes);

		}


		public static function eliminar_soporte($id_soporte, $hash){

			// eliminar un soporte
			// - 1.- Comprobar que el soporte no tiene facturas asociadas
			// - 2.- Si no hay factuaras asociadas, eliminar el soporte.

			if( $hash != HASH_ADMIN ){ return false;}

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$status_transaction = 'ok';
			
			$tabla   = '4887_soportes';
			$where   = ' id_soporte = ' . $id_soporte;
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

		} // fin eliminar soporte
		

		public static function guardar_soporte($obj_soporte, $hash){

			// añade o modifica un soporte
			// devuelve un json con los datos del soporte o con un mensaje de error
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			$id_soporte = (int) $obj_soporte['id_soporte'];
			$id_cliente = (int) $obj_soporte['id_cliente'];

			if( $hash == HASH_ADMIN){
				$obj_soporte['id_usuario'] = coger_campo_misma_tabla($link,'id_usuario','4887_soportes','id_soporte',$id_soporte);
			}else{
				
				if( (int) $obj_soporte['id_usuario'] == 0){
					$obj_soporte['id_usuario'] = coger_campo_misma_tabla($link,'id_usuario','4887_soportes','id_soporte',$id_soporte);
				}

			}

			if($obj_soporte['id_concurso'] == 0){
				$obj_soporte['id_concurso'] = (int) coger_campo_misma_tabla($link, 'id_concurso', '4887_concursos', 'expediente', $obj_soporte['expediente'] );
			}

			$obj_soporte['nif'] = strtoupper(trim($obj_soporte['nif']));
			
			// comprobaciones del soporte
			$str_error  = '';


			if( $id_cliente == 0){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se encontró el cliente. Error al guardar. ' . $str_error
					)
				);
			}

			if( $obj_soporte['id_concurso'] == 0){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se encontró el expediente. Error al guardar. ' . $str_error
					)
				);
			}


			// comprobar que existen campos obligatorios
			$arr_campos_oblig = array('id_cliente','id_tipo_soporte','titulo');
			for( $i = 0; $i < $arr_campos_oblig.length; $i++ ){
				$str_error .= str_check_oblig( $obj_soporte[ $arr_campos_oblig[$i] ], 3, $arr_campos_oblig[$i] );
			}

			if($str_error != ''){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar. ' . $str_error
					)
				);
			}

			$es_tecnico   = comprueba_si_tecnico($link, $hash);

			( $es_tecnico || $hash == HASH_ADMIN) ? $es_cliente = 0 : $es_cliente = 1;


			// Añadir si no existe soporte
			$status_transaction = 'ok';
			start_transaction($link);

			$tabla = '4887_soportes';
			if($id_soporte == 0){
				
				// Añadiendo
				$campos = array(
					'id_cliente',
					'id_usuario',
					'id_tipo_soporte',
					'id_concurso',
					'titulo',
					'f_alta',
				);

				$valores = array(
					$obj_soporte['id_cliente'],
					$obj_soporte['id_usuario'],
					$obj_soporte['id_tipo_soporte'],
					$obj_soporte['id_concurso'],
					$obj_soporte['titulo'],
					date('Y-m-d H:i:s')
				);

				$id_soporte = sql_insert($link,$tabla,$campos,$valores);
				if($id_soporte == false){$status_transaction='error';}

			}

			// Actualizar fecha de cierre si procede
			if( $es_tecnico || $hash == HASH_ADMIN){

				$tabla = '4887_soportes';
				$campos  = array('f_cierre', 'leido');
				$valores = array( date('Y-m-d', 0) );

				$where = ' WHERE id_soporte = ' . $id_soporte;
				if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction = 'error';}

			}

			// Guardar los detalles
			$id_usuario = devuelve_id_usuario($link, $hash);

			$tabla = '4887_soportes_detalles';
			$campos = array(
				'id_soporte',
				'id_usuario',
				'f_respuesta',
				'hora_respuesta',
				'texto',
				'es_cliente'
			);

			$valores = array(
				$id_soporte,
				$id_usuario,
				date('Y-m-d'),
				date('H:i'),
				$obj_soporte['texto'],
				$es_cliente
			);

			$id_soporte_detalle = sql_insert($link,$tabla,$campos,$valores);
			if($id_soporte_detalle == false){$status_transaction='error';}



			// guardar el soporte
			if($status_transaction == 'ok'){
                
                commit_transaction($link);
                
                $arr_datos_usuario = coger_array_misma_tabla($link, array('email','nombre'), '4887_usuarios', 'id_usuario', $obj_soporte['id_usuario'] );

                $email_enviar_a  = $arr_datos_usuario[0];
                $nombre_enviar_a = $arr_datos_usuario[1];
                $asunto = 'Email desde Oclem Concursos: Soporte';


                if( $obj_soporte['id_tipo_soporte'] == 0 ) { $tipo_soporte = 'baja';          }
                if( $obj_soporte['id_tipo_soporte'] == 1 ) { $tipo_soporte = 'tecnico';       }
                if( $obj_soporte['id_tipo_soporte'] == 2 ) { $tipo_soporte = 'administrativo';}
                if( $obj_soporte['id_tipo_soporte'] == 3 ) { $tipo_soporte = 'juridico';      }

                /*
                if( ( $obj_soporte['id_tipo_soporte'] == 0 ) && ( $hash == HASH_ADMIN || $es_tecnico ) ){

                	// SI ES UNA BAJA
                	$arr_datos_concurso = coger_array_misma_tabla($link, array('baja_estadistica','organo_contratacion','expediente','titulo') , '4887_concursos', 'id_concurso', $obj_soporte['id_concurso'], 'assoc');

                	$mensaje  = '<h2>Informe del departamento de estadística</h2>';
                	$mensaje .= '<h3>Conclusión del comité de concurso público</h3>';

                	$mensaje .= '<p>Tras el análisis y estudio del órgano de contratación, por parte de nuestro departamento técnico y estadístico, la media aritmética que estimamos en la cual se va a mover esta licitación, es de un ';
                	$mensaje .= '<b>' . $arr_datos_concurso['baja_estadistica'] . '%</b>';
                	$mensaje .= '</p>';

					$mensaje .= '<h3>Notificación</h3>';
					$mensaje .= '<p>Recibido el informe relativo al presente concurso les notifico la intención de presentarnos al mismo.</p>';

					$mensaje .= '<h3>Detalle-Datos de la Licitación/Concurso</h3>';
					$mensaje .= '<p>Emisor: '     . $arr_datos_concurso['organo_contratacion'] . '</p>';
					$mensaje .= '<p>Expediente: ' . $arr_datos_concurso['expediente']          . '</p>';
					$mensaje .= '<p>Objeto: '     . $arr_datos_concurso['titulo']              . '</p>';
					
                }else{

                	// SI ES OTRO TIPO DE SOPORTE
                	$mensaje  = 'Expediente: '  . $obj_soporte['expediente'] . '<br>';
	                $mensaje .= 'Su consulta: ' . $obj_soporte['titulo']     . '<br>';
	                
	                $mensaje .= 'Respuesta: <a href="' . BASE_URL . '#soporte/' . $tipo_soporte . '/' . $id_soporte . '">Ver respuesta</a><br>'; 
	                // $mensaje .= 'Respuesta: '   . $obj_soporte['respuesta']  . '<br>';
					

                }

                */

                $mensaje  = 'Expediente: '  . $obj_soporte['expediente'] . '<br>';
	            $mensaje .= 'Su consulta: ' . $obj_soporte['titulo']     . '<br>';
	                
	            $mensaje .= 'Respuesta: <a href="' . BASE_URL . '#soporte/' . $tipo_soporte . '/' . $id_soporte . '">Ver respuesta</a><br>'; 
	            
	            

                // Enviar email al cliente
                if ($hash == HASH_ADMIN || $es_tecnico ){
                	
                	$archivos = coger_campo_misma_tabla($link, 'archivos','4887_soportes','id_soporte', $id_soporte );

                	if( !enviar_email($email_enviar_a, $nombre_enviar_a, $asunto, $mensaje, $archivos, $tipo_soporte) ){

		                return json_encode(
							array(
								'status' => 'ko',
								'error'  => 'La respuesta se guardó, pero no se pudo notificar al cliente por email.'
							)
						);
 		
	                }else{

	                	// Actualizamos la respuesta si baja
	                	if( ( $obj_soporte['id_tipo_soporte'] == 0 ) && ( $hash == HASH_ADMIN || $es_tecnico ) ){

							$tabla   = '4887_soportes';
							$campos  = array('respuesta');
							$valores = array( 'Baja: ' . $arr_datos_concurso['baja_estadistica'] . '%');

							$where = ' WHERE id_soporte = ' . $obj_soporte['id_soporte'];
							
							sql_update($link,$tabla,$campos,$valores,$where);

	                	}

	                }

                }
                

                // devolver el objeto de soporte generado
                return json_encode( registro_a_array($link, '4887_soportes', 'id_soporte', $id_soporte) );

            }else{
                
                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }
			
		}

		public static function marcar_como_leido($obj_soporte, $hash){

			// establece boolean leido como true
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			// validar el hash
			// $id_cliente_hash = coger_campo_misma_tabla($link, 'id_cliente', '4887_clientes', 'hash', $hash );
			$id_cliente_hash = devuelve_id_cliente($link, $hash);

			if($obj_soporte['id_cliente'] != $id_cliente_hash){
				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error de validación de usuario.'
					)
				);
			}


			// guardar el soporte como leído
			$status_transaction = 'ok';
			start_transaction($link);

			$tabla = '4887_soportes';
			$campos = array(
				'leido'
			);

			$valores = array(
				1
			);

			$where = ' WHERE id_soporte = ' . $obj_soporte['id_soporte'];
			

			if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction = 'error';}

			if($status_transaction == 'ok'){
                
                commit_transaction($link);


                // devolver el objeto cliente
                return json_encode( registro_a_array($link, '4887_soportes', 'id_soporte', $obj_soporte['id_soporte']) );

            }else{
                
                rollback_transaction($link);
                
                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }

		}

		public static function actualizar_en_proceso($obj_soporte, $hash){

			// establece boolean leido como true
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);


			// guardar el soporte como leído
			$status_transaction = 'ok';
			start_transaction($link);

			$tabla = '4887_soportes';
			$campos = array(
				'en_proceso'
			);

			$valores = array(
				$obj_soporte['en_proceso']
			);

			$where = ' WHERE id_soporte = ' . $obj_soporte['id_soporte'];
			

			if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction = 'error';}

			if($status_transaction == 'ok'){
                
                commit_transaction($link);


                // devolver el objeto cliente
                return json_encode( registro_a_array($link, '4887_soportes', 'id_soporte', $obj_soporte['id_soporte']) );

            }else{
                
                rollback_transaction($link);

                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }

		}

		public static function json_adjudicaciones($hash, $total = ''){


			// devuelve un json con los soportes de un usuario
			$num_adjudicaciones = 0;

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			if($hash != HASH_ADMIN){
				
				$es_tecnico   = comprueba_si_tecnico($link, $hash);

				if( !$es_tecnico ){
					$id_cliente = (int) devuelve_id_cliente($link, $hash);
					$and = ' AND id_cliente = ' . $id_cliente;
				}
				
			}

			$sql = 'SELECT id_cliente, id_concurso, COUNT(id_concurso) AS num_bajas
					FROM 4887_soportes
					WHERE id_tipo_soporte = 0 
						AND id_cliente > 0 '
						. $and . ' 
					GROUP BY id_concurso 
					ORDER BY f_cierre ASC';
			
			$arr_adjudicaciones = array();

			$res = mysqli_query($link, $sql);
			while($e = mysqli_fetch_array($res)){
				
				$arr_adjudicaciones_aux = array();
				
				$id_cliente   = $e['id_cliente'];
				$id_concurso  = $e['id_concurso'];
				$num_bajas    = $e['num_bajas'];

				$arr_cliente  = registro_a_array($link, '4887_clientes', 'id_cliente', $id_cliente, 'solo_campos_de_texto');
		    	$arr_concurso = registro_a_array($link, '4887_concursos', 'id_concurso', $id_concurso, 'solo_campos_de_texto');

		    	if($arr_concurso == null){
		    		$arr_concurso = registro_a_array($link, '4887_archivo_concursos', 'id_concurso', $id_concurso, 'solo_campos_de_texto');
		    	}

		    	if( $arr_concurso != null) {
		    		
		    		if( ( $arr_concurso['adjudicado']           == 1)  ||
						( $arr_concurso['nombre_adjudicatario'] != '') ||
						( $arr_concurso['cif_adjudicatario']    != '') ||
						( $arr_concurso['importe_adjudicacion'] > 0)   ||
						
						( $arr_concurso['f_formalizacion']      != '0000-00-00') ||
						( $arr_concurso['f_adjudicacion']       != '0000-00-00') ){
		
						$arr_adjudicaciones_aux['id_cliente']           = $id_cliente;
						$arr_adjudicaciones_aux['empresa']              = $arr_cliente['empresa'];
						
						$arr_adjudicaciones_aux['id_concurso']          = $id_concurso;
						$arr_adjudicaciones_aux['expediente']           = $arr_concurso['expediente'];
						$arr_adjudicaciones_aux['enlace']               = $arr_concurso['enlace'];
						$arr_adjudicaciones_aux['titulo']               = $arr_concurso['titulo'];
						$arr_adjudicaciones_aux['importe']              = $arr_concurso['importe'];
						$arr_adjudicaciones_aux['f_recepcion_ofertas']  = $arr_concurso['f_recepcion_ofertas'];
						$arr_adjudicaciones_aux['f_apertura_ofertas']   = $arr_concurso['f_apertura_ofertas'];
						$arr_adjudicaciones_aux['f_adjudicacion']       = $arr_concurso['f_adjudicacion'];
						$arr_adjudicaciones_aux['f_licitacion']         = $arr_concurso['f_licitacion'];
						$arr_adjudicaciones_aux['f_formalizacion']      = $arr_concurso['f_formalizacion'];
						$arr_adjudicaciones_aux['nombre_adjudicatario'] = $arr_concurso['nombre_adjudicatario'];
						
						$arr_adjudicaciones_aux['num_bajas']            = $num_bajas;

			    		array_push($arr_adjudicaciones, $arr_adjudicaciones_aux);

			    		$num_adjudicaciones++;
			    		
			    	}	
		    	}
				

				
			}

			if( $total != ''){
				return json_encode( 
					array(
						'num_adjudicaciones' => $num_adjudicaciones
					)
				);

			}
			
			return json_encode($arr_adjudicaciones);	
			
		} // fin json_adjudicaciones

		public static function devuelve_num_adjudicaciones( $hash ){
			
			// devuelve un json con los soportes de un usuario
			$num_adjudicaciones = 0;

			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);

			if($hash != HASH_ADMIN){
				
				$es_tecnico   = comprueba_si_tecnico($link, $hash);

				if( !$es_tecnico ){
					$id_cliente = (int) devuelve_id_cliente($link, $hash);
					$and = ' AND id_cliente = ' . $id_cliente;
				}
				
			}

			$sql = 'SELECT id_cliente, id_concurso, COUNT(id_concurso) AS num_bajas
					FROM 4887_soportes
					WHERE id_tipo_soporte = 0 
						AND id_cliente > 0 '
						. $and . ' 
					GROUP BY id_concurso 
					ORDER BY f_cierre ASC';
			
			$res = mysqli_query($link, $sql);

			while($e = mysqli_fetch_array($res)){

				//VER SI LOS CONCURSOS ESTAN ADJUDICADOS
				$adjudicado = coger_campo_misma_tabla($link, 'adjudicado', '4887_concursos', 'id_concurso', $e['id_concurso']);

				if($adjudicado == 1){
					$num_adjudicaciones++;
				}
			
			}

			return json_encode( 
					array(
						'num_adjudicaciones' => $num_adjudicaciones
					)
				);
		}

		public static function eliminar_archivo($nombre_archivo, $hash){

			// eliminar un archivo
			
			$link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
			$status_transaction = 'ok';
			
			$sql = 'SELECT id_soporte, archivos
					FROM 4887_soportes
					WHERE archivos like "%' . $nombre_archivo . '%" 
					LIMIT 1';
			$res = mysqli_query($link, $sql);
			
			if(mysqli_num_rows($res) == 0){

				return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'No se encontró el archivo a eliminar.'
					)
				);

			}else{
				
				while($e = mysqli_fetch_array($res)){
		    	
					$str_archivos = str_replace($nombre_archivo, '', $e['archivos']);
					$str_archivos = str_replace(',,', ',', $str_archivos);

					$tabla = '4887_soportes';
					$campos  = array('archivos');
					$valores = array( $str_archivos );

					$where = ' WHERE id_soporte = ' . $e['id_soporte'];
					if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction = 'error';}

				}

			}

			if($status_transaction == 'ok'){
                
                @unlink( BASE_FILE . 'api/uploads/' . $nombre_archivo );

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

		} // fin eliminar archivo

		public static function toggle_consulta($id_soporte, $cerrado, $hash){

			$link = dblink();
			$status_transaction = 'ok';

			$tabla   = '4887_soportes';
			$campos  = array('cerrado','f_cierre');
			$valores = array( $cerrado, $f_cierre );

			$usuario_cierre = '';

			// cambia el campo cerrado y la fecha de cierre del soporte
			if($cerrado == 0){
				$f_cierre = '0000-00-00';
			}else{
				$f_cierre = date('Y-m-d H:i:s');
				//AÑADIR ID DEL USUARIO QUE CIERRA
				$id_usuario_cierre = coger_campo_misma_tabla($link, 'id_usuario', '4887_usuarios', 'hash', $hash);
				$campos  = array('cerrado','f_cierre', 'id_usuario_cierre');
				$valores = array( $cerrado, $f_cierre, $id_usuario_cierre );

				$usuario_cierre = coger_campo_misma_tabla($link, 'nombre', '4887_usuarios', 'id_usuario', $id_usuario_cierre);

			}			
			

			$where = ' WHERE id_soporte = ' . $id_soporte;
			if(sql_update($link,$tabla,$campos,$valores,$where) == false){$status_transaction = 'error';}

			if($status_transaction == 'ok'){

                commit_transaction($link);

                // devolver el objeto cliente
                return json_encode(
					array(
						'status' => 'ok',
						'usuario_cierre' => $usuario_cierre
					)
				);

            }else{

                rollback_transaction($link);

                return json_encode(
					array(
						'status' => 'ko',
						'error'  => 'Error al guardar la transacción.'
					)
				);

            }

		}

		public static function calcular_soportes_ptes($hash, $id_tipo_soporte){

			// Determina cuántas solicitudes de soporte están pendientes para un usuario según su perfil

			$num_ptes   = 0;

			$and = '';

			// establece boolean leido como true
			$link = dblink();

			$id_usuario = devuelve_id_usuario($link, $hash);

			$id_cliente = coger_campo_misma_tabla($link, 'id_cliente', '4887_usuarios', 'id_usuario', $id_usuario );

			$es_cliente = es_cliente($link, $hash);

			if( $es_cliente == true ){

				$and = ' AND id_cliente = ' . $id_cliente . ' AND leido = 0';

			}else{
				$and = ' AND cerrado = 0 ';
			}

			$sql = 'SELECT id_soporte, id_usuario, id_tipo_soporte
					FROM 4887_soportes
					WHERE id_tipo_soporte = ' . $id_tipo_soporte . $and ;
			
			$res = mysqli_query($link, $sql);
			while($e = mysqli_fetch_array($res)){

				//SI SE HA RESPONDIDO AL CHAT ESTÁ PENDIENTE
				if( devuelve_respondido( $link, $e['id_soporte'], $hash ) == true ){
						$num_ptes ++;
				}
	    	}

	    	return $num_ptes;


		}




    } // fin clase soporte
    
?>