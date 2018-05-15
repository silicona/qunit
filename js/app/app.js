define([

	'app/views/app/appView',
	'app/router/router',
	'app/templates',
	'app/config'


], function (AppView, Router, Templates, Config) {
	
	'use strict';
	
	var initialize = function(){

		var appView = new AppView();

		$.ajaxSetup({ 
			cache: false,
			error: function( jqXHR, textStatus, errorThrown ) {

	          if (jqXHR.status === 0) {

	            console.log('Error de conexión: verifique su conexión a Internet.');

	          } else if (jqXHR.status == 404) {

	            console.log('El recurso solicitado no existe [404]');

	          } else if (jqXHR.status == 500) {

	            console.log('Error interno del servidor [500].');

	          } else if (textStatus === 'parsererror') {

	            console.log('Error en el json de respuesta.');

	          } else if (textStatus === 'timeout') {

	            console.log('El servidor no responde. Por favor, inténtelo otra vez.');

	          } else if (textStatus === 'abort') {

	            console.log('Solicitud abortada.');

	          } else {

	            console.log('Error no identificado: ' + jqXHR.responseText);

	          }

	        }

		});

		$('#app').append(appView.render().el);

		// the appView will be passed to the initialize method of the router
		var router = new Router(appView);
		
		// Start history so Backbone can monitor hash link actions
		Backbone.history.start();	

	};

	return {
		initialize: initialize
	};

});
