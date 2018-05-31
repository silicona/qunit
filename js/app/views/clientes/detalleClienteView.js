define([
	'jquery',
	'underscore',
	'backbone',
	'app/templates',
	'funciones',
	'app/config',
	'app/calidad',
	'app/formulario',
	'app/views/clientes/html/detalleClienteViewHtml'

], function($, _, Backbone, Templates, Fx, Config, Calidad, Formulario, DetalleClienteViewHtml){

	'use strict';

	// We extend DetalleView, not BackboneView
	var DetalleClienteView = Backbone.View.extend({

		html: DetalleClienteViewHtml['anadir_cliente'],
		
		events: {
			
			// general
			'click #btn_guardar_cliente'          : 'guardar_cliente'
			
		},

		obj_cliente: {},

		initialize: function(options){

			this.id_cliente = options.id_cliente;
			
			Calidad.cleanUp(this);
		
		},

		render: function(){

			var esto = this;
			
			$.when( Calidad.cargar_cliente(esto.id_cliente) )
			
				.then(function(json_cliente){

					//editando cliente
					var archivo_contrato = '';

					json_cliente     = $.parseJSON(json_cliente);
					esto.obj_cliente = json_cliente;


					if( (json_cliente.error != '') && ( parseInt( esto.id_cliente, 10) > 0 ) ){
						esto.$('#form_anadir_cliente').html('<p>' + json_cliente.error  + '</p>');
						return false;
					}

					esto.actualizar_datos();

					if(typeof esto.obj_cliente.expediente != 'undefined'){
						esto.$('#h2_cliente').text( esto.obj_cliente.expediente + ' - ' + Fx.cambiaf_a_normal(esto.obj_cliente.f_entrada) + ' - ' + Fx.euros(esto.obj_cliente.importe) );
					}
					
					if( Calidad.es_cliente() ){
						
						esto.$('#volver').hide();
						esto.$('#iban, #cods_clasificaciones, #cods_cpv, #cods_cpv_ignorar, #comercial, #f_alta' ).prop('disabled','disabled');
						
						esto.$('.div_obs, .div_f_baja, .div_id_tipo_contrato, .div_emails_notificaciones').remove();
						
					}

					if( Calidad.es_admin() || Calidad.es_tecnico() || json_cliente.id_tipo_contrato == 0 ){
						esto.$('#btn_descargar_contrato').remove();
					}

					//SI NO ES CONTRATO 30, 120 O 60
					if( json_cliente.id_tipo_contrato != 1 && json_cliente.id_tipo_contrato != 2 && json_cliente.id_tipo_contrato != 4 ){
						esto.$('#btn_descargar_contrato').remove();
					}

					esto.$('#btn_descargar_contrato').attr('href', 'pdf/' + Oclem.devuelve_enlace_contrato( json_cliente.id_tipo_contrato) );
					

				});


			this.$el.html(this.html);

			if( !Calidad.es_admin() && !Calidad.es_comercial() ){
				esto.$('.div_iban').remove();
			}

			if( Calidad.es_comercial() ){
				this.$('.div_guardar').remove();
			}

			return this;				
			
		},

		actualizar_datos: function(){
			
			var esto = this,
				html_enlaces = '',
				enlace = '',
				tipo = '',
				icono = '';
			

			// Campos generales
			$.each( esto.$('input, textarea, select'), function(index, value){

				var id = $(this).attr('id');
				
				if( $(this).hasClass('fecha') ){
					$(this).val( Fx.cambiaf_a_normal(esto.obj_cliente[ id ])  );
				}else{
					$(this).val( esto.obj_cliente[ id ]  );
				}

			});

			if( typeof esto.obj_cliente != 'undefined' ){
				
				console.log(esto.obj_cliente);

				if( esto.obj_cliente.iban.length > 10 || esto.obj_cliente.tipo_contrato == 'clasif' ){
					this.$('.div_enlace_contratacion').hide();
				}else{
					this.$('.enlace_form').attr('href', Config.base_url + '#contratacion/' + esto.obj_cliente.cod_enlace );
				}	
			}
			

			if( esto.obj_cliente.tipo_contrato == 'clasif'){
				this.$('#btn_descargar_contrato').remove();
			}

			Formulario(this);

			Calidad.actualizar_combos(esto);
			//Oclem.actualizar_fechas(esto);

		},	


		///////////////////////////////////////////////////////////////////////////////////////
		//     GUARDAR CLIENTE
		///////////////////////////////////////////////////////////////////////////////////////
		
		actualizar_obj_cliente: function(){
		
			var esto = this;

			this.obj_cliente = Oclem.actualizar_obj_form( this.$('#form_anadir_cliente') );

			this.obj_cliente.id_cliente = this.id_cliente;

		},

		guardar_cliente: function(e){

			e.preventDefault();
			var esto = this,
				str_error = '',
				targetObj = esto.$('#resp_guardar_cliente');

			this.actualizar_obj_cliente();
			
			if( Fx.validar_formulario( esto.$('#form_anadir_cliente') ) ){
				
				// Validaciones de campos obligatorios
				var arr_campos_oblig = ['nombre','apellido1','email','empresa'];

				for( var i=0; i < arr_campos_oblig.length; i++ ){
					str_error += Fx.str_check_oblig( esto.$('#' + arr_campos_oblig[i] ).val(), 3, arr_campos_oblig[i]);
				}

				if(str_error != ''){
					targetObj.html(Fx.bs_alert( str_error, 'danger'));
					return false;
				}

				var resp = $.ajax({
				
					url: Config.base_ajax + 'clientes.php',
					type: 'POST',
					data: {
						accion: 'guardar',
						hash: Config.hash,
						obj_cliente: this.obj_cliente
					}

				});				

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						mi_json = $.parseJSON(mi_json);
						
						if(mi_json.status == 'ko'){

							targetObj.html(Fx.bs_alert( mi_json.error, 'danger'));
							
						}else{

							$('#refrescar_tabla_clientes').trigger('click');

							var mensaje_alert = '';
							
							if( ! Oclem.es_admin() ){
								mensaje_alert = 'Sus datos se guardaron con éxito';
								//A,B,C,D,E,F,G,H,I,J,K,L,M
							}else{
								mensaje_alert = 'Los datos del cliente se guardaron con éxito.';
							}

							// generar mensaje de éxito
							targetObj.html(Fx.bs_alert( mensaje_alert, 'success'));

							// esto.$('#btn_guardar_cliente').hide();

						}
					}

				});

			}else{

				// hay errores en el formulario
				targetObj.html(Fx.bs_alert('Existen errores en el formulario. Por favor revíselo.', 'danger'));						
				

			}


		}
		
	});

	return DetalleClienteView;

});