<?php
	
	function quitar_elementos_vacios($arr){

		// Elimina valores vacíos de un array
		return 
			array_filter($arr, function($value) { 
				return $value !== '' && $value !== null && $value !== 'undefined';
			})
		;

	}
	
	function trim_array( $array ){

		foreach ($array as $index => $value) {
			$array[ $index ] = trim($value);
		}

		return $array;

	}

	function devuelve_html($url){

		// Coge la url, hace una llamada CURL y

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url );
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// get headers too with this line
		// curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignore SSL
		curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:37.0) Gecko/20100101 Firefox/37.0');
		curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);

		$result = curl_exec($ch);
		curl_close($ch);

		return $result;

	}


function devuelve_provincia($cp){

	// Devuelve la provincia en función del Código postal

	$cod_provincia = '';

	$arr_provincias = array(
		"01" => "Álava",
		"02" => "Albacete",
		"03" => "Alicante",
		"04" => "Almería",
		"05" => "Ávila",
		"06" => "Badajoz",
		"07" => "Baleares",
		"08" => "Barcelona",
		"09" => "Burgos",
		"10" => "Cáceres",
		"11" => "Cádiz",
		"12" => "Castellón",
		"13" => "Ciudad Real",
		"14" => "Córdoba",
		"15" => "La Coruña",
		"16" => "Cuenca",
		"17" => "Gerona",
		"18" => "Granada",
		"19" => "Guadalajara",
		"20" => "Guipúzcoa",
		"21" => "Huelva",
		"22" => "Huesca",
		"23" => "Jaén",
		"24" => "León",
		"25" => "Lérida",
		"26" => "La Rioja",
		"27" => "Lugo",
		"28" => "Madrid",
		"29" => "Málaga",
		"30" => "Murcia",
		"31" => "Navarra",
		"32" => "Orense",
		"33" => "Asturias",
		"34" => "Palencia",
		"35" => "Las Palmas",
		"36" => "Pontevedra",
		"37" => "Salamanca",
		"38" => "S.C. Tenerife",
		"39" => "Cantabria",
		"40" => "Segovia",
		"41" => "Sevilla",
		"42" => "Soria",
		"43" => "Tarragona",
		"44" => "Teruel",
		"45" => "Toledo",
		"46" => "Valencia",
		"47" => "Valladolid",
		"48" => "Vizcaya",
		"49" => "Zamora",
		"50" => "Zaragoza",
		"51" => "Ceuta",
		"52" => "Melilla"

	);

	if( strlen($cp) == 5){
		$cod_provincia = substr($cp,0,2);
	}

	if( strlen($cp) == 4){
		$cod_provincia = '0' . substr($cp,0,1);
	}

	if( strlen($cp) == 2){
		$cod_provincia = $cp;
	}

	return (string) $arr_provincias[$cod_provincia];


}

function comprueba_si_fecha_mysql($fecha){

	// devuelve true si una fecha es una fecha de mysql válida

	if($fecha == '0000-00-00'){return true;}

	if(strlen($fecha) != 10){return false;}

	$arr_fecha = explode('-', $fecha);

	$dia = $arr_fecha[2];
	$mes = $arr_fecha[1];
	$ano = $arr_fecha[0];

	if(strlen($dia) != 2){ return false; }
	if(strlen($mes) != 2){ return false; }
	if(strlen($ano) != 4){ return false; }

	return checkdate( (int) $mes, (int) $dia, (int) $ano ) ;

}


function dejar_solo_numeros($string){

	return preg_replace("/[^0-9]/","",$string);
}

function sql_a_tabla_html($res){

	if( mysqli_num_rows($res) == 0 ){ return '<p>No se encontraron datos</p>'; }

	$html .= '<table class="mi_tabla datatables">';

		$html .= '<thead>';
		
			$html .= '<tr>';
			while($fieldinfo = mysqli_fetch_field( $res ) ) {
				if( (string) $fieldinfo -> name != '' ){
					$html .= '<th>' . (string) $fieldinfo -> name . '</th>';	
				}
			}
			$html .= '</tr>';
		
		$html .= '</thead>';

		$html .= '<tbody>';
			
			while($e = mysqli_fetch_array($res)){

				$html .= '<tr>';
				
				foreach($e as $key => $value) {

					if( !is_numeric($key) ){
						$html .= '<td>' . addslashes( $value ) . '</td>';	
					}
					
				}
				
				$html .= '</tr>';
				
			}

		$html .= '</tbody>';
	
	$html .= '</table>';

	return $html;
		
}

