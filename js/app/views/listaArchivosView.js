define([

	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'mustache',
	'app/config',
	'app/templates',
	'app/formulario',
	'app/merca',
	'app/views/confirmView',
	'swal'
	
], function($, _, Backbone, Fx, Mustache, Config, Templates, formulario, Merca, ConfirmView, Swal){

	'use strict';

	var ListaArchivosView = Backbone.View.extend({
		
		html: 'Cargando...',

		views: {},

		events: {
			'click .eliminar_archivo' : 'eliminar_archivo',
		},

		initialize: function(){

		},

		render: function(){
			
			var esto = this,
				nombre_archivo = '',
				nombre_corto_archivo = '',
				arr_archivos = [];


			$.when( Merca.cargar_soporte( esto.model.id_soporte ) )
				
				.then(function(mi_json){

					esto.html = '';

					if(mi_json != null){
						
						//mi_json = mi_json.replace('[','');
						//mi_json = mi_json.replace(']','');

						var obj_json = $.parseJSON(mi_json);

						if( (typeof (obj_json.archivos) != 'undefined' ) && (mi_json != '') ){

							arr_archivos = obj_json.archivos.split(',');

							esto.html = '<div class="row">';
							
							for(var i = 0; i < arr_archivos.length; i++){

								nombre_archivo = arr_archivos[i];
								
								if(nombre_archivo.length > 10 ){

									nombre_corto_archivo = nombre_archivo.substring(11); //quitar código de tiempo

									var data = {
										nombre_archivo: nombre_archivo,
										nombre_corto_archivo: nombre_corto_archivo,
										enlace_archivo: Config.base_ajax + 'uploads/' + nombre_archivo,
										id_soporte: esto.model.id_soporte
									};

									esto.html += Mustache.to_html(Templates['archivo'](data), data);	
								}
								

							}

							esto.html += '</div>';
							
						}

					}

					esto.$el.html(esto.html);
					

					if( Merca.es_cliente() ){
						esto.$('.eliminar_archivo').remove();
					}

				});

			return this;

		},

		eliminar_archivo: function(e){

			e.preventDefault();

			var esto = this;

			if( Oclem.es_admin() || Oclem.es_tecnico() ){

				Swal({
                    
                    title: "Está seguro de que desea eliminar el archivo?",   
                    text: "Esta operación no se podrá deshacer",   
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sí, eliminar!",
                    cancelButtonText: "No, cancelar",   
                    closeOnConfirm: false,
                    closeOnCancel: false

                }, function(isConfirm){   
                    if (isConfirm) {     
                        
                        var nombre_archivo = e.target.attributes['data-nombre_archivo'].value;
                    	esto.procesar_eliminar_archivo(nombre_archivo);
 
                    } else {     
                        Swal("Cancelado", "El archivo sigue estando disponible", "error");   
                    }
                });

			}

		},



		procesar_eliminar_archivo: function(nombre_archivo){

			var esto = this;
			
			var resp = $.ajax({
					
					url: Config.base_ajax + 'soportes.php',
					type: 'POST',
					data: {
						accion: 'eliminar_archivo',
						hash: Oclem.hash(),
						nombre_archivo: nombre_archivo
					}

				});

				resp.done(function(mi_json){

					if(mi_json != ''){
						
						mi_json = $.parseJSON(mi_json);
						console.log(mi_json);

						if(mi_json.status == 'ko'){

							Swal("Error al eliminar", mi_json.error, "error");
							
						}else{

							console.log('Archivo eliminado');
							esto.$('div[data-nombre_archivo="' + nombre_archivo + '"]').fadeOut('slow');
							
							Swal("Archivo eliminado.", "El archivo fue eliminado con éxito de la base de datos.", "success");

						}
					}

				});

		}, // fin eliminar archivo


	});

	return ListaArchivosView;

});