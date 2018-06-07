define([
	
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/templates',
	'app/calidad',
	'app/views/login/html/loginViewHtml'
	
], function($, _, Backbone, Fx, Config, Templates, Calidad, LoginViewHtml){

	'use strict';

	var LoginView = Backbone.View.extend({

		html: LoginViewHtml['login'],

		views: [],

		events: {
			'click #btn_login'   : 'check_login',
			'click #btn_acceder' : 'check_login'
		},

		initialize: function(){

			Calidad.cleanUp(this);
			Calidad.limpiar_datos_sesion();

		},

		render: function(){
			
			this.$el.html(this.html);

			this.$('#usuario').focus();
			
			return this;
			
		},

		check_login: function(e){

			e.preventDefault();

			var esto = this,
				usuario  = this.$('#usuario').val(),
				password = this.$('#password').val();

			if( (usuario.length < 4) || (password.length < 4) ){

				this.$('#resp_login').html( Fx.bs_alert('Validación incorrecta. Por favor revise los datos e inténtelo de nuevo.', 'danger') );
				return false;
			}

			Calidad.limpiar_datos_sesion();

			//console.log('datos', usuario);
			//console.log('datos', password);

			var resp = $.ajax({
	          dataType: "text",
	          type: 'POST',
			  url: Config.base_ajax + 'login.php',
			  data: {
				  	usuario: usuario,
				  	password: password,
				  	accion: 'check_login'
				}
			});

			resp.done(function(mi_json){

				if(mi_json != ''){

					var obj_json         = $.parseJSON( mi_json );
						//arr_filas        = [],
						//arr_filas_aux    = [],
						//even_odd         = 'odd',
						//clase_alert      = '',
						//tipo             = '',
						//hash             = ''; // lo que saldrá por defecto en el modal de pagos

					if(obj_json != null){
	        			
						if(obj_json.status == 'ok'){

							console.log( 'json: ', obj_json );
							Calidad.establecer_config( obj_json );

							console.log( 'config: ', Config.hash );
							/*
							Config.hash             = obj_json.hash;
							Config.nombre           = obj_json.nombre;
							//Config.empresa          = obj_json.empresa;
							Config.perfil			= Config.obj_perfiles[obj_json.id_perfil];

							
							if( typeof obj_json.cal_ad != 'undefined' ){
								Config.admin = obj_json.cal_ad;
							}

							if( typeof obj_json.tecnico != 'undefined' ){
								Config.tecnico = obj_json.tecnico;
							}
							*/

							// En ipad con navegación privada no va a funcionar
							try {

							  window.localStorage.setItem('cld', '');
							  // window.localStorage.setItem('hash', Config.hash);

							} catch(domException) {

							  if (domException.name === 'QuotaExceededError' ||
							      domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
							    // Fallback code comes here.
							  
								alert('La plataforma de Calidad del grupo Oclem necesita almacenar información en su navegador. Esto no es posible en modo navegación privada. Por favor, deshabilite esta opción en su navegador y vuelva a intentarlo.');
							  } else {
							  	alert('Fallo al establecer cld');
							  }

							}
							
							window.localStorage.setItem('cld', Config.hash);

							/*
							window.localStorage.setItem('hash',          Config.hash);
							window.localStorage.setItem('nombre',        Config.nombre);
							window.localStorage.setItem('empresa',       Config.empresa);
							window.localStorage.setItem('oclem_admin',   Config.oclem_admin);
							window.localStorage.setItem('comercial',     Config.comercial);
							window.localStorage.setItem('tecnico',       Config.tecnico);
							window.localStorage.setItem('cliente_admin', Config.cliente_admin);
							*/

							//Calidad.cargar_obj_clientes();
							//Calidad.cargar_obj_usuario();
							
							if ( Calidad.es_admin() ){

								$('#empresa span.empresa').text('Administrador');

							} else {
							
							// if ( Calidad.es_cliente() ){
								//$('#empresa span.empresa').text(Config.empresa);	
								$('#empresa span.empresa').text(Config.nombre);	
							}
							
							$('#footer_login').removeAttr('style');

							
							Backbone.history.navigate('#inicio', true);


						} else {

							esto.$('#resp_login').html( Fx.bs_alert( obj_json.error, 'danger' ) );
							Config.hash = '';

						}

					}
				
				}


			});

            
		}


	});

	return LoginView;

});