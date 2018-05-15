define([
	'jquery',
	'underscore',
	'backbone',
	'app/templates',
	'funciones',
	'app/merca',
	'app/views/modalView'

], function($, _, Backbone, Templates, Fx, Merca, ModalView){

	'use strict';

	// We extend ModalView, not BackboneView
	var ConfirmView = ModalView.extend({

		html: 'Está seguro?',
		
		events: {
			
			'click #btn-si': 'confirm_si',
			
			'touchstart #btn-si': 'confirm_si'

		},

		initialize: function(options){
			
			if(options.text != ''){
				this.html = options.text;
			}

			var defaultOptions = {
				title: 'Confirmar',
				id: 'modal-confirm',
				size: 'large'
			};

			if (typeof options == 'object') {
				this.options = $.extend(defaultOptions, options);
			} else {
				this.options = defaultOptions;
			}

			ModalView.prototype.initialize.apply(this, arguments);
			this.$bodyEl.html(this.html);

			var html_confirm_si = '<button type="submit" id="btn-si" class="btn btn-default">Sí</button>';
			this.$footerEl.prepend(html_confirm_si);

			console.log(options);
		},

		render: function(){

			return this;
			
		},

		onModalHidden: function(){

			

		},

		confirm_si: function(){

		}
		
	});

	return ConfirmView;

});