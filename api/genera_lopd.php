<?php


	// setear variables
	ini_set('memory_limit','200M');
	// error_reporting(0); //un warning haría que no saliera el documento

	// incluir componentes
	require_once '../lib/config.php';


	//librería pdf
	define('_MPDF_PATH','../lib/mpdf/');
	require_once('../lib/mpdf/mpdf.php');


	//coger variables del GET
	$mpdf = new mPDF('utf-8');
	$mpdf -> autoLangToFont = true;
	$mpdf -> charset_in='utf-8';

	$nombre              = limpia_varchar($_POST['nombre']);
	$apellidos           = limpia_varchar($_POST['apellidos']);
	$telefono1           = limpia_varchar($_POST['telefono1']);
	$dni                 = limpia_varchar($_POST['dni']);
	$poblacion           = limpia_varchar($_POST['poblacion']);
	$direccion_propiedad = limpia_text($_POST['direccion_propiedad']);
	$cp                  = limpia_varchar($_POST['cp']);
	//$id_zona 			 = limpiar_varchar($_POST['id_zona']);

	$cod_contratacion    = limpia_varchar($_POST['cod_contratacion']);

	$opcion              = limpia_varchar($_POST['opcion']);
	

	

	// $zona    = coger_campo_misma_tabla($link, 'zona', '4887_zonas', 'id_zona', $id_zona);
	
	// // Si no se encuentra el código postal, asociar a Oclem.
	// // Anulado en usuarios::alta_web para que acepte nuevas zonas
	// if($id_zona == 0){ $id_zona = 1; }

	// $arr_datos_asociado = coger_array_misma_tabla($link, array('nombre_asociado','cif_asociado','razon_social','direccion_social'), '4887_asociados', 'id_zona', $id_zona, 'assoc');

	// $html = '<style media="print">@page{background:url("https://abogadosyarbitraje.com/assets/img/logo_aa_transparencia.png") no-repeat center center;}</style>';

	// if($opcion == 'comprador'){
	// 	$html .= file_get_contents(BASE_URL .'api/contrato/contrato_comprador.html');		
	// }else{
	// 	$html .= file_get_contents(BASE_URL .'api/contrato/contrato.html');
	// }

	// $duracion = '<p><b><span style="text-decoration:underline">TERCERO</span>.-DURACIÓN.</b> El presente acuerdo tiene una duración de seis (6) meses. El contrato se dará por renovado semestralmente si no media preaviso fehaciente y escrito de un mes (1) con antelación a la fecha de vencimiento a la cuenta de correo (bajas@abogadosyarbitraje.com). </p>

	// 	<p>DERECHO DE DESISTIMIENTO</p>

	// 	<p>El USUARIO, no obstante lo anterior, dispondrá de un plazo de desistimiento de catorce (14) días naturales a contar desde la fecha de suscripción y aceptación del presente contrato. El desistimiento se deberá de formalizar por CORREO ELECTRONICO a la siguiente cuenta de correo (bajas@abogadosyarbitraje.com)</p>';

	// if($cod_contratacion == 'SOL3'){
		
	// 	$duracion = '<p><b><span style="text-decoration:underline">TERCERO</span>.-DURACIÓN.</b> El presente acuerdo tiene una duración de tres (3) meses. El contrato se dará por
	// 		renovado cada tres (3) meses si no media preaviso fehaciente y por escrito quince (15) días naturales con antelación a la fecha de vencimiento a la cuenta de correo bajas@abogadosyarbitraje.com.</p>';
	
	// }

	// if($cod_contratacion == 'LUNA2'){
		
	// 	$duracion = '<p><b><span style="text-decoration:underline">TERCERO</span>.-DURACIÓN.</b> El presente acuerdo tiene una duración de dos (2) meses. El contrato se dará por
	// 		renovado cada dos (2) meses si no media preaviso fehaciente y por escrito quince (15) días naturales con antelación a la fecha de vencimiento a la cuenta de correo bajas@abogadosyarbitraje.com.</p>';

	// }

	// if($cod_contratacion == 'MAR1'){
		
	// 	$duracion = '<p><b><span style="text-decoration:underline">TERCERO</span>.-DURACIÓN.</b> El presente acuerdo tiene una duración de un (1) mes. El contrato se dará por
	// 		renovado mes a mes si no media preaviso fehaciente y por escrito quince (15) días naturales con antelación a la fecha de vencimiento a la cuenta de correo bajas@abogadosyarbitraje.com.</p>';
	
	// }

	// //$html = str_replace('<%fecha%>'               , '13/4/2018', $html);  // Modificación de contratos
	// $html = str_replace('<%fecha%>'               , date('d/m/Y'), $html);

	// $html = str_replace('<%nombre%>'              , $nombre,    $html);
	// $html = str_replace('<%apellidos%>'           , $apellidos, $html);
	// $html = str_replace('<%dni%>'                 , $dni,       $html);
	// $html = str_replace('<%direccion_propiedad%>' , $direccion_propiedad, $html);
	// $html = str_replace('<%poblacion%>'           , $poblacion, $html);
	// $html = str_replace('<%provincia%>'           , $provincia, $html);
	// $html = str_replace('<%zona%>'                , $zona,      $html);

	// $html = str_replace('<%nombre_asociado%>'     , $arr_datos_asociado['nombre_asociado'],  $html);
	// $html = str_replace('<%cif_asociado%>'        , $arr_datos_asociado['cif_asociado'],     $html);
	// $html = str_replace('<%razon_social%>'        , $arr_datos_asociado['razon_social'],     $html);
	// $html = str_replace('<%direccion_social%>'    , $arr_datos_asociado['direccion_social'], $html);

	// $html = str_replace('<%duracion%>'   		  , $duracion, $html);

	// $mpdf -> WriteHTML($html);

	// $nombre_archivo = time() . '_' . $dni . '.pdf';
	// $ruta   = BASE_FILE . 'api/contrato/' . $nombre_archivo;

	// $enlace = BASE_URL . 'api/contrato/' . $nombre_archivo;

	// $mpdf -> Output( $ruta, 'F' );

	echo json_encode(

		array(
			'arr_datos_asociado' => $arr_datos_asociado,
			'id_localidad' => $id_localidad,
			'id_zona'      => $id_zona,
			'status' => 'ok',
			'enlace' => $enlace,
			'ruta'   => $ruta,
			'nombre_archivo' => $nombre_archivo
		)

	);

?>
