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
			'click #h2': 'oo',
			'click .lopd_sino input' : 'abrir_opciones',
			'click .lopd_sino #no' : 'registrar_no',
			'click #botones_ant_sig ul.pagination li' : 'determinar_posicion',
			'keypress .solo_numero': 'escribir_solo_numeros',
			//'click .tabs_lopd li a' : 'establecer_hash',

			'click #btn_procesar' : 'procesar',

		},

		initialize: function(){

			Calidad.cleanUp(this);

			// Establecer hash para que al pulsar atrás no se pierdan los datos
			//if( window)
			

			$(window).bind('hashchange', function(){
			    var posicion = window.location.hash.split('/')[1];

			    console.log('En Evento hashchange posicion:', posicion)
			    this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			});

			//return this;
		},

		render: function(){

			var esto = this;
			this.$el.html(this.html);

			Formulario(this);

			//window.setTimeout(function(){
			if( window.location.hash == '#lopd'){

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

		oo: function(){
			console.log('Secciones', this.secciones_si);
		},

		abrir_opciones: function(e){

			var seccion = $(e.currentTarget).parents()[1].id.split('_')[0];
			//console.log('valor:',e.currentTarget.value);
			if(e.currentTarget.value == 1){

				this.registrar_no(seccion);
			} else {

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

		determinar_posicion: function(e){

			console.log('determinar', e);
			e.preventDefault();
			e.stopPropagation();

			// this.check_btn_demo();

			// if( this.check_iso() == false ){
			// 	this.posicion = 1;
			// 	return false;
			// }

			var className = e.currentTarget.className,
				posicion = this.posicion;

			console.log('Posicion antes', posicion);
			
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

			this.$('.tabs_lopd li a[data-pos="' + posicion + '"]').trigger('click');
			
			this.posicion = posicion;

			this.establecer_hash();

		},

		establecer_hash: function(){

			console.log('posicion hash', this.posicion);
			console.log('window.location.hash', window.location.hash);

			window.location.hash = window.location.hash.split('/')[0] + '/' + this.posicion;
			console.log('window.location.hash POST', window.location.hash);
		},

		escribir_solo_numeros: function(e){

			console.log('Evento', e);
			console.log('Evento key:', e.key);
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

			var obj_form = Calidad.actualizar_obj_form( '#form_lopd_empresa' );
			$.each( obj_form, function(id, valor){
				//console.log('Valor: ', valor);

				if( id == 'nombre_responsable'){ return true; }

				if( valor == '' ){
					error += 'El campo ' + Fx.capitalize(id) + ' de Su Empresa no está rellenado.<br>';
				}

			});

			var obj_form_infra = Calidad.actualizar_obj_form( '#form_lopd_infra' );
			$.each( obj_form_infra, function(id, valor){
				//console.log('Valor: ', valor);
				if( valor == '' ){
					error += 'El campo ' + Fx.capitalize(id) + ' de Su Estructura no está rellenado.<br>';
				}
			});




			var obj_lopd = this.actualizar_obj_lopd();

			console.log('Obj lopd', obj_lopd);
			
			if( Array.isArray(obj_lopd) ){

				error += obj_lopd.join('');
			}

			if( error != '' ){

				campo_resp.html( Fx.bs_alert( 'Rellene los datos que faltan para poder procesar los documentos, por favor.<br><br>' + error, 'danger') );
				//return false;
			}
			
			obj_form = this.anadir_a_objeto( obj_form, obj_form_infra);
			console.log('Obj_form final:', obj_form);

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

		actualizar_obj_lopd: function(){

			// Prepara el obj de datos
			var obj_lopd = {};
			var errores = ['<br>'];

			// Detectamos las secciones con sino sin contestar y devolvemos las erroneas
			var secciones = Fx.objeto_a_array( Config.obj_lopd_secciones );
			var sec_error = secciones.filter( seccion => this.secciones_si.indexOf(seccion) == - 1 );	
			sec_error = sec_error.filter( seccion => this.secciones_no.indexOf(seccion) == - 1 );

			if( sec_error.length > 0){

				for( var indice in sec_error) {

					if( sec_error[indice] == 'futuros') { sec_error[indice] = 'futuros clientes'}

					errores.push( 'La primera pregunta de ' + Fx.capitalize(sec_error[indice]) + ' no está respondida.<br>' );
				}

				errores.push['<br>'];
			}

			if( errores.length > 1 ){ return errores; }

			// seccion si
			obj_lopd['sec_si'] = {};

			$.each(this.secciones_si, function(index, seccion){
				var ni_una_resp = true;

				obj_lopd['sec_si'][seccion] = {};

				//console.warn( 'Seccion: ', seccion );
				$('input[type=checkbox]', '#' + seccion + '_extra').each(function(indice, input){

					//console.log('Indice: ', indice);
					//console.log('Valor: ', input);

					//switch( input.type ){

						//case 'checkbox':
							var valor = 0;
							if( this.checked ){ valor = 1 }
							obj_lopd['sec_si'][seccion][$(this).attr('id')] = valor;

					
					if( this.checked ){ ni_una_resp = false; }
				});
							//break;
				$('div.radio-group', '#' + seccion + '_extra').each(function(indice, grupo){
					
							var valor = '';
							if(this.checked){ 
								valor = input.value == '0' ? 1 : 0;

							}
					obj_lopd['sec_si'][seccion]['r ' + $(this).attr('id')] = valor;

					//}
				});

				if( ni_una_resp ){

					errores.push( 'Debe marcar alguna opción de la pestaña ' + Fx.capitalize(seccion) + '.<br>');
					return true;
				}
				
			});

			if( errores.length > 1 ){ return errores; }

			// secciones no
			obj_lopd['sec_no'] = this.secciones_no;
			
			return obj_lopd;

		}


	});

	return LopdView;

});