({

	/*  
		
		PARA LANZAR LA COMPILACIÓN:

		1.- cd /Applications/XAMPP/htdocs/oclemcalidad
		2.- node ../r.js -o /Applications/XAMPP/htdocs/oclemcalidad/js/app.build.js

	*/

	paths: {

		'jquery'                     : 'libs/jquery-2.1.1.min',
		'underscore'                 : 'libs/underscore',
		'backbone'                   : 'libs/backbone',
		'bootstrap'                  : 'libs/bootstrap.min',
		'mustache'                   : 'libs/mustache',
		'funciones'                  : 'libs/funciones',
		'iban'                       : 'libs/iban',
		'config'                     : 'app/config',
		'calidad'                    : 'app/calidad',
		'validar_formulario'         : 'libs/validar_formulario',

		'datatables'                 : 'libs/jquery.dataTables.min',
		'datatables-responsive'      : 'libs/jquery.dataTables.responsive',
		
		'bs-select'                  : 'libs/bootstrap-select/bootstrap-select.min',
		'mask'                       : 'libs/mask',
		'bootstrap-datepicker'       : 'libs/bootstrap-datepicker/js/bootstrap-datepicker',
		'bootstrap-datepicker-es'    : 'libs/bootstrap-datepicker/js/es',
		'fileinput'                  : 'libs/fileinput.min',
		'bs-growl'                   : 'libs/bootstrap-growl/bootstrap-growl',
		'swal'                       : 'libs/sweet-alert/sweet-alert',
		'summernote'                 : 'libs/summernote/summernote',
		'fastclick'                  : 'libs/fastclick'
		
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

		'bs-select':{
			deps: [
				'bootstrap'
			]
		},

		'mask': {
			deps: [
				'jquery'
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

		'swal':{
			deps: [
				'bootstrap'
			]
		},
		
		'summernote':{
			deps: [
				'bootstrap'
			]
		},

		'fastclick':{
			deps: [
				'jquery'
			],
			exports: 'Fastclick'
		}

		

	},

	appDir: "../",
	baseUrl: "js",
	dir: "../../oclemcalidad-build",
	optimizeCss: 'standard',
	removeCombined: true,
	modules: [
		{
			name: "main"
		}
	]

});