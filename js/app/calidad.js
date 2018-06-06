/*

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

    ], function( $, _, Backbone, Fx, Mustache, Growl, Router, Templates, Config ){

        'use strict';

        var Calidad = {

            check_login: function(){
                
                if( (window.location.hash.split('/')[0] == '#alta') || 
                    (window.location.hash == '#alta/demo') || 
                    (window.location.hash == '#politica') || 
                    (window.location.hash.split('/')[0] == '#contratacion') ){

                    return true;
                }

                if( (Config.hash == 'mi_hash') || 
                    (Config.hash == '') || 
                    ( typeof Config.hash == 'undefined') ){

                    this.ir_a_login();
                }
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

                            //window.localStorage.setItem('obj_clientes', JSON.stringify( Config.obj_clientes) );
                        }

                    });

                    
                    return resp;    
                }
                
                return Config.obj_clientes;
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


            establecer_entorno: function(){

                var resp = $.ajax({
                    url: Config.base_ajax + 'app.php',
                    type: 'POST',
                    data: {
                        accion: 'comprobar_entorno',
                    }
                });

                return resp;
            },

            
            es_admin: function(){

                return ( Config.cld_admin == 'true') && ( typeof Config.cld_admin != 'undefined') ; 
            },

            es_cliente: function(){

                return ( (Config.cld_admin != 'true' || typeof Config.cld_admin == 'undefined' ) && 
                          /*Config.obj_usuario.comercial == '0' &&*/ Config.obj_usuario.tecnico == '0' ) ;
            },

            //es_comercial: function(){ return ( Config.obj_usuario.comercial == '1' ) ; },

            es_tecnico: function(){

                return ( Config.obj_usuario.tecnico == '1' ) ;  
            },


            hash: function(){

                var local = window.localStorage.getItem('dp');

                if( local != 'null' && local != null && local.length > 10 ){ return local; }

                if( typeof Config == 'undefined' || typeof Config.hash == 'undefined' ){ return ''; }

                // if( typeof Config.hash == 'undefined') { return ''; }

                return Config.hash;
            },
            
            inicializar_tabla: function(DatatablesView, view, obj_opciones){
                
                // Inicializa una tabla
                // OBS: hay que pasarle el DatatablesView, porque si no no funciona el DatatablesView.prototype.initialize.apply

                var target          = obj_opciones.target, 
                    clase           = obj_opciones.clase, 
                    titulo_tabla    = obj_opciones.titulo_tabla,
                    obj_json        = obj_opciones.obj_json, 
                    arr_columns     = obj_opciones.arr_columns,
                    limit           = obj_opciones.limit || false,
                    total_registros = obj_opciones.total_registros || false,
                    order           = obj_opciones.order;

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


            ir_a_login: function(){

                this.limpiar_datos_sesion();

                window.location.hash = '#login';
            
            },


            ir_a_login_si_error: function(obj_json){

                if( (typeof obj_json != 'object') || 
                    (obj_json.error == 'Validación no válida') ){

                    this.ir_a_login();
                }
            },


            limpiar_datos_sesion: function(){

                window.localStorage.removeItem('cld'); // creado en this.hash

                /*
                window.localStorage.removeItem('hash');
                window.localStorage.removeItem('nombre');
                window.localStorage.removeItem('empresa');
                window.localStorage.removeItem('oclem_admin');
                window.localStorage.removeItem('comercial');
                window.localStorage.removeItem('tecnico');
                window.localStorage.removeItem('cliente_admin');

                window.localStorage.removeItem('obj_clientes');
                window.localStorage.removeItem('obj_usuario');
                */

                Config.hash          = '';
                Config.nombre        = '';
                Config.empresa       = '';
                Config.calidad_admin = '';
                Config.tecnico       = '';
                /*Config.comercial   = '';*/
                
                Config.obj_clientes  = '';
                Config.obj_usuario   = '';
                
            },

            mostrar_footer_si_no_scroll: function(){

                if( window.innerWidth > document.documentElement.clientWidth ){ $('#footer_login').fadeOut(); }
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


            actualizar_nombre_usuario: function(){

                var nombre = Config.nombre;

                if( typeof nombre == 'undefined'){
                    return true;
                }

                if( (Config.bienvenido !== true) && 
                    (window.location.hash != '#login') && 
                    (window.location.hash != '#alta') && 
                    (window.location.hash != '#politica')  ){

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




            /*actualizar_combos: function(view){
                // Actualiza los combos para que el valor del selectpicker coincida con el real del campo
                view.$('select.selectpicker').selectpicker('refresh');
            },*/

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

                return window.localStorage.getItem('cld') || Config.hash;

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

        return Calidad;

    }
);