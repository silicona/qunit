define([
	'jquery',
	'underscore',
	'backbone',
	'funciones'

], function($, _, Backbone, Fx ){

	'use strict';

	var Config = {

		ruta_previa: window.location.hash,

		hash: 'mi_hash',

		parametros: '',

		obj_tipos_soportes: {
			0 : 'baja',
			1 : 'tecnico',
			2 : 'administrativo',
			3 : 'juridico'
		},

		obj_provincias: {
			0: '',
	    1: 'Álava',
			2: 'Albacete',
			3: 'Alicante',
			4: 'Almería',
			5: 'Ávila',
			6: 'Badajoz',
			7: 'Islas Baleares',
			8: 'Barcelona',
			9: 'Burgos',
			10: 'Cáceres',
			11: 'Cádiz',
			12: 'Castellón',
			13: 'Ciudad Real',
			14: 'Córdoba',
			15: 'La Coruña',
			16: 'Cuenca',
			17: 'Girona',
			18: 'Granada',
			19: 'Guadalajara',
			20: 'Guipúzcoa',
			21: 'Huelva',
			22: 'Huesca',
			23: 'Jaén',
			24: 'León',
			25: 'Lleida',
			26: 'La Rioja',
			27: 'Lugo',
			28: 'Madrid',
			29: 'Málaga',
			30: 'Murcia',
			31: 'Navarra',
			32: 'Ourense',
			33: 'Asturias',
			34: 'Palencia',
			35: 'Las Palmas',
			36: 'Pontevedra',
			37: 'Salamanca',
			38: 'Santa Cruz de Tenerife',
			39: 'Cantabria',
			40: 'Segovia',
			41: 'Sevilla',
			42: 'Soria',
			43: 'Tarragona',
			44: 'Teruel',
			45: 'Toledo',
			46: 'Valencia',
			47: 'Valladolid',
			48: 'Vizcaya',
			49: 'Zamora',
			50: 'Zaragoza',
			51: 'Ceuta',
			52: 'Melilla'

		},

		obj_paises: {
			0: '',
			1: 'Alemania',
			2: 'Austria',
			3: 'Bélgica',
			4: 'Bulgaria',
			5: 'Chipre',
			6: 'Croacia',
			7: 'Dinamarca',
			8: 'Eslovaquia',
			9: 'Eslovenia',
			10: 'Estonia',
			11: 'Finlandia',
			12: 'Francia',
			13: 'Grecia',
			14: 'Hungría',
			15: 'Irlanda',
			16: 'Italia',
			17: 'Letonia',
			18: 'Lituania',
			19: 'Luxemburgo',
			20: 'Malta',
			21: 'Países Bajos',
			22: 'Polonia',
			23: 'Portugal',
			24: 'Reino Unido',
			25: 'República Checa',
			26: 'Rumanía',
			27: 'Suecia',
		},

		obj_frescos: {
			0: 'Carne',
			1: 'Pescado',
			2: 'Verduras',
			3: 'Hortalizas',
			4: 'Cereales',
			5: 'Encurtidos',
			6: 'Embutidos',
		},

		obj_envasados: {
			0: 'Carne',
			1: 'Pescado',
			2: 'Verduras',
			3: 'Hortalizas',
			4: 'Cereales',
			5: 'No perecederos',
		},


		obj_clientes:{},

		obj_usuario: {}

	};

	if( window.location.href.indexOf('localhost') > -1 ){
		
		Config.base_url   =    '//localhost/merca/';
		Config.base_ajax  =    '//localhost/merca/api/';

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
	if( window.location.hostname.indexOf('oclemconcursos') == 0 ){
		
		Config.base_url   =   '//oclemconcursos.com/concursos/';
		Config.base_ajax  =   '//oclemconcursos.com/concursos/api/';

		Config.servidor = 'oclemconcursos';

	}
	*/
	
	return Config;

});