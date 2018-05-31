define([
	
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/calidad',
	'app/views/soportes/html/soportesViewHtml',
	'app/views/soportes/tablaSoportesView',
	'app/views/soportes/detalleSoporteView'

], function($, _, Backbone, Fx, Calidad, SoportesViewHtml, TablaSoportesView, DetalleSoporteView){

	'use strict';

	var SoportesView = Backbone.View.extend({
		
		html: SoportesViewHtml['soportes'],

		views: [],

		events: {
			'click #refrescar_tabla_soportes': 'mostrar_tabla_soportes',
			'click .anadir_soporte'          : 'anadir_soporte',
		},

		initialize: function(){

			Calidad.cleanUp(this);			
			Calidad.cargar_obj_clientes();

		},

		render: function(){

			Calidad.cleanUp(this);
			
			var texto_aux = '';
			
			// Coger la opción a partir del hash de la página
			var opcion = window.location.hash.split('/').pop() || '';
			if(opcion == '#soporte'){
				opcion = '';
			}

			this.opcion = opcion;

			this.$el.html(this.html);
			
			if( this.opcion == 'baja'){             texto_aux  = 'Baja Estadística';}
			if( this.opcion == 'tecnico'){          texto_aux  = 'Soporte Técnico';}
			if( this.opcion == 'administrativo'){   texto_aux  = 'Soporte Administrativo';}
			if( this.opcion == 'juridico'){         texto_aux  = 'Soporte Jurídico';}

			this.$('#anadir_soporte').text('Solicitar ' + texto_aux).attr('href','#soporte/' + this.opcion + '/0');
			this.$('#titulo_seccion').text('Solicitudes de ' + texto_aux);

			this.mostrar_tabla_soportes();

			if( Calidad.es_admin() || Calidad.es_tecnico() ){
				this.$('#anadir_soporte').remove();
			}

			//Oclem.actualizar_span_totales();

			return this;
			
		},

		mostrar_tabla_soportes: function(){
/*
			if( Oclem.es_tarifa_mini() && this.opcion != 'baja' ){

				this.$('#resp_tabla_soportes').html( Fx.bs_alert('<i class="fa fa-phone fa-lg"></i> Llame al 91 499 49 96 para contratar nuestro servicio de soporte.') );
				return true;
			}
*/
			// Cargar tabla de soportes
			this.views['tablaSoportesView'] = new TablaSoportesView({
				id: 'tablaSoportes',
				className: 'tablaSoportes',
				parametro: this.opcion
			});

			this.views.push('tablaSoportesView'); // add to views so the view can be removed from memory
			
			this.$('#resp_tabla_soportes').html(this.views['tablaSoportesView'].render().$el);
			
		},


		anadir_soporte: function(e){

			// Mostrar modal anadir factura
			e.preventDefault();
			var esto = this;
			var options = {

				title: 'Añadir soporte',
				id: 'modal-anadir-soporte',
				size: 'large',
				text: '',
				id_factura: 0,
				model: {}

			};

			var modal = new DetalleSoporteView(options);
			modal.show();

		}


	});

	return SoportesView;

});