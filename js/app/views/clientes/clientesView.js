define([
	
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/merca',
	'app/views/clientes/html/clientesViewHtml',
	'app/views/clientes/tablaClientesView',
	'app/views/clientes/detalleClienteView'

], function($, _, Backbone, Fx, Config, Merca, ClientesViewHtml, TablaClientesView, DetalleClienteView){

	'use strict';

	var ClientesView = Backbone.View.extend({
		
		html: ClientesViewHtml['clientes'],

		views: [],

		events: {

			'click #refrescar_tabla_clientes': 'mostrar_tabla_clientes',
			
			//'click #excel_clientes'          : 'excel_clientes',

			'click .botones_clientes button' : 'cambiar_boton_cliente',

			'click #btn_excel' : 'exportar_excel',
			
		},

		initialize: function(){

			Merca.cleanUp(this);

		},

		render: function(){

			/*
			if( Oclem.es_cliente() ){
				
				// window.location.hash = '#clientes/mis_datos';
				Backbone.history.navigate('#clientes/mis_datos', true);
				return false;
			
			}

			if( Oclem.es_tecnico() ){
				
				window.location.hash = '#inicio';
				// Backbone.history.navigate('#inicio', true);
				return false;
			}
			*/
			var breadcrumb = '';
			
			this.opcion = 'reducida';

			this.$el.html(this.html);
			

			this.mostrar_tabla_clientes();

			this.$('#anadir_cliente').remove();

			return this;
			
		},

		mostrar_tabla_clientes: function(){
			
			// Cargar tabla de clientes
			this.views['tablaClientesView'] = new TablaClientesView({
				id: 'tablaClientes',
				className: 'tablaClientes',
				opcion: this.opcion
			});

			this.views.push('tablaClientesView'); // add to views so the view can be removed from memory
			
			this.$('#resp_tabla_clientes').html(this.views['tablaClientesView'].render().$el);
			
			/*
			if( this.opcion == 'activos'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes activos con cuenta IBAN registrado y fecha de baja posterior a hoy ó sin fecha de baja.');
			}
			*/

			if( this.opcion == 'demos'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes con tipo de contrato DEMO y con fecha de baja posterior a hoy.');
			}

			if( this.opcion == 'pasados'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes con fecha de baja anterior a hoy.');
			}

			if( this.opcion == 'premium'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes activos marcados como PREMIUM en su ficha de cliente.');
			}

			if( this.opcion == 'reducida'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes activos con contrato CON30, CON60, CON120, CON6 ó CON3.');
			}

			if( this.opcion == 'clasificadas'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes activos con contrato CLASIF.');
			}

			if( this.opcion == 'mini'){
				this.$('#mensaje_tabla_clientes').text('Mostrando clientes activos con contrato CON50.');
			}

			if( this.opcion == 'todos'){
				this.$('#mensaje_tabla_clientes').text('Mostrando todos los clientes.');
			}

			this.$('#btn_excel').attr('href', Config.base_ajax + 'excel.php?opcion=tabla_clientes&param=' + this.opcion + '&hash=' + Merca.hash() );

		},

		cambiar_boton_cliente: function(e){

			e.preventDefault();
			var opcion = e.target.attributes['data-opcion'].value;
			this.opcion = opcion;

			this.cambiar_boton(opcion, 'cliente');



		},

		cambiar_boton: function(opcion){

			this.$('.botones_clientes button').removeClass('selected');
			this.$('.botones_clientes button[data-opcion="' + opcion + '"]').addClass('selected');

			this.mostrar_tabla_clientes();

		},


	});

	return ClientesView;

});