define([
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config'

], function($, _, Backbone, Fx, Config ){

	'use strict';

	var Router = Backbone.Router.extend({
		
		routes: {
			// ''                         : 'goToLogin',
			''                               : 'goToInicio',
			'login'                          : 'goToLogin',
			//'politica'                       : 'goToPolitica',
			'inicio'                         : 'goToInicio',

			//'clientes'                       : 'goToClientes',
			//'clientes/:id_cliente'           : 'goToClienteDetalle',
			
			':lopd'							 : 'goToSection',
			'soporte'                        : 'goToSoporte',
			
			//'adjudicaciones'                 : 'goToAdjudicaciones',
			// 'alta'                           : 'goToAlta',

			// 'usuarios'                       : 'goToUsuarios',
			// 'usuarios/:id_usuario'           : 'goToUsuarioDetalle',
			//'usuarios/0/:opcion'             : 'goToUsuarioDetalle',

			'*path'                          : 'goToNoEncontrado'

			// 'concursos/revision'             : 'goToConcursos',
			// 'concursos/:id_concurso'         : 'goToConcursoDetalle',
			// 'concursos'                      : 'goToConcursos',

			// 'soporte/baja/0/:id'             : 'goToSoporteDetalle', // venimos de solicitar baja, para poder traernos el expediente
			// 'soporte/tecnico/0/:id'          : 'goToSoporteDetalle', // venimos de solicitar baja, para poder traernos el expediente
			// 'soporte/administrativo/0/:id'   : 'goToSoporteDetalle', // venimos de solicitar baja, para poder traernos el expediente
			// 'soporte/juridico/0/:id'         : 'goToSoporteDetalle', // venimos de solicitar baja, para poder traernos el expediente
			
			// 'soporte/baja/:id'               : 'goToSoporteDetalle',
			// 'soporte/tecnico/:id'            : 'goToSoporteDetalle',
			// 'soporte/administrativo/:id'     : 'goToSoporteDetalle',
			// 'soporte/juridico/:id'           : 'goToSoporteDetalle',
			
			// 'soporte/baja'                   : 'goToTipoSoporte',
			// 'soporte/tecnico'                : 'goToTipoSoporte',
			// 'soporte/administrativo'         : 'goToTipoSoporte',
			// 'soporte/juridico'               : 'goToTipoSoporte',
			
			// 'informes'                       : 'goToInformes',
			// 'carga'                          : 'goToCarga',
			// 'claves'                         : 'goToClaves',

			// 'verCondicionesBaja'             : 'goToVerCondicionesBaja',

			//'alta/:id'                       : 'goToAltaClienteWeb',
			//'contratacion/:id'               : 'goToContratacion',

			//'revision'                       : 'goToRevision',
			
		},

		initialize: function(view){

			this.appView = view;

		},

		goToTest: function(){

			this.goToSection('test');
		},

		goToLogin: function(){

			this.goToSection('login');
		},

		goToPolitica: function(){
			this.goToSection('verPolitica');
		},

		goToInicio: function(){
			this.goToSection('inicio');
		},

		goToClientes: function(){
			this.goToSection('clientes');
		},

		goToClienteDetalle: function(id_cliente){
			this.goToSection('clientes', id_cliente);
		},

		goToSoporte: function(){
			this.goToSection('soporte');
		},

		goToTipoSoporte: function(tipo_soporte){
			this.goToSection('soporte',tipo_soporte);
		},

		goToSoporteDetalle: function(id_soporte){
			this.goToSection('soporte', id_soporte);
		},

		goToAlta: function(id_tab){
			this.goToSection('altaClienteWeb', id_tab);
		},

		goToUsuarios: function(){
			this.goToSection('usuarios');
		},

		goToUsuarioDetalle: function(id_usuario){
			this.goToSection('usuarios', id_usuario);
		},

		goToNoEncontrado: function(){
			this.goToSection('noEncontrado');
		},

		goToSection: function(seccion, parametro){

			console.log('Router - Sección:' , seccion);

			var parametro = parametro || '';
			this.appView.setPage(seccion, parametro);
			
		}

		/*

		goToConcursos: function(){
			this.goToSection('concursos');
		},

		goToConcursoDetalle: function(id_concurso){

			if( (id_concurso > 0) || ( ( Config.oclem_admin == 'true') && ( typeof Config.oclem_admin != 'undefined') ) ){
			
				this.goToSection('concursos', id_concurso);
			
			}else{
			
				console.log( 'Direccionamiento incorrecto.');
				// window.location.hash = '#login';
				Backbone.history.navigate('#login', true);
			}
			
		},

		goToAdjudicaciones: function(){
			this.goToSection('adjudicaciones');
		},

		goToInformes: function(){
			this.goToSection('informes');
		},

		goToCarga: function(){
			this.goToSection('carga');
		},

		goToClaves: function(){
			this.goToSection('claves');
		},

		goToVerCondicionesBaja: function(){
			this.goToSection('verCondicionesBaja');
		},

		goToAltaClienteWeb: function(id_tab){
			this.goToSection('altaClienteWeb', id_tab);
		},

		goToContratacion: function(cod_enlace){
			this.goToSection('contratacion', cod_enlace );
		},
		
		goToRevision: function(){
			this.goToSection('revision');
		},
		*/
		
	});

	return Router;

});