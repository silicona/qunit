define([

	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/calidad',
	'app/views/inicio/html/inicioViewHtml'

], function( $, _, Backbone, Fx, Config, Calidad, InicioViewHtml ){
	
	var InicioView = Backbone.View.extend({

		html: InicioViewHtml['inicio'],

		views: [],

		events: {

			'click #boton_soporte' : 'ver',
		},

		initialize: function(){

			Calidad.cleanUp(this);

			var esto = this;

		},

		render: function(){

			this.$el.html(this.html);
			//console.log('En Vista inicio: ', this.$el);

			if( Config.hash == '' || Config.hash == 'mi_hash' ){
				
				Calidad.ir_a_login();
			}

			console.log( 'Desde inicio- config: ', Config);

			if( Calidad.es_admin() || Calidad.es_tecnico() ){
				this.$('#boton_cliente_datos').remove();
			}

			if( Calidad.es_cliente() ){
				this.$('#boton_cliente').remove();
			}

			return this;

		},

		ver: function(e){
			e.preventDefault();
			//console.log('dentro');
		}

	});

	return InicioView;
	
});