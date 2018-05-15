define([

	'jquery',
	'config',
	'merca',


], function($, Config, Merca){

	QUnit.module('Modulo Merca', function( hooks ){

		hooks.beforeEach(function(assert){

			this.salida_return = false;

			this.obj_concurso_plano = [];
			this.obj_concurso_plano.cods_clasificaciones = 'A1A,A3D';

			this.obj_concurso_clasificado = {
				cods_clasificaciones: 'A1A,A3D',
			};

			this.obj_concurso_no_clasificado = {
				cods_clasificaciones: 'A1A,B2',
			};

		});


		QUnit.test('Función devuelve_tipo_contrato', function(assert){

			var arr_ejemplos = ['', 0, 2, 7, 9, '1'];

			for( var indice in arr_ejemplos){

				var ejemplo = arr_ejemplos[indice];

				var id_tipo_contrato = ejemplo;

				var tipo_contrato = '';

				//if( id_tipo_contrato == ''){ tipo_contrato = 'Demo';} // Este if sobra
				if( id_tipo_contrato == 0 ){ tipo_contrato = 'Demo';}
				if( id_tipo_contrato == 1 ){ tipo_contrato = 'con30';}
				if( id_tipo_contrato == 2 ){ tipo_contrato = 'con120';}
				if( id_tipo_contrato == 3 ){ tipo_contrato = 'con2000';}
				if( id_tipo_contrato == 4 ){ tipo_contrato = 'con60';}
				if( id_tipo_contrato == 5 ){ tipo_contrato = 'con6';}
				if( id_tipo_contrato == 6 ){ tipo_contrato = 'con3';}
				if( id_tipo_contrato == 7 ){ tipo_contrato = 'clasif';}
				if( id_tipo_contrato == 8 ){ tipo_contrato = 'con50';}

				//return tipo_contrato;

				//assert.ok( /(.*[of\d])$/.exec(tipo_contrato), '3 Para ' + ejemplo + ' devuelve ' + tipo_contrato );
				var resultado = /(.*[of\d])$/.exec(tipo_contrato);

				ejem_extra = ejemplo + ' como ' + typeof ejemplo;
				if( resultado ){

					assert.ok( resultado, 'Para ' + ejem_extra + ' devuelve ' + resultado[1] );

					assert.strictEqual( resultado[1], Merca.devuelve_tipo_contrato(ejemplo), 'La función devuelve ' + resultado[1] + ' con ' + ejem_extra);
					
				
				} else {

					assert.notOk( resultado, 'Para ' + ejem_extra + ' o superior no hay tipo de contrato' );
					assert.strictEqual( tipo_contrato, Merca.devuelve_tipo_contrato(ejemplo), 'La función devuelve ' + typeof tipo_contrato + ' sin valor con ' + ejem_extra );
					
				}


			}

		});

		QUnit.test('Función devuelve_tipo_soporte', function(assert){

		  	var arr_ejemplos = [0, 3, '4'];

		  	for( var indice in arr_ejemplos ){

			  	var ejemplo = arr_ejemplos[indice];

			  	var id_tipo_soporte = ejemplo;

				// Devuelve el tipo de soporte correspondiente al id_tipo_soporte
				var tipo_soporte = '';

				$.each( Config.obj_tipos_soportes, function(index, value){

					if( index == id_tipo_soporte){

						tipo_soporte = value;
						return value;
						
					}

				});

				//return tipo_soporte;
				var resultado = /^([a-z_]+)$/.exec(tipo_soporte);

				ejem_extra = ejemplo + ' como ' + typeof ejemplo;
				if( resultado ){

					assert.ok( resultado[1], 'Para ' + ejem_extra + ' devuelve ' + resultado[1] );
					assert.strictEqual( resultado[1], Merca.devuelve_tipo_soporte(ejemplo), 'La función devuelve ' + resultado[1] + ' con ' + ejem_extra );
					
				
				} else {

					assert.equal( null, resultado, 'Para ' + ejem_extra + ' no hay tipo de soporte' );
					assert.strictEqual( tipo_soporte, Merca.devuelve_tipo_soporte(ejemplo), 'La función devuelve ' + typeof tipo_soporte + ' sin valor con ' + ejem_extra );
					
				}

			}

		});

		QUnit.test('Función hash', function(assert){
			
			var resultado;
			assert.equal( 'mi_hash', Config.hash, 'El hash es el predeterminado' );

			var arr_ejemplos = [ Config.hash, undefined ];

			for( var indice in arr_ejemplos ){
				var ejemplo = arr_ejemplos[indice];

				Config.hash = ejemplo;

				if( typeof Config.hash == 'undefined' ){
					//return '';
					var resultado_negativo = '';
					assert.equal( '', resultado_negativo, 'Devuelve string vacio si no hay Config.hash' );
					//assert.equal( resultado_negativo, Merca.hash(), 'La función devuelve string vacio con ' + ejemplo );
					continue;
				}

				//return window.localStorage.getItem('hash') || Config.hash;
				resultado = window.localStorage.getItem('hash') || Config.hash;
				assert.ok( resultado, 'No se devuelve null con ' + ejemplo );

				assert.equal( resultado, Merca.hash(), 'La función funciona con ' + ejemplo );
			}

		});

		QUnit.test('Función es_concurso_clasificado', function(assert){

			concursos = [
				this.obj_concurso_plano,
				this.obj_concurso_clasificado,
				this.obj_concurso_no_clasificado
			];

			for( var concurso in concursos){

				var obj_concurso = concurso;
				
				if( !$.isPlainObject(obj_concurso) ){
					//return false;
					assert.notOk( $.isPlainObject(obj_concurso), 'Este obj_concurso es plano: ' + typeof concurso );
					
					assert.notOk( Merca.es_concurso_clasificado(obj_concurso), 'La función debería ser False si el obj_concurso no es un objeto: ' + typeof(concurso) );

					continue;
				}

				var arr_cods_clasificaciones = obj_concurso.cods_clasificaciones.split(','),
					cod_clasificacion = '';

				for( var i = 0; i < arr_cods_clasificaciones.length; i++ ){
					
					cod_clasificacion = arr_cods_clasificaciones[i];

					cod_clasificacion = cod_clasificacion.replace(/ /g,'');

					if( cod_clasificacion.length < 3){
						//return false;
						assert.ok( cod_clasificacion.length < 3, 'El codigo ' + cod_clasificacion + ' debería tener 3 caracteres' );
						
						this.salida_return = true;
						break;
					}

				}

				//return true;
				if( this.salida_return ){

					assert.notOk( Merca.es_concurso_clasificado(concurso), 'La función debería ser False para estas clasificaciones: ' + obj_concurso.cods_clasificaciones );

				} else {

					assert.ok( Merca.es_concurso_clasificado(concurso), 'La función debería ser True para estos cpv: ' + obj_concurso.cods_clasificaciones );

				}

			}

		});

	});
	
});