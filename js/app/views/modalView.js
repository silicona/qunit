define([
	
	'jquery',
	'underscore',
	'backbone',
	'app/templates',
	'bootstrap',
	'mustache',
	'funciones',
	'app/merca',

], function($, _, Backbone, Templates, Bootstrap, Mustache, Fx, Merca){

	'use strict';

	var ModalView = Backbone.View.extend({
		
		events:{

		},

		id: 'modal-view',

		initialize: function(){

			// size options
			var size = this.options.size || 'modal-lg';
			if(size == 'small') {size = 'modal-sm';}
			if(size == 'large') {size = 'modal-lg';}

			var texto_cerrar = this.options.texto_cerrar  || 'No',
				title        = this.options.title         || '',
				appendTo     = this.options.appendTo      || 'body';

			var html = Mustache.to_html(Templates['modal'],{
				title: title,
				size: size,
				texto_cerrar: texto_cerrar
			});

			this.$el.html(html);
			this.$modalEl   = this.$('.modal');

			this.$titleEl   = this.$('.modal-title');
			this.$bodyEl    = this.$('.modal-body');
			this.$footerEl  = this.$('.modal-footer');

			$(appendTo).append(this.el);

		},

		render: function(){
			
			// modal el el método modal de bootstrap
			this.$modalEl.modal({
				show: false,
				keyboard: false
			});

			return this;

		},

		show: function(){

			$('.tooltip').tooltip('hide');
			
			var esto = this;
			
			this.$modalEl.modal('show');
			
			this.$modalEl.on('hidden.bs.modal', function(){
				esto.onModalHidden();
			});

		},


		onModalHidden: function(e){
			this.$modalEl.off('hidden.bs.modal'); // remove event listener
			this.remove();
		}

	});

	return ModalView;

});