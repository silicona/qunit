define([
	
    'jquery',
    'app/config'

], function($, Config){

	var Fx = {

		form_boton: function(obj_datos){
			
			var id           = obj_datos.id           || '',
				label        = obj_datos.label        || '',
				valor        = obj_datos.valor        || '', 
				placeholder  = obj_datos.placeholder  || '',
				ayuda        = obj_datos.ayuda        || '',
				disabled     = obj_datos.disabled     || '',
				title        = obj_datos.title        || '',
				atributos    = obj_datos.atributos    || {},
				clase        = obj_datos.clase        || '',
				col_bs_label = obj_datos.col_bs_label || '',
				col_bs_input = obj_datos.col_bs_input || '',
				href         = obj_datos.href         || '',
				icono        = obj_datos.icono        || '',
				input_group  = obj_datos.input_group  || '',
				boton_info   = '',
				
				html_boton   = '',
				tag_name     = 'button';
				

			if(ayuda !== ''){
				boton_info = '<span class="badge badge-info ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}

			if(disabled !== ''){
				disabled = 'disabled';
			}

			if(href !== ''){
				tag_name = 'a';
				href = ' href="' + href + '" ';
			}

			if( icono !== ''){
				icono = '<i class="fa fa-' + icono + ' fa-lg"></i> ';
			}

			if( title !== ''){
				title = 'title="' + title + '" ';
			}

			html_boton = '<' + tag_name + ' ' + href + title + this.objeto_a_string(atributos) + disabled + ' class="btn ' + clase + '" id="' + id + '" >' + icono + label + '</' + tag_name + '>';

			if( input_group === '' || input_group === 'true'){
				return [
					'<div class="form-group div_' + id + '">',

						'<div class="input-group ' + col_bs_input + '">',
							html_boton,	
						'</div>',
					'</div>'
				].join('');
			
			}else{

				return html_boton;
			
			}

		},

		devuelve_innerHtml: function(e){

			// coge el evento y devuelve el innerHtml
			if( typeof e != 'object' ){return '';}
			return e.target.innerHTML;

		},

		devuelve_clase: function(e){

			// coge el evento y devuelve la clase
			if( typeof e != 'object' ){ return ''; }

			return e.currentTarget.className;

		},

		is_numeric: function(n){

	      return !isNaN(parseFloat(n)) && isFinite(n);
	    },

	    is_integer: function(val){
	      
          if(val==null){ return false; }

	      if (val.length==0){ return false; }

	      for (var i = 0; i < val.length; i++){

	          var ch = val.charAt(i)

	          if (i == 0 && ch == "-"){ continue; }

	          if (ch < "0" || ch > "9"){ return false; }
	      }

	      return true;
	    },

		str_check_oblig: function(string_check, min_chars, nombre_elem){

			if( typeof (string_check) == 'undefined' ){
				return '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
			}

			// devuelve vacío si se cumple, texto si no,
			if( string_check.length < min_chars){
				return '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
			}

			return '';
			
		},

		separar_comas: function(string){

			// convierte una cadena tipo aaa,bbb,ccc en aaa, bbb, ccc

			string = this.limpia_undefined(string);

			if (typeof string == 'string') {
				return string.replace(/,/gi, ', ');	
			}

			return '';
		},

		string_a_obj: function(string, separador){

			if(string == ''){ return {}; }

			// convierte una cadena tipo aaa, bbb, cccc en {0: 'aaa', 1: 'bbb', 2: 'ccc'}
			var separador = separador || ',',
				arr_aux = string.trim().split(separador),
				obj_aux = {};

			$.each(arr_aux, function(index, value){
				obj_aux[index] = value;
			});

			return obj_aux;

		},

		obj_a_select: function(id_select, obj, atributos){

			// devuelve un select con los valores del objeto
			
			var str_html = '';
			var atributos = atributos || '';

			$.each(obj, function (index, value) {
				
				str_html += '<option value="' + index + '">' + value.trim() + '</option>';

			});

			return '<select id="' + id_select + '" ' + atributos + '>' + str_html + '</select>';

		},

		arr_a_select: function(id_select, array){

			var str_html = '';

			$.each(array, function(index, value){
				str_html += '<option value="' + index + '">' + value.trim() + '</option>';
			});

			return '<select id="' + id_select + '">' + str_html + '</select>';

		},

		devuelve_checked: function(valor){

			var valor = valor || false;

			if( (valor == true) || (valor == 1) ){
				return ' checked="checked" ';
			}else{
				return '';
			}

		},

		focus: function(elem){
			
			// sin setTimeout no funciona focus en Chrome
			setTimeout(function(){
	           elem.focus();
	        }, 100);
		},

		sugerencia: function(str){

		    return [
		    	'<div class="alert alert-info">',

			        '<a href="#" class="close" data-dismiss="alert">&times;</a>',
			        '<i class="fa fa-comments fa-2x"></i><br> ',
			        str,

			    '</div>'].join('');

		},

		// quitar último caracter
		quitar_ultimo_caracter: function(str){
			
			if(str.length == 0){
				return '';
			}

			return str.substring(0, str.length - 1);

		},

		quitar_acentos: function(str){

			if( typeof (str) == 'undefined' ){ return '';}

			return str 
				.replace( /\n/g, ' ' )
                .replace( /[áàäâ]/g, 'a' )
                .replace( /[éèëê]/g, 'e' )
                .replace( /[íìïî]/g, 'i' )
                .replace( /[óòöô]/g, 'o' )
                .replace( /[úùüû]/g, 'u' )
                .replace( /[Á]/g, 'A' )
                .replace( /[É]/g, 'E' )
                .replace( /[Í]/g, 'I' )
                .replace( /[Ó]/g, 'O' )
                .replace( /[Ú]/g, 'U' );

		},

		// igualar columnas
		igualar_columnas: function(elem1,elem2){
			
			var highestCol = Math.max($(elem1).height(),$(elem2).height());
			$(elem1 + ',' + elem2).height(highestCol);

		},
		

		// prevenir imágenes rotas
		quitar_img_rotas: function(contenedor){
			
			$("img", contenedor).error(function () {
			  $(this).unbind("error").attr("src", Config.base_acceso + 'img/no_foto.jpg');
			});

		},
		
		convertir_a_bool: function(variable){

			if(variable == 'true'){
				return true;
			}

			if(variable == 'false'){
				return false;
			}

			return variable;

		},

		limpia_undefined: function(variable){
			
			// si una variable es igual a undefined, la transforma en ''
			if( ( typeof variable == 'undefined') || (variable == 'undefined') || (variable == undefined) || (variable == null) ){
				return '';
			}				
			
			return variable;
		},

		parsear_json: function(obj){
			
			// Abstrae el problema de cuando un objeto viene como cadena
			if( typeof obj == 'object'){
				return obj;
			}else{
				
				if(obj == ''){
					return {};
				}

				return $.parseJSON(mi_json);
			}
			
		},


		pantalla_escritorio: function(){
			return $(window).width() > 752;
		},

		mostrar_cargador: function(target, contexto){
			
			var contexto = contexto || '';
			var html_cargador = '<div class="loader"><span></span><span></span><span></span></div>';

			$(target, contexto).html(html_cargador);
		},

		si_no: function(valor){
			return this.devuelve_sino(valor);
		},

		devuelve_sino: function(valor){
			// Devuelve Sí si el valor es 1, No si el valor es 0;

			if( (valor == 0) || (valor == false) || (valor == 'false') || (valor == undefined) ){return "No";}
			if( (valor == 1) || (valor == true) || (valor == 'true') ){return "Sí";}
			
			return valor;
		},

		validar_formulario: function(elem){
			
			// validar el formulario
			// si hay algun error, devuelve false y muestra un mensaje
			// si no hay errores devuelve true

			var errores = false; //necesario porque si no growl falsearía la validación
			
			$.each($('input, textarea', elem), function(index, value){
		    	
				if( ( $(this).hasClass('obligatorio')  ) && ( $(this).val() == '') ){
					errores = true;
					$(this).css('border-bottom','1px solid red');
				}

		    });

			if(errores == false){
				$.each($('input, textarea', elem), function(index, value){
		      	
			      	if($(this).trigger('blur').next('.validacion').hasClass('ko')){

				        errores = true;
				        console.log($(this));
				        console.log('error validacion');
				        
				    }

			    });
	
			}
			


			return !errores;
		},

		i: function(obj, caption){

			var caption = caption || '';

			if(caption == ''){
				return console.log(obj);
			}else{
				return console.log(caption + ': ' + obj.toString());
			}
			
		},

		resp_fail: function(){
			
			alert('Error en la operación');

		},

		resp_success: function(mensaje){
			alert('Éxito en la operación');
		},


		bloque_texto: function(obj_datos){

			var 
				mostrar            = true,
				arr_bloque         = '',
				label              = obj_datos.label || '',
				texto              = obj_datos.texto || '',
				ocultar_si_vacio   = obj_datos.ocultar_si_vacio || false,
				ocultar_si_cero    = obj_datos.ocultar_si_cero  || false;

			if( obj_datos.link ){
				texto = '<a href="' + obj_datos.link.url + '" target="_blank" title="' + obj_datos.link.titulo + '" >' + texto + ' <i class="fa fa-external-link"></i></a>';
			}

			if( (ocultar_si_cero  == true) && ( (texto == 0) || ( texto == '0€') ) ){
				mostrar = false;
			}

			if( (ocultar_si_vacio == true) && (texto == '') ){
				mostrar = false;
			}

			if(mostrar == true){
				arr_bloque = [
					'<p class="bloque">',
						'<span>',
							label,
						'</span>',
						texto,
					'</p>'
				].join('');
			}

			return arr_bloque;

		},

		fila_opciones: function(obj_datos){
			
			var label        = obj_datos.label        || '', 
			    id           = obj_datos.id           || '',
			    valor        = obj_datos.valor        || '', 
			    tipo         = obj_datos.tipo         || 'text', 
			    placeholder  = obj_datos.placeholder  || '', 
			    min_char     = obj_datos.min_char     || 0 ,
			    disabled     = obj_datos.disabled     || '',
			    atributos    = obj_datos.atributos   || {},
			    clase        = obj_datos.clase || '',
			    title        = '';
		
		},

		form_input: function(obj_datos){

			var label        = obj_datos.label        || '', 
			    id           = obj_datos.id           || '',
			    valor        = obj_datos.valor        || '', 
			    tipo         = obj_datos.tipo         || 'text', 
			    placeholder  = obj_datos.placeholder  || '',
			    ayuda        = obj_datos.ayuda        || '',
			    min_char     = obj_datos.min_char     || 0 ,
			    disabled     = obj_datos.disabled     || '',
			    atributos    = obj_datos.atributos    || {},
			    clase        = obj_datos.clase        || '',
			    col_bs_label = obj_datos.col_bs_label || '',
			    col_bs_input = obj_datos.col_bs_input || '',
			    boton_info   = '',
			    title        = '',
			    attr         = '';

			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}

			if(min_char > 0){
				attr = ' data-num_char="' + min_char + '"';
			}
			
			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
			}else{
				title = ayuda;
			}

			var arr_html = [
				'<div class="form-group div_' + id + '">',
			    	'<label class="' + col_bs_label + ' control-label" for="' + id + '" title="' + ayuda + '">' + boton_info + label + '</label>',
					'<div class="input-group ' + col_bs_input + '">',
				    	'<input title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' type="' + tipo + '" value="' + valor + '" ' + attr + ' class="form-control ' + clase + '" id="' + id + '" placeholder="' + placeholder + '" >',
				  		
					'</div>',
			  	'</div>'
			];

			return arr_html.join('');
		},

		// function form_textarea(label, id, valor, clase, placeholder, ayuda){
		form_textarea: function(obj_datos){

			var label           = obj_datos.label        || '',
				id              = obj_datos.id           || '',
				ayuda           = obj_datos.ayuda        || '',
				placeholder     = obj_datos.placeholder  || '...',
				valor           = obj_datos.valor        || '',
				clase           = obj_datos.clase        || '',
			    min_char        = obj_datos.min_char     || 0 ,
			    disabled        = obj_datos.disabled     || '',
			    atributos       = obj_datos.atributos    || {},
			    col_bs_label    = obj_datos.col_bs_label || '',
			    col_bs_textarea = obj_datos.col_bs_textarea || '',
			    attr            = '',
			    boton_info      = '',
			    title           = '';

			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}
			
			if(min_char > 0){
				attr = ' data-num_char="' + min_char + '"';
			}

			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
			}else{
				title = ayuda;
			}

			var arr_html = [
				'<div class="form-group div_' + id + '">',
			    	'<label for="' + id + '" title="' + ayuda + '" class="control-label ' + col_bs_label + '">' + boton_info + label + '</label>',
					'<div class="input-group ' + col_bs_textarea + '">',
				    	'<textarea title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' class="form-control ' + clase + '" id="' + id + '" placeholder="' + placeholder + '" title="' + ayuda + '">',
				    	valor,
				    	'</textarea>',
			    	'</div>',
			  	'</div>'
			];

			return arr_html.join('');
			
		},

        form_input_check: function(obj_datos){
       
            var label          = obj_datos.label || '',
                id             = obj_datos.id    || '',
                checked        = obj_datos.checked || '',
                //ayuda          = obj_datos.ayuda || '',
                disabled       = obj_datos.disabled     || '',
                atributos      = obj_datos.atributos   || {},
                clase          = obj_datos.clase || '',
                //texto_si       = obj_datos.texto_si || 'Sí',
                //texto_no       = obj_datos.texto_no || 'No',

                col_bs_label   = obj_datos.col_bs_label || '',
                col_bs_input   = obj_datos.col_bs_input || '',

                title          = obj_datos.title || '',
                //boton_info     = '';

            if( (checked == 1) || (checked == "checked") ){ checked = 'checked="checked"'; }

            // if(ayuda != ''){
            //     boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
            // }

            var arr_html = [
                '<div class="form-group div_' + id + '">',
                    '<div class="input-group">',
                        '<input title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' id="' + id + '" class="' + clase +  ' ' + col_bs_input + '" type="checkbox" name="' + id + '" ' + checked + ' >',
                    '</div>',
                    '<label for="' + id + '" title="' + titulo + '" class="'+ col_bs_label + ' control-label">' + boton_info + label + '</label>',
                '</div>'
            ];

            return arr_html.join('');
        }

		form_input_fecha: function(obj_datos){

			var label       = obj_datos.label || '',
				id          = obj_datos.id    || '',
				ayuda       = obj_datos.ayuda || '',
				valor       = obj_datos.valor || '',
				placeholder = obj_datos.placeholder || '',
				disabled    = obj_datos.disabled     || '',
			    atributos   = obj_datos.atributos   || {},
			    clase       = obj_datos.clase || '',

			    col_bs_label = obj_datos.col_bs_label || '',
			    col_bs_input = obj_datos.col_bs_input || '',

			    boton_info   = '',
			    title        = '';


			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}

			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
			}else{
				title = ayuda;
			}

			/*
			var arr_html = [
				'<div class="form-group div_' + id + '">',
                    '<label for="' + id + '" title="' + ayuda + '" class="' + col_bs_label + ' control-label" >' + boton_info + label + '</label>',
					'<div class="col-md-4 col-xs-11">',
                        '<input title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' id="' + id + '" type="text" placeholder="' + placeholder + '" value="' + valor + '" title="' + ayuda + '"  class="datepicker form-control form-control-inline input-medium default-date-picker ' + clase + '">',
                        '<span class="help-block">Selec. fecha</span>',
                    '</div>',
                '</div>'
			];
			*/

			var arr_html = [
				'<div class="form-group div_' + id + '">',
			    	'<label for="' + id + '" title="' + ayuda + '" class="' + col_bs_label + ' control-label" >' + boton_info + label + '</label>',
					'<div class="input-group date ' + col_bs_input + '">',
						'<input title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' id="' + id + '" type="text" placeholder="' + placeholder + '" class="fecha default-date-picker datepicker form-control ' + clase + '" value="' + valor + '" title="' + ayuda + '" />',
						'<span class="input-group-addon">',
							'<i class="fa fa-calendar"></i>',
						'</span>',
					'</div>',
				'</div>'
			];
			
			return arr_html.join('');

		},

		form_input_hora: function(obj_datos){

			var label          = obj_datos.label || '',
				id             = obj_datos.id    || '',
				ayuda          = obj_datos.ayuda || '',
				placeholder    = obj_datos.placeholder || '...',
				valor          = obj_datos.valor || '',
				clase          = obj_datos.clase || '',
				disabled       = obj_datos.disabled     || '',
			    atributos      = obj_datos.atributos   || {},

			    col_bs_label = obj_datos.col_bs_label || '',
			    col_bs_input = obj_datos.col_bs_input || '',

			    boton_info     = '',
			    title          = '';

			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}
			
			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
			}else{
				title = ayuda;
			}

			var arr_html = [
				'<div class="form-group div_' + id + '">',
					'<label for="' + id + '" title="' + ayuda + '" class="'+ col_bs_label + ' control-label">' + boton_info + label + '</label>',
					'<div class="input-group date">',
						'<input class="col_bs_input" title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' type="text" id="' + id + '"  placeholder="' + placeholder + '" name="' + id + '" class="hora form-control ' + clase + '" value="' + valor + '" title="' + ayuda + '" />',
						'<span class="input-group-addon">',
							'<i class="fa fa-clock-o"></i>',
						'</span>',
					'</div>',
				'</div>'
			];

			return arr_html.join('');

		},

		form_sino: function(obj_datos){
			
			var label          = obj_datos.label || '',
				id             = obj_datos.id    || '',
				checked        = obj_datos.checked || '',
				ayuda          = obj_datos.ayuda || '',
				disabled       = obj_datos.disabled     || '',
			    atributos      = obj_datos.atributos   || {},
			    clase          = obj_datos.clase || '',
			    texto_si       = obj_datos.texto_si || 'Sí',
			    texto_no       = obj_datos.texto_no || 'No',

			    col_bs_label   = obj_datos.col_bs_label || '',
			    col_bs_input   = obj_datos.col_bs_input || '',

			    title          = '',
				boton_info     = '';

			if( (checked == 1) || (checked == "checked") ){
				checked = 'checked="checked"';
			}

			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}

			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
				disabled = ' disabled="disabled" ';
			}else{
				title = ayuda;
			}

			var arr_html = [
				'<div class="form-group div_' + id + '">',
					'<label for="' + id + '" title="' + ayuda + '" class="'+ col_bs_label + ' control-label">' + boton_info + label + '</label>',
					'<div class="input-group">',
						'<input data-on-text="' + texto_si + '" data-off-text="' + texto_no + '" title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' id="' + id + '" class="' + clase +  ' ' + col_bs_label + '" type="checkbox" name="' + id + '" ' + checked + ' title="' + ayuda + '">',
					'</div>',
				'</div>'
			];

			return arr_html.join('');

		},

		form_select: function(obj_datos){
			
			// json_valores_et es un json con valores 1, 2, 3 y los textos correspondientes,
			// que suelen ser 
			var label            = obj_datos.label || '',
				id               = obj_datos.id    || '',
				checked          = obj_datos.checked || '',
				ayuda            = obj_datos.ayuda || '',
				json_valores_et	 = obj_datos.json_valores_et,
				colorear         = obj_datos.colorear || false,
				arr_option       = [],
				data_content     = '',
				etiqueta         = '',
				disabled         = obj_datos.disabled     || '',
			    atributos        = obj_datos.atributos   || {},
			    clase            = obj_datos.clase || '',

			    col_bs_label     = obj_datos.col_bs_label || '',
			    col_bs_select    = obj_datos.col_bs_select || '',

			    title            = '',
			    boton_info       = '';

			$.each(json_valores_et, function(index, value){

				if(colorear == true){
					etiqueta = Config.clases[index];
				}
				
				//data_content = "<span class='label label-" + etiqueta + "'>" + value + "</span>";
				arr_option.push('<option value="' + index + '" data-content="' + data_content + '">' + value + '</option>');
			
			});

			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}

			if(disabled == 'disabled'){
				title = 'Pulse en desbloquear para modificar';
			}else{
				title = ayuda;
			}

			var arr_html = [
				'<div class="form-group div_' + id + '">',
					'<label for="' + id + '" title="' + ayuda + '" class="control-label ' + col_bs_label + '">' + boton_info + label + '</label>',
					'<div class="input-group ' + col_bs_select + '">',
						'<select title="' + title + '" ' + this.objeto_a_string(atributos) + disabled + ' id="' + id + '" class="selectpicker">',
					    arr_option.join(''),
					    '</select>',
					'</div>',
				'</div>'
			 ];

			return arr_html.join('');

		},

		form_image_upload: function(obj_datos){

			var label            = obj_datos.label || '',
				id               = obj_datos.id    || '',
				checked          = obj_datos.checked || '',
				arr_option       = [],
			    clase            = obj_datos.clase || '',

			    col_bs_label     = obj_datos.col_bs_label || '',
			    col_bs_input     = obj_datos.col_bs_input || '';

			var arr_html = [
				'<div class="form-group div_' + id + '">',
                    '<label class="control-label ' + col_bs_label + '">' + label + '</label>',
                    '<div class="input-group ' + col_bs_input + ' ' + clase + '">',
                        '<div class="fileupload fileupload-new" data-provides="fileupload">',
                            '<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;">',
                                '<img src="//www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=sin+imagen" alt="" />',
                            '</div>',
                            '<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>',
                            '<div>',
                               '<span class="btn btn-white btn-file">',
                               '<span class="fileupload-new"><i class="fa fa-paper-clip"></i> Seleccionar imagen</span>',
                               '<span class="fileupload-exists"><i class="fa fa-angle-double-left"></i> Cambiar</span>',
                               '<input type="file" class="default">',
                               '</span>',
                                '<a href="#" class="btn btn-danger fileupload-exists" data-dismiss="fileupload"><i class="fa fa-trash"></i> Quitar</a>',
                            '</div>',
                        '</div>',
                        /*
                        '<span class="label label-danger">NOTA</span>',
                                 '<span>',
                                 '&nbsp;<br> La miniatura de imagen sólo funciona con IE10, Chrome y Safari',
                        '</span>',
                        */
                    '</div>',
                '</div>',

			];

			return arr_html.join('');

		},

		form_enlace: function(obj_datos){

			var label     = obj_datos.label     || 'Enlace', 
			    href      = obj_datos.href      || '',
			    title     = obj_datos.title     || '',
			    id               = obj_datos.id    || '',
				ayuda            = obj_datos.ayuda || '',
				clase            = obj_datos.clase || '',
				target           = obj_datos.target || '',
				
				col_bs_label     = obj_datos.col_bs_label  || '',
			    col_bs_enlace    = obj_datos.col_bs_enlace || '',

			    boton_info = '';

			var attr = '';


			if(ayuda != ''){
				boton_info = '<span class="badge ayuda"><i class="i_ayuda fa fa-question" data-toggle="tooltip" title="' + ayuda + '"></i></span> ';
			}
			
			var arr_html = [
				'<div class="form-group div_' + id + '">',
			    	'<label class="' + col_bs_label + ' control-label" for="' + id + '" title="' + ayuda + '">' + boton_info + label + '</label>',
					'<div class="input-group ' + col_bs_enlace + '">',
				    	'<a target="' + target + '" class="' + clase + '" href="' + href + '">' + label + '</a>',
				  		
					'</div>',
			  	'</div>'
			];

			return arr_html.join('');
		},

		bs_alert: function(mensaje, clase){
			
			var mensaje = mensaje || '',
				clase   = clase || 'success';

			return ['<div class="alert alert-', clase, '">',
    					mensaje, 
    				'</div>'].join('');

		},

		objeto_a_string: function(obj){
			// coje un objeto i
			var str = '';

			$.each(obj, function(index, value){
				str += (index + '="' + value +  '" ');
			});

			return str;

		},

		/* generales */
		serialize_checkbox: function(selector, atributo) {
			// selector son los checkbox a coger
			// atributo es el atributo cuyos valores devolvemos serializados

			var cadena = '';

			$(selector).each(function() {
				cadena = cadena + $(this).attr(atributo) + ',';
			});

			if (cadena != '') {
				cadena = cadena.substr(0, cadena.length - 1);
			}

			return cadena;

		},

		parse_date: function(string) {  
		    
			// DEVUELVE CADENA DE FECHA MYSQL como DATE DE JS
		    var t = String(string).split(/[- :]/); 
		    
		    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		      
		    return d;  
		
		},

		date_a_mysql: function(d){

		  function pad(n){return n<10 ? '0'+n : n}
		  return d.getUTCFullYear()+'-'
		      + pad(d.getUTCMonth()+1)+'-'
		      + pad(d.getUTCDate()) ;
		      
		},

		devuelve_mes: function(num_mes, abrev, ingles){
			// devuelve el texto corrrespondente al mes del año

			var num_mes = num_mes.toString();
			var abrev = abrev || false;
			var ingles = ingles || false;

			var arr_meses = {
				'1': 'Enero',
				'2': 'Febrero',
				'3': 'Marzo',
				'4': 'Abril',
				'5': 'Mayo',
				'6': 'Junio',
				'7': 'Julio',
				'8': 'Agosto',
				'9': 'Septiembre',
				'10': 'Octubre',
				'11': 'Noviembre',
				'12': 'Diciembre'
			}

			if(ingles == true){
				var arr_meses = {
					'1': 'January',
					'2': 'February',
					'3': 'March',
					'4': 'April',
					'5': 'May',
					'6': 'June',
					'7': 'July',
					'8': 'Augost',
					'9': 'September',
					'10': 'Octuber',
					'11': 'November',
					'12': 'December'
				}	
			}

			if(abrev == false){
				return arr_meses[num_mes];
			}else{
				return arr_meses[num_mes].substr(0,3);
			}
			
		},

		devuelve_meses: function( str_meses, abrev){

			// coge una cadena de número de meses separados por comas
			// y devuelve los equivalentes como texto


			if(str_meses == undefined){
				return '';
			}

			var abrev       = abrev || false,
				arr_meses   = str_meses.split(',')
				str_meses_resp = '',
				i=0;


			for(i=0; i< arr_meses.length; i++){
				str_meses_resp += this.devuelve_mes(arr_meses[i], abrev) + ', ';
			}

			return this.quitar_ultimo_caracter(str_meses_resp);

		},

		cambiaf_a_mysql: function(fecha, hora_minuto) {
			// coge una fecha tipo 01/02/2012 23:00 y devuelve 2012-02-01 23:00
			// si no hay fecha, devuelve la fecha actual

			var ano = 0,
				mes = 0,
				dia = 0,
				hora = '',
				minuto = '',
				date = {};

			if (!fecha) { // 
				date = new Date();
				return date.getFullYear() + '-' +
					(parseInt(date.getMonth(), 10) + 1) + '-' +
					date.getDay() + ' ' +
					date.getHours() + ':' +
					date.getMinutes();
			}

			hora_minuto = hora_minuto || '00:00';
			
			if(hora_minuto.length == 4){
				hora_minuto = '0' + hora_minuto;
			}
			
			ano = parseInt(fecha.substr(6, 4), 10);
			mes = parseInt(fecha.substr(3, 2), 10);
			dia = parseInt(fecha.substr(0, 2), 10);
			
			if(mes < 10){ mes = '0' + mes;}
			if(dia < 10){ dia = '0' + dia;} 
			
			if ((isNaN(ano) == true) || (isNaN(mes) == true) || (isNaN(dia) == true)) {
				this.i(fecha, 'Fecha no definida: ' +  fecha);
				return false;
			}

			return ano + '-' + this.prefInt(mes, 2) + '-' + this.prefInt(dia, 2) + ' ' + hora_minuto;

		},

		cambiaf_a_normal: function(fecha){
		        
			// coge una fecha de mysql y la devuelve como fecha en español
		    // si existe el parámetro $devuelve_blanco, devolvemos ''
			// si no, devuelve 00/00/0000
			var fecha = fecha || '';

			fecha = fecha.substring(0, 10);
			
			if( typeof fecha == "undefined"){
				fecha = this.devuelve_dia_actual();
			}

			var arr_fecha = fecha.split('-');
		    var lafecha = '';

			lafecha = arr_fecha[2] + '/' + arr_fecha[1] + '/' + arr_fecha[0];
		    
			if ( lafecha == 'undefined/undefined/' ){
				lafecha = '';
			}

			if (fecha == '0000-00-00') {
				lafecha = '---';
			}

			return lafecha;
			
			
		},

		cambiaf_a_timestamp: function(fecha, hora_minuto) {
			// coge una fecha tipo 01/02/2012 23:00 y devuelve un timestamp
			// si no hay fecha, devuelve la fecha actual

			var ano = 0,
				mes = 0,
				dia = 0,
				hora = '',
				minuto = '',
				date = {};

			date = new Date();

			if (!fecha) { // 
				return date.getTime();
			}

			hora_minuto = hora_minuto || '00:00';
			
			if(hora_minuto.length == 4){
				hora_minuto = '0' + hora_minuto;
			}
			
			ano     = parseInt(fecha.substr(6, 4), 10);
			mes     = parseInt(fecha.substr(3, 2), 10) - 1;
			dia     = parseInt(fecha.substr(0, 2), 10);
			hora    = parseInt(hora_minuto.substr(0,2), 10);
			minuto  = parseInt(hora_minuto.substr(3,2), 10);

			return new Date(ano, mes, dia, hora, minuto).getTime();

		},

			
		dif_dias: function(fecha1, fecha2, hora_minuto1, hora_minuto2, horas_cortesia) {

			// Devuelve la diferencia en días entre 2 fechas, con hora de cortesía,
			// con el día en que se solicita inclusive

			var prex = '',
				hora1 = 0,
				timeStamp1 = '',
				timeStamp2 = '',
				dif_dias = 0;

			// Para que hora1, hora2 y horas_cortesía sean argumentos opcionales
			hora_minuto1 = hora_minuto1 || "00:00";
			hora_minuto2 = hora_minuto2 || "00:00";
			
			if(hora_minuto1.length == 4){
				hora_minuto1 = '0' + hora_minuto1;
			}
			
			if(hora_minuto2.length == 4){
				hora_minuto2 = '0' + hora_minuto2;
			}
			
			horas_cortesia = horas_cortesia || 1;

			hora1 = parseInt(hora_minuto1.substr(0, 2), 10);
			
			if (hora1 > 0) {
				if (hora1 < 10) {
					var prex = '0';
				}
				hora_minuto1 = prex + (hora1) + ':' + hora_minuto1.substr(3, 2);
			}

			timeStamp1 = cambiaf_a_mysql(fecha1, hora_minuto1);
			timeStamp2 = cambiaf_a_mysql(fecha2, hora_minuto2);
			
			dif_dias = Math.ceil(( this.strtotime(timeStamp1) - this.strtotime(timeStamp2) - (horas_cortesia * 60 * 60) ) / 60 / 60 / 24);
			
			if (dif_dias < 1) {
				return 0;
			} else {
				return dif_dias;
			}

		},

		prefInt: function(number, len) {
			// devuelve un entero con len 0s delante

			var numero = number.toString();

			if (numero.length < len) {
				return (Array(len).join('0') + number).slice(-length);
			} else {
				return number;
			}

		},


		euros: function(valor) {

			return this.number_format(valor, 2, ',', '.') + '€';

		},

		euros_a_numero: function(str){

			// convierte una cadena de euros a un número decimal

			str = str.replace(/€/g, '');
			str = str.replace(/\./g, '');
			
			str = str.replace(',', '.');

			return parseFloat(str).toFixed(2);

		},

		dos_dec: function(valor){
			return Math.round(valor * 100) / 100;
		},

		number_format: function(number, decimals, dec_point, thousands_sep) {
  			//  discuss at: http://phpjs.org/functions/number_format/


			number = (number + '')
			.replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
			  var k = Math.pow(10, prec);
			  return '' + (Math.round(n * k) / k)
			    .toFixed(prec);
			};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
			.split('.');
			if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '')
			.length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1)
			  .join('0');
			}
			return s.join(dec);
		},

		h: function() {
			alert('hola');
		},

		br: function() {
			return '<br>';
		},

		capitalize: function(cadena){
			
			if(typeof cadena == 'undefined'){
				return '';
			}

			if(cadena == ''){
				return '';
			}
		    
		    if(cadena[0] == undefined){
		    	return '';
		    }
		    
		    return cadena[0].toUpperCase() + cadena.slice(1);
		},

		quitar_ultimo_caracter: function(cadena) {
			// quita el último caracter de una cadena de texto

			largo = cadena.length;
			if (largo > 0) {
				cadena = cadena.substr(0, (largo - 1));
			}

			return cadena;

		},

		super_split: function(cadena, caracter){
			// si el array está vacío, devuelve el array
			// si el caracter no existe en la cadena, devuelve un array con un elemento, que es la cadena
			// si existe el caracter, hace un split y devuelve el array
			
			var mi_array = [],
				cadena = cadena || '';
			
			if(cadena.indexOf(caracter) > -1){ 
				return cadena.split(',');
			}else{
				if( cadena != ''){ 
					mi_array.push(cadena);
					return mi_array;
				}else{
					return mi_array;
				}
			}
			
		},

		recargar_pagina: function(milisegundos){

			var milisegundos = milisegundos || 3000;

			function recarga(){
				window.location.reload();	
			}
			
			window.setTimeout(recarga, 3000);
			
		},

		convertDate: function(inputFormat) {
		  

		  function pad(s) { return (s < 10) ? '0' + s : s; }
		  
		  if(inputFormat){
		  	var d = new Date(inputFormat);
		  	return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');	
		  }
		  
		  return '';
		  
		},

		fecha_actual: function(){
			return this.convertDate(new Date());
		},

		fecha_actual_normal: function(){
			return this.cambiaf_a_normal( this.fecha_actual() );
		},
		
		devuelve_dia_actual: function(){

			// Devuelve la fecha del sistema formato y-m-d
			return new Date().toJSON().slice(0,10);
		},

		hoy: function(){

			// Devuelve el día de hoy, formato d/m/Y
			var today            = new Date();
			return this.zeroFill( today.getDate(), 2) + '/' + this.zeroFill( (today.getMonth() + 1) , 2 ) + '/' + today.getFullYear();
		
		},

		hoy_timestamp: function(){

			// devuelve el timestamp con la fecha de hoy
			var today            = new Date();
			return new Date( today.getFullYear(), today.getMonth() , today.getDate() ).getTime() / 1000 ;
		
		},

		escape_html: function(string) {

			string = string || '';
		    return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		},

		html_encode: function(string){
			string = string || '';
			return $('<div/>').text(string).html();
		},
		
		quitar_intros:function(string){
			string = string || '';
			return string.replace(/(\r\n|\n|\r)/gm,"");
		},

		quitar_comillas: function(str){
			return str.replace(/"/g, "");	
		},

		zeroFill: function( number, width )
		{
		  width -= number.toString().length;
		  if ( width > 0 )
		  {
		    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		  }
		  return number + ""; // always return a string
		},


		// PHPJS.ORG
		strtotime: function(text, now) {
			//  discuss at: http://phpjs.org/functions/strtotime/
			//     version: 1109.2016
			// original by: Caio Ariede (http://caioariede.com)
			// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// improved by: Caio Ariede (http://caioariede.com)
			// improved by: A. Matías Quezada (http://amatiasq.com)
			// improved by: preuter
			// improved by: Brett Zamir (http://brett-zamir.me)
			// improved by: Mirko Faber
			//    input by: David
			// bugfixed by: Wagner B. Soares
			// bugfixed by: Artur Tchernychev
			//        note: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
			//   example 1: strtotime('+1 day', 1129633200);
			//   returns 1: 1129719600
			//   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
			//   returns 2: 1130425202
			//   example 3: strtotime('last month', 1129633200);
			//   returns 3: 1127041200
			//   example 4: strtotime('2009-05-04 08:30:00 GMT');
			//   returns 4: 1241425800

			var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

			if (!text) { return fail; }

			// Unecessary spaces
			text = text.replace(/^\s+|\s+$/g, '')
				.replace(/\s{2,}/g, ' ')
				.replace(/[\t\r\n]/g, '')
				.toLowerCase();

			// in contrast to php, js Date.parse function interprets:
			// dates given as yyyy-mm-dd as in timezone: UTC,
			// dates with "." or "-" as MDY instead of DMY
			// dates with two-digit years differently
			// etc...etc...
			// ...therefore we manually parse lots of common date formats
		    match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

		  	if (match && match[2] === match[4]) {

			    if (match[1] > 1901) {

			      	switch (match[2]) {
						case '-':
						  { // YYYY-M-D
						    if (match[3] > 12 || match[5] > 31) {
						      return fail;
						    }

						    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
						      match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
						  }
						case '.':
						  { // YYYY.M.D is not parsed by strtotime()
						    return fail;
						  }
						case '/':
						  { // YYYY/M/D
						    if (match[3] > 12 || match[5] > 31) {
						      return fail;
						    }

						    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
						      match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
						  }
			      	}

			    } else if (match[5] > 1901) {

			        switch (match[2]) {
				        case '-':
				            { // D-M-YYYY
					            if (match[3] > 12 || match[1] > 31) {
					              return fail;
					            }

					            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
					              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				            }

				        case '.':
				            { // D.M.YYYY
					            if (match[3] > 12 || match[1] > 31) {
					              return fail;
					            }

					            return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
					              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				            }

				        case '/':
			          		{ // M/D/YYYY
					            if (match[1] > 12 || match[3] > 31) {
					              return fail;
					            }

					            return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
					              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
			          		}
			        }

			    } else {

			      	switch (match[2]) {

				        case '-':
				            { // YY-M-D
					            if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
					              return fail;
					            }

					            year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
					            return new Date(year, parseInt(match[3], 10) - 1, match[5],
					              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				            }

				        case '.':
				          	{ // D.M.YY or H.MM.SS
					            if (match[5] >= 70) { // D.M.YY
					              if (match[3] > 12 || match[1] > 31) {
					                return fail;
					              }

					              return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
					                match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
					            }
					            if (match[5] < 60 && !match[6]) { // H.MM.SS
					              if (match[1] > 23 || match[3] > 59) {
					                return fail;
					              }

					              today = new Date();
					              return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
					                match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
					            }

					            return fail; // invalid format, cannot be parsed
				          	}

				        case '/':
				            { // M/D/YY
					            if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
					              return fail;
					            }

					            year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
					            return new Date(year, parseInt(match[1], 10) - 1, match[3],
					              match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
				            }

				        case ':':
				            { // HH:MM:SS
					            if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
					              return fail;
					            }

					            today = new Date();
					            return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
					              match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
				            }
			      	}
			    }
		  	}

		    // other formats and "now" should be parsed by Date.parse()
		    if (text === 'now') {
		        return now === null || isNaN(now) ? new Date()
		      		.getTime() / 1000 | 0 : now | 0;
		  	}

			if (!isNaN(parsed = Date.parse(text))) {
				return parsed / 1000 | 0;
			}

			date = now ? new Date(now * 1000) : new Date();
			days = {
				'sun': 0,
				'mon': 1,
				'tue': 2,
				'wed': 3,
				'thu': 4,
				'fri': 5,
				'sat': 6
			};
			ranges = {
				'yea': 'FullYear',
				'mon': 'Month',
				'day': 'Date',
				'hou': 'Hours',
				'min': 'Minutes',
				'sec': 'Seconds'
			};

		    function lastNext(type, range, modifier) {
			    var diff, day = days[range];

			    if (typeof day !== 'undefined') {
			      diff = day - date.getDay();

			      if (diff === 0) {
			        diff = 7 * modifier;
			      } else if (diff > 0 && type === 'last') {
			        diff -= 7;
			      } else if (diff < 0 && type === 'next') {
			        diff += 7;
			      }

			      date.setDate(date.getDate() + diff);
			    }
		    }

		    function process(val) {
			    var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
			      type = splt[0],
			      range = splt[1].substring(0, 3),
			      typeIsNumber = /\d+/.test(type),
			      ago = splt[2] === 'ago',
			      num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

			    if (typeIsNumber) {
			      num *= parseInt(type, 10);
			    }

			    if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
			      return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
			    }

			    if (range === 'wee') {
			      return date.setDate(date.getDate() + (num * 7));
			    }

			    if (type === 'next' || type === 'last') {
			      lastNext(type, range, num);
			    } else if (!typeIsNumber) {
			      return false;
			    }

			    return true;
		    }

			times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
				'|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
				'|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
			regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

			match = text.match(new RegExp(regex, 'gi'));
			
			if (!match) { return fail; }

			for (i = 0, len = match.length; i < len; i++) {

				if (!process(match[i])) { return fail; }
			}

			// ECMAScript 5 only
			// if (!match.every(process))
			//    return false;

			return (date.getTime() / 1000);
		}
	
	};

	return Fx;

});

