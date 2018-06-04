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
			''                               : 'goToSection',
			':login'                          : 'goToSection',
			//'politica'                       : 'goToPolitica',
			':inicio'                         : 'goToInicio',

			//'clientes'                       : 'goToClientes',
			//'clientes/:id_cliente'           : 'goToClienteDetalle',
			
			':lopd'					 		 : 'goToSection',
			':lopd/:pag'					 : 'goToSection',
			':soporte'                        : 'goToSection',
			
			'*path'                          : 'goToNoEncontrado'
			
		},

		initialize: function(view){

			this.appView = view;

		},



		goToClienteDetalle: function(id_cliente){
			this.goToSection('clientes', id_cliente);
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

			if(seccion == 'lopd'){ parametro = '' }
				
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