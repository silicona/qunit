require.config({

	// Comprobar RequireJS Config.options

	paths: {

		'jquery'                     : 'libs/jquery-3.1.1.min',
		'underscore'                 : 'libs/underscore-1.8.3',
		'backbone'                   : 'libs/backbone-1.3.3',
		'bootstrap'                  : 'libs/bootstrap-3.3.7',
		'mustache'                   : 'libs/mustache',
		'funciones'                  : 'libs/funciones',
		'iban'                       : 'libs/iban',
		'config'                     : 'app/config',
		'calidad'                    : 'app/calidad',
		'validar_formulario'         : 'libs/validar_formulario',

		'datatables'                 : 'libs/jquery.dataTables.min',
		'datatables-responsive'      : 'libs/jquery.dataTables.responsive',
		
		'bs-select'                  : 'libs/bootstrap-select/bootstrap-select.min',
		'mask'                       : 'libs/mask-1.3.1',
		'bootstrap-datepicker'       : 'libs/bootstrap-datepicker/js/bootstrap-datepicker',
		'swal'                       : 'libs/sweet-alert/sweet-alert',
		'fileinput'                  : 'libs/fileinput-2.1.0.min',
		'summernote'                 : 'libs/summernote/summernote', // Soportes

		'bootstrap-datepicker-es'    : 'libs/bootstrap-datepicker/js/es',
		'bs-growl'                   : 'libs/bootstrap-growl/bootstrap-growl', // Merca
		// 'fastclick'                  : 'libs/fastclick'
		
	},

	shim: {
		
		'jquery': {
            exports: '$'
        },
        
		'underscore': {
			exports: '_'
		},

		'backbone': {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		
		'bootstrap': {
			deps: [
				'jquery'
			]
		},
		
		'funciones': {
			exports: 'Fx'
		},

		'iban': {
			deps: [
				'jquery'
			],
			exports: 'IBAN'
		},
		

		'calidad': {
			exports: 'Calidad'
		},

		'config': {
			exports: 'Config'
		},


		'datatables': {
			deps: [
				'jquery'
			]
		},

		'datatables-responsive': {
			deps: [
				'datatables'
			]
		},

		'mask': {
			deps: [
				'jquery'
			]
		},

		'swal':{
			deps: [
				'bootstrap'
			]
		},

		'bs-select':{
			deps: [
				'bootstrap'
			]
		},

		'bootstrap-datepicker':{
			deps: [
				'bootstrap'

			]
		},
		
		'bootstrap-datepicker-es':{
			deps: [
				'bootstrap-datepicker'
			]
		},
		
		
		'fileinput':{
			deps: [
				'bootstrap'
			]
		},
		
		'bs-growl':{
			deps: [
				'bootstrap'
			]
		},
		
		'summernote':{
			deps: [
				'bootstrap'
			]
		},
		/*
		'fastclick':{
			deps: [
				'jquery'
			],
			exports: 'Fastclick'
		}
		*/
	},

	urlArgs: "v=" + (new Date()).getTime(),

	//waitSeconds: 0,

});

require([

	'backbone',
	'app/app',
	'jquery',
	'bootstrap',
	'mustache'

], function (Backbone, App, $, Bootstrap, Mustache) {

	'use strict';
	App.initialize();


});