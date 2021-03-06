<?php

require_once '../lib/config.php';
require_once 'entidades/Lopd.php';


$hash = limpia_undefined( $_POST['hash'] );
$accion = limpia_varchar( $_POST['accion'] );
$obj_form = limpia_undefined( $_POST['obj_form'] );
//$obj_form = limpia_undefined( $_POST['obj_form'] );


if( $accion == 'guardar_form' ){

	if( !es_cliente($link, $hash) ){

		echo json_encode(
			array(
				'status' => 'ko',
				'error' => 'No está autorizado para realizar una LOPD.'
			)
		)
		exit;
	}

	echo json_encode( Lopd::guardar_form($link, $hash, $obj_form) );
	exit;
}

// if( $accion == 'guardar_lopd' ){

// 	if( !es_cliente($link, $hash) ){

// 		echo json_encode(
// 			array(
// 				'status' => 'ko',
// 				'error' => 'No está autorizado para realizar una LOPD.'
// 			)
// 		)
// 		exit;
// 	}

// 	echo json_encode( Lopd::guardar_lopd($link, $obj_form) );
// 	exit;
// }

?>