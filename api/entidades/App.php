<?php

//namespace entidades;

class App {

	function __construct(){

	}

	public function detectar_entorno(){

		return array(
			'status' => 'ok',
			// 'datos' => CLD_ENTORNO,
			'entorno' => 'pruebas',
		);
	}
}

?>