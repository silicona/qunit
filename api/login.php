<?php

	/*

		WEBSERVICE DE LOGIN

	*/

	require_once '../lib/config.php';
	require_once 'entidades/Cld_login.php';
	// require_once '../lib/PasswordHash.php';

	//$link = dblink();
	$login    = limpia_varchar($_POST['usuario']);
	$password = limpia_varchar($_POST['password']);
	$accion   = limpia_varchar($_POST['accion']);
	$hash     = limpia_varchar($_POST['hash']);

	//salir_si_no_hash($link, $hash);
	if($accion == 'check_login'){
		echo json_encode( login::check_login( $link, $login, $password) );
		exit();
	}

	if($accion == 'logout'){
		echo json_encode( login::logout( $link, $hash) );
		exit();
	}

?>