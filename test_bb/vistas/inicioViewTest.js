define([

	'jquery',
	/*
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/merca',*/
	// 'app/app',
	// 'mustache',
	'app/views/inicio/inicioView',
	'app/views/inicio/html/inicioViewHtml',


//],function (require) {
],function (
	$, //_, Backbone, Fx, Config, Merca, 
	InicioView
	//, InicioviewHtml
	){

	// Import depdendencies (note you can use relative paths here)
	//var InicioView = require("./inicioView");

	var q = QUnit.module("Modulo inicioView", function(hooks){
		//QUnit.start();

		var vista, 

			contenedor,
			fixture = $('#qunit-fixture');

		hooks.beforeEach( function(assert){
			var VistaInicio = InicioView;
			assert.ok( _.isFunction(VistaInicio.prototype.setElement) && _.isFunction(VistaInicio.prototype.delegateEvents), 'La vista es Backbone' );


			contenedor = $('<div class="vista-general"></div>');
			fixture.append( contenedor );

			vista = new VistaInicio();
			contenedor.append(vista.el);
			vista.render();
		});

		QUnit.test("Test Vista de inicio", function (assert) { 

			//assert.equal(VistaInicio, false);
			//assert.ok( _.isFunction(VistaInicio.prototype.setElement) && _.isFunction(VistaInicio.prototype.delegateEvents), 'La vista es Backbone' );
			assert.equal( contenedor.find('a').length, 7, 'Hay botones en la vista' );

		});

	});

	return q;
	
	// QUnit.test("isSuitibleFor - same age supplied, returns true", function () { 

	// 	QUnit.equal(PegiRatings.PEGI_18.isSuitibleFor(18), true);

	// });
	
	// QUnit.test("isSuitibleFor - older age supplied, returns true", function () { 

	// 	QUnit.equal(PegiRatings.PEGI_18.isSuitibleFor(19), true);

	// });
});

// define([

// 	'jquery',
// 	'qunit',
// 	'app/views/inicio/inicioView'

// ], function($, QUnit, InicioView){

// 	QUnit.module( 'Vista de inicio', function( hooks ) {

// 		var vista, 
// 			$ = jQuery,
// 			contenedor,
// 			fixture = $('#qunit-fixture');

// 		hooks.beforeEach( function( assert ){

// 			var ajax = assert.async(1);

// 			var Vista = InicioView;
// 			// var Vista = window.Base.Vista.Inicio;
// 			assert.ok( ! _.isUndefined( Vista ), 'Vista Inicio definida' );
// 			assert.ok( _.isFunction(Vista.prototype.setElement ) && _.isFunction( Vista.prototype.delegateEvents ), 'La vista es Backbone');
		
// 			contenedor = $('#vista-general');
// 			fixture.append( contenedor );

// 			// Coleccion = window.Base.Coleccion.Cartera;
// 			// coleccion = new Coleccion();
// 			// coleccion.fetch();

// 			// setTimeout(function(){
// 			// 	assert.ok( _.size(coleccion) > 0, 'Coleccion rellenada')
// 			// 	ajax();
// 			// }, 1000);
			
// 			vista = new Vista({ 
// 				id: 'seccion_inicio',
// 				className: 'seccion_inicio'
// 			});
// 			contenedor.append(vista.el);
// 			vista.render();

// 		});
		
// 		QUnit.test( 'La vista de inicio recibe el listado de clientes', function( assert ){

// 			assert.ok( contenedor.find('tr').length > 1, 'Hay clientes en la vista' );

// 		});

// 	});

// //});