function sql_a_excel($link, $sql){

	// coge una consulta y genera un archivo descargable con excel

	ini_set('memory_limit','256M');

	require_once BASE_FILE . 'lib/PHPExcel.php';

	$arr_campos = devuelve_arr_campos($link, $sql);

	$objPHPExcel = new PHPExcel();
	$objPHPExcel -> setActiveSheetIndex(0);

	// PONER TÍTULOS
	for($i = 65; $i < 91; $i++){
		$objPHPExcel->getActiveSheet()->SetCellValue( chr($i) . '1', $arr_campos[$i - 65]);
	}
	if( count($arr_campos) > 26 ){
		for($i = 65; $i < 91; $i++){
			$objPHPExcel->getActiveSheet()->SetCellValue( 'A' . chr($i) . '1', $arr_campos[$i - 65 + 26]);
		}
	}

	$cont = 2;
	$res = mysqli_query($link, $sql);
	while($e = mysqli_fetch_array($res)){

		for($i = 65; $i < 91; $i++){
			$objPHPExcel->getActiveSheet()->SetCellValue( chr($i) . $cont, $e[$arr_campos[$i - 65]]);
		}

		if( count($arr_campos) > 26 ){
			for($i = 65; $i < 91; $i++){
				$objPHPExcel->getActiveSheet()->SetCellValue( 'A' . chr($i) . $cont, $e[$arr_campos[$i - 65 + 26]]);
			}
		}

	    $cont++;

	}

	$nombre_archivo = time() . '_abogadosyarbitraje.xls';

	$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

	$objWriter -> save( BASE_FILE . 'api/excel/' . $nombre_archivo);

	header("Location: ". BASE_URL . 'api/excel/' . $nombre_archivo);

}



if (!function_exists('mb_str_replace')) {
	function mb_str_replace($search, $replace, $subject, &$count = 0) {
		if (!is_array($subject)) {
			// Normalize $search and $replace so they are both arrays of the same length
			$searches = is_array($search) ? array_values($search) : array($search);
			$replacements = is_array($replace) ? array_values($replace) : array($replace);
			$replacements = array_pad($replacements, count($searches), '');
			foreach ($searches as $key => $search) {
				$parts = mb_split(preg_quote($search), $subject);
				$count += count($parts) - 1;
				$subject = implode($replacements[$key], $parts);
			}
		} else {
			// Call mb_str_replace for each subject in array, recursively
			foreach ($subject as $key => $value) {
				$subject[$key] = mb_str_replace($search, $replace, $value, $count);
			}
		}
		return $subject;
	}
}


	function eur_to_double($euros){

		// Convierte un texto de número tipo 788.040,27€ en un double 788040.27

		$euros = quitar_espacios($euros);
		$euros = str_replace('€', '', $euros);
		$euros = str_replace('&eur;', '', $euros);
		$euros = str_replace('&euro;', '', $euros);
		$euros = str_replace('Euros', '', $euros);
		$euros = str_replace('euros', '', $euros);
		$euros = str_replace('Eur.;', '', $euros);
		$euros = str_replace('Eur;', '', $euros);

		$euros = str_replace('Año', '', $euros);
		$euros = str_replace('/', '', $euros);

		$euros = str_replace('.', '', $euros);
		$euros = str_replace(',', '.', $euros);

		return round( (double) $euros, 2);
	
	}


	function str_check_oblig($string_check, $min_chars, $nombre_elem){

		// devuelve vacío si se cumple, texto si no,
		if( strlen($string_check) < $min_chars){
			return '(*) Debe escribir un ' . $nombre_elem . ' válido.<br>';
		}

		return '';
	}


function echo_jsonp($arr){

	// hace un echo del array con los headers correspondientes para jsonp
	header('content-type: application/javascript; charset=utf-8');
	header("access-control-allow-origin: *");

	echo $_GET['callback'] . '('. json_encode($arr) . ')';

}

function echo_json($arr){

	echo json_encode($arr);

}

function remove_cdata($string){
	$string = str_replace("<![CDATA[]]>","",$string);
	$string = str_replace("//<![CDATA[","",$string);
	$string = str_replace("//]]>","",$string);
	$string = str_replace("<![CDATA[","",$string);
	$string = str_replace("]]>","",$string);
	return $string;
}

function object2array($object)
{

    return json_decode(json_encode($object), TRUE);
}

function limpia_undefined($array){

	if( !is_array($array) ){
		return array();
	}

	// cambia los "undefined" por ""
	foreach ($array as $key => $value) {
		if($value == 'undefined'){
			$array[$value] = '';
		}
	}

	return $array;

}

