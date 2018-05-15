define([
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/templates',
	'app/merca',
	'app/formulario',
	'app/views/confirmView',
	'app/views/anadirArchivosView',
	'app/views/listaArchivosView',
	'app/views/soportes/html/detalleSoporteViewHtml',
	'summernote',
	'swal'

], function($, _, Backbone, Fx, Config, Templates, Merca, Formulario, ConfirmView, AnadirArchivosView, ListaArchivosView, DetalleSoporteViewHtml, Summernote, Swal){

	'use strict';

	// We extend DetalleView, not BackboneView
	var DetalleSoporteView = Backbone.View.extend({

		html: DetalleSoporteViewHtml.anadir_soporte,
		
		views: [],

		events: {
			
			// general
			'click #btn_guardar_soporte'          : 'guardar_soporte',
			'click #btn_guardar_soporte_baja'     : 'guardar_soporte',
			'blur #expediente'                    : 'check_expediente',

			'change #aceptar_condiciones'         : 'toggle_condiciones',
			
			'click #subir_archivos_soporte'       : 'subir_archivos_soporte',
			'click #refrescar_archivos_soporte'   : 'refrescar_archivos_soporte',

			'change #en_proceso'         		  : 'actualizar_en_proceso',

			'click #btn_cerrar_consulta'          : 'cerrar_consulta',
			'click #btn_reabrir_consulta'         : 'reabrir_consulta',

		},


		obj_soporte: {},

		initialize: function(options){

			var esto = this,
				id_tipo_soporte = 0,
				arr_hash = [];

			Oclem.cleanUp(this);
			
			Oclem.cargar_obj_clientes();

			this.id_concurso = 0; // el id del concurso asociado
			this.obj_concurso = {};

			arr_hash = window.location.hash.split('/');
			this.id_soporte = arr_hash[2];
			this.opcion = arr_hash[1];
			this.expediente = '';


			if (typeof arr_hash[3] != 'undefined'){
				
				this.expediente = arr_hash[3];
				this.id_concurso = arr_hash[3];
			
			}

			
			if(this.opcion == 'baja'){ id_tipo_soporte = 0; }
			if(this.opcion == 'tecnico'){ id_tipo_soporte = 1; }
			if(this.opcion == 'administrativo'){ id_tipo_soporte = 2; }
			if(this.opcion == 'juridico'){ id_tipo_soporte = 3; }


			if( Oclem.es_tarifa_mini() && this.opcion != 'baja' ){

				this.$('.card-body').html( Fx.bs_alert('<i class="fa fa-phone fa-lg"></i> Llame al 91 499 49 96 para contratar nuestro servicio de soporte.') );
				return true;

			}

			$.when( Oclem.cargar_soporte(this.id_soporte) )
			
				.then(function(json_soporte){
					
					//editando soporte
					if(esto.id_soporte != 0){
						if(json_soporte != ''){
							json_soporte     = $.parseJSON(json_soporte);
							esto.obj_soporte = json_soporte;
						}
					}
					

					// Si no existe cliente alert y volver
					if( (json_soporte.id_cliente == 0) && (esto.id_soporte != 0) ){
						alert('Hubo un error. El cliente no existe.');
						window.location.href = Config.base_url + '#soporte/' + esto.opcion;
					}

					if( (json_soporte.error != '') && ( parseInt( esto.id_soporte, 10) > 0 ) ){
						esto.$('#form_anadir_soporte').html('<p>' + json_soporte.error  + '</p>');
						return false;
					}


					esto.actualizar_datos();

					esto.$('#id_tipo_soporte option').removeAttr('selected');
					esto.$('#id_tipo_soporte option[value="' + id_tipo_soporte + '"]').prop('selected', true);
					esto.$('#id_tipo_soporte').selectpicker('refresh');

					if( esto.id_soporte != '0'){
						
						// Si modificando
						esto.$('h2').text( 'Editando: ' + esto.obj_soporte.titulo );

						if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
							
							esto.$('#id_cliente, #id_tipo_soporte, #expediente, #titulo').selectpicker('refresh').prop('disabled', true);	

							// Si el cliente ha dejado una réplica, dejar modificar
							if(esto.obj_soporte.replica != ''){
								esto.$('#contrarreplica').prop('disabled', false);
							}

						}else{

							esto.$('#id_cliente, #id_tipo_soporte, #respuesta').selectpicker('refresh').prop('disabled', true );
							esto.$('#titulo').prop('disabled', false);
							

							// Si el cliente ha dejado una réplica, dejar modificar
							if(esto.obj_soporte.contrarreplica != ''){
								esto.$('#replica').prop('disabled', false);
							}

						}

						// actualizar enlace de soporte
						if( (typeof json_soporte.id_concurso != 'undefined') && (parseInt(json_soporte.id_concurso, 10) > 0) ){
							esto.$('#enlace_expediente').show();
							esto.$('#enlace_expediente a').attr('href', Config.base_url + '#concursos/' + json_soporte.id_concurso );	
						}

						esto.$('#expediente').val(json_soporte.id_concurso);

						esto.check_expediente();

						if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
							esto.$('#replica').prop('disabled','disabled');
						}else{
							esto.$('#contrarreplica').prop('disabled','disabled');
						}

						// mostrar el nombre del usuario
						console.log(json_soporte);
						esto.$('#nombre').val( json_soporte.nombre_usuario );

						esto.mostrar_u_ocultar_elem_segun_cerrado(json_soporte.cerrado);

					}else{

						// SI AÑADIENDO

						// Si existe el expediente en la url, traerlo
						if(esto.id_concurso != ''){
							esto.$('#expediente').val( esto.id_concurso ).trigger('blur');
						}

						// Si añadiendo
						esto.$('h2').text( 'Enviando solicitud de soporte' );

						if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
							
							esto.$('#id_cliente, #id_tipo_soporte, #titulo, #baja').selectpicker('refresh').prop('disabled', false);
						
						}else{

							esto.$('#titulo').prop('disabled', false);
							esto.$('#id_cliente, #id_tipo_soporte, #respuesta').selectpicker('refresh').prop('disabled', true);

						}

						// ocultar fecha de alta y respuesta
						esto.$('.div_f_alta, .div_respuesta, .div_replica, .div_contrarreplica').hide();


						// mostrar el nombre del usuario
						esto.$('#nombre').val( Config.nombre );

					}



					// Si es una baja, mostramos u oclultamos campo para aceptación de solicitud de baja estadística
					if( esto.opcion == 'baja' ){
						
						// Ocultar aceptación de condiciones si somos admin
						if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
							
						}else{
						
							esto.$('.div_baja_estadistica, .div_usuario_cierre').hide();
						
						}
						

						if( (esto.id_soporte == 0 ) && ( !Oclem.es_admin() && !Oclem.es_comercial() && !Oclem.es_tecnico() ) ){
							
							// si solicitando baja
							esto.$('#seccion_condiciones').show();

							esto.$('#titulo').val('Solicitando baja estadística' );
							esto.$('#texto').summernote('code','Les ruego me envíen la Baja Estadística del expediente seleccionado.');
							
							// Poner "Aceptar condiciones" como activo por defecto
							esto.$('#aceptar_condiciones').val(1).selectpicker('refresh');
							
							esto.$('#btn_guardar_soporte').hide();		

							esto.$('.div_archivos').hide();

						}

					}else{

						// Opción no es baja
						esto.$('.div_baja_estadistica').hide();

						if(Oclem.es_cliente()){
							esto.$('.div_usuario_cierre').hide();
						}

					
					}

					esto.$('#refrescar_archivos_soporte').trigger('click');

					// archivos
					if( Oclem.es_cliente() ){
						esto.marcar_como_leido();
						$('#refrescar_tabla_soportes').trigger('click');
						esto.$('.div_en_proceso').hide();
					}


					// ocultar réplica y contraréplica si no hay respuesta
					if( esto.$('#respuesta').val() == ''){
						esto.$('.div_replica, .div_contrarreplica').hide();
					}


				}); // fin when / then

			this.$el.html(this.html);

			this.$('#btn_volver').attr('href', '#soporte/' + this.opcion );

			// Enlace al expediente
			this.$('#enlace_expediente').hide();


			this.$('.html-editor').summernote({
				
				height: 300,
	            minHeight: null,             // set minimum height of editor
				maxHeight: null,             // set maximum height of editor
	        	toolbar: [
	        		['style', ['bold', 'italic', 'underline', 'clear']],
				    ['fontsize', ['fontsize']],
				    ['para', ['ul', 'ol', 'paragraph']],
	        	],
	        	callbacks: {
		            onPaste: function (e) {
		                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

		                e.preventDefault();

		                // Firefox fix
		                setTimeout(function () {
		                    document.execCommand('insertText', false, bufferText);
		                }, 10);
		            }
		        }
	        });

	        this.$('.div_expediente').hide();

	        // Deshabilitar fastclick para que funcione summernote en ipad
	        this.$(".note-editor").addClass("needsclick");
    		this.$(".note-editable").addClass("needsclick");

	        if( Oclem.es_cliente() ){
	        	this.$('.div_obs').remove();
	        }

			

		},

		render: function(){



			return this;				
			
		},


		refrescar_archivos_soporte: function(e){

			e.preventDefault();

			// cargar vista de archivos con opción empresa
			var esto = this,
				target= '#resp_archivos_soportes',
				html = '';

			Config.id_soporte = esto.id_soporte;

			// cargar vista de archivos con opción empresa
			Fx.mostrar_cargador(target);

			if( typeof this.views['listaArchivosView'] != 'undefined' ){
				Oclem.cleanUp( this.views['listaArchivosView'] );	
			}
			
			// Cargar vista de archivos
			this.views['listaArchivosView'] = new ListaArchivosView({
				id: 'listaArchivos',
				className: 'listaArchivos',
				model: {
					opcion: 'soportes',
					id_soporte: esto.id_soporte
				}
			});

			this.views.push('listaArchivosView'); // add to views so the view can be removed from memory
			
			this.$(target).html(this.views['listaArchivosView'].render().$el);

		},

		subir_archivos_soporte: function(e){
			
			e.preventDefault();

			var id_soporte = this.id_soporte;
			Config.id_soporte = id_soporte;

			if( typeof this.views['anadirArchivosView'] != 'undefined' ){
				Oclem.cleanUp( this.views['anadirArchivosView'] );	
			}

			$('div.tooltip').hide();

			var options = {

				title: 'Añadir archivo',
				id: 'modal-anadir-archivos',
				size: 'large',
				model: {
					opcion: 'soporte',
					id_soporte: id_soporte
				}

			};

			var modal = new AnadirArchivosView(options);
			modal.show();

		},
		
		check_expediente: function(e){


			// Comprueba si un expediente existe:
			var id_concurso = this.$('#expediente').val(),
				esto = this;

			this.id_concurso = 0;

			if(id_concurso != ''){
				
				$.when( Oclem.cargar_concurso( id_concurso ) )
				
					.then(function(json_concurso){
						
						json_concurso     = $.parseJSON(json_concurso);
						esto.obj_concurso = json_concurso;

						if(typeof esto.obj_concurso.expediente != 'undefined'){
							
							var html_expediente = '';

							html_expediente += 'Expediente: ' + esto.obj_concurso.expediente + '<br>';
							html_expediente += 'Título: ' + esto.obj_concurso.titulo + '<br>';
							html_expediente += 'Importe: ' + Fx.euros(esto.obj_concurso.importe) + '<br><br>';
							html_expediente += '<a title="click para ver" href="' + esto.obj_concurso.enlace + '" target="_blank"><i class="fa fa-external-link fa-lg"></i> Ir a enlace oficial</a><br>';

							esto.$('#resp_expediente').html( Fx.bs_alert(html_expediente, 'success') );

							esto.obj_soporte.id_concurso = json_concurso.id_concurso;

							if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
								esto.$('#baja_estadistica').val(esto.obj_concurso.baja_estadistica);
							}

						}else{
							esto.$('#resp_expediente').html( Fx.bs_alert('Concurso no encontrado', 'danger') );		
							
						}

						if( (esto.opcion == 'baja' && esto.obj_concurso.baja_estadistica == '' ) ){
							esto.$('#btn_guardar_soporte').prop('disabled','disabled');
						}

					});

			}


		},

		actualizar_datos: function(){
			
			var esto = this,
				html_enlaces = '',
				enlace = '',
				tipo = '',
				icono = '',
				sel = '',
				html_opt_cliente = '';
			

			// Campos generales
			$.each( esto.$('input, textarea, select'), function(index, value){

				if( typeof esto.obj_soporte != 'undefined'){
						
					var id = $(this).attr('id');

					if( $(this).hasClass('fecha') ){

						$(this).val( Fx.cambiaf_a_normal(esto.obj_soporte[ id ])  );
					
					}else{

						$(this).val( esto.obj_soporte[ id ]  );	
						
					}
				
				}

			});

			if( typeof this.obj_soporte == 'undefined'){
					this.obj_soporte = {};
				}

			if( typeof this.obj_soporte.arr_soporte_docs == 'undefined'){

				this.obj_soporte.arr_soporte_docs = [];
			}

			// cargar combo de cliente
			
				
				if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){
					
					$.each( Config.obj_clientes, function(index, value){

						esto.obj_soporte['id_cliente'] == value.id_cliente ? sel = ' selected ' : sel = '';
						html_opt_cliente += '<option ' + sel + ' value="' + value.id_cliente + '">' + value.empresa + '</option>';

					});

				}else{

					html_opt_cliente = '<option selected value="' + Config.obj_clientes.id_cliente + '">' + Config.obj_clientes.empresa + '</option>';

				}


				esto.$('#id_cliente').html(html_opt_cliente).selectpicker('refresh');

			

			

			Formulario(this);

			Oclem.actualizar_combos(esto);
			
			this.mostrar_detalles_soportes();

			// Oclem.actualizar_fechas(esto);

		},	

		toggle_condiciones: function(e){
			
			e.preventDefault();

			if(this.$('#aceptar_condiciones').selectpicker('val') == 0){
				this.$('#btn_guardar_soporte').hide();
			}else{
				this.$('#btn_guardar_soporte').show();
			}

		},

		///////////////////////////////////////////////////////////////////////////////////////
		//     GUARDAR
		///////////////////////////////////////////////////////////////////////////////////////
		
		actualizar_obj_soporte: function(){
		
			var esto = this,
				texto = '';

			texto = this.$('#texto')
						.summernote('code')
						.replace( /~/g, '"');

			this.obj_soporte = Oclem.actualizar_obj_form( this.$('#form_anadir_soporte') );

			this.obj_soporte.id_soporte      = this.id_soporte;
			this.obj_soporte.titulo          = this.$('#titulo').val();
			this.obj_soporte.texto           = texto; // porque es summernote
			this.obj_soporte.id_tipo_soporte = this.$('#id_tipo_soporte').val();
			this.obj_soporte.id_concurso     = this.$('#expediente').val();

		},

		guardar_soporte: function(e){

			e.preventDefault();
			var esto        = this,
				str_error   = '',
				targetObj   = esto.$('#resp_guardar_soporte'),
				id_concurso = 0;

			if( typeof esto.obj_concurso.id_concurso != 'undefined'){
				id_concurso = this.obj_concurso.id_concurso;
			}

			this.actualizar_obj_soporte();

			if( (this.opcion == 'baja') && ( !Oclem.es_admin() && !Oclem.es_comercial() && !Oclem.es_tecnico() ) ){
					
				if( id_concurso == 0 ){
					alert('Debe seleccionar un expediente válido. Encontrará el número de expediente en la sección Concursos. No es posible continuar.');
					return false;
				}
				
			}
			
			if( this.$('#texto').summernote('code').length < 3 ){
				alert('Por favor, escriba un mensaje.');
				return false;
			}

			if( Fx.validar_formulario( esto.$('#form_anadir_soporte') ) ){
				
				Oclem.spinner(this, '#resp_guardar_soporte');

				// Validaciones de campos obligatorios
				var arr_campos_oblig = ['titulo'];

				for( var i=0; i < arr_campos_oblig.length; i++ ){
					str_error += Fx.str_check_oblig( esto.$('#' + arr_campos_oblig[i] ).val(), 3, arr_campos_oblig[i]);
				}

				if(str_error != ''){
					targetObj.html(Fx.bs_alert( str_error, 'danger'));
					return false;
				}
				
				if( typeof esto.obj_soporte.id_cliente == 'undefined' ){

					if( Oclem.es_cliente() && !Oclem.es_admin() && !Oclem.es_comercial() && !Oclem.es_tecnico() ){
						esto.obj_soporte.id_cliente = Config.obj_clientes.id_cliente;
					}

				}

				var resp = $.ajax({
					
					url: Config.base_ajax + 'soportes.php',
					type: 'POST',
					data: {
						accion: 'guardar',
						hash: Oclem.hash(),
						obj_soporte: esto.obj_soporte
					}

				});

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						console.log(mi_json);
						
						mi_json = $.parseJSON(mi_json);
						
						if(mi_json.status == 'ko'){

							targetObj.html(Fx.bs_alert( mi_json.error, 'danger'));
							
						}else{

							$('#refrescar_tabla_soportes').trigger('click');

							// generar mensaje de éxito
							var mensaje_exito = 'Su solicitud de soporte ha sido procesada con éxito. En breve nos pondremos en contacto con usted.';

							if( Oclem.es_admin() || Oclem.es_comercial() || Oclem.es_tecnico() ){

								mensaje_exito = 'Su respuesta ha sido enviada con éxito al cliente.';
							
							}else{
							
								if( esto.opcion == 'baja'){
									mensaje_exito = 'El departamento técnico procederá ahora al estudio del proyecto. En un plazo máximo de 72 horas, le enviaremos la información solicitada a su correo electrónico.';
								}

							}

							targetObj.html(Fx.bs_alert( mensaje_exito, 'success'));

							// esto.$('#btn_guardar_soporte').hide();

							//Oclem.actualizar_span_totales();

							esto.id_soporte = mi_json.id_soporte;

							esto.mostrar_detalles_soportes();

							esto.$('#texto').summernote('code','');

							// refrescar página si no es una baja
							if(esto.opcion != 'baja'){

								window.setTimeout(function(){
									// window.location.hash = '#soporte/' + esto.opcion + '/' + esto.id_soporte;
									Backbone.history.navigate('#soporte/' + esto.opcion + '/' + esto.id_soporte, true);
								}, 5000);
									
							}
							

						}
					}

				});

				
			}else{

				// hay errores en el formulario
				targetObj.html(Fx.bs_alert('Existen errores en el formulario. Por favor revíselo.', 'danger'));						
				

			}


		},

		marcar_como_leido: function(){

			// Llama al servicio que marca el boolean leido como true
			// Actualiza los spanes de totales

			var esto = this;

			var resp = $.ajax({
					
				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'marcar_como_leido',
					hash: Oclem.hash(),
					obj_soporte: esto.obj_soporte
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){
						
					mi_json = $.parseJSON(mi_json);
					
					Oclem.ir_a_login_si_error(mi_json);
					if(mi_json.status != 'ko'){

						//Oclem.actualizar_span_totales();

					}

				}

			});

			

		},

		mostrar_detalles_soportes: function(){

			var esto = this,
				html_soportes = '';

			if( this.id_soporte > 0){

				Oclem.spinner(this, '#resp_detalles_soportes');

				var resp = $.ajax({
						
					url: Config.base_ajax + 'soportes.php',
					type: 'POST',
					data: {
						accion: 'consultar',
						id_soporte: esto.id_soporte,
						hash: Oclem.hash()
					}

				});

				resp.done(function(mi_json){

					esto.$('#resp_detalles_soportes').html( '' );

					if(mi_json != ''){
						
						var obj_json = $.parseJSON(mi_json),
							clase_pull = '',
							clase_right = '',
							imagen_icono = '',
							texto = '',
							fondo_verde = '';

						$.each( obj_json.arr_detalles, function(index, value){

							texto = value.texto.replace( /~/g, '"');
							// texto = texto.replace(/\//g, '');

							if( value.es_cliente == '1' ){
								clase_pull = 'pull-left';
								imagen_icono = '<i class="fa fa-user fa-lg" style=" color:#fff;margin:0px;"></i>';
								fondo_verde = 'fondo_verde';
							}else{
								clase_pull = 'pull-right';
								imagen_icono = '<img alt="" src="img/logo.png" style="background-color:#000;padding:5px;">';
								clase_right = 'right';
								fondo_verde = '';
							}

							html_soportes += [
								'<div class="lv-item media ' + clase_right + '">',
		                            '<div class="lv-avatar ' + clase_pull + '">',
		                                imagen_icono,
		                            '</div>',
		                            '<div class="media-body">',
		                                '<div class="ms-item ' + fondo_verde + '">',
		                                    texto,
		                                '</div>',
		                                '<small class="ms-date"><i class="md md-access-time"></i>',
		                                	Fx.cambiaf_a_normal(value.f_respuesta),
		                                ' a las ' + value.hora_respuesta + ' por ' + value.nombre_usuario + '</small>',
		                            '</div>',
		                        '</div>',
							].join('');
		
							esto.$('#resp_detalles_soportes').html( html_soportes );

						});

					}

				});

				
			}

			


		}, // fin mostrar detalles soportes

		actualizar_en_proceso: function(e){

			// Llama al servicio que marca el boolean leido como true
			// Actualiza los spanes de totales

			e.preventDefault();

			var esto = this;

			if(Oclem.es_cliente()){ return false;}

			esto.obj_soporte.en_proceso = esto.$('#en_proceso').val();
			
			var resp = $.ajax({
					
				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'actualizar_en_proceso',
					hash: Oclem.hash(),
					obj_soporte: esto.obj_soporte
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){
						
					mi_json = $.parseJSON(mi_json);
					Oclem.ir_a_login_si_error(mi_json);

					if( mi_json.id_soporte == esto.id_soporte ){
						
						// actualizar tabla de soportes
						$('#refrescar_tabla_soportes').trigger('click');

						// Emitir respuesta
						Oclem.notify('Actualizada solicitud de soporte. Pte respuesta: ' + Fx.si_no(mi_json.en_proceso) );
						
						
					}
					
				}

			});

			
		},

		cerrar_consulta: function(e){
			
			e.preventDefault();
			this.swal_abrir_cerrar_consulta(1);
			$('#refrescar_tabla_soportes').trigger('click');

		},

		reabrir_consulta: function(e){
			
			e.preventDefault();
			this.swal_abrir_cerrar_consulta(0);
			$('#refrescar_tabla_soportes').trigger('click');
			
		},

		swal_abrir_cerrar_consulta: function( cerrado ){

			// Consulta al usuario si quiere abrir o cerrar consulta
			// cerrado puede ser 0 o 1

			var texto_abrir_cerrar = '',
				esto = this;

			cerrado == 0 ? texto_abrir_cerrar = 'reabrir' : texto_abrir_cerrar = 'cerrar';

			Swal({
                title: Fx.capitalize( texto_abrir_cerrar),
                text: "¿Está seguro de que desea " + texto_abrir_cerrar + " la consulta?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: '#2ecc71',
                confirmButtonText: 'Sí, ' + texto_abrir_cerrar + '!',
                cancelButtonText: "No, cancelar",
                closeOnConfirm: false,
                closeOnCancel: false

            }, function(isConfirm){

                if (isConfirm) {
                	esto.procesar_cambio_consulta( cerrado );
                	Swal.close();
                }

                Swal.close();

            });

		},


		procesar_cambio_consulta: function(cerrado){

			// conecta con el servidor y abre o cierra una consulta

			var esto = this;

			var resp = $.ajax({

				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'toggle_consulta',
					hash: Oclem.hash(),
					id_soporte: esto.id_soporte,
					cerrado: cerrado
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){

					mi_json = $.parseJSON(mi_json);

					if(mi_json.status == 'ko'){

						Swal("Cancelado", "Hubo un error al guardar los datos en el servidor. La operación no se pudo efectuar.", "warning");

					}else{

						esto.mostrar_u_ocultar_elem_segun_cerrado( cerrado );

						$('#usuario_cierre').val(mi_json.usuario_cierre);

					}
				}

			});

			
		},

		mostrar_u_ocultar_elem_segun_cerrado: function(cerrado){

			// Muestra u oculta elementos en pantalla en función de si la consulta está cerrada o no
			this.$('#btn_cerrar_consulta, #btn_reabrir_consulta, div.caja_respuesta_soporte').hide();


			if(!Oclem.es_cliente()){
				if(cerrado == 0){
				
					// abrir
					this.$('#btn_reabrir_consulta, .div_usuario_cierre').hide();
					this.$('#btn_cerrar_consulta, div.note-editor, #btn_guardar_soporte, .div_archivos').show();

					this.$('div.content-box-wrapper').css('border','0');

				}else{

					// cerrar
					this.$('#btn_reabrir_consulta, .div_usuario_cierre').show();
					this.$('#btn_cerrar_consulta, div.note-editor, #btn_guardar_soporte, .div_archivos').hide();

					this.$('div.content-box-wrapper').css('border','1px solid #eee');

				}

			}

		}
		
	});

	return DetalleSoporteView;

});