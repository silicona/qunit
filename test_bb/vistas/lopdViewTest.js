define([

	'jquery',
	'app/views/lopd/lopdView',

], function ( $, LopdView ){

	QUnit.module("Modulo LOPD", function(hooks){

		var vista, 
			contenedor,
			fixture = $('#qunit-fixture');

		hooks.beforeEach( function(assert){
			
			var VistaInicio = LopdView;
			assert.ok( _.isFunction(VistaInicio.prototype.abrir_opciones) && _.isFunction(VistaInicio.prototype.registrar_no), 'La vista es lopdView' );

			contenedor = $('<div class="vista-general"></div>');
			fixture.append( contenedor );

			vista = new VistaInicio();
			contenedor.append(vista.el);
			vista.render();

			this.posicion = vista.posicion;

			this.evento = {

				currentTarget: { className: '' },

				preventDefault: function(){},

				stopPropagation: function(){}
			}
		});

		QUnit.test("Test Vista de formulario", function (assert) { 

			var pestanas = contenedor.find('.tabs_lopd li');

			assert.equal( pestanas.length, 9, 'Todas las pestañas en la vista' );

		});

		QUnit.test('Click Pestaña', function(assert){

			var enlace_pesta = $(contenedor.find('.tabs_lopd li')[1]);

			var pestana = contenedor.find('.tabs_lopd .active').text();
			assert.deepEqual( pestana, 'Su empresa', 'La pestaña inicial debería ser "Su empresa"');

			enlace_pesta.trigger('click');
			// vista.$('.tabs_lopd')[1].trigger('click');
			
			var pesta = vista.$('#tab2').hasClass('active');

			//var pesta = contenedor.find('.tabs_lopd .active').text();
			assert.ok( pesta, 'Tipo_sino esta visible' );
			// assert.deepEqual( pesta, 'Clientes', 'La pestaña tras el click debería ser "Clientes"');
		});

		
		QUnit.test('Click Boton Next', function(assert){

			var pestana = contenedor.find('.tabs_lopd .active').text();
			assert.deepEqual( vista.posicion, 1, 'La posicion inicial es 1');
			assert.deepEqual( pestana, 'Su empresa', 'La pestaña inicial debería ser "Su empresa"');

			vista.$('#botones_ant_sig .next').trigger('click');

			pestana = contenedor.find('.tabs_lopd .active').text();
			assert.deepEqual( vista.posicion, 2, 'La posicion inicial tras el click es 2');

			//assert.deepEqual( pestana, 'Clientes', 'La pestaña tras el click debería ser "Clientes"');

		});


		QUnit.test('Función determinar_posicion', function(assert){

			// var e = {
			// 	currentTarget: {
			// 		className: 'next'
			// 	},

			// 	preventDefault: function(){},

			// 	stopPropagation: function(){}
			// }

			var e = this.evento;
			e.currentTarget.className = 'next';


			/*e.preventDefault();
			e.stopPropagation();*/

			// this.check_btn_demo();

			// if( this.check_iso() == false ){
			// 	this.posicion = 1;
			// 	return false;
			// }

			//var className = 'next',
			var className = e.currentTarget.className,
				posicion = this.posicion;

			assert.deepEqual( posicion, 1, 'This posicion inicial es 1');
			
			if( className.indexOf('previous') > -1 ){
				posicion--;
				console.log('Previous', posicion);
			}

			if( className.indexOf('next') > -1 ){
				posicion++;
				console.log('Next', posicion);
			}

			if( className.indexOf('first') > -1 ){
				posicion = 1;
				console.log('First', posicion);
			}

			if( className.indexOf('last') > -1 ){
				posicion = 9;
				console.log('Last', posicion);
			}

			if(posicion < 1){ posicion = 1;}
			if(posicion > 9){ posicion = 9;}			
			//console.log('posicion', posicion);

			//this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			assert.deepEqual( 2, posicion, 'This posicion final es 2');

			vista.determinar_posicion(e);
			assert.deepEqual( 2, posicion, 'This posicion final es 2');
			assert.deepEqual( posicion, vista.posicion, 'La funcion se rie');
			
			this.posicion = posicion;

			//this.establecer_hash();



		})

	});

});