function res_urlencode($arr_textos){
	//coge un array con textos o cadena de texto y lo devuelve formateadito para url legible

	if(is_array($arr_textos)){
		$cadena = implode('-', array_unique($arr_textos) );
	}else{
		$cadena = (string) $arr_textos;
	}

	$cadena = str_replace('/', '',  $cadena);
	$cadena = str_replace('ñ', 'n', $cadena);
	$cadena = str_replace('Ñ', 'n', $cadena);
	$cadena = str_replace('--', '-', $cadena);

	$cadena = urlencode(strtolower(quitar_acentos($cadena)));

	return str_replace('+', '-', $cadena);

}

function quitar_undefined($array){
	// itera a través de un array asociativo y cambia 'undefined' por '';
	foreach($array as $key => $val) {
      if((string) $val == 'undefined') {
        $array[$key] = '';
      }
    }

    return $array;
}

function quitar_ultimo_caracter($cadena){
	// quita el último caracter de una cadena de texto

	if(strlen($cadena) > 0){$cadena = substr($cadena,0,($largo - 1));}

	return $cadena;

}

function quitar_espacios($cadena){

	$cadena = str_replace('&nbsp;', '', $cadena);
	return preg_replace('/\s+/', '', $cadena);
}

function si_no($valor){
	// devuelve Sí si $valor = 1, $no en otro caso
	 ($valor == 1) ? $si_no = 'Sí' : $si_no = 'No';
	 return $si_no;
}

function array_a_option($array,$valor_sele='',$assoc = ''){

	/*
     * TRANSFORMA UN ARRAY BIDIMENSIONAL TIPO:
     *  id_localidad =1, localidad = Torrevieja
     * En <option selected value="1">Torrevieja</option>
     */

    $i=0;
    foreach ($array as $key => $value) {


    	if($assoc == ''){
    		($array[$i][0] == $valor_sele) ? $selected = ' selected ' : $selected = '';
	        $option .= '<option '.$selected.' value="'.$array[$i][0].'" >'.$array[$i][1].'</option>'.PHP_EOL;
	        $i++;
    	}else{
    		($key == $valor_sele) ? $selected = ' selected ' : $selected = '';
	        $option .= '<option '.$selected.' value="'.$key.'" >'.$value.'</option>'.PHP_EOL;
    	}

    }
    return $option;
}

function devuelve_j($array, $valor_i)
{
    //devuelve la segunda columna de un array bidimensional cuando concuerdan
    for($i=0;$i<count($array);$i++){
        if( $array[$i][0] == $valor_i){
            $valor_j = $array[$i][1];
            break;
        }
    }
        return $valor_j;
}

function devuelve_i($array, $valor_j)
{
    //devuelve la primera columna de un array bidimensional cuando concuerdan
    for($i=0;$i<count($array);$i++){
        if( $array[$i][1] == $valor_j){
            $valor_i = $array[$i][0];
            break;
        }
    }

    return $valor_i;

}



function shorten_string($string, $wordsreturned)
	/*  Returns the first $wordsreturned out of $string.  If string
	contains fewer words than $wordsreturned, the entire string
	is returned.
	*/
	{
	$retval = $string;	//	Just in case of a problem
	$array = explode(" ", $string);
	if (count($array)<=$wordsreturned)
	/*  Already short enough, return the whole thing
	*/
	{
	$retval = $string;
	}
	else
	/*  Need to chop of some words
	*/
	{
	array_splice($array, $wordsreturned);
	$retval = implode(" ", $array)." ...";
	}
	return $retval;

}

/* sms */
function enviar_sms($telefono, $mensaje){


	return enviar_sms_altiria($telefono, $mensaje);

	/*

	if( INM_ENTORNO == 'pruebas' ){

		i('Enviando sms, pruebas');
		i($telefono, 'telefono');
		i($mensaje, 'mensaje');

		return true;

	}

	// http://www.textlocal.es/api-sms-para-desarrolladores

	// Textlocal account details
	$username = urlencode('cesar@respirainternet.com');
	$hash     = urlencode('3e449f21380cf63c9cd5ae9e433bba9a790f24a2'); // Get this when logged in at https://control.txtlocal.co.uk/docs/


	// Formato de teléfono: 34677561633
	$telefono = quitar_no_numerico($telefono);
	$telefono = quitar_espacios($telefono);
	$telefono = quitar_caracteres_no_imprimibles($telefono);
	$telefono = substr($telefono, -9);
	$telefono = '34' . $telefono;

	if( strlen($telefono) != 11){
		i('Teléfono no válido');
		return false;
	}

	// Limpiar de caracteres extraños los mensajes
	$mensaje = quitar_acentos($mensaje);
	$mensaje = str_replace('ñ','n',$mensaje);
	$mensaje = str_replace('Ñ','N',$mensaje);

	// No más de 160 caracteres
	$mensaje = substr($mensaje, 0, 159 );

	if( strlen($mensaje) < 5){
		i('Mensaje no válido');
		return false;
	}

	i($mensaje, 'mensaje');

	// Message details
	$numbers  = urlencode($telefono);
	$sender   = urlencode('División patrimonial');
	$message  = urlencode($mensaje);

	// Prepare data for POST request
	$data = 'username=' . $username . '&hash=' . $hash
	  . '&numbers=' . $numbers . "&sender=" . $sender . "&message=" . $message;

	// Send the GET request with cURL
	$ch = curl_init('https://api.txtlocal.com/send/?' . $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);

	// Process your response here
	i($response);

	$arr_resp = json_decode($response, true);
	i($arr_resp, 'arr_resp');

	return $arr_resp['status'] == 'success';
	
	*/

}


