define([

    'jquery',
    'underscore',
    'backbone',
    'funciones',
    'app/config',
    'app/merca',
    'app/views/datatablesView',
    'app/views/confirmView',
    'app/views/usuarios/detalleUsuarioView',
    'swal'


], function($, _, Backbone, Fx, Config, Merca, DatatablesView, ConfirmView, DetalleUsuarioView, Swal ){

    'use strict';
    
    var TablaUsuariosView = DatatablesView.extend({
        
        obj_usuario: {},

        options: {

                hide_fields      : '',
                myclass          : 'tabla_usuarios',
                appendTo         : '#tabla_usuarios',
                filter           : false,
                pagination       : false,
                paginationSize   : 10,
                thead_tabla      : '',
                tbody_tabla      : '',
                titulo_tabla     : 'Listado de usuarios',
                botones_export   :  true

        },

        html: [
            '<div id="tabla_usuarios"></div>'
        ].join(''),

        views: [],

        events: {

            'click .editar_usuario'     : 'editar_usuario',
            'click .eliminar_usuario'   : 'eliminar_usuario'

        },

        initialize: function(options){

            Merca.cleanUp(this);

            var esto = this;

            esto.$el.html(esto.html);

            esto.options = options;

            
            var filas      = '',
                nombre_usuario = '',
                encabezado = [
                                '<tr>',
                                    '<th>Empresa</th>',
                                    '<th>Nombre</th>',
                                    '<th>Login</th>',
                                    '<th>Password</th>'
                            ].join('');

            if( ( Merca.es_admin() ) && (options.opcion == 'empleados') ){
                
                encabezado += [
                    '<th>Comercial</th>',
                    '<th>Técnico</th>'
                ].join(''); 
            }

            encabezado += [
                                '<th>Activo</th>',
                                '<th>Acciones</th>',
                                '</tr>'
                        ].join(''); 

            esto.obj_usuario = options.obj_usuario;

            // Cambiar en producción
            var resp = $.ajax({
              dataType: "text",
              type: 'POST',
              url: Config.base_ajax + 'usuarios.php',
              data: {
                      hash: Oclem.hash(),
                      accion: 'consultar',
                      opcion: options.opcion
                }
            });

            resp.done(function(mi_json) {
                
                if (mi_json !== '') {

                    var obj_json = $.parseJSON(mi_json);

                    console.log(obj_json);
                    
                    if (obj_json !== null) {

                        esto.inicializar_tabla(obj_json);

                    }else{

                        esto.$(target).html('No se encontraron resultados');
                    }

                } else {
                    esto.$(target).html('No se encontraron resultados');
                }

            });
    
        

        }, //fin initialize

        render: function(){

            return this;

        },
        

        eliminar_usuario: function(e){

            var esto = this;

            var id_usuario = e.currentTarget.attributes['data-id_usuario'].value;

            if( Merca.es_admin() ){

                Swal({
                    title: "Está seguro?",   
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
                        
                        esto.procesar_eliminar_usuario(id_usuario);
 
                    } else {     
                        Swal("Cancelado", "El elemento sigue en la base de datos", "error");   
                    }
                });

            }else{

                Swal( 'No es posible eliminar el usuario, pero puede dejarlo inactivo.' );
            
            }

        },

        procesar_eliminar_usuario: function(id_usuario){

            var esto = this;
            var resp = $.ajax({
                
                url: Config.base_ajax + 'usuarios.php',
                type: 'POST',
                data: {
                    hash: Oclem.hash(),
                    accion: 'eliminar',
                    id_usuario: id_usuario
                }

            });

            resp.done(function(mi_json){

                if(mi_json != ''){
                    
                    mi_json = $.parseJSON(mi_json);
                    
                    console.log(mi_json);

                    if(mi_json.status == 'ko'){

                        Swal("Error al eliminar", mi_json.error, "error");

                    }else{

                        // generar mensaje de éxito
                        Swal("Usuario eliminado.", "El usuario ha sido eliminado con éxito de la base de datos.", "success");

                        esto.$('tr[data-id_usuario="' + id_usuario + '"] td')
                            .css('background','#bbb')
                            .css('color','#111')
                            .css('text-decoration','line-through');

                        esto.$('tr[data-id_usuario="' + id_usuario + '"] a').remove();

                    }

                }

            });
            
        },

        editar_usuario: function(e){
            
            e.preventDefault();

            var ruta = e.currentTarget.attributes['href'].nodeValue;
            window.location.href =  Config.base_url + '?' + ruta;

            return false;

        },
        inicializar_tabla: function(obj_json){
            
            var esto = this,
                target = '#tabla_usuarios';

            if( $.isEmptyObject(obj_json) ){
                
                this.$(target).html( Fx.bs_alert( 'No se encontraron datos', 'warning') );
                return true;
            }

            // prevenir conflictos con otras tablas
            $('.pagination, input#filter').remove();

            esto.options = {
                hide_fields    : '',
                myclass        : esto.options.className,
                appendTo       : target,
                filter         : true,
                pagination     : true,
                paginationSize : 10,
                titulo_tabla   : 'Listado de concursos',
                data           : obj_json,
                columns        : [
                    
                    {data: 'empresa', title: 'Empresa'},
                    {data: 'nombre', title: 'Nombre'},
                    {data: 'login', title: 'Login'},
                    {data: 'password', title: 'Password'},                      
   
                ]
            };

            if (Merca.es_admin() && (esto.options.opcion == 'empleados')) {   

                esto.options.columns.push({data: null, title: 'Comercial', 
                    render: function(data, type, full){
                        return Fx.si_no( data.comercial );
                    }        
                });
                esto.options.columns.push({data: null, title: 'Técnico', 
                    render: function(data, type, full){
                        return Fx.si_no( data.comercial );
                    }        
                });
                
            } 

            esto.options.columns.push({data: null, title: 'Activo', 
                render: function(data, type, full){
                    return Fx.si_no( data.activo );
                }        
            });

            esto.options.columns.push(
                {data: null, title: 'Acciones', class:'acciones', render: function(data, type, full){
                    
                    var arr_filas_aux = [];

                    arr_filas_aux.push(
                        '<a target="_blank" title="Editar usuario" class="editar_usuario" href="#usuarios/' + data.id_usuario + '"><i class="fa fa-pencil fa-lg"></i></a>',
                        '<a title="Eliminar" class="eliminar_usuario" data-id_usuario="' + data.id_usuario + '"><i class="fa fa-trash-o fa-lg"></i></a>'
                    );

                    return  arr_filas_aux.join('');

                }}
            );

            esto.options.order = [ [1, 'desc'] ];
    
            DatatablesView.prototype.initialize.apply( esto, arguments );               

        } // fin inicializar tabla

    });

    return TablaUsuariosView;

});