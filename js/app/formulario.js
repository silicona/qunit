define([
  'jquery',
  'underscore',
  'backbone',
  'validar_formulario',
  'funciones',
  'mask',
  'bootstrap-datepicker',
  'bs-select'

], function($, _, Backbone, MiForm, Fx, mask, datepicker, selectpicker){

  var Formulario = function(ambito, obj_valores){

    var obj_valores = obj_valores || '';
    
    //codigo si validación ok
    $.fn.ok = function(ambito) {

      $(this).css('border-bottom', '1px solid green');
      $(this).next('.validacion').addClass('ok').removeClass('ko').html('<i class="fa fa-check"></i>');
      $(this).closest('.form-group').find('.mensaje_err_formulario').remove();

    };

    $.fn.ko = function(mensaje) {

      var mensaje = mensaje || '';

      $(this).closest('.form-group').find('.mensaje_err_formulario').remove();
      
      if ($(this).val() ==''){
          $(this).next('.validacion').removeAttr('style').removeClass('ko').removeClass('ok').html('');
          
      }else{
          
          $(this).css('border-bottom', '1px solid red');
          $(this).next('.validacion').addClass('ko').removeClass('ok').html('<i class="fa fa-exclamation"></i>');
          
          $(this).closest('.input-group').after('<span class="alert-danger mensaje_err_formulario">' + mensaje + '</span>');
      }

    };


    if( _.isObject(obj_valores) ){
      anadir_valores(ambito, obj_valores);
    }
    

    inicializar_componentes(ambito);
    listen_eventos_aux(ambito);
    
    Fx.validar_formulario(ambito);

  };

  var anadir_valores = function(ambito, obj_valores){
    
    var selector = {};

    $.each(obj_valores, function(index, value){

      selector = ambito.$('#' + index);

      if( (selector.is("input")) || (selector.is("textarea")) ){
        
        if(selector.hasClass('datepicker')){
          value = Fx.cambiaf_a_normal(value);
        }

        selector.val(value);

      }
      
      if( (selector.is("select")) ){
        ambito.$('#' + index + ' option[value=' + value + ']').attr('selected', 'selected');
      }

      if( (selector.is(":checkbox")) && (selector.val() == 1) ){
        selector.attr('checked', 'checked');
      }

    });
      
  };

  var inicializar_componentes = function(ambito){

      var mensaje_nombre         = 'Texto no válido',
         mensaje_email          = 'Email no válido',
         mensaje_url            = 'Url no válida',
         mensaje_telefono       = 'Teléfono no válido',
         mensaje_numerico       = 'Número no válido.',
         mensaje_usuario        = 'Usuario no válido (mínimo 6 caracteres)',
         mensaje_entero         = 'Entero no válido. Compruebe letras o decimales.',
         mensaje_ano            = 'Año no válido',
         mensaje_fecha          = 'Fecha no válida. Compruebe formato (dd/mm/aaaa)',
         mensaje_hora           = 'Hora no válida',
         mensaje_nif            = 'NIF no válido',
         mensaje_cp             = 'CP no válido',
         mensaje_num_cuenta     = 'Núm. cuenta no válido',
         mensaje_num_tarjeta    = 'Núm. tarjeta no válido';

      /*
      ambito.$('.datepicker')
        .datepicker({
            format: 'dd/mm/yyyy',
            weeekStart: 1,
            startDate: new Date()

        })
        .mask("99/99/9999");
      */

      ambito.$('#datepicker, .fecha').mask('99/99/9999');

      ambito.$('.timepicker, .input-timepicker, .hora').mask("99:99");


      /*
      ambito.$('.colorpicker-default').colorpicker({
          format: 'hex'
      });
      */

      /*
       ambito.$('.switcher').bootstrapSwitch({
                onText: 'Sí',
                offText: 'No'
      });
      ambito.$("span.switch-left").text('Sí');
      ambito.$("span.switch-right").text('No');
      */

      // ambito.$('.datepicker').mask("99/99/9999");

      // ambito.$('.timepicker, .input-timepicker, .hora').mask("99:99");
      
      /*
      ambito.$('.switcher').bootstrapSwitch({
                onText: 'Sí',
                offText: 'No'
      });
      */
      
      
      ambito.$('select').selectpicker();
      

      //formulario
      ambito.$('.mi_form .texto, .mi_form .requerido, .mi_form .numerico, .mi_form .usuario, .mi_form .entero, .mi_form .ano, .mi_form .telefono, .mi_form .nombre_archivo, .mi_form .email, .mi_form .url, .mi_form .nif, .mi_form .fecha, .mi_form .hora, .mi_form .cp, #cuenta, .mi_form .iban, .mi_form .contrasena1, .mi_form .contrasena2, .mi_form .num_tarjeta').after('<div class="validacion"></div>');
      

      // obligatorio
      var label = {},
      label_text = '';
      ambito.$('.obligatorio').each(function(index, el){
        
        label = $(this).closest('.form-group')
          .find('label');
        
        label_text = label.text();
        
        label
          // .css('font-weight','bold')
          .text('(*) ' + label_text );
        
      });


      // Añadir listeners
      // cambiar puntos por comas
      ambito.$('input.numerico').on('keypress',function(){
        $(this).val($(this).val().replace(',','.'));
      });
      
        //poner 0 en enteros al entrar
      ambito.$('input.entero').on('focus',function(event) {
      if($(this).val() == '0'){$(this).val('');}
    
      });
      
      ambito.$('input.entero').on('blur',function(event) {
      if($(this).val() == ''){$(this).val(0);}
      });
      
      /*
      //poner http:// en web
      ambito.$('.mi_form .url').on('focus',function() {
         
         var s = $(this).val();
         if( (s.substr(0,7) != "http://") && (s.substr(0,8) != "https://") ){
                
                if(s.substr(0,7) != "http://"){
                  $(this).val("http://");  
                }

                if(s.substr(0,8) != "https://"){
                  $(this).val("https://");  
                }
                


         }
        

      });
      */
      
      //campo texto
      ambito.$('.mi_form .texto, .mi_form .requerido').on('blur',function() {
          
          var min_long = $(this).attr("data-num_char");
          
          if (MiForm.valida_texto($(this).val(),min_long) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_nombre);
          }
      });
      
      //campo usuario
      ambito.$('.mi_form .usuario').on('blur',function() {
          
          var min_long = $(this).attr("data-num_char");
          
          if (MiForm.valida_usuario($(this).val(),min_long) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_usuario);
          }
      });
      
      //campo numerico
      ambito.$('.mi_form .numerico').on('blur',function() {
          if (MiForm.valida_numerico($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_numerico);
          }
      });
      
      //campo numerico entero
      ambito.$('.mi_form .entero').on('blur',function() {
          if (MiForm.valida_entero($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_entero);
          }
      });
      
      //campo numerico ano
      ambito.$('.mi_form .ano').on('blur',function() {
          if (MiForm.valida_ano($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_ano);
          }
      });
      
      
      //campo tipo telefono
      ambito.$('.mi_form .telefono').on('blur',function() {
          if (MiForm.valida_telefono($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_telefono);
          }
      });
      
      //campo tipo nombre archivo
      ambito.$('.mi_form .nombre_archivo').on('blur',function() {
          if (MiForm.valida_nombre_archivo($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_nombre_archivo);
          }
      });

      //campo tipo email
      ambito.$('.mi_form .email').on('blur',function() {
          if (MiForm.valida_email($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_email);
          }
      });
      
      //campo tipo url
      ambito.$('.mi_form .url').on('blur',function() {
          
          if (MiForm.valida_url($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_url);
          }
      });
      
      ambito.$('.mi_form .fecha').on('blur',function() {

          if (MiForm.valida_fecha($(this).val()) == true) {
          
              $(this).ok();
          
          }else{

              $(this).ko(mensaje_fecha);
          
          }

      });
      
      //campo tipo fecha
      ambito.$('.mi_form .fecha').on('focusin',function() {
               
        if( ($(this).val() == '__/__/____') || ($(this).val() == '') ){
            $(this).val('??/??/????');
          } // ajuste datepicker
        
      });


      //campo tipo hora
      ambito.$('.mi_form .hora').on('blur',function() {
          
          if (MiForm.valida_hora($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_hora);
          }
      });
      
      
      //campo tipo nif
      ambito.$('.mi_form .nif').on('blur',function() {
          
          $(this).val( $(this).val().toUpperCase() );

          if (MiForm.valida_nif($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_nif);
          }
      });
      
      //campo tipo Código Postal
      ambito.$('.mi_form .cp').on('blur',function() {
          if (MiForm.valida_cp($(this).val()) == true) {
              $(this).ok();
          }else{
              $(this).ko(mensaje_cp);
          }
      });
      
      //cuenta corriente
      ambito.$(".mi_form .num_cuenta").on('blur',function() {
          //alert(ambito.$('#banco').val());
          if(MiForm.valida_cuenta(ambito.$('#banco').val(),ambito.$('#sucursal').val(),ambito.$('#dc').val(),ambito.$('#cuenta').val()) == true){
              ambito.$('.num_cuenta').ok();
          }else{
              ambito.$('.num_cuenta').ko(mensaje_num_cuenta);
          }
      });


      // iban
      ambito.$(".mi_form .iban").on('blur',function() {
          
          $(this).val( $(this).val().toUpperCase() );
          
          //alert(ambito.$('#banco').val());
          if(MiForm.valida_iban( ambito.$('.iban').val() ) == true){
              ambito.$('.iban').ok();
          }else{
              ambito.$('.iban').ko(mensaje_num_cuenta);
          }
      });
      
      //tarjeta
      ambito.$(".mi_form .num_tarjeta").on('blur',function() {
          if(MiForm.valida_num_tarjeta(ambito.$('#num_tarjeta').val()) == true){
              ambito.$('.num_tarjeta').ok();
          }else{
              ambito.$('.num_tarjeta').ko(mensaje_num_tarjeta);
          }
      });
      
      //campo tipo contraseña
      ambito.$('.mi_form .contrasena2').on('blur',function() {
          if (MiForm.valida_contrasena(ambito.$('.mi_form .contrasena1').val(),ambito.$('.mi_form .contrasena2').val()) == true) {
              return true;
          }else{
              $(this).ko(mensaje_contrasena);
          }
      });

      
      ambito.$('input, textarea').on('focus', function(){
        $(this).select();
      });
      

      $("[data-toggle=tooltip]").tooltip('destroy').tooltip();

  };

  var validar_formulario = function(ambito){

    var_error = false;
    
    $.each($('input, textarea', ambito), function(index, value){
      if($(this).next('.validacion').hasClass('ko')){
        
        mensaje_growl('error', 'Error en el formulario', 'Por favor, revise el formluario antes de continuar.');
        return false;
      }
      
    });
    

  };

  var listen_eventos_aux = function(ambito){
    
    ambito.$('input[type="checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
      
      event.preventDefault();
      event.stopPropagation();

      if(state == true){
        $(this).attr('checked','checked');
      }else{
        $(this).removeAttr('checked');
      }

    });
  

  };


  return Formulario;

});