function enviar_sms_altiria($sDestination, $sMessage, $debug = false){

	// sDestination: lista de numeros de telefono separados por comas.
	// Cada numero debe comenzar por el prefijo internacional de pais.
	// sMessage: hasta 160 caracteres
	// sSenderId: remitente autorizado por Altiria al dar de alta el servicio.
	// Omitir el parametro si no se cuenta con ninguno.
	// debug: Si es true muestra por pantalla la respuesta completa del servidor
	// XX, YY y ZZ se corresponden con los valores de identificacion del
	// usuario en el sistema.
	// Como ejemplo la peticion se envia a www.altiria.net/sustituirPOSTsms
	// Se debe reemplazar la cadena '/sustituirPOSTsms' por la parte correspondiente
	// de la URL suministrada por Altiria al dar de alta el servicio

	$sSenderId = 'AbogadosAyA';

	if( INM_ENTORNO == 'pruebas' ){

		i('Enviando sms, pruebas');
		i('EL SMS NO SE ENVIARÁ PORQUE EL ENTORNO ES DE PRUEBAS');
		i($sDestination, 'telefono');
		i($sMessage, 'mensaje');

		//return true;
	}
	
	// Formato de teléfono: +34677561633
	$sDestination = quitar_no_numerico($sDestination);
	$sDestination = quitar_espacios($sDestination);
	$sDestination = quitar_caracteres_no_imprimibles($sDestination);
	$sDestination = substr($sDestination, -9);

		// No envia SMS a teléfonos fijos: 9xx-xxx-xxx
	if( preg_match( '/\A9\d{8}\z/' ,$sDestination, $telefono_fijo ) ){

		i('Teléfono fijo');
		return false;
	} 

	$sDestination = '+34' . $sDestination;

	if( strlen($sDestination) != 12){

		i('Teléfono no válido');
		return false;
	}

	i('telefono', $sDestination);

	// Limpiar de caracteres extraños los sMessages
	$sMessage = quitar_acentos($sMessage);
	$sMessage = str_replace('ñ','n',$sMessage);
	$sMessage = str_replace('Ñ','N',$sMessage);

	$sData  ='cmd=sendsms&';
	$sData .='domainId=oclem&';
	$sData .='login=rdomingo@oclem.com&';
	$sData .='passwd=oclem201610asn&';
	// Omitir la linea del remitente si no se cuenta con ninguno autorizado
	$sData .='senderId='.$sSenderId.'&';
	$sData .='concat=true&';
	$sData .='dest=' . str_replace(',','&dest=',$sDestination).'&';
	$sData .='msg=' . urlencode( utf8_encode( $sMessage ) );
	
	//Tiempo maximo de espera para conectar con el servidor = 5 seg
	$timeOut = 5;
	$fp = fsockopen('www.altiria.net', 80, $errno, $errstr, $timeOut);

	if ( !$fp ) {

		//Error de conexion o tiempo maximo de conexion rebasado
		$output = "ERROR de conexion: $errno - $errstr<br />\n";
		$output .= "Compruebe que ha configurado correctamente la direccion/url ";
		$output .= "suministrada por altiria<br>";
		
		return false;

	} else {

		// Reemplazar la cadena '/sustituirPOSTsms' por la parte correspondiente
		// de la URL suministrada por Altiria al dar de alta el servicio
		$buf  = "POST /api/http HTTP/1.0\r\n";
		$buf .= "Host: www.altiria.net\r\n";
		$buf .= "Content-type: application/x-www-form-urlencoded; charset=UTF-8\r\n";
		$buf .= "Content-length: ".strlen($sData)."\r\n";
		$buf .= "\r\n";
		$buf .= $sData;

		fputs($fp, $buf);
		$buf = "";

		//Tiempo maximo de espera de respuesta del servidor = 60 seg
		$responseTimeOut = 60;
		stream_set_timeout( $fp,$responseTimeOut );
		stream_set_blocking( $fp, true );

		if ( !feof( $fp ) ){

			if( ( $buf = fgets($fp,128) ) === false ){

				// TimeOut?
				$info = stream_get_meta_data($fp);

				if ($info['timed_out']){

					$output = 'ERROR Tiempo de respuesta agotado';
					return $output;

				} else {

					$output = 'ERROR de respuesta';
					return $output;
				}

			} else {

				while( !feof( $fp ) ){

					$buf .= fgets( $fp, 128 );

				}
			}

		} else {
			
			$output = 'ERROR de respuesta';
			return false;

		}

		fclose($fp);

		//Si la llamada se hace con debug, se muestra la respuesta completa del servidor
		if ($debug){
			print "Respuesta del servidor: <br>".$buf."<br>";
		}

		//Se comprueba que se ha conectado realmente con el servidor y que se obtenga un codigo HTTP OK 200
		if (strpos($buf,"HTTP/1.1 200 OK") === false){

			$output = "ERROR. Codigo error HTTP: ".substr($buf,9,3)."<br />\n";
			$output .= "Compruebe que ha configurado correctamente la direccion/url ";
			$output .= "suministrada por Altiria<br>";
			
			return false;

		}

		//Se comprueba la respuesta de Altiria
		if (strstr($buf,"ERROR")){

			$output = $buf."<br />\n";
			$output .= " Ha ocurrido algun error. Compruebe la especificacion<br>";
			
			return false;
		
		} else {

			$output = $buf."<br />\n";
			$output .= " Exito<br>";
			
			return true;
		}
	}

	return false;

} // fin enviar_sms_altiria


