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

		events: {
			'click #h2': 'oo',
			'click #si' : 'ver_extras',
			'click #botones_ant_sig ul.pagination li' : 'determinar_posicion',
			'load #h2' : 'oo',

		},

		oo: function(){
			console.log('jajaja');
		},

		ver_extras: function(e){

			//e.preventDefault();
			console.log('Valor: ');
			//console.log('Valor: ', e.currentTarget.value);

		},

		initialize: function(){

			Calidad.cleanUp(this);

			//return this;
		},

		render: function(){

			var esto = this;
			this.$el.html(this.html);

			//Formulario(this);

			// Establecer hash para que al pulsar atrás no se pierdan los datos
			window.setTimeout(function(){
				window.location.hash = '#lopd/1';
			},100);
			

			$(window).bind('hashchange', function(){
			    var posicion = window.location.hash.split('/')[1];
			    this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			});

			console.log('el', this.el);

			return this;

		},


		determinar_posicion: function(e){

			console.log('Dentro');

			e.preventDefault();

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

			this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			
			this.posicion = posicion;

			this.establecer_hash();

		},

		establecer_hash: function(){
			window.location.hash = window.location.hash.split('/')[0] + '/' + this.posicion;
		},


	});

	return LopdView;

});