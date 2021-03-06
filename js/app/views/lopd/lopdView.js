define([

	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/formulario',
	'app/calidad',

	'app/views/lopd/html/lopdViewHtml'

], function( $, _, backbone, Fx, Config, Formulario, Calidad, LopdViewHtml ){
	
	'use strict';

	var LopdView = Backbone.View.extend({

		html: LopdViewHtml['vista'],

		views: [],

		posicion: 1,

		secciones_no: [],
		secciones_si: [],

		events: {

			'click .lopd_sino input' : 'abrir_opciones',
			'click .lopd_sino #no' : 'registrar_no',

			'click .tabs_lopd li a' : 'cambiar_posicion',
			'click #botones_ant_sig ul.pagination li' : 'determinar_posicion',

			'keypress .solo_numero': 'escribir_solo_numeros',
			'click #btn_procesar' : 'procesar',
		},

		initialize: function(){

			Calidad.cleanUp(this);

			// Establecer hash para que al pulsar atrás no se pierdan los datos
			//if( window)
			

			$(window).bind('hashchange', function(){
			    var posicion = window.location.hash.split('/')[1];
			    console.log('En Evento hashchange posicion:', posicion);

			    if( this.posicion != posicion ){

			    	this.posicion = posicion;
			    	
			    }
			    console.log( 'Hashchange This posicion', this.posicion );
			    this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			});

			//return this;
		},

		render: function(){

			var esto = this;
			this.$el.html(this.html);

			Formulario(this);

			//window.setTimeout(function(){
			if( window.location.hash === '#lopd'){

				window.location.hash = '#lopd/1';
			}
			//},1000);
			// 			// Establecer hash para que al pulsar atrás no se pierdan los datos
			// window.setTimeout(function(){
			// 	window.location.hash = '#lopd/1';
			// },100);
			

			// $(window).bind('hashchange', function(){
			//     var posicion = window.location.hash.split('/')[1];
			//     this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			// });

			//console.log('el', this.el);

			return this;

		},


		abrir_opciones: function(e){

			var seccion = $(e.currentTarget).parents()[1].id.split('_')[0];
			var valor = e.currentTarget.value;
			if(valor == 2){

				this.registrar_no(seccion);
			} 

			if(valor == 1){

				this.$('#' + seccion + '_extra').show(600);

				this.anadir_a_array( this.secciones_si, seccion )

				this.eliminar_de_array( this.secciones_no, seccion );
			}
		},

		registrar_no: function(seccion){

			//var seccion = $(e.currentTarget).parents()[1].id.split('_')[0]

			this.$('#' + seccion + '_extra').hide(200);

			this.anadir_a_array(this.secciones_no, seccion);

			this.eliminar_de_array(this.secciones_si, seccion);
		},

		anadir_a_array: function( array, elemento ){

			var i = array.indexOf(elemento);

			// Evitamos la duplicacion
			if( i === -1 ){ 
				array.push(elemento) 
			}
		},

		eliminar_de_array: function(array, elemento){

			var i = array.indexOf(elemento);

			// Evitamos el borrado accidental con -1
			if( i !== -1 ){
				array.splice(i, 1);
			}

		},

		anadir_a_objeto: function(objeto_final, objeto_a_anadir){

			for( var clave in objeto_a_anadir ){

				if( objeto_final[clave] == undefined ){

					objeto_final[clave] = objeto_a_anadir[clave];
				}
			};

			return objeto_final;
		},

		cambiar_posicion: function(e){

			this.posicion = $(e.currentTarget).attr('data-pos');
			
		},

		determinar_posicion: function(e){

			// console.log('determinar', e);
			// console.log('Esto', this);
			// console.log('Esto Tabindex', this.el.tabIndex);
			e.preventDefault();
			//e.stopPropagation();

			var className = e.currentTarget.className,
				posicion = this.posicion;

			//console.log('Posicion antes', posicion);
			
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

			this.posicion = posicion;
			this.establecer_hash();

			//console.log( 'Posicion final', this.posicion );
			//this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
		},

		establecer_hash: function(){

			//console.log('posicion hash', this.posicion);
			//console.log('window.location.hash', window.location.hash);

			window.location.hash = window.location.hash.split('/')[0] + '/' + this.posicion;
			//console.log('window.location.hash POST', window.location.hash);
		},

		escribir_solo_numeros: function(e){

			var permitidos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			if( permitidos.indexOf(e.key) == - 1 ){
				return false;
			}

			return true;
		},


		/*
		 * PROCESAMIENTO
		 */

		procesar: function(e){
			
			e.preventDefault();

			var esto = this,
				error = '',
				campo_resp = esto.$('#resp_procesar_lopd');

			campo_resp.html('');

			var obj_form = Calidad.actualizar_obj_form( '#form_lopd_empresa' );
			$.each( obj_form, function(id, valor){
				//console.log('Valor: ', valor);

				if( id == 'nombre_responsable' || id == 'descripcion' ){ return true; }

				if( valor == '' || valor == 0 ){
					error += 'El campo ' + Fx.capitalize(id) + ' de Su Empresa no está completado.<br>';
				}

				if( id == 'telefono' ){

					if( valor.length != 9 ){

						error += 'El valor del campo ' + Fx.capitalize(id) + ' de Su Empresa no es correcto.<br>';
					}
				}

				if( id == 'cp' ){

					if( valor.length != 5 ){
						
						error += 'El valor del campo ' + Fx.capitalize(id) + ' de Su Empresa no es correcto.<br>';
					}
				}

				if( id == 'email' || id == 'email_lopd' ){

					var reg = /[\w\.]+@([\w\.]+)?[\w]\.\w{2,5}/;
					if( !reg.test(valor) ){
						
						error += 'El valor del campo ' + Fx.capitalize(id) + ' de Su Empresa no es correcto.<br>';
					}
				}

			});

			var obj_estru = this.actualizar_obj_estru();

			if( Array.isArray(obj_estru) ){ error += obj_estru.join(''); }

			var obj_lopd = this.actualizar_obj_lopd();
			
			if( Array.isArray(obj_lopd) ){ error += obj_lopd.join(''); }

			if( error != '' ){

				campo_resp.html( Fx.bs_alert( 'Rellene los datos que faltan para poder procesar los documentos, por favor.<br><br>' + error, 'danger') );
				return false;
			}
			
			obj_form = this.anadir_a_objeto( obj_form, obj_estru );
			obj_form = this.anadir_a_objeto( obj_form, obj_lopd );
			//obj_lopd = this.anadir_a_objeto( obj_estru, obj_lopd );
			//console.log('Obj_form final:', obj_form);

			this.guardar_lopd(obj_form);
			//this.guardar_lopd(obj_form, obj_lopd);



			//console.log('form:', this.$('#form_lopd_empresa'));
			//console.log('Obj form:', obj_form);
			//var inter = JSON.stringify( obj_form );


			//inter += JSON.stringify( obj_lopd );
			//console.log('Obj LOPD:', obj_lopd);

			//this.$('#resp_procesar_lopd').html( 'Llegamos' );
			//campo_resp.append( inter );


			//var cod_contratacion = this.$('#cod_contratacion').val();

			//this.$('#resp_procesar_lopd').empty();
			//Calidad.spinner(this, '##resp_procesar_lopd');

			// if( (cod_contratacion != 'CLASIF') && (cod_contratacion != 'DEMO01') && (cod_contratacion != 'CON30') && (cod_contratacion != 'CON60') && (cod_contratacion != 'CON120') && (cod_contratacion != 'CON2000') && (cod_contratacion != 'CON6') && (cod_contratacion != 'CON3') && (cod_contratacion != 'CON50') ){

			// 	this.$('#resp_contratar')
			// 		.empty()
			// 		.html( Fx.bs_alert('Por favor, introduzca un código de contratación válido.', 'danger' ) );
				
			// 	return false;
			// }

			
				
				//Fx.i('Iniciando la contratación');
				// this.$('#btn_guardar_cliente').trigger('click');

				//this.guardar_cliente();

		},

		guardar_lopd: function(obj_form){

			var esto = this,
				//resp_lopd,
				campo_resp = this.$('#resp_procesar_lopd'),
				resp = $.ajax({

					type: 'POST',
					url: Config.base_ajax + 'lopd.php',
					data: {
						accion: 'guardar_form',
						hash: Calidad.hash(),
						obj_form: obj_form,
					}
				});

			resp.done(function(mi_json){

				if( mi_json != ''){

					var json_datos = $.JSONparse( mi_json );

					if( json_datos != null || json_datos.status == 'ok'){

						// resp_lopd = $.ajax({

						// 	type: 'POST',
						// 	url: config.base_ajax + 'lopd.php',
						// 	data: {
						// 		accion: 'guardar_lopd',
						// 		hash: Calidad.hash();
						// 		obj_form: obj_lopd,
						// 	}
						// });
						campo_resp.html( Fx.bs_alert('Error al guardar los datos: ' + json_datos.mensaje, 'danger') );

					} else {

						error = json_datos.error || 'La respuesta es null';
						campo_resp.html( Fx.bs_alert('Error al guardar los datos: ' + error, 'danger') );
					}
				}

			});

			// resp_lopd.done(function(mi_json){

			// 	if( mi_json != ''){

			// 		var json_datos = $.JSONparse( mi_json );

			// 		if( json_datos != null || json_datos.status == 'ok'){

			// 			var mensaje = 'Sus datos se han guardado correctamente. Un técnico los revisará y se pondrá en contacto con usted próximamente.';
			// 			campo_resp.html( Fx.bs_alert(mensaje, 'success') );

			// 		} else {

			// 			campo_resp.html( Fx.bs_alert('Error al guardar los datos: ' + json_datos.error, 'danger') );
			// 		}
			// 	}
			// })
		},

		actualizar_obj_estru: function(){

			var obj_estru = {},
				esto = this,
				errores = ['<br>'];

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
						errores.push( 'Falta el dato ' + Fx.capitalize(nom) + ' del campo de Dispositivos de Su Estructura.<br>');
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

				return errores; 

			} else {

				return obj_estru;
			}
		},


		actualizar_obj_lopd: function(){

			// Prepara el obj de datos
			var esto = this;
			var obj_lopd = {};
			var errores = ['<br>'];

			var sec_error = this.comprobar_seccion_sin_marcar();
			errores = errores.concat(sec_error);

			$.each(this.secciones_si, function(index, seccion){

				var ni_una_resp = true;
				//obj_lopd[seccion] = {};
				obj_lopd[seccion + '_sino'] = '1';

				$( 'input[type=checkbox]', esto.$('#' + seccion + '_extra') ).each(function(indice, input){

					if( this.checked ){ 
			
						ni_una_resp = false;
						obj_lopd[$(this).attr('id')] = this.value;
					}

				});

				$( 'div.radio-group input', esto.$('#' + seccion + '_extra') ).each(function(indice, input){
					
					if( input.checked ){

						ni_una_resp = false;	
						obj_lopd[$(this).attr('name')] = this.value;
					}

				});

				if( ni_una_resp ){

					errores.push( 'Debe marcar alguna opción de la pestaña ' + Fx.capitalize(seccion) + '.<br>');
				}
				
			});

			//console.log('Errores: ', errores);
			if( errores.length > 1 ){ return errores; }

			// secciones no
			$(this.secciones_no).each(function(indice, seccion){
				
				obj_lopd[seccion + '_sino'] = 2;
			});
			
			return obj_lopd;
		},


		comprobar_seccion_sin_marcar: function(){

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
			
			return errores;
		},


	});

	return LopdView;

});