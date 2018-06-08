define([
	'jquery',
	'underscore',
	'backbone',
	'funciones'

], function($, _, Backbone, Fx ){

	'use strict';

	var Config = {

		ruta_previa: window.location.hash,

		hash: '',

		parametros: '',

		obj_perfiles: {
			0 : '--',
			1 : 'Admin',
			2 : 'Tecnico',
			3 : 'Cliente'
		},

		obj_tipos_soportes: {
			0 : 'baja',
			1 : 'tecnico',
			2 : 'administrativo',
			3 : 'juridico'
		},

		obj_sectores: {
			0: ' - Elija un sector -',
			1: 'Alimentación',
			2: 'Obras',
			3: 'Servicios',
			4: 'Suministros'
		},

		obj_lopd_secciones: {
			0: 'clientes',
			1: 'futuros',
			2: 'empleados',
			3: 'candidatos',
			4: 'proveedores',
		},

		obj_clientes:{},

		obj_usuario: {}

	};

	if( window.location.href.indexOf('localhost') > -1 ){
		
		Config.base_url   =    '//localhost/oclemcalidad/';
		Config.base_ajax  =    '//localhost/oclemcalidad/api/';

		Config.servidor = 'localhost';

		//console.info('Info Config', Config);

		//console.log('Log Config:',Config);
	}
	
	/*
	if( window.location.href.indexOf('localhost:8888') > -1 ){
		
		Config.base_url   =    '//localhost:8888/merca/';
		Config.base_ajax  =    '//localhost:8888/merca/api/';

		Config.servidor = 'localhost';

		console.info('Config');
		console.log(Config);

	}

	if( window.location.hostname.indexOf('respirainternet') == 0 ){
		
		Config.base_url   =   '//respirainternet.com/pruebas/merca/';
		Config.base_ajax  =   '//respirainternet.com/pruebas/merca/api/';
	
		Config.servidor = 'respirainternet';

		console.info('Config');
		console.log(Config);

	}

	// Quitamos http:// para permitir https
	if( window.location.hostname.indexOf('oclemcalidad') == 0 ){
		
		Config.base_url   =   '//oclemconcursos.com/concursos/';
		Config.base_ajax  =   '//oclemconcursos.com/concursos/api/';

		Config.servidor = 'oclemconcursos';

	}
	*/
	
	return Config;

});