function enviar_post_curl($url, $arr_campos){

	$campos_string = http_build_query($arr_campos);
	
	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($arr_campos));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $campos_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	//execute post
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);

	return $result;

}


/*email*/
function enviar_email($email_enviar_a, $nombre_enviar_a, $asunto, $html_mensaje, $archivos = '', $cc='', $cco=''){


		// envía un email. $op es la operación
		require_once 'PHPMailer/PHPMailerAutoload.php';
		require_once 'config.php'; //para que base_url esté definido

		if( INM_ENTORNO == 'pruebas' ){

			i('Enviando email, pruebas');
			i($email_enviar_a, 'enviar a');
			i($html_mensaje, 'mensaje');

			// enviar a César
		    $email_enviar_a  = 'cchas78@gmail.com';
		    $nombre_enviar_a = 'César Chas';

		    i('EL EMAIL NO SE ENVIARÁ PORQUE EL ENTORNO ES DE PRUEBAS');

			return true;

		}
		
	    if($ruta_adjunto != ''){
	        $ruta_adjunto = BASE_FILE . $ruta_adjunto;
	    }

	    // 4.- ENVIAR EMAIL AL CLIENTE CON PDF ADJUNTO
	    $mail = new PHPMailer(); // defaults to using php "mail()"
	    $mail -> CharSet = "UTF-8";


	    // HABILITAR EN PRODUCCIÓN //
	    $mail -> isSMTP();                                      // Set mailer to use SMTP

	    try {

			$mail -> Host       = 'mail.abogadosyarbitraje.com';             // Specify main and backup server
			// $mail -> Host       = 'virt1860.unelink.net';  
			$mail -> SMTPAuth   = true;                                      // Enable SMTP authentication

			$mail -> Username   = 'administracion@abogadosyarbitraje.com';   // SMTP username
			$mail -> Password   = '4dm1n20172';                              // SMTP password

			// $mail -> Username   = 'abogadosyarbitraje@respirainternet.com';   // SMTP username
			// $mail -> Password   = 'abogados';
			$mail -> Port       = 587;

			// FORZAR SIN TLS
			$mail -> SMTPSecure = false;
			$mail -> SMTPAutoTLS = false;

			// $mail -> SMTPSecure = 'tls';                 // Enable encryption, 'ssl' also accepted
			// $mail -> Port       = 587;

			// $mail -> SMTPDebug  = 2;                     // enables SMTP debug information (for testing)

		    $mail -> isHTML(true);
			$mail -> setLanguage('es', '/language/');

		    $mail -> From     = "administracion@abogadosyarbitraje.com";
		    $mail -> FromName = "Abogados y Arbitraje";

		    $mail -> AddAddress($email_enviar_a, $nombre_enviar_a);
			
		    $mail -> Subject    = $asunto;

		    if($co  != ''){ $mail -> AddCC(  $cc,  $cc);}
		    if($cco != ''){ $mail -> AddBCC( $cco, $cco);}

		    $mail->AltBody    = "Para ver este email, debe usar un cliente de correo que soporte HTML"; // optional, comment out and test

		    $plantilla = file_get_contents(BASE_URL .'email/email_plantilla.html');

		    $plantilla = str_replace('<%fecha%>', 				        date('d/m/Y'),               $plantilla);
		    $plantilla = str_replace('<%empresa%>', 			        'Abogados y Arbitraje',           $plantilla);
		    $plantilla = str_replace('<%nombre_empresa%>', 		        'Abogados y Arbitraje',               $plantilla);
		    $plantilla = str_replace('<%razon_social%>', 		        'Grupo Oclem SL',            $plantilla);
		    $plantilla = str_replace('<%cif%>', 		                'B86679594',                 $plantilla);
		    $plantilla = str_replace('<%datos_registro_mercantil%>', 	'Registro Mercantil de Madrid, Tomo 30893, Folio 130, Sección 8, Hoja 556017',      $plantilla);
		    $plantilla = str_replace('<%email_empresa%>', 		        'administracion@abogadosyarbitraje.com',   $plantilla);
		    $plantilla = str_replace('<%web%>', 		                'https://abogadosyarbitraje.com', $plantilla);
		    $plantilla = str_replace('<%asunto%>', 			         	$asunto,                     $plantilla);
		    $plantilla = str_replace('<%html_mensaje%>', 		        $html_mensaje,               $plantilla);

		    $mail -> MsgHTML($plantilla);
		    

		    if($archivos != ''){

		    	$arr_archivos = explode(',', $archivos);
		    	for ($i=0; $i<count($arr_archivos);$i++ ) {

		    		$mail -> AddAttachment( $arr_archivos[$i] );      // attachment
		    	}

		    }

		    $resultado_envio = $mail -> Send();
		    
	    } catch (phpmailerException $e) {

			i($e->errorMessage() , 'Error php mailer'); //Pretty error messages from PHPMailer

		} catch (Exception $e) {

			i($e->getMessage(), 'Error otros' ); //Boring error messages from anything else!
		}

		i($resultado_envio, 'resultado envio');

	    return $resultado_envio;

	}

