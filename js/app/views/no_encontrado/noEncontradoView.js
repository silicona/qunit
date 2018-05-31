define([
	
	'jquery',
	'underscore',
	'backbone',
	'app/calidad',
	'funciones',
	'app/views/no_encontrado/html/noEncontradoViewHtml'
	//'app/templates', /*Templates,*/
	
], function( $, _, Backbone, Calidad, Fx, NoEncontradoViewHtml ){

	'use strict';

	var NoEncontradoView = Backbone.View.extend({

		html: NoEncontradoViewHtml['no_encontrado'],

		views: [],

		events: {},

		initialize: function(){

			Calidad.cleanUp(this);

		},

		render: function(){
			
			var esto = this;

			this.$el.html(this.html);
					
			
			return this;
			
		},




	});

	return NoEncontradoView;

});