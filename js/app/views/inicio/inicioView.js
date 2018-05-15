define([

	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/merca',
	'app/views/inicio/html/inicioViewHtml'

], function( $, _, Backbone, Fx, Config, Merca, InicioViewHtml ){
	
	var InicioView = Backbone.View.extend({

		html: InicioViewHtml['inicio'],

		views: [],

		events: {},

		initialize: function(){

			Merca.cleanUp(this);

			var esto = this;

		},

		render: function(){

			this.$el.html(this.html);
			//console.log('En Vista inicio: ', this.$el);
			return this;

		}

	});

	return InicioView;
	
});