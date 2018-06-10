define([

	'jquery',
	'funciones',
	'app/config',
	'app/views/lopd/lopdView',

], function ( $, Fx, Config, LopdView ){

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

		QUnit.assert.claveEnObjeto = function( clave, objeto, mensaje ){

			var actual = Object.keys(objeto).indexOf(clave) != - 1;

			this.pushResult({
				result: actual === true,
				actual: actual,
				message: mensaje
			});

		};

		var inspect = function(objeto){
			var salida = '';
			for( var i in objeto){

				var sal = '';
				if( typeof objeto[i] == 'object' ){
					sal = Fx.objeto_a_string(objeto[i]);
				} else {
					sal = objeto[i];
				}

				salida += i + ' - ' + sal + " // ";
			}

			return salida;
		}

		QUnit.test("Test Vista de formulario", function (assert) { 

			var pestanas = contenedor.find('.tabs_lopd li');

			assert.equal( pestanas.length, 8, 'Todas las pestañas en la vista' );

		});

		QUnit.test('Test Pestaña inicial- Sin valor', function(assert){

			var enlace_pesta = $(contenedor.find('.tabs_lopd li')[1]);

			var pestana = contenedor.find('.tabs_lopd .active').text();
			assert.strictEqual( pestana, 'Su empresa', 'La pestaña inicial debería ser "Su empresa"');

			//enlace_pesta.trigger('click');
			var a = vista.$('a[href="#tab2"]').trigger('click');
			console.log('aa', a);
			//var pestana = $('a[aria-expanded="true"]', vista).parent();
			assert.strictEqual( pestana, 'Su empresa', 'La pestaña inicial debería ser "Su empresa"');
			

			//var pesta = vista.$('#tab2').hasClass('active');

			//var pesta = contenedor.find('.tabs_lopd .active').text();
			//assert.ok( pesta, 'Tipo_sino esta visible' );
			// assert.deepEqual( pesta, 'Clientes', 'La pestaña tras el click debería ser "Clientes"');
		});

		
		QUnit.test('Click Boton Next', function(assert){

			var pestana = contenedor.find('.tabs_lopd .active').text();
			assert.deepEqual( vista.posicion, 1, 'La posicion inicial es 1');
			assert.deepEqual( pestana, 'Su empresa', 'La pestaña inicial debería ser "Su empresa"');

			vista.$('#botones_ant_sig .next').trigger('click');
			assert.strictEqual( vista.posicion, 2, 'La posicion tras el click es 2');

			var pestana = contenedor.find('.tabs_lopd .active').text();
			assert.ok( true, 'Pestaña: ', vista.$('.tabs_lopd .active'));
			
			vista.$('#botones_ant_sig .next').trigger('click');
			assert.strictEqual( vista.posicion, 3, 'La posicion tras el click es 3');


			vista.posicion = 6;
			vista.$('#botones_ant_sig .next').trigger('click');
			assert.strictEqual( vista.posicion, 7, 'Desde posicion 6, tras el click es 7');

			vista.$('#botones_ant_sig .next').trigger('click');
			assert.strictEqual( vista.posicion, 8, 'La posicion tras el click es 8');

			vista.$('#botones_ant_sig .next').trigger('click');
			assert.strictEqual( vista.posicion, 8, 'La posicion no va más allá de 8');

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
				posicion = 8;
				console.log('Last', posicion);
			}

			if(posicion < 1){ posicion = 1;}
			if(posicion > 8){ posicion = 8;}			
			//console.log('posicion', posicion);

			//this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			assert.deepEqual( 2, posicion, 'This posicion final es 2');

			vista.determinar_posicion(e);
			assert.deepEqual( 2, posicion, 'This posicion final es 2');
			assert.deepEqual( posicion, vista.posicion, 'La funcion se rie');
			
			this.posicion = posicion;

			//this.establecer_hash();

		});

		QUnit.test('Funcion abrir_opciones', function(assert){

			var evento = vista.$('#clientes_sino_1').trigger('click');
			console.log('Evento opciones: ', evento);

			// var seccion = $(e.currentTarget).parents()[1].id.split('_')[0];
			// //console.log('valor:',e.currentTarget.value);
			// if(e.currentTarget.value == 1){

			// 	this.registrar_no(seccion);
			// } else {

			// 	this.$('#' + seccion + '_extra').show(600);

			// 	this.anadir_a_array( this.secciones_si, seccion )

			// 	this.eliminar_de_array( this.secciones_no, seccion );
			// }
		});


		QUnit.test('Funcion actualizar_obj_estru', function(assert){

			var obj_estru = {},
				//esto = this,
				esto = vista,
				errores = ['<br>'];

			esto.$('#estru_electronica').attr('checked', 'checked');
			esto.$('#estru_acceso_fisico').attr('checked', 'checked');
			
			esto.$('#estru_imagenes_1').attr('checked', 'checked');
			esto.$('#estru_borrado_2').attr('checked', 'checked');
			
			esto.$('#estru_propio_2').attr('checked', 'checked');
			esto.$('#estru_backup_2').attr('checked', 'checked');
			esto.$('#estru_mantenimiento_1').attr('checked', 'checked');
			
			esto.$('#estru_servidores').attr('value', '2');
			esto.$('#estru_discos').attr('value', '2');
			esto.$('#estru_pendrives').attr('value','2');
			esto.$('#estru_ordenadores').attr('value', '2');

			$( '.campo.col-sm-6', esto.$('#form_lopd_estru') ).each(function(indice, campo){

				var marcado = false;

				$( 'input[type=checkbox]', campo ).each(function(indice, input){

					if( this.checked ){

						marcado = true;
						obj_estru[$(this).attr('name')] = this.value;
					}
				});

				$( 'div.radio-group', campo ).each(function(indice, grupo){
					
					if( grupo.id == 'estru_borrado' ){

						var no_grabacion = esto.$('#estru_imagenes input:checked').val() == 2; 
						
						if( no_grabacion ){
							marcado = true;
							return true;
						}
					}
 	
					$('input', grupo).each(function(indice, input){
						

						if( this.checked ){

							marcado = true;
							obj_estru[$(this).attr('name')] = this.value;
						}
					});
				});

				$( 'input[type=text]', campo ).each(function(indice, input){

					marcado = true;
					if( this.value ){

						obj_estru[$(this).attr('id')] = this.value;

					} else {

						var nom = $(this).attr('id').replace('estru_', '');
						errores.push( 'Falta el dato ' + Fx.capitalize(nom) + ' del campo de Dispositivos de Su Estructura.');
					}
				});

				if( !marcado ){

					var nombre = $(this).attr('id').replace('campo_', '');

					switch( nombre ){

						case 'datos':
							nombre = 'almacenaje de datos';
							break;

						case 'acceso':
							nombre = 'tipo de acceso';
							break;

						case 'imagenes':
							nombre = 'grabación de imágenes';
							break;

						case 'borrado':
							nombre += ' de imágenes';
							break;

						case 'discos':
							nombre += 'discos duros';
							break;

						case 'propio':
							nombre = 'almacenaje propio';
							break;
					}

					errores.push( 'Falta contestar el campo ' + Fx.capitalize(nombre) + ' de Su Estructura.<br>');
				}


			});

			if( errores.length > 1 ){

				//return errores;
				assert.ok( true, 'Errores: ' + JSON.stringify(errores) );
			}

			// return obj_estru;
			var resultado = obj_estru;

			assert.claveEnObjeto('estru_electronica', resultado, 'El resultado tiene la clave Estru_electronica');
			assert.claveEnObjeto('estru_imagenes', resultado, 'El resultado tiene la clave Estru_imagenes');

			assert.deepEqual( vista.actualizar_obj_estru(), resultado, 'La función recoge el resultado');
		});


		QUnit.test('Funcion actualizar_obj_lopd', function(assert){

			vista.secciones_si = ['candidatos', 'empleados'];
			vista.secciones_no = ['clientes', 'futuros', 'proveedores'];

			vista.$('#empleados_sino_1').attr('checked', 'checked');
			vista.$('#empleados_academicos').attr('checked', 'checked');
			vista.$('#empleados_gestion_1').attr('checked', 'checked');
			vista.$('#empleados_formar_2').attr('checked', 'checked');
			vista.$('#candidatos_sino_1').attr('checked', 'checked');
			//vista.$('#candidatos_academicos').attr('checked', 'checked'); // Anulados para crear errores

			assert.ok( vista.$('#empleados_academicos').is(':checked'), 'Un check de empleados está pulsado' );
			assert.ok( vista.$('#empleados_gestion_1').is(':checked'), 'Un radio de empleados está pulsado' );
			assert.ok( vista.$('#candidatos_sino_1').is(':checked'), 'Un sino esta pulsado' );


				// Prepara el obj de datos
			//var esto = this;
			var esto = vista;
			var obj_lopd = {};
			var errores = ['<br>'];

			var sec_error = vista.comprobar_seccion_sin_marcar();
			errores = errores.concat( sec_error );

			assert.equal( errores.length, 1,'Si se pulsan todos los lopd_sino, comprobar devuelve un array vacio');

			this.secciones_si = vista.secciones_si;
			this.secciones_no = vista.secciones_no;

			// seccion si
			$.each(this.secciones_si, function(index, seccion){

				var ni_una_resp = true;
				var radio_inicial = esto.$('#' + seccion + '_sino input:checked').val();
				obj_lopd[seccion + '_sino'] = radio_inicial;
				//obj_lopd[seccion + '_sino'] = 1;

				$('input[type=checkbox]', esto.$('#' + seccion + '_extra')).each(function(indice, input){

					if( this.checked ){ 
						ni_una_resp = false;
						obj_lopd[$(this).attr('id')] = this.value;
					}
				});

				assert.claveEnObjeto(seccion + '_sino', obj_lopd, 'El sino está en el obj_lopd' );

				$('div.radio-group input', esto.$('#' + seccion + '_extra')).each(function(indice, input){
					
					if( this.checked ){
						ni_una_resp = false;	
						obj_lopd[$(this).attr('name')] = this.value;
					}
				});

				if( ni_una_resp ){

					errores.push( 'Debe marcar alguna opción de la pestaña ' + Fx.capitalize(seccion) + '.<br>');
				}
				
			});

			if( errores.length > 1 ){ 
			
				//return errores; 
				assert.ok( true, 'Error provocado: ' + Fx.objeto_a_string(errores) );
			}

			// secciones no
			$(this.secciones_no).each(function(indice, seccion){
				
				obj_lopd[seccion + '_sino'] = 2;
			});
			
			//return obj_lopd;
			var resultado = obj_lopd;

			//assert.ok( true, 'Resultado: ' + inspect(resultado) );
			assert.claveEnObjeto( 'empleados_sino', resultado, 'El resultado tiene el dato de empleados_sino' );
			assert.deepEqual( vista.actualizar_obj_lopd(), errores, 'La función devuelve los errores provocados del test' );
			
			vista.$('#candidatos_academicos').attr('checked', 'checked'); // Anulado para crear errores
			resultado['candidatos_academicos'] = 'checked';
			assert.deepEqual( vista.actualizar_obj_lopd(), resultado, 'La función devuelve el resultado correcto' );
		});


		QUnit.test('Funcion comprobar_seccion_sin_marcar', function(assert){

			var a = [ [
						['empleados', 'proveedores'],
						['clientes', 'futuros', 'candidatos']
					],
			
					[
						['empleados'],
						['clientes', 'futuros', 'candidatos']
					] ];


			for(var i in a){

				var correcto = i == 0;
				//assert.ok( correcto, 'Correcto lo es');

				this.secciones_si = a[i][0];
				this.secciones_no = a[i][1];
				//assert.equal( this.secciones_si, [], 'secc si:');

				// Detectamos las secciones con sino sin contestar y devolvemos las erroneas
				var errores = [],
					secciones = Fx.objeto_a_array( Config.obj_lopd_secciones ),
					sec_error = secciones.filter( seccion => this.secciones_si.indexOf(seccion) == - 1 );
					
				sec_error = sec_error.filter( seccion => this.secciones_no.indexOf(seccion) == - 1 );

				if( sec_error.length > 0){

					for( var indice in sec_error) {

						if( sec_error[indice] == 'futuros') { sec_error[indice] = 'futuros clientes'}

						errores.push( 'La primera pregunta de ' + Fx.capitalize(sec_error[indice]) + ' no está respondida.<br>' );
					}

					errores.push['<br>'];
				}

				//return errores;
				var resultado = errores;

				vista.secciones_si = this.secciones_si;
				vista.secciones_no = this.secciones_no;

				if( correcto ){

					assert.deepEqual( resultado, [], 'El resultado correcto es array vacio' );
					assert.deepEqual( vista.comprobar_seccion_sin_marcar(), resultado, 'La función devuelve el resultado correcto' );
				} else {

					assert.ok( /Proveedores/.test(resultado[0]), 'El resultado detecta la ausencia de proveedores' );
					assert.deepEqual( vista.comprobar_seccion_sin_marcar(), resultado, 'La función detecta la ausencia de proveedores' );
				}


			}

		});


	});

});