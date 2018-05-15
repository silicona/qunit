define([
	
	'jquery',
	'underscore',
	'config',
	'app/views/app/appView'

], function($, _, Config, AppView){

	QUnit.module('Vista de App', function(hooks){

		var vista, contenedor;

		hooks.beforeEach(function(assert){

			var Vista = AppView;
			assert.ok( _.isFunction(Vista.prototype.coger_ruta_previa) && _.isFunction(Vista.prototype.setPage), 'La vista es AppView' );
		
			vista = new AppView();
			contenedor = $('<div id="vista_general"></div>');
			contenedor.append(vista.el);
			vista.render();

		});

		QUnit.test('Test Vista de App', function(assert){

			assert.ok( contenedor.find('.logo'), 'El logo sale en la vista' );

		});

	});

	QUnit.module('Metodos de AppView', function(hooks){

		var vista, contenedor;

		hooks.beforeEach(function(assert){

			vista = new AppView();
			contenedor = $('#qunit-fixture');
			contenedor.append(vista);
			vista.render();

			//vista = app.views;

		});

		QUnit.skip('Metodo coger_ruta_previa', function(assert){

			console.log('Vista:', vista);
			assert.ok( _.isFunction(vista.coger_ruta_previa) && _.isFunction(vista.setPage), 'La vista es AppView' );

			assert.equal( '', Config.ruta_previa );
			vista.coger_ruta_previa();
			assert.equal( '', Config.ruta_previa );

		});

		QUnit.test('Metodo setPage a inicio', function(assert){

			vista.setPage('inicio');
			console.log(Config);
			assert.ok( contenedor.find('#boton_soporte'), "El boton de soporte está en la vista");

		});

		QUnit.test('Metodo setPage a no encontrado', function(assert){

			vista.setPage('jajaja');
			//console.log(Config);
			assert.ok( contenedor.find('.texto_no_encontrado'), "no_encontrado está en la vista");

		});

	});



});