define([
	
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/templates',
	'app/merca',
	'app/views/login/html/verPoliticaViewHtml'
	
], function($, _, Backbone, Fx, Config, Templates, Merca, VerPoliticaViewHtml){

	'use strict';

	var VerPolitica = Backbone.View.extend({

		html: VerPoliticaViewHtml['verPolitica'],

		views: [],

		events: {
				
		},

		initialize: function(){

			Merca.cleanUp(this);
			
		},

		render: function(){
			
			this.$el.html(this.html);
			
			if(Config.hash == ''){
				// venimos del alta
				this.$('#volver')
					.text('Volver')
					.attr('href', '#alta');
			
			}else{
				this.$('#volver')
					.text('Ir a inicio')
					.attr('href', '#inicio');
			}

			return this;
			
		},




	});

	return VerPolitica;

});