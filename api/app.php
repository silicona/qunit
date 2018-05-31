<?php

require_once 'entidades/App.php';
//namespace entidades;

// Implementar seguridad

$accion = $_POST['accion'];


if( $accion == 'comprobar_entorno' ){

	echo json_encode( App::detectar_entorno() );
	exit;
}

?>