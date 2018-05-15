define([
	'jquery',
	'underscore',
	'backbone',
	'funciones',
	'app/config',
	'app/merca',
	'app/views/modalView',
	'fileinput'

], function($, _, Backbone, Fx, Config, Merca, ModalView, FileInput){

	'use strict';

	var AnadirArchivosView = ModalView.extend({
		
		options: {

				title: 'Añadir archivos',
				id: 'modal-anadir-archivos',
				size: 'large',
				texto_cerrar: 'Cancelar'
		},

		html: '',

		views: {},

		events: {
			
			'click .kv-fileinput-upload'           : 'subir_archivos',
			'click #cerrar_ventana_archivos'       : 'cerrar_ventana',

			'touchstart .kv-fileinput-upload'      : 'subir_archivos',
			'touchstart #cerrar_ventana_archivos'  : 'cerrar_ventana',
		},

		num_archivos_a_subir: 0,
		num_archivos_subidos: 0,

		cerrar_ventana: function(e){

			e.preventDefault();
			this.$('button.close').trigger('click');

			$('#refrescar_archivos_soporte').trigger('click');

		},

		subir_archivo: function(nombre_archivo, e){

			var esto = this;

			$('<form>', {
			    "id": "form_aux",
			    "html": [
			    	'<input type="text" id="hash" name="hash" value="' + Oclem.hash() + '" />',
			    	'<input type="text" id="opcion" name="opcion" value="soporte" />',
			    	'<input type="text" id="id_soporte" name="id_soporte" value="' + Config.id_soporte + '" />',

			    	/*
			    	'<input type="text" id="opcion" name="opcion" value="' + esto.model.opcion + '" />',
			    	'<input type="text" id="empresa" name="empresa" value="' + Config.empleado.empresa + '" />',
			    	'<input type="text" id="id_empleado" name="id_empleado" value="' + Config.empleado.id_empleado + '" />',
			    	'<input type="text" id="id_actividad" name="id_actividad" value="' + esto.model.id_actividad + '" />',
			    	'<input type="text" id="id_cliente" name="id_cliente" value="' + esto.model.id_cliente + '" />',
			    	*/
			    	].join(''),
			    "action": Config.base_ajax + 'upload.php'
			})
			.appendTo(esto.$el)
			.submit(function(e){

				e.preventDefault();
				
				var texto_subiendo = '<br>Subiendo archivo ' + nombre_archivo.name;
			    var texto_exito = '<br>Archivo ' + nombre_archivo.name + ' subido con éxito';
			    var texto_error = '<br>El Archivo ' + nombre_archivo.name + ' no se pudo subir.';

			  var formData = new FormData();
			  formData.append("files", nombre_archivo);
			    
			  formData.append('hash', Oclem.hash() );
				formData.append('opcion', 'soporte');
				formData.append('id_soporte', Config.id_soporte);

			  /*
			  formData.append('opcion',esto.model.opcion);
				formData.append('empresa',Config.empleado.empresa);
				formData.append('id_empleado',Config.empleado.id_empleado);
				formData.append('id_actividad', esto.model.id_actividad);
				formData.append('id_cliente', esto.model.id_cliente);
				*/

			    esto.$('#resp_subir_archivos').append(texto_subiendo);

			    $.ajax({
			        
			        url: Config.base_ajax + 'upload.php' ,
			    	type: 'POST',
			        data:  formData,
			    	mimeType:"multipart/form-data",
			    	contentType: false,
			        cache: false,
			        processData:false,

				    success: function(data, textStatus, jqXHR){
				   		esto.$('#resp_subir_archivos').append(texto_exito);
				   		esto.num_archivos_subidos ++;

				   		if(esto.num_archivos_subidos == esto.num_archivos_a_subir){
				   			esto.$('#resp_subir_archivos').html(Fx.bs_alert('Todos los archivos subieron con éxito. <a href="#" id="cerrar_ventana_archivos">Cerrar</a>','success'));
				   		}

				    },
				    error: function(jqXHR, textStatus, errorThrown){
				     	esto.$('#resp_subir_archivos').append(texto_error);
				    }

			    });

			}).submit().remove();

		},


		subir_archivos: function(e){

			e.preventDefault();

			var esto = this;
			var file_data = esto.$('input[type="file"]')[0].files; // for multiple files

			esto.num_archivos_a_subir = file_data.length;

			if(esto.num_archivos_a_subir > 0){

				esto.$('#resp_subir_archivos').html('Subiendo...');

				for(var i = 0; i < esto.num_archivos_a_subir; i++){
					esto.subir_archivo(file_data[i]);
			  }
			    	
			} else {

				esto.$('#resp_subir_archivos').html('Por favor, seleccione antes algún archivo pinchando en <i class="glyphicon glyphicon-folder-open"></i> Buscar.');

			}

		},

		initialize: function(){

			this.cleanUp();
			
			ModalView.prototype.initialize.apply(this, arguments);

			this.html = [
			    	'<form id="form_subir_archivos" enctype="multipart/form-data" method="post">',
			            '<p>Pinche en <i class="glyphicon glyphicon-folder-open"></i> Buscar y luego en <i class="glyphicon glyphicon-upload"></i> Subir. Mantenga pulsada la tecla Ctrol o Cmd para subir múltiples archivos.</p>',
			            '<div class="form-group">',
			                '<input id="file-1" type="file" multiple=true data-preview-file-type="any">',
			            '</div>',

			            '<div id="resp_subir_archivos"></div>',

					'</form>'

			    ].join('');

			this.$bodyEl.html(this.html);

			this.$("#file-1").fileinput({
		        overwriteInitial: false,
		        maxFileSize: 10000,
		        maxFilesNum: 10,
		        uploadLabel: 'Subir',
		        browseLabel: 'Buscar',
		        removeLabel: 'Quitar',
		        msgSizeTooLarge: 'El archivo "{name}" (<b>{size} KB</b>) excede el tamaño máximo permitido <b>{maxSize} KB</b>. Por favor, reduzca el tamaño del archivo e inténtelo de nuevo',
		        msgFilesTooMany: 'El número de archivos seleccionados para subida <b>({n})</b> excede el límite máximo de <b>{m}</b>. Por favor, elija menos archivos e inténtelo de nuevo',
		        msgFileNotFound: 'El archivo "{name}" no ha sido encontrado',
		        msgFileNotReadable: 'El archivo "{name}" no es legible',
		        msgFilePreviewAborted: 'Vista previa de "{name}" cancelada.',
		        msgFilePreviewError: 'Ocurrió un error al leer el archivo "{name}".',
		        msgValidationError: '<span class="text-danger"><i class="glyphicon glyphicon-exclamation-sign"></i> Error en la subida del archivo.</span>',
		        msgLoading: 'Cargando archivo {index} de {files} &hellip;',
		        msgProgress: 'Cargando archivo {index} de {files} - {name} - {percent}% completado.',
		        msgSelected: '{n} archivos seleccionados'

			});
	
			this.id_soporte = this.options.id_soporte;
		},

		render: function(){

			return this;

		},

		onModalHidden: function(){
			$('#refrescar_archivos_soporte').trigger('click');
		},

		cleanUp: function(){

			for(var i=0;i<this.views.length; i++){
				if(typeof this.views[i] == 'function'){
					this.views[i].remove();
				}
				
			}
			
		}

	});

	return AnadirArchivosView;

});