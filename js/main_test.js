require.config({

	paths: {

		'jquery'                     : '../js/libs/jquery-3.1.1.min',
		'underscore'                 : '../js/libs/underscore-1.8.3',
		'backbone'                   : '../js/libs/backbone-1.3.3',
		'bootstrap'                  : '../js/libs/bootstrap-3.3.7',
		//'qunit'											 : 'libs/qunit-2.6.0', 
		'mustache'                   : '../js/libs/mustache',
		'funciones'                  : '../js/libs/funciones',
		'iban'                       : '../js/libs/iban',
		'config'                     : '../js/app/config',
		'merca'                      : '../js/app/merca',
		'validar_formulario'         : '../js/libs/validar_formulario',

		'datatables'                 : '../js/libs/jquery.dataTables.min',
		'datatables-responsive'      : '../js/libs/jquery.dataTables.responsive',
		
		'bs-select'                  : '../js/libs/bootstrap-select/bootstrap-select.min',
		'mask'                       : '../js/libs/mask-1.3.1',
		'bootstrap-datepicker'       : '../js/libs/bootstrap-datepicker/js/bootstrap-datepicker',
		'swal'                       : '../js/libs/sweet-alert/sweet-alert',
		'fileinput'                  : '../js/libs/fileinput-2.1.0.min',
		'summernote'                 : '../js/libs/summernote/summernote', // Soportes

		'bootstrap-datepicker-es'    : '../js/libs/bootstrap-datepicker/js/es',
		'bs-growl'                   : '../js/libs/bootstrap-growl/bootstrap-growl', // Merca
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

		// 'qunit': {
		// 	deps: [
		// 		'jquery'
		// 	],
		// 	exports: 'Qunit'
		// },
		
		'funciones': {
			exports: 'Fx'
		},

		
		'iban': {
			deps: [
				'jquery'
			],
			exports: 'IBAN'
		},
		

		'merca': {
			exports: 'Merca'
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
		/*
		'bs-growl':{
			deps: [
				'bootstrap'
			]
		},
		*/
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

	urlArgs: "v=" + (new Date()).getTime()

});

require([

	'backbone',
	'../js/app/app',
	'jquery',
	'bootstrap',
	'mustache'

], function (Backbone, App, $, Bootstrap, Mustache) {

	'use strict';
	App.initialize();


});