function cambiaf_a_normal($fecha,$devuelve_blanco = ''){

	// coge una fecha de mysql y la devuelve como fecha en español
        // si existe el parámetro $devuelve_blanco, devolvemos ''
	// si no, devuelve 00/00/0000


	list($dia,$mes,$ano)=explode("-",$fecha);
        $lafecha=$ano.'/'.$mes.'/'.$dia;

	if(($lafecha == '00/00/0000') && ($devuelve_blanco != '')){
		return '';
	}else{
		return $lafecha;
	}


}

function anade_ceros_fecha($fecha, $separador = '.'){



	return $fecha;


}



function cambiaf_a_mysql($fecha){
    
    // coge una fecha de formato --/--/---- y la pone para formato mysql
    // list($dia,$mes,$ano)=explode("/",$fecha);
    
	$dia = substr($fecha, 0, 2);
	$mes = substr($fecha, 3, 2);
	$ano = substr($fecha, 6, 4);

	$hora = substr($fecha, 11, 7);
	if( strlen($hora) == 5 ){
		$hora = $hora . ':00';
	}
    
    if(strlen($hora) > 4){
    	$lafecha = $ano.'-'.$mes.'-'.$dia . ' ' . $hora; 
    }else{
    	$lafecha = $ano.'-'.$mes.'-'.$dia;
    }

	return $lafecha;

}

