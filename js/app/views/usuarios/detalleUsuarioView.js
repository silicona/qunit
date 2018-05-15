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
	'app/views/usuarios/html/detalleUsuarioViewHtml'

], function($, _, Backbone, Fx, Config, Templates, Merca, Formulario, ConfirmView, AnadirArchivosView, ListaArchivosView, DetalleUsuarioViewHtml){

	'use strict';

	// We extend DetalleView, not BackboneView
	var DetalleUsuarioView = Backbone.View.extend({

		html: DetalleUsuarioViewHtml['anadir_usuario'],
		
		views: [],

		events: {
			
			// general
			'click #btn_guardar_usuario'          : 'guardar_usuario',
			
		},


		obj_usuario: {
			activo: 0,
			cliente_admin: 0,
			comercial: 0,
			empresa: '',
			error: '',
			id_cliente: 0,
			id_usuario: 0,
			login: '',
			nombre: '',
			password:'',
			tecnico: 0
		},

		initialize: function(options){

			var arr_hash = [];

			Merca.cleanUp(this);
			Merca.cargar_obj_clientes();

			arr_hash = window.location.hash.split('/');
			this.id_usuario = arr_hash[1];
			this.opcion = arr_hash[2];

		},

		render: function(){

			var esto = this;

			this.$el.html(this.html);
			

			if(this.id_usuario > 0){
				
				$.when( Merca.cargar_usuario(this.id_usuario) )
				
					.then(function(json_usuario){
						
						//editando usuario
						if(json_usuario != ''){
							json_usuario     = $.parseJSON(json_usuario);
							esto.obj_usuario = json_usuario;	
						}

						esto.actualizar_datos();

					}
				);

			}else{
				
				esto.actualizar_datos();
				
				if( (this.opcion == 'clientes') && ( !Oclem.es_admin() ) ){
					esto.$('.div_comercial, .div_tecnico').hide();	
				}
				

				// Activo por defecto
				esto.$('#activo').val(1).selectpicker('refresh');

			}


			if( !Merca.es_admin() ){
				esto.$('.div_id_cliente, .div_cliente_admin').hide();		
			}

			return this;				
			
		},


		actualizar_datos: function(){
			
			var esto = this,
				html_enlaces = '',
				enlace = '',
				tipo = '',
				icono = '',
				sel = '',
				html_opt_cliente = '<option value="0">---</option>';
			
			this.$('input').val('');

			// Campos generales
			$.each( esto.$('input, textarea, select'), function(index, value){

				if( typeof esto.obj_usuario != 'undefined'){
						
					var id = $(this).attr('id');

					if( $(this).hasClass('fecha') ){

						$(this).val( Fx.cambiaf_a_normal(esto.obj_usuario[ id ])  );
					
					}else{

						$(this).val( esto.obj_usuario[ id ]  );	
						
					}
				
				}

			});

			

			if( (this.obj_usuario.id_cliente > 0) || (this.opcion == 'clientes') ){

				Fx.i('es un cliente');

				// es un cliente
				esto.$('.div_comercial, .div_tecnico').hide();


				if( Merca.es_admin() ){
					// Poner
					$.each( Config.obj_clientes, function(index, value){

						esto.obj_usuario.id_cliente == value.id_cliente ? sel = ' selected ' : sel = '';
						html_opt_cliente += '<option ' + sel + ' value="' + value.id_cliente + '">' + value.empresa + '</option>';

					});
				
				}else{

					html_opt_cliente = '<option selected value="' + Config.id_cliente + '">' + Config.empresa + '</option>';
				
				}
				

				this.$('#id_cliente').html(html_opt_cliente);

			}else{

				Fx.i('es un empleado');
				

				// es un empleado
				esto.$('.div_id_cliente, .div_cliente_admin, .div_id_cliente').hide();

			}
			
			this.$('select').selectpicker('refresh');

			// Formulario(this);

			
		},	


		///////////////////////////////////////////////////////////////////////////////////////
		//     GUARDAR
		///////////////////////////////////////////////////////////////////////////////////////
		
		actualizar_obj_usuario: function(){
		
			var esto = this;

			this.obj_usuario = Oclem.actualizar_obj_form( this.$('#form_anadir_usuario') );
			this.obj_usuario.id_usuario = this.id_usuario;


			if(!Merca.es_admin()){
				this.obj_usuario.id_cliente = Config.obj_usuario.id_cliente;
			}

		},

		guardar_usuario: function(e){

			e.preventDefault();
			var esto = this,
				str_error = '',
				targetObj = esto.$('#resp_guardar_usuario'),
				id_concurso = this.id_concurso;

			this.actualizar_obj_usuario();

			Fx.i(this.obj_usuario);
			
			if( Fx.validar_formulario( esto.$('#form_anadir_usuario') ) ){
				
				Merca.spinner(this, '#resp_guardar_usuario');

				// Validaciones de campos obligatorios
				var arr_campos_oblig = ['nombre','login','password'];

				for( var i=0; i < arr_campos_oblig.length; i++ ){
					str_error += Fx.str_check_oblig( esto.$('#' + arr_campos_oblig[i] ).val(), 3, arr_campos_oblig[i]);
				}

				if(str_error != ''){
					targetObj.html(Fx.bs_alert( str_error, 'danger'));
					return false;
				}

				var resp = $.ajax({
					
					url: Config.base_ajax + 'usuarios.php',
					type: 'POST',
					data: {
						accion: 'guardar',
						hash: Oclem.hash(),
						obj_usuario: esto.obj_usuario
					}

				});

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						console.log(mi_json);

						mi_json = $.parseJSON(mi_json);
						
						if(mi_json.status == 'ko'){

							targetObj.html(Fx.bs_alert( mi_json.error, 'danger'));
							
						}else{

							$('#refrescar_tabla_usuarios').trigger('click');

							// generar mensaje de éxito
							var mensaje_exito = 'El usuario ha sido guardado con éxito';

							targetObj.html(Fx.bs_alert( mensaje_exito, 'success'));

						}
					}

				});

				resp.fail(function() {
					console.log('Falló la conexión con el servidor');
					return false;
				});
			
			}else{

				// hay errores en el formulario
				targetObj.html(Fx.bs_alert('Existen errores en el formulario. Por favor revíselo.', 'danger'));						
				

			}


		},

	});

	return DetalleUsuarioView;

});