<?php

require_once '../lib/bbdd.php';
require_once '../api/entidades/Cld_login.php';
require_once '../lib/Calidad.php';

class Helper {

	public function acceder_como_admin($link){

		$admin = Login::check_login( $link, 'admin', '1234');
		
		if( $admin['status'] == 'ok' ){
			
			return $admin['hash'];

		}
		
		return false;
	}
	

	public function acceder_como_cliente($link){

		$cliente = Login::check_login( $link, 'cliente', '1234');
		
		if( $cliente['status'] == 'ok' ){
			
			return $cliente['hash'];

		}
		
		return false;
		
	}

	public function log_out( $link, $hash ){

		if( $hash != null ){

			$salida = Login::logout( $link, $hash);

			if( $salida['status'] == 'ok' )
				return true;
			else
				return false;

		}
	}

}


?>