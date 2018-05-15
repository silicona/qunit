define([
	
	'jquery',
	'underscore',
	'backbone',
	'app/merca',
	'funciones',
	'app/views/no_encontrado/html/noEncontradoViewHtml'
	//'app/templates', /*Templates,*/
	
], function( $, _, Backbone, Merca, Fx, NoEncontradoViewHtml ){

	'use strict';

	var NoEncontradoView = Backbone.View.extend({

		html: NoEncontradoViewHtml['no_encontrado'],

		views: [],

		events: {},

		initialize: function(){

			Merca.cleanUp(this);

		},

		render: function(){
			
			var esto = this;

			this.$el.html(this.html);
					
			
			return this;
			
		},




	});

	return NoEncontradoView;

});