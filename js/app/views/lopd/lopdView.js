define([

	'jquery',
	'underscore',
	'backbone',
	'calidad',

	'app/views/lopd/html/lopdViewHtml'

], function( $, _, backbone, Calidad, LopdViewHtml ){
	
	'use strict';

	var LopdView = Backbone.View.extend({

		html: LopdViewHtml['vista'],

		views: [],

		events: {},

		initialize: function(){

			Calidad.cleanUp(this);

			return this;
		},

		render: function(){

			var esto = this;
			this.el.html(this.html);

		},


	});

	return LopdView;

});