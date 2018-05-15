define([
	
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/merca',
	'app/views/usuarios/html/usuariosViewHtml',
	'app/views/usuarios/tablaUsuariosView',
	'app/views/usuarios/detalleUsuarioView'

], function($, _, Backbone, Fx, Config, Merca, UsuariosViewHtml, TablaUsuariosView, DetalleUsuarioView){

	'use strict';

	var UsuariosView = Backbone.View.extend({
		
		html: UsuariosViewHtml['usuarios'],

		views: [],

		opcion: 'empleados',

		events: {
			'click #refrescar_tabla_usuarios': 'mostrar_tabla_usuarios',
			'click .botones_usuarios button' : 'cambiar_boton_usuario',

			'click #anadir_usuario'          : 'anadir_usuario'
		},

		initialize: function(){

			Oclem.cleanUp(this);
			
		},

		render: function(){

			Merca.cleanUp(this);
			
			this.$el.html(this.html);

			// Salir si el cliente no tiene permisos para ver esto
			
			if( !Oclem.es_admin() ){

				if( typeof Config.obj_usuario.cliente_admin == 'undefined'){
					Merca.ir_a_login();
				}

				if( Config.obj_usuario.cliente_admin != '1' ){
					Merca.ir_a_login();
				}

				if( Config.obj_usuario.cliente_admin == 1){
					this.$('.botones_usuarios').remove();
					this.opcion = 'clientes';
				}

			}
			
			this.mostrar_tabla_usuarios();

			return this;
			
		},

		mostrar_tabla_usuarios: function(){

			// Cargar tabla de usuarios
			this.views['tablaUsuariosView'] = new TablaUsuariosView({
				id: 'tablaUsuarios',
				className: 'tablaUsuarios',
				hash: Merca.hash(),
				opcion: this.opcion
			});

			this.views.push('tablaUsuariosView'); // add to views so the view can be removed from memory
			
			this.$('#resp_tabla_usuarios').html(this.views['tablaUsuariosView'].render().$el);
			
		},

		cambiar_boton_usuario: function(e){

			e.preventDefault();
			var opcion = e.target.attributes['data-opcion'].value;
			
			this.opcion = opcion;

			this.cambiar_boton(opcion);

		},

		cambiar_boton: function(opcion){

			this.$('.botones_usuarios button').removeClass('selected');
			this.$('.botones_usuarios button[data-opcion="' + opcion + '"]').addClass('selected');

			this.mostrar_tabla_usuarios();

		},

		anadir_usuario: function(e){

			e.preventDefault();
			
			console.log(this.opcion);
			var ruta = 'usuarios/0/' + this.opcion;

			// window.location.hash = ruta;
			Backbone.history.navigate(ruta, true);
		}

	});

	return UsuariosView;

});