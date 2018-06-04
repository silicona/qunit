define([

	'jquery',
	'underscore',
	'backbone',
	'app/formulario',
	'app/calidad',

	'app/views/lopd/html/lopdViewHtml'

], function( $, _, backbone, Formulario, Calidad, LopdViewHtml ){
	
	'use strict';

	var LopdView = Backbone.View.extend({

		html: LopdViewHtml['vista'],

		views: [],

		posicion: 1,

		secciones_no: [],
		secciones_si: [],

		events: {
			'click #h2': 'oo',
			'click #si' : 'abrir_opciones',
			'click #no' : 'registrar_no',
			'click #botones_ant_sig ul.pagination li' : 'determinar_posicion',
			'load #h2' : 'oo',

		},

		initialize: function(){

			Calidad.cleanUp(this);

			// Establecer hash para que al pulsar atrás no se pierdan los datos
			window.setTimeout(function(){
				window.location.hash = '#lopd/1';
			},100);
			

			$(window).bind('hashchange', function(){
			    var posicion = window.location.hash.split('/')[1];

			    console.log('En Evento hashchange posicion:', posicion)
			    this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			});

			//return this;
		},

		render: function(){

			var esto = this;
			this.$el.html(this.html);

			//Formulario(this);

			// 			// Establecer hash para que al pulsar atrás no se pierdan los datos
			// window.setTimeout(function(){
			// 	window.location.hash = '#lopd/1';
			// },100);
			

			// $(window).bind('hashchange', function(){
			//     var posicion = window.location.hash.split('/')[1];
			//     this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			// });

			console.log('el', this.el);

			return this;

		},

		oo: function(){
			console.log('Secciones', this.secciones_si);
		},

		abrir_opciones: function(e){
			var boton = e.currentTarget;
			var seccion = $(boton).parents()[1].id.split('_')[0];
			this.$('#' + seccion + '_extra').show();

			var valor = boton.value;
			console.log('Val:', valor);

			this.anadir_a_array( this.secciones_si, seccion )

			this.eliminar_de_array( this.secciones_no, seccion );
		},

		registrar_no: function(e){

			var seccion = $(e.currentTarget).parents()[1].id.split('_')[0]

			this.$('#' + seccion + '_extra').hide();
			//console.log('NO: ', e.currentTarget.value);

			this.anadir_a_array(this.secciones_no, seccion);
			this.eliminar_de_array(this.secciones_si, seccion);
		},

		anadir_a_array: function( array, elemento ){

			var i = array.indexOf(elemento);

			// Evitamos la duplicacion
			if( i === -1 ){ 
				array.push(elemento) 
			}
		},

		eliminar_de_array: function(array, elemento){

			var i = array.indexOf(elemento);

			// Evitamos el borrado accidental con -1
			if( i !== -1 ){
				array.splice(i, 1);
			}

		},


		determinar_posicion: function(e){

			console.log('determinar', e);
			e.preventDefault();
			e.stopPropagation();

			// this.check_btn_demo();

			// if( this.check_iso() == false ){
			// 	this.posicion = 1;
			// 	return false;
			// }

			var className = e.currentTarget.className,
				posicion = this.posicion;
			
			if( className.indexOf('previous') > -1 ){
				posicion--;
			}

			if( className.indexOf('next') > -1 ){
				posicion++;
			}

			if( className.indexOf('first') > -1 ){
				posicion = 1;
			}

			if( className.indexOf('last') > -1 ){
				posicion = 9;
			}

			if(posicion < 1){ posicion = 1;}
			if(posicion > 9){ posicion = 9;}			
			console.log('posicion', posicion);

			this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			
			this.posicion = posicion;

			this.establecer_hash();

		},

		establecer_hash: function(){

			console.log('posicion hash', this.posicion);
			console.log('window.location.hash', window.location.hash);

			window.location.hash = window.location.hash.split('/')[0] + '/' + this.posicion;
			console.log('window.location.hash POST', window.location.hash);
		},



		procesar: function(e){
			
			e.preventDefault();

			var obj_form = this.actualizar_obj_form( this.$('form'));

			var obj_lopd = this.actualizar_obj_lopd();


			//var cod_contratacion = this.$('#cod_contratacion').val();

			this.$('#resp_contratar').empty();
			Calidad.spinner(this, '#resp_contratar');

			// if( (cod_contratacion != 'CLASIF') && (cod_contratacion != 'DEMO01') && (cod_contratacion != 'CON30') && (cod_contratacion != 'CON60') && (cod_contratacion != 'CON120') && (cod_contratacion != 'CON2000') && (cod_contratacion != 'CON6') && (cod_contratacion != 'CON3') && (cod_contratacion != 'CON50') ){

			// 	this.$('#resp_contratar')
			// 		.empty()
			// 		.html( Fx.bs_alert('Por favor, introduzca un código de contratación válido.', 'danger' ) );
				
			// 	return false;
			// }

			
				
				//Fx.i('Iniciando la contratación');
				// this.$('#btn_guardar_cliente').trigger('click');

				//this.guardar_cliente();



		},

		actualizar_obj_lopd: function(){

			// Prepara el obj de datos
			var obj_lopd = {};

			// campos de primera pagina
			//obj_lopd['formulario'] = Calidad.actualizar_obj_form( this.$('') );

			// seccion si
			obj_lopd['sec_si'] = this.secciones_si;
			$.each(this.secciones_si, function(indice, valor){

				console.log( this.$('#' + valor) );

			}, this);


			// secciones no
			obj_lopd[sec_no] = this.secciones_no;


			return obj_lopd;

		}


	});

	return LopdView;

});