function cambiaf_larga_a_mysql($fecha){

	// Coge una fecha tipo "15 de Julio de 2015" y la convierte en 2015-07-15

	$fecha = strtolower( $fecha );
	$fecha = quitar_acentos( $fecha );

	if( substr($fecha,2,1) == '/'){
		return cambiaf_a_mysql( $fecha );
	}

	if( substr($fecha,2,1) == '-'){
		// ej 22-01-2015
		$fecha = str_replace('-','/', $fecha);
		return cambiaf_a_mysql( $fecha );
	}

	$arr_textos = array('.','del', 'de', ',', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
	$arr_valores = array('', '','','','','','','','','','');

	$fecha = str_replace( $arr_textos, $arr_valores, $fecha);

	// obtener el mes
	$arr_textos = array('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre');
	$arr_valores = array('01','02','03','04','05','06','07','08','09','10','11','12');

	// quitar espacios
	$arr_fecha = explode(' ',$fecha);
	//$arr_fecha = array_map('trim', $arr_fecha);
	$arr_fecha = array_values( array_filter($arr_fecha) );

	$dia = (int) substr($arr_fecha[0], 0, 2);
	if($dia < 10){
		$dia = '0' . $dia;
	}

	$mes = str_replace( $arr_textos, $arr_valores, $arr_fecha[1]);

	return end($arr_fecha) . '-' . $mes . '-' . $dia;

}

function cambiaf_larga_a_normal( $fecha ){

	// Coge una fecha tipo "15 de Julio de 2015" y la convierte en 15/07/2015
	return cambiaf_a_normal( cambiaf_larga_a_mysql( $fecha ) );

}

function devuelve_num_mes_ceros($texto_mes){

	// devuelve 01 si enero, 02 si febrero, etc.

	$texto_mes = strtolower( quitar_espacios( quitar_acentos( $texto_mes ) ) );

	switch ($texto_mes) {

		case 'enero':
			return '01';
			break;

		case 'febrero':
			return '02';
			break;

		case 'marzo':
			return '03';
			break;

		case 'abril':
			return '04';
			break;

		case 'mayo':
			return '05';
			break;

		case 'junio':
			return '06';
			break;

		case 'julio':
			return '07';
			break;

		case 'agosto':
			return '08';
			break;

		case 'septiembre':
			return '09';
			break;

		case 'octubre':
			return '10';
			break;

		case 'noviembre':
			return '11';
			break;

		case 'diciembre':
			return '12';
			break;

		default:

			return '00';
			break;
	}

}

function euros($valor){
	//coge un valor y lo devuelve formateadito y con el símbolo del euro.
	//formateado con coma en millares si inglés
	// venta_mes_semana puede ser '', 'mes' (para alquileres) en su idioma, 'semana' (para temporada) en su idioma

	if($valor == 0){
		$mis_euros = '0.00&euro;';
	}else{

		if ($eng==''){
			$mis_euros = number_format((double) $valor,2,",",".").'&euro;';
		}else{
			$mis_euros = number_format((double) $valor,2,".",",").'&euro;';
		}
	}
	return $mis_euros;
}


function listar_directorio($directorio,$subdirectorios=''){
        //recorre un directorio y devuelve un array con el contenido

	//subdirectorios puede ser: '' = sin subdirectorios, '1' = listar subdirectorios, 'all' = listar todo

	$results = array();

	if (is_dir($directorio)==true){

		$handler = opendir($directorio);

		while ($file = readdir($handler)) {

		    if($subdirectorios==''){
			//no listar subdirectorios
			if ($file != '.' && $file != '..' && $file != 'Thumbs.db' && !is_dir($directorio.'/'.$file)){
			    $results[] = $file;
			}
		    }

		    if($subdirectorios=='1'){
			if ($file != '.' && $file != '..' && is_dir($directorio.'/'.$file)){
				$results[] = $file;
			}
		    }

		    if($subdirectorios=='all'){
			if ($file != '.' && $file != '..' && is_dir($directorio.'/'.$file)){
				$results[] = $file;
			}
		    }

		}

		closedir($handler);

	}


	return $results;

}


 function recursive_remove_directory($directory, $empty=FALSE){

	//http://lixlpixel.org/recursive_function/php/recursive_directory_delete/

	// ------------ lixlpixel recursive PHP functions -------------
	// recursive_remove_directory( directory to delete, empty )
	// expects path to directory and optional TRUE / FALSE to empty
	// of course PHP has to have the rights to delete the directory
	// you specify and all files and folders inside the directory
	// ------------------------------------------------------------

	// to use this function to totally remove a directory, write:
	// recursive_remove_directory('path/to/directory/to/delete');

	// to use this function to empty a directory, write:
	// recursive_remove_directory('path/to/full_directory',TRUE);


     // if the path has a slash at the end we remove it here
     if(substr($directory,-1) == '/'){
         $directory = substr($directory,0,-1);
     }

     // if the path is not valid or is not a directory ...
     if(!file_exists($directory) || !is_dir($directory)){
         return FALSE;
     }elseif(!is_readable($directory)){
         return FALSE;
     }else{
	$handle = opendir($directory);
        while (FALSE !== ($item = readdir($handle))){
             if($item != '.' && $item != '..'){

		 $path = $directory.'/'.$item;

                 if(is_dir($path)) {
                     recursive_remove_directory($path);
                 }else{
                     unlink($path);
                 }
             }
         }

         closedir($handle);

         if($empty == FALSE){
             if(!rmdir($directory)){
                return FALSE;
             }
         }
         return TRUE;
     }
     // ------------------------------------------------------------
 }

function createRandomPassword() {

	$chars = "abcdefghijkmnopqrstuvwxyz023456789";
	srand((double)microtime()*1000000);

	$i = 0;
	$pass = '' ;
	while ($i <= 7) {
	    $num = rand() % 33;
	    $tmp = substr($chars, $num, 1);
	    $pass = $pass . $tmp;
	    $i++;
	}

	return $pass;

}



function hoy(){
	$hoy = date('d/m/Y');
	return $hoy;
}

function quitar_no_alfanumerico($string){
	return preg_replace("/[^A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]/", '', $string);
}

function quitar_no_numerico($string){
	return preg_replace("/[^0-9]/","",$string);
}

function quitar_numerico($string){
	return preg_replace('/[0-9]+/', '', $string);
}

function quitar_acentos($texto){

    $miTexto=$texto;

    $miTexto = str_replace('Á','A',$miTexto);
    $miTexto = str_replace('É','E',$miTexto);
    $miTexto = str_replace('Í','I',$miTexto);
    $miTexto = str_replace('Ó','O',$miTexto);
    $miTexto = str_replace('Ú','U',$miTexto);
    $miTexto = str_replace('á','a',$miTexto);
    $miTexto = str_replace('é','e',$miTexto);
    $miTexto = str_replace('í','i',$miTexto);
    $miTexto = str_replace('ó','o',$miTexto);
    $miTexto = str_replace('ú','u',$miTexto);

    $miTexto = str_replace('À','A',$miTexto);
    $miTexto = str_replace('È','E',$miTexto);
    $miTexto = str_replace('Í','I',$miTexto);
    $miTexto = str_replace('Ó','O',$miTexto);
    $miTexto = str_replace('Ú','U',$miTexto);
    $miTexto = str_replace('à','a',$miTexto);
    $miTexto = str_replace('è','e',$miTexto);
    $miTexto = str_replace('ì','i',$miTexto);
    $miTexto = str_replace('ò','o',$miTexto);
    $miTexto = str_replace('ù','u',$miTexto);

    return $miTexto;

}

function number_format_idioma($numero,$decimales,$idioma){
	if(($idioma=='eng') || ($idioma=='en')){
		$mi_numero = number_format($numero,$decimales,'.',',');
	}else{
		$mi_numero = number_format($numero,$decimales,',','.');
	}
	return $mi_numero;
}


function mayusculas($cadena){

	$cadena = strtoupper($cadena);
	$cadena = str_replace("á", "Á", $cadena);
	$cadena = str_replace("é", "É", $cadena);
	$cadena = str_replace("í", "Í", $cadena);
	$cadena = str_replace("ó", "Ó", $cadena);
	$cadena = str_replace("ú", "Ú", $cadena);
	return $cadena;

}

function limpiar_comillas($cadena){

	$cadena = str_replace("'", "", $cadena);
	$cadena = str_replace('"', '', $cadena);
	$cadena = str_replace(chr(39), chr(34), $cadena);
	$cadena = str_replace('|', '', $cadena);

	return addslashes( $cadena );

}



// XML //
function xml_child_exists($xml, $childpath){
    $result = $xml->xpath($childpath);
    return (bool) (count($result));
}

function quitar_caracteres_no_imprimibles($string){
	return preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $string);
}

//get country by ip
function get_country_by_ip($ip){

	$url     = 'http://api.hostip.info/country.php?ip='.$ip;  /** Prepare the URL to hostip.info **/
	$data    = file_get_contents($url);

	$mi_pais = strtolower($data);
	return $mi_pais;

}

// comprimir archivos
/* creates a compressed zip file */
function create_zip($files = array(),$destination = '',$overwrite = false) {

	/* ejemplo de uso:

		$files_to_zip = array(
			'preload-images/1.jpg',
			'preload-images/2.jpg',
			'preload-images/5.jpg',
			'kwicks/ringo.gif',
			'rod.jpg',
			'reddit.gif'
		);
		//if true, good; if false, zip creation failed
		$result = create_zip($files_to_zip,'my-archive.zip');

	*/

	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) { return false; }
	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($files)) {
		//cycle through each file
		foreach($files as $file) {

			//make sure the file exists
			if(file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}

	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();
		if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}
		//add the files
		foreach($valid_files as $file) {

			$arr_nombre_archivo = explode('/', $file);
			$nombre_archivo = $arr_nombre_archivo[ count($arr_nombre_archivo) - 1 ];

			$zip->addFile($file, $nombre_archivo);

		}

		//close the zip -- done!
		$zip->close();

		//check to make sure the file exists
		return file_exists($destination);
	}
	else
	{
		return false;
	}

} // fin create_zip


	function i($mensaje='',$etiqueta=''){

		if(INM_ENTORNO === 'pruebas'){

			/*
			if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false)
			{
			    // User agent is Google Chrome
			    require_once('PhpConsole/__autoload.php');
			    return PhpConsole\Handler::getInstance()->debug($mensaje, $etiqueta);

			}else{

				require_once 'RES_FirePHP.php';
				return FB::info($mensaje,$etiqueta);

			}
			*/

			require_once 'RES_FirePHP.php';
			return FB::info($mensaje,$etiqueta);

		}else{

			return false;

		}

	}


?>
