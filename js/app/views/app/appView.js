define([
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/templates',
	'app/calidad',
	'app/router/router',

	'app/views/app/html/appViewHtml',

	'app/views/login/loginView',
	//'app/views/login/verPoliticaView',

	'app/views/inicio/inicioView',

	// 'app/views/clientes/clientesView',
	// 'app/views/clientes/detalleClienteView',
	
	'app/views/soportes/soportesView',
	'app/views/soportes/detalleSoporteView',

	// 'app/views/alta/altaView',

	// 'app/views/usuarios/usuariosView',
	// 'app/views/usuarios/detalleUsuarioView',

	'app/views/lopd/lopdView',

	'app/views/no_encontrado/noEncontradoView',

], function($, _, Backbone, Fx, Config, Templates, Calidad, Router, 

		AppViewHtml,

		LoginView, 
		//VerPoliticaView,
		InicioView, 
		//ClientesView, DetalleClienteView,
		SoportesView, DetalleSoporteView, 
		//AltaView,
		//UsuariosView, DetalleUsuarioView,
		LopdView,
		NoEncontradoView
  ){

	'use strict';

	var AppView = Backbone.View.extend({
	
		id: 'app-view',

		html: AppViewHtml['vista_app'],

		events: {
			
			'click a'                             : 'coger_ruta_previa',

			'click li#btn_salir'                  : 'logout',

			//'click a.lv-item'                     : 'redirigir_detalle_soporte'
		},

		views: [],

		coger_ruta_previa: function(){

			Config.ruta_previa = window.location.hash;

		},

		redirigir_detalle_soporte: function(e){
			
			e.preventDefault();

			var ruta = e.currentTarget.attributes['href'].nodeValue;
			window.location.href =  Config.base_url + '?' + ruta;

		},	

		initialize: function(){
			
			_.bindAll(this, 'toggle_footer');
		    // bind to window
		  	
		  	$(window).scroll(this.toggle_footer);

			Calidad.cleanUp(this);

			var esto = this;

			//console.log('Lugar: ', this.$el);

			// if( Oclem.es_cliente() ){
			// 	FastClick.attach(document.body);	
			// }

		},

		render: function(){

			var esto = this;

			this.$el.html(this.html);

			$.when( Calidad.establecer_entorno() )

			.then( function(json){

				if( json != '' ){

					var datos = $.parseJSON( json );

					console.log( 'Datos', datos );

					if( datos !== null && datos.status !== 'ko' ){

						if( datos.entorno === 'pruebas' ){

							esto.$('#vista_general').append( '<div id="pruebas"><span>Estás en el entorno de pruebas</span></div>' );
						}
					}
				}
			});
			
			return this;
			
		},

		

		setPage: function(seccion, parametro){

			var vista = '',
				eq = 0;

			this.$('#contenido_seccion').html( Templates['spinner'] );

			if( (window.localStorage.getItem('hash') != null) && ( typeof window.localStorage.getItem('hash') != 'undefined') ){
				
				Config.hash          = window.localStorage.getItem('hash');
				Config.nombre        = window.localStorage.getItem('nombre');
				
				Config.empresa       = window.localStorage.getItem('empresa');
				Config.oclem_admin   = window.localStorage.getItem('oclem_admin');
				Config.tecnico       = window.localStorage.getItem('tecnico');
				Config.comercial     = window.localStorage.getItem('comercial');
				Config.cliente_admin = window.localStorage.getItem('cliente_admin');

				if( typeof Config.obj_usuario == 'object'){
					Config.obj_usuario  = $.parseJSON( window.localStorage.getItem('obj_usuario') );	
				}
				
				if( typeof Config.obj_clientes == 'object'){
					Config.obj_clientes = $.parseJSON( window.localStorage.getItem('obj_clientes') );
				}
			}

			//Calidad.check_login();

			Calidad.cleanUp(this);
			Calidad.actualizar_nombre_usuario();
			Calidad.mostrar_footer_si_no_scroll();

			

			/*
			if( window.location.hash.split('/')[0] == '#alta' && typeof window.location.hash.split('/')[1] != 'undefined' ){
				return true;		
			}

			
			if( Calidad.es_admin() ){
				
				this.$('#menu_clientes')
					.attr('href','#clientes')
					.attr('title','Ver clientes');
				
				this.$('#empresa span.empresa').text('Administrador');
				this.$('#empresa').addClass('span_admin');

				this.$('#btn_menu_adjudicaciones').show();
			}

			if( Calidad.es_cliente() ){
				
				this.$('#menu_clientes')
					.attr('href','#clientes/mis_datos' )
					.attr('title', 'Ver mis datos');

				this.$('#empresa span.empresa').text( Config.empresa );
				
				this.$('#btn_menu_adjudicaciones').remove();

			}

			if( Calidad.es_cliente_no_admin() ){

				this.$('#btn_menu_clientes').remove();
			
			}

			if( Calidad.es_tecnico() ){
				this.$('#empresa span.empresa').text( 'Oclem Concursos - Técnico' );
				this.$('#btn_menu_clientes, #btn_menu_adjudicaciones').remove();
			}

			if( Calidad.es_comercial() ){
				this.$('#empresa span.empresa').text( 'Oclem Concursos - Comercial' );
				this.$('#btn_menu_adjudicaciones, #btn_menu_baja, #btn_menu_tecnico, #btn_menu_administrativo, #btn_menu_juridico,#btn_menu_adjudicaciones').remove();
			}
			*/



			//$('#sidebar').show();
			$('body').removeClass('login-content');

			if(seccion == ''){seccion = 'inicio';}
					
			if( (seccion == 'login') || (seccion == 'verPolitica') ){

				if(seccion == 'login'){
					// cargar formulario de login
					this.views['loginView'] = new LoginView({
						id: 'seccion_login',
						className: 'seccion_login'
					});

					vista = 'login';
					
					$('#sidebar, #header, #empresa').hide();
					
				}

				if(seccion == 'verPolitica'){
					// Cargar sección de verpolitica
					this.views['verPoliticaView'] = new VerPoliticaView({
						id: 'seccion_verPolitica',
						className: 'verPolitica'
					});
					
					vista = 'verPolitica';
					
					$('#sidebar').hide();
				
				}

				$('body').addClass( seccion + '-content');
				
			}else{

				$('#sidebar, #header, #empresa').show();
				
			}


			//this.$('ul.main-menu li').removeClass('selected');

			if(seccion == 'inicio'){

				//Calidad.actualizar_spans_totales();

				// Cargar sección de inicio
				this.views['inicioView'] = new InicioView({
					id: 'seccion_inicio',
					className: 'seccion_inicio'
				});
				
				vista = 'inicio';
				// this.$('ul.main-menu li').eq('0').addClass('selected');

			}

			/*
			if(seccion == 'clientes'){

				if(parametro == ''){
					// Cargar tabla de clientes
					this.views['clientesView'] = new ClientesView({
						id: 'seccion_clientes',
						className: 'seccion_clientes'
					});


					vista = 'clientes';

				}else{

					this.views['detalleClienteView'] = new DetalleClienteView({
						id: 'seccion_detalle_cliente',
						className: 'seccion_detalle_cliente',
						id_cliente: parametro
					});

					vista = 'detalleCliente';

				}
				
				// this.$('ul.main-menu li').eq('6').addClass('selected');

			}
			*/

			if(seccion == 'soporte'){

				if( parametro == '' ){
					Calidad.actualizar_spans_totales();
					// Cargar tabla de soportes
					this.views['soportesView'] = new SoportesView({
						id: 'seccion_soportes',
						className: 'seccion_soportes'
					});

					vista = 'soportes';

					if(window.location.hash.indexOf('baja') > -1){ eq = '2';}
					if(window.location.hash.indexOf('tecnico') > -1){ eq = '3';}
					if(window.location.hash.indexOf('administrativo') > -1){ eq = '4';}
					if(window.location.hash.indexOf('juridico') > -1){ eq = '5';}

					this.$('ul.main-menu li').eq(eq).addClass('selected');

				}else{

					this.views['detalleSoporteView'] = new DetalleSoporteView({
						id: 'seccion_detalle_soporte',
						className: 'seccion_detalle_soporte'
					});

					vista = 'detalleSoporte';

				}

			}

			if(seccion == 'lopd'){

				// Cargar sección de alta web
				this.views['lopdView'] = new LopdView({
					id: 'seccion_lopd',
					className: 'lopd'
				});
				
				vista = 'lopd';

			}

			/*
				if(seccion == 'alta'){

					// Cargar sección de alta web
					this.views['altaView'] = new AltaClienteWebView({
						id: 'seccion_alta',
						className: 'alta'
					});
					
					vista = 'alta';

				}
				

				
				if(seccion == 'usuarios'){

					if(parametro == ''){

						// Cargar tabla de usuarios
						this.views['usuariosView'] = new UsuariosView({
							id: 'seccion_usuarios',
							className: 'seccion_usuarios'
						});

						vista = 'usuarios';

					}else{

						this.views['detalleUsuarioView'] = new DetalleUsuarioView({
							id: 'seccion_detalle_usuario',
							className: 'seccion_detalle_usuario',
							id_usuario: parametro
						});

						vista = 'detalleUsuario';

					}
					
				}
			

			
				if(seccion == 'concursos'){

					if(parametro == ''){

						// Cargar tabla de concursos
						this.views['concursosView'] = new ConcursosView({
							id: 'seccion_concursos',
							className: 'seccion_concursos'
						});

						vista = 'concursos';

					}else{

						this.views['detalleConcursoView'] = new DetalleConcursoView({
							id: 'seccion_detalle_concurso',
							className: 'seccion_detalle_concurso',
							id_concurso: parametro
						});


						vista = 'detalleConcurso';

					}

				}

				if(seccion == 'verCondicionesBaja'){

					// Cargar sección de condiciones baja
					this.views['verCondicionesBajaView'] = new VerCondicionesBajaView({
						id: 'seccion_verCondicionesBaja',
						className: 'ver_condiciones_baja'
					});
					
					vista = 'verCondicionesBaja';

				}

				if(seccion == 'adjudicaciones'){

					// Cargar sección de adjudicaciones
					this.views['adjudicacionesView'] = new AdjudicacionesView({
						id: 'seccion_adjudicaciones',
						className: 'ver_adjudicaciones'
					});
					
					vista = 'adjudicaciones';
				}

				if(seccion == 'informes'){

					// Cargar sección de informes
					this.views['informesView'] = new InformesView({
						id: 'seccion_informes',
						className: 'ver_informes'
					});
					
					vista = 'informes';
				}

				if(seccion == 'carga'){

					// Cargar sección de carga
					this.views['cargaView'] = new CargaView({
						id: 'seccion_carga',
						className: 'ver_carga'
					});
					
					vista = 'carga';
				}

				if(seccion == 'contratacion'){

					// Cargar sección de contratacion
					this.views['contratacionView'] = new ContratacionView({
						id: 'seccion_contratacion',
						className: 'contratacion'
					});
					
					vista = 'contratacion';

				}

				if(seccion == 'revision'){

					// Cargar sección de contratacion
					this.views['revisionView'] = new RevisionView({
						id: 'seccion_revision',
						className: 'revision'
					});
					
					vista = 'revision';

				}
			*/

			if(vista == ''){
				seccion = 'no_encontrado';
				vista = 'noEncontrado';
			}

			if(seccion == 'no_encontrado'){

				// Cargar sección de contratacion
				this.views['noEncontradoView'] = new NoEncontradoView({
					id: 'seccion_no_encontrado',
					className: 'no_encontrado'
				});
				
				vista = 'noEncontrado';

			}

			console.log('seccion', seccion);

			this.views.push(seccion + 'View'); // add to views so the view can be removed from memory

			//var contenedor = '#contenido_seccion';
			var contenedor = '#vista_general';

			if( vista.substr(0,7) == 'detalle' ){
				contenedor = '#contenido_detalle';
			}

			
			if( contenedor == '#contenido_detalle'){

				this.$('#contenido_detalle').html( this.views[vista + 'View'].render().$el );
				this.$('#contenido_seccion').hide();

				this.vista_seccion = vista;

			} else {

				var seccion_ruta_previa = Config.ruta_previa.split('/')[0].replace('#','');
				var seccion_ruta_actual = window.location.hash.split('/')[0].replace('#','');

				if( ( seccion_ruta_actual != seccion_ruta_previa) || this.$('#vista_general').is(':empty') || this.vista_seccion == vista || this.vista_seccion == '' ){
					//this.$('#contenido_seccion').html( this.views[vista + 'View'].render().$el );
					this.$('#vista_general').html( this.views[vista + 'View'].render().$el );
					//this.$(contenedor).html( this.views[vista + 'View'].render().$el );
					//console.log(this.views[vista + 'View'].render());
					//console.log(this.$('#vista_general'));
				}

				this.$('#vista_general').show();
				//this.$(contenedor).show();
				//this.$('#contenido_detalle').empty();

				this.vista_seccion = '';

			}

			/*
			// ENVIAR LA VISITA DE SECCIÓN A GOOGLE ANALYTICS
			if( typeof Config.servidor != 'undefined' && Config.servidor == 'oclemconcursos' && Oclem.es_cliente() ){

				window.ga('set', {
				  page: window.location.hash,
				  title: vista,
				  userId: Config.obj_clientes.id_cliente
				});

				window.ga('send', 'pageview');

			}
			*/
			
			this.$(contenedor).html(this.views[vista + 'View'].render().$el);

			//this.$('#btn_solicitar_baja_menu, #btn_solicitar_soporte_tecnico_menu, #btn_solicitar_soporte_administrativo_menu, #btn_solicitar_soporte_juridico_menu').hide();

			$(document).scrollTop(0);
		
			return true;

		},

		logout: function(){

			// Incluir mensaje de sw_alert para confirmar la salida
			// Direccionar a Portada

				// Por hacer...
			Calidad.ir_a_portada();

			Calidad.ir_a_login();

		},

		

		toggle_footer: function(){
			
			if( window.location.hash != '#login'){

				var scrollHeight = $(document).height();
				var scrollPosition = $(window).height() + $(window).scrollTop();
				
				if( ( (scrollHeight - scrollPosition) / scrollHeight === 0) ){
					// when scroll to bottom of the page
				    $('#footer_login').fadeIn();
				    
			  	}else{
			   	
			   		$('#footer_login').fadeOut();
			  	}	
			}

		},

		/*
		demo: function(e){

			e.preventDefault();
			
			if( this.$('#resp_desplegar_contratar').is(':visible') ){
				this.$('#btn_guardar_cliente').show();
				this.$('#resp_desplegar_contratar').slideUp();	
			}else{
				this.$('#btn_guardar_cliente').hide();
				this.$('#resp_desplegar_contratar').slideDown();	
			}

		},
		*/

	});

	return AppView;

});