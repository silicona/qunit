/**

 	FUNCIONALIDAD GENERAL DE ICPRO
 	PARA NO REPETIR CÓDIGO

*/


define([

	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'mustache',
	'bs-growl',
	'app/router/router',
	'app/templates',
	'app/config'

], function ($, _, Backbone, Fx, Mustache, Growl, Router, Templates, Config ) {

	'use strict';

	// Funciones Generales
	var Merca = {
		
		inicializar_tabla: function(DatatablesView, view, obj_opciones){
			
			// Inicializa una tabla
			// OBS: hay que pasarle el DatatablesView, porque si no no funciona el DatatablesView.prototype.initialize.apply

			var target 		    = obj_opciones.target, 
				clase           = obj_opciones.clase, 
				titulo_tabla    = obj_opciones.titulo_tabla,
				obj_json        = obj_opciones.obj_json, 
				arr_columns     = obj_opciones.arr_columns,
				limit           = obj_opciones.limit || false,
				total_registros = obj_opciones.total_registros || false,
				order 			= obj_opciones.order;

			if( $.isEmptyObject(obj_json) ){                
                view.$(target).html( Fx.bs_alert( 'No se encontraron datos', 'warning') );
                return true;
            }

            view.options = {
                hide_fields    : '',
                myclass        : clase,
                appendTo       : target,
                filter         : true,
                pagination     : true,
                paginationSize : 10,
                titulo_tabla   : titulo_tabla,
                data           : obj_json,
                columns        : arr_columns,
                limit          : limit,
                total_registros: total_registros

            };

            if( typeof order == 'object' ){
            	view.options.order = order;	
            }else{
				view.options.order = [ [0, 'desc'] ];            	
            }

            // view.options.order = [ [1, 'desc'] ];
            
            // prevenir conflictos con otras tablas
            view.$('.pagination, input#filter').remove();

            DatatablesView.prototype.initialize.apply( view, arguments );

		},
		
		/*
		inserta_iframe_aena: function(){

			if( this.es_cliente() ){
				return [
					'<div class="oculto">',
			            ' <iframe src="http://contratacion.aena.es/contratacion/ecompras/pedidos" width="0" height="0"></iframe> ',
			            ' <iframe src="http://contratacion.aena.es/contratacion/principal?portal=licitaciones" width="0" height="0"></iframe> ',
			        '</div>'
				].join('');

			}else{
				
				return '';
			
			}
			
		},
		*/

		actualizar_spans_totales: function(){
			
			this.actualizar_contadores();

		},

		actualizar_contadores: function(){

			Merca.calcular_soportes_ptes(0);
			Merca.calcular_soportes_ptes(1);
			Merca.calcular_soportes_ptes(2);
			Merca.calcular_soportes_ptes(3);
			
			Merca.actualizar_num_adjudicaciones();

			console.log('Actualizados contadores');

		},

		devuelve_tipo_soporte: function(id_tipo_soporte){

			// Devuelve el tipo de soporte correspondiente al id_tipo_soporte
			var tipo_soporte = '';

			$.each( Config.obj_tipos_soportes, function(index, value){

				if( index == id_tipo_soporte){
					tipo_soporte = value;
					return value;
				}

			});

			return tipo_soporte;
		},

		calcular_soportes_ptes: function(id_tipo_soporte){


			// Pone los totales de num consultas de técnico, comercial
			var esto = this,
				tipo_soporte = '';

			var resp = $.ajax({

				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'calcular_soportes_ptes',
					hash: this.hash(),
					id_tipo_soporte: id_tipo_soporte
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){

					tipo_soporte = esto.devuelve_tipo_soporte( id_tipo_soporte );

					$('.num_' + tipo_soporte).text(mi_json);
					//$('span.num_' + tipo_soporte).text(mi_json);



				}

			});

			return resp;
		}, // fin calcular soportes ptes

		devuelve_tipo_contrato: function(id_tipo_contrato){

			var tipo_contrato = '';

			if( id_tipo_contrato == ''){ tipo_contrato = 'Demo';}
			if( id_tipo_contrato == 0 ){ tipo_contrato = 'Demo';}
			if( id_tipo_contrato == 1 ){ tipo_contrato = 'con30';}
			if( id_tipo_contrato == 2 ){ tipo_contrato = 'con120';}
			if( id_tipo_contrato == 3 ){ tipo_contrato = 'con2000';}
			if( id_tipo_contrato == 4 ){ tipo_contrato = 'con60';}
			if( id_tipo_contrato == 5 ){ tipo_contrato = 'con6';}
			if( id_tipo_contrato == 6 ){ tipo_contrato = 'con3';}
			if( id_tipo_contrato == 7 ){ tipo_contrato = 'clasif';}
			if( id_tipo_contrato == 8 ){ tipo_contrato = 'con50';}

			return tipo_contrato;
		
		},

		devuelve_enlace_contrato: function(id_tipo_contrato){

			var archivo_contrato = '';

			if( id_tipo_contrato == 1 ){ archivo_contrato = 'con30.pdf';}
			if( id_tipo_contrato == 2 ){ archivo_contrato = 'con120.pdf';}
			if( id_tipo_contrato == 3 ){ archivo_contrato = 'con2000.pdf';}
			if( id_tipo_contrato == 4 ){ archivo_contrato = 'con60.pdf';}
			if( id_tipo_contrato == 5 ){ archivo_contrato = 'con6.pdf';}
			if( id_tipo_contrato == 6 ){ archivo_contrato = 'con3.pdf';}
			if( id_tipo_contrato == 7 ){ archivo_contrato = '';} // Las clasificadas no tienen contrato
			if( id_tipo_contrato == 8 ){ archivo_contrato = 'con50.pdf';}

			return archivo_contrato;
		
		},

		es_concurso_clasificado: function(obj_concurso){
			// devuelve true si es un concurso clasificado

			//console.log(obj_concurso);
			
			if( !$.isPlainObject(obj_concurso) ){
				return false;
			}

			var arr_cods_clasificaciones = obj_concurso.cods_clasificaciones.split(','),
				cod_clasificacion = '';

			for(var i=0; i < arr_cods_clasificaciones.length; i++){
				
				cod_clasificacion = arr_cods_clasificaciones[i];

				cod_clasificacion = cod_clasificacion.replace(/ /g,'');

				if( cod_clasificacion.length < 3){
					return false;
				}

			}

			return true;

		},

		limpiar_datos_sesion: function(){

			window.localStorage.removeItem('hash');
			window.localStorage.removeItem('nombre');
			window.localStorage.removeItem('empresa');
			window.localStorage.removeItem('oclem_admin');
			window.localStorage.removeItem('comercial');
			window.localStorage.removeItem('tecnico');
			window.localStorage.removeItem('cliente_admin');

			window.localStorage.removeItem('obj_clientes');
			window.localStorage.removeItem('obj_usuario');

			Config.hash          = '';
			Config.nombre        = '';
			Config.empresa       = '';
			Config.oclem_admin   = '';
			Config.comercial     = '';
			Config.tecnico       = '';
			Config.cliente_admin = '';
			
			Config.obj_clientes  = '';
			Config.obj_usuario   = '';
			
		},

		mostrar_footer_si_no_scroll: function(){
			if( window.innerWidth > document.documentElement.clientWidth ){
				$('#footer_login').fadeOut();
			}
		},

		notify: function(texto, clase){

			$.growl({
	            message: texto
	        },{
	            type: clase,
	            allow_dismiss: false,
	            label: 'Cancelar',
	            className: 'btn-xs btn-inverse',
	            placement: {
	                from: 'top',
	                align: 'right'
	            },
	            delay: 2500,
	            animate: {
	                    enter: 'animated fadeIn',
	                    exit: 'animated fadeOut'
	            },
	            offset: {
	                x: 10,
	                y: 75
	            }
	        });

		},

		ir_a_login_si_error: function(obj_json){

			if( (typeof obj_json != 'object') || (obj_json.error == 'Validación no válida') ){
				this.ir_a_login();
			}

		},

		es_admin: function(){

			return ( Config.oclem_admin == 'true') && ( typeof Config.oclem_admin != 'undefined') ;
		
		},

		es_cliente: function(){
			return ( (Config.oclem_admin != 'true' || typeof Config.oclem_admin == 'undefined' ) && Config.obj_usuario.comercial == '0' && Config.obj_usuario.tecnico == '0' ) ;
		},

		es_comercial: function(){
			return ( Config.obj_usuario.comercial == '1' ) ;	
		},

		es_tecnico: function(){
			return ( Config.obj_usuario.tecnico == '1' ) ;	
		},

		es_cliente_no_admin: function(){
			
			return ( this.es_cliente() && ( Config.obj_usuario.cliente_admin == '0' || typeof Config.obj_usuario.cliente_admin == 'undefined' ) ) ;
		
		},

		es_tarifa_mini: function(){

			return Config.obj_clientes.tipo_contrato == 'con50';

		},

		check_login: function(){
			
			if( (window.location.hash.split('/')[0] == '#alta') || (window.location.hash == '#alta/demo') || (window.location.hash == '#politica') || (window.location.hash.split('/')[0] == '#contratacion') ){
				return true;
			}

			if( (Config.hash == 'mi_hash') || (Config.hash == '') || ( typeof Config.hash == 'undefined') ) {
				this.ir_a_login();
			}

		},

		ir_a_login: function(){

			this.limpiar_datos_sesion();

			window.location.hash = '#login';
		
		},

		ultimo_es_cliente: function(json_soporte){

			// determina si la última respuesta de un json_soporte
			// ha sido hecha por un cliente o no

			if(!$.isPlainObject(json_soporte)){
				return false;
			}

			var max = 0;
			for( var i=0; i<Object.keys(json_soporte.arr_detalles).length; i++ ){
				if( Object.keys( json_soporte.arr_detalles )[i] > max){
					max = i;
				}
			}

			return json_soporte.arr_detalles[ Object.keys( json_soporte.arr_detalles )[max] ].es_cliente == 1;
			
		},

		actualizar_num_concursos_sin_revisar: function(){

			var esto = this;

			if( this.es_admin() || this.es_tecnico() ){

				var resp = $.ajax({
					
					url: Config.base_ajax + 'concursos.php',
					type: 'POST',
					data: {
						accion: 'consultar',
						opcion: 'num_concursos_sin_revisar',
						hash: this.hash()
					}

				});

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						mi_json = $.parseJSON(mi_json);
						
						$.each(mi_json, function(index, value){
							
							$('span.num_revision').text( parseInt(value) );
							
						});

					}
					
				});

			}
			
		},

		actualizar_num_adjudicaciones: function(){

			var esto = this;

			var resp = $.ajax({
				
				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					opcion: 'num_adjudicaciones',
					hash: this.hash()
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){
					
					mi_json = $.parseJSON(mi_json);
					
					$.each(mi_json, function(index, value){
						
						if( isNaN(value) ){value = 0;}

						$('.num_adjudicaciones').text( parseInt(value) );
						
					});

				}
				
			});

			
		},

		actualizar_nombre_usuario: function(){

			var nombre = Config.nombre;

			if( typeof nombre == 'undefined'){
				return true;
			}

			if( (Config.bienvenido !== true) && (window.location.hash != '#login') && (window.location.hash != '#alta') && (window.location.hash != '#politica')  ){
				this.notify('Hola, ' + nombre, 'inverse');
				Config.bienvenido = true;
			}

		},

		actualizar_obj_form: function( obj_formulario ){

			var obj_form = {};

			$('input, select, textarea', obj_formulario ).each(function(index, value){
				
				obj_form[ $(this).attr('id') ] = $(this).val();

			});

			return obj_form;

		},
		
		cargar_cliente: function(id_cliente){

			
			var resp = $.ajax({
				
				url: Config.base_ajax + 'clientes.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					id_cliente: id_cliente,
					hash: this.hash()
				}

			});

			return resp;

		},

		cargar_obj_clientes: function(){

			// rellena el objeto obj_clientes con los valores de clientes
			
			if( typeof Config.obj_clientes != 'object'){

				var resp = $.ajax({
				
					url: Config.base_ajax + 'clientes.php',
					type: 'POST',
					data: {
						accion: 'consultar',
						hash: this.hash()
					}

				});

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						mi_json = $.parseJSON(mi_json);
						
						Config.obj_clientes = mi_json;

						window.localStorage.setItem('obj_clientes', JSON.stringify( Config.obj_clientes) );

					}

				});

				
				return resp;	
			}
			
			return Config.obj_clientes;

		},

		cargar_concurso: function(id_concurso, expediente){

			var id_concurso = id_concurso || 0,
				expediente  = expediente  || '';

			var resp = $.ajax({
				
				url: Config.base_ajax + 'concursos.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					id_concurso: id_concurso,
					expediente:  expediente,
					hash: this.hash()
				}

			});

			return resp;

		},

		cargar_soporte: function(id_soporte){
			
			var resp = $.ajax({
				
				url: Config.base_ajax + 'soportes.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					id_soporte: id_soporte,
					hash: this.hash()
				}

			});

			return resp;

		},
		
		cargar_usuario: function(id_usuario){

			
			var resp = $.ajax({
				
				url: Config.base_ajax + 'usuarios.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					id_usuario: id_usuario,
					hash: this.hash()
				}

			});

			return resp;

		},

		cargar_obj_usuario: function(){

			// rellena el objeto obj_usuario con los valores de usuarios
			var esto = this;

			var resp = $.ajax({
				
				url: Config.base_ajax + 'usuarios.php',
				type: 'POST',
				data: {
					accion: 'consultar',
					hash: this.hash()
				}

			});

			resp.done(function(mi_json){

				if(mi_json != ''){
					
					mi_json = $.parseJSON(mi_json);
					Config.obj_usuario = mi_json;

					window.localStorage.setItem('obj_usuario', JSON.stringify( Config.obj_usuario) );

					if(Config.obj_usuario.cliente_admin == '1'){
						$('#btn_usuarios').show();
					}
					
					if( mi_json.error ){
						 esto.ir_a_login();
					}

				}

			});

			return resp;


		},

		actualizar_combos: function(view){
			// Actualiza los combos para que el valor del selectpicker coincida con el real del campo
			view.$('select.selectpicker').selectpicker('refresh');

		},

		actualizar_fechas: function(view){
			
			// actualiza los valores del datepicker
			var fecha = '',
				valor_campo = '';

			$.each( view.$('.fecha'), function(index, value){

				valor_campo = $(this).val();

				if( valor_campo != '0000-00-00'){
					fecha = Fx.parse_date( $(this).val() );
				}
				
				$(this)
					.val(Fx.cambiaf_a_normal( valor_campo ))
					.datepicker('update', fecha );
			
			});

		},

		hash: function(){
			
			if( typeof Config.hash == 'undefined' ){
				return '';
			}

			return window.localStorage.getItem('hash') || Config.hash;

		},

		eliminar_propietario: function(id_propietario){

			var resp = $.ajax({
				
				url: Config.base_ajax + 'propietarios.php',
				type: 'POST',
				data: {
					hash: this.hash(),
					accion: 'eliminar',
					opcion: 'propietario',
					id_propietario: id_propietario
				}

			});

			return resp;

		},


		spinner: function(view, contenedor){

			var html = Templates['spinner'];
			view.$(contenedor).html(html);

		},

		quitar_spinner: function(){
			$('div.spinner').remove();
		},

		cleanUp: function(myView){

			if( typeof myView.views != 'undefined'){
				for(var i=0;i< myView.views.length; i++){
					if(typeof myView.views[i] == 'function'){
						myView.views[i].remove();
					}
					
				}
				
				myView.views.length = 0;	
			}
			
			
		}
		

	};

	return Merca;

});