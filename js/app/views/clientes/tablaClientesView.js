define([
    
    'jquery',
    'underscore',
    'backbone',
    'funciones',
    'app/config',
    'app/calidad',
    'app/views/datatablesView',
    'app/views/clientes/detalleClienteView'
    
], function($, _, Backbone, Fx, Config, Calidad, DatatablesView, DetalleClienteView){

    'use strict';
    
    var TablaClientesView = DatatablesView.extend({
        
        obj_cliente: {},

        options: {

                hide_fields      : '',
                myclass          : 'tabla_clientes',
                appendTo         : '#tabla_clientes',
                filter           : false,
                pagination       : false,
                paginationSize   : 10,
                thead_tabla      : '',
                tbody_tabla      : '',
                titulo_tabla     : 'Lista de clientes',
                botones_export   :  true

        },

        html: [

            '<div id="tabla_clientes"></div>'
        
        ].join(''),

        views: [],

        events: {

            'click #anadir_cliente'    : 'anadir_cliente',
            // 'click .editar_cliente'     : 'editar_cliente',
            // 'click .eliminar_cliente'   : 'eliminar_cliente'

        },

        initialize: function(options){

            Calidad.cleanUp(this);

            var esto = this;
            esto.$el.html(esto.html);

            esto.options = options;

            var filas          = '',
                nombre_cliente = '',
                encabezado = [
                                '<tr>',
                                    '<th>Empresa</th>',
                                    '<th style="min-width:250px;">Clasificación</th>',
                                    '<th>Nombre</th>',
                                    '<th>Email</th>',
                                    '<th>F. alta</th>',
                                    '<th>Expira</th>',
                                    '<th>Contrato</th>',
                                    '<th>Acceso</th>',
                                    '<th>Acciones</th>',
                                '</tr>'
                                ].join('');
            
            esto.obj_cliente = options.obj_cliente;

            // Cambiar en producción
            var resp = $.ajax({
              dataType: "text",
              type: 'POST',
              url: Config.base_ajax + 'clientes.php',
              data: {
                      hash: Calidad.hash(),
                      accion: 'consultar',
                      opcion: esto.options.opcion
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

        inicializar_tabla: function(obj_json){
            
            var esto = this,
                target = '#tabla_clientes';

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
                titulo_tabla   : 'Listado de clientes',
                data           : obj_json,
                columns        : [
                    
                    {data: null, title: 'Empresa', 
                        render: function(data, type, full){

                            return Fx.limpia_undefined(data.empresa);
    
                        }    
                    },

                    {data: null, title: 'Clasificación', 
                        render: function(data, type, full){

                            return Fx.separar_comas(data.cods_clasificaciones);
    
                        }
                    },

                    {data: null, title: 'Nombre', 
                        render: function(data, type, full){

                            return Fx.limpia_undefined(data.nombre) + ' ' +  Fx.limpia_undefined(data.apellido1);
                        }
                    },

                    {data: 'email', title: 'Email'},
                    
                    {data: null, title: 'F. alta',                       

                        render: function(data, type, full){

                            return ['<span class="d-none">' + Fx.strtotime( data.f_alta ) + '</span>',
                                Fx.cambiaf_a_normal( data.f_alta )
                            ].join('');
                        }        
                    }, 
                    
                    {data: null, title: 'Expira',                       
                    
                        render: function(data, type, full){

                            return ['<span class="d-none">' + Fx.strtotime( data.f_baja ) + '</span>',
                                Fx.cambiaf_a_normal( data.f_baja )
                            ].join('');
                        }        
                    },  

                    {data: null, title: 'Contrato',
                        render: function(data, type, full){
                            return Oclem.devuelve_tipo_contrato(data.id_tipo_contrato);
                        }
                    },

                    {data: null, title: 'Acceso',
                        render: function(data, type, full){
                            var acceso = 'No';
                            var f_baja_timestamp = Fx.strtotime( data.f_baja );
                            var hoy_timestamp    = Fx.hoy_timestamp();
                            if( (f_baja_timestamp > hoy_timestamp) || (data.f_baja == '0000-00-00') ){
                                acceso = 'Sí';
                            }
                            return acceso;
                        }
                    }
                ]
            };

            esto.options.columns.push(
                {data: null, title: 'Acciones', class:'acciones', render: function(data, type, full){
                    
                    var arr_filas_aux = [];

                    arr_filas_aux.push(
                        '<a class="editar_cliente" href="#clientes/' + data.id_cliente + '"><i class="fa fa-pencil fa-lg"></i></a>'
                    );

                    return  arr_filas_aux.join('');

                }}
            );

            esto.options.order = [ [1, 'desc'] ];
    
            DatatablesView.prototype.initialize.apply( esto, arguments );               

        }, // fin inicializar tabla

    });

    return TablaClientesView;

});