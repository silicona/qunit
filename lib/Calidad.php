<?php

class Calidad {

	public function __construct(){}
	

	public function obtener_array_resultado_select($e){
		
		$arr_aux = array();
		
		foreach ($e as $key => $value) {
			$arr_aux[ $key ] = $value;
		}

		return $arr_aux;
	}


	public function devuelve_respondido($link, $id_soporte, $hash){

		$link = dblink();

		//SI ES ADMIN

		if($hash == HASH_ADMIN){

			$id_usuario_soporte = 1;
			$id_cliente = 0;
		}else{
			$id_usuario_soporte = coger_campo_misma_tabla($link, 'id_usuario', '4887_usuarios', 'hash', $hash);
			$id_cliente = coger_campo_misma_tabla($link, 'id_cliente', '4887_usuarios', 'hash', $hash);
		}
		//ES OCLEM


		$sql = 'SELECT id_usuario, id_soporte
					FROM 4887_soportes_detalles
					WHERE id_soporte = ' . $id_soporte . '
					ORDER BY id_soporte_detalle DESC
					LIMIT 1';

		$res = mysqli_query($link, $sql);
		while($e = mysqli_fetch_array($res)){
			
			$id_cliente_soporte = coger_campo_misma_tabla($link, 'id_cliente', '4887_usuarios', 'id_usuario',  $e['id_usuario']);
			if($id_cliente_soporte == null){
				$id_cliente_soporte = 0;
			}
			if( $id_cliente_soporte != $id_cliente){
				return true;
			}

		}

		return false;

	}

	public function es_cliente($link, $hash_o_id_usuario){

		//if($hash_o_id_usuario == HASH_ADMIN){return false;}

		if( is_integer($hash_o_id_usuario) ){

			$id_usuario = $hash_o_id_usuario;

		}else{

			$id_usuario = Calidad::devuelve_id_usuario($link, $hash_o_id_usuario);
		}


		$sql = 'SELECT cal_ad, cal_tecnico, cal_cliente
				FROM cld_usuarios
				WHERE id_usuario = ' . $id_usuario . '
					AND activo = 1';

		$res = mysqli_query($link, $sql);
		if(mysqli_num_rows($res) > 0){

			while($e = mysqli_fetch_array($res)){

				if( $e['cal_cliente'] == 1 && $e['cal_ad'] == 0 && ($e['cal_tecnico'] == 0) ){ 
					return true;
				}
			}
		}

		return false;
	}


	public function devuelve_id_usuario($link, $hash){

		// devuelve el id de un usuario a partir de su hash
		if($hash == ''){
			return 0;
		}

		$id_usuario = coger_campo_misma_tabla( $link, 'id_usuario', 'cld_usuarios', 'hash', $hash);

		return (int) $id_usuario;

	}

	public function devuelve_id_cliente($link, $hash){

		// devuelve el id de un usuario a partir de su hash
		if($hash == ''){
			return 0;
		}

		$id_cliente = coger_campo_misma_tabla( $link, 'id_cliente', '4887_usuarios', 'hash', $hash);

		return (int) $id_cliente;

	}


	public function comprueba_si_cliente($link, $hash){

		// comprueba si un usuario es cliente
		$id_usuario = devuelve_id_usuario($link, $hash);
		$id_cliente = coger_campo_misma_tabla($link, 'id_cliente', '4887_usuarios', 'id_usuario', $id_usuario);

		return $id_cliente > 0;

	}


	public function comprueba_si_tecnico($link, $hash){

		// comprueba si un usuario es técnico
		$id_usuario = devuelve_id_usuario($link, $hash);
		$tecnico = coger_campo_misma_tabla($link, 'tecnico', '4887_usuarios', 'id_usuario', $id_usuario);

		return $tecnico == 1;

	}


	public function comprueba_si_comercial($link, $hash){

		// comprueba si un usuario es comercial
		$id_usuario = devuelve_id_usuario($link, $hash);
		$comercial = coger_campo_misma_tabla($link, 'comercial', '4887_usuarios', 'id_usuario', $id_usuario);

		return $comercial == 1;

	}


	public function determinar_tipo_desde_cpv($link, $cpv){
		// Coge un cpv y devuelve "Obras", "Servicios", "Suministros" o "" según el grupo del CPV

		$arr_grupos_obras     = array('A','B','C','D','E','F','G','H','I','J','K');
		$arr_grupos_servicios = array('L','M','N','O','P','Q','R','S','T','U','V','W');

		$grupo_cpv = coger_campo_misma_tabla($link,'grupo','4887_cpvs','cod_cpv', $cpv);

		if(in_array($grupo_cpv, $arr_grupos_obras) ){ return 'Obras';}

		if(in_array($grupo_cpv, $arr_grupos_servicios) ){ return 'Servicios';}

		return '';

	}


	public function devuelve_cods_clasificaciones($link, $cods_cpv){

		// coge los cpv separados por comas,
		// y devuelve las clasificaciones correspondientes, también separadas por comas

		$arr_cods_cpv = explode(',', $cods_cpv);
		$arr_cods_clasificaciones = array();

		for( $i=0; $i < count($arr_cods_cpv); $i++){

			$cods_cpv = $arr_cods_cpv[$i];
			$cods_cpv = trim( $cods_cpv );
			$cods_cpv = substr( $cods_cpv, 0, 8);

			$cod_clasificacion = coger_campo_misma_tabla( $link, 'cod_clasificacion', '4887_cpvs', 'cod_cpv', $cods_cpv );

			if($cod_clasificacion != ''){
				array_push($arr_cods_clasificaciones, $cod_clasificacion);
			}

		}

		$arr_cods_clasificaciones = array_unique($arr_cods_clasificaciones);
		$cods_clasificaciones     = implode(',', $arr_cods_clasificaciones);

		return $cods_clasificaciones;

	}


	public function check_admin($hash){
		return $hash != HASH_ADMIN;
	}


	public function salir_si_no_hash($link, $hash){

		if( ($hash == HASH_ADMIN) || ( devuelve_id_usuario($link, $hash) > 0) ){
			return true;
		}

		echo_json( array('error' => 'Validación no válida') );
		exit;

	}


	public function salir_si_no_admin($hash){

		if( $hash != HASH_ADMIN ){
			i('Hash no válido');
			exit;
		}

	}


	public function limpiar_codigos_comas($cadena){

		// coge una cadena de valores separados por comas
		//  aaF , kkasf, ED
		// y devuelve AAF,KKASF,ED

		if( ($cadena == '') || ($cadena == ',') ){
			return '';
		}

		$cadena = str_replace(' ',',', $cadena);
		$cadena = str_replace(',,',',', $cadena);

		$cadena  = strtoupper($cadena);
		$cadena  = quitar_espacios($cadena);

		if( substr($cadena, -1) == ',' ){
			$cadena = substr($cadena, 0, strlen($cadena) -1 );
		}

		return $cadena;

	}


	public function limpiar_stop_words_array($array){

		$texto_final = '';
		foreach ($array as $texto_aux) {
			$texto_aux = limpiar_comillas($texto_aux);			
			$texto_aux = quitar_acentos($texto_aux);
			$texto_aux = limpiar_stop_words($texto_aux);

			$texto_final .= $texto_aux;
		}

		return $texto_final;

	}


	//// Funciones Debug ////

    public function escribir_en_log( $mensaje, $opcion = 'sin_opcion' ){

        file_put_contents( /* BASE_FILE . 'xml/logs/log_fotocasa_'*/ './log_fotocasa_' . $opcion . '.txt', $mensaje, FILE_APPEND | LOCK_EX );

    }


    public function ver_en_pantalla($algo, $mensaje = 'Salida: '){

        echo '<h3>' . $mensaje . '</h3>';

        if(gettype($algo) == 'array' || gettype($algo) == 'object') {   

            foreach($algo as $k => $v){ 

                echo $k . ': ';

                if(is_array($v)){

                    foreach($v as $a => $b){ echo $a . ' // ' . $b . '<br>'; }
            
                }
                else if(is_object($v)){
                    
                    foreach($v as $a => $b){ echo $a . ' - ' . $b . '<br>'; }
                
                }   else {

                    echo $v;

                }

                echo '<br>';

            } 

        } else {    

            echo nl2br( $algo ) . '<br>';    

        }

    }

}

?>