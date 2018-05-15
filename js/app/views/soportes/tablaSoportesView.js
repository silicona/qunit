define([
    
        'jquery',
        'underscore',
        'backbone',
        'funciones',
        'app/config',
        'app/merca',
        'app/views/datatablesView',
        'app/views/confirmView',
        'app/views/soportes/detalleSoporteView',
        'swal'
    
    
    ], function($, _, Backbone, Fx, Config, Merca, DatatablesView, ConfirmView, DetalleSoporteView, Swal ){
    
        'use strict';
        
        var TablaSoportesView = DatatablesView.extend({
            
            obj_soporte: {},
    
            options: {
    
                    hide_fields      : '',
                    myclass          : 'tabla_soportes',
                    appendTo         : '#tabla_soportes',
                    filter           : false,
                    pagination       : false,
                    paginationSize   : 10,
                    thead_tabla      : '',
                    tbody_tabla      : '',
                    titulo_tabla     : 'Listado de acciones de soporte',
                    botones_export   :  true
    
            },
    
            html: [
                '<div id="tabla_soportes"></div>'
            ].join(''),
    
            views: [],
    
            events: {
    
                'click #anadir_soporte'    : 'anadir_soporte',
    
                'click .editar_soporte'     : 'editar_soporte',
                'click .eliminar_soporte'   : 'eliminar_soporte'
    
            },
    
            initialize: function(options){
    
                Merca.cleanUp(this);
    
                var esto = this,
                    titulo_fila = '',
                    titulo_o_adjudicatario = '';

                this.parametro = window.location.hash.split('/')[1];

                esto.$el.html(esto.html);
    
                Merca.spinner(this, '#tabla_soportes');

                esto.options = options;
    
                esto.obj_soporte = options.obj_soporte;
    
                // Cambiar en producción
                var resp = $.ajax({
                  dataType: "text",
                  type: 'POST',
                  url: Config.base_ajax + 'soportes.php',
                  data: {
                          hash: Merca.hash(),
                          accion: 'consultar',
                          parametro: esto.parametro
                    }
                });

                resp.done(function(mi_json) {
                    
                    if (mi_json !== '') {
    
                        var obj_json = $.parseJSON(mi_json);
                        
                        if (obj_json !== null) {
    
                            esto.inicializar_tabla(obj_json);
    
                        }else{
    
                            esto.$(target).html('No se encontraron resultados');
                        }
    
                    } else {
                        esto.$(target).html('No se encontraron resultados');
                    }
    
                });
    
                resp.fail(function() {
    
                    console.log('Falló la conexión con el servidor');
                    // no hacer nada si no hay respuesta
                    $.noop();
                });
    
            }, //fin initialize
    
            render: function(){
    
                return this;
    
            },
                
            eliminar_soporte: function(e){
    
                var esto = this;
    
                var id_soporte = e.currentTarget.attributes['data-id_soporte'].value;
    
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
                            
                            esto.procesar_eliminar_soporte(id_soporte);
     
                        } else {     
                            Swal("Cancelado", "El elemento sigue en la base de datos", "error");   
                        }
                    });
    
                }
    
            },
    
            procesar_eliminar_soporte: function(id_soporte){
    
                var esto = this;
                var resp = $.ajax({
                    
                    url: Config.base_ajax + 'soportes.php',
                    type: 'POST',
                    data: {
                        hash: Merca.hash(),
                        accion: 'eliminar',
                        id_soporte: id_soporte
                    }
    
                });
    
                resp.done(function(mi_json){
    
                    if(mi_json != ''){
                        
                        mi_json = $.parseJSON(mi_json);
                        
                        if(mi_json.status == 'ko'){
    
                            Swal("Error al eliminar", mi_json.error, "error");
    
                        }else{
    
                            // generar mensaje de éxito
                            Swal("Registro eliminado.", "La solicitud de soporte ha sido eliminada con éxito de la base de datos.", "success");
    
                            esto.$('tr[data-id_soporte="' + id_soporte + '"] td')
                                .css('background','#bbb')
                                .css('color','#111')
                                .css('text-decoration','line-through');
    
                            esto.$('tr[data-id_soporte="' + id_soporte + '"] a').remove();
    
                        }
                    }
    
                });
                
                resp.fail(function() {
                    console.log('Falló la conexión con el servidor');
                    return false;
                });
    
            },
    
            editar_soporte: function(e){
                
                e.preventDefault();
    
                var ruta = e.currentTarget.attributes.href.value;
                
                Backbone.history.navigate(ruta, true);
                //window.location.href =  Config.base_url + '?' + ruta;
    
                return false;
            },

            inicializar_tabla: function(obj_json){
                
                var esto = this,
                    target = '#tabla_soportes',
                    titulo_fila = '',
                    titulo_o_adjudicatario = '';
                
                if( esto.parametro == 'baja' ){
                    titulo_fila = 'Adjudicatario';
                }else{
                    titulo_fila = 'Título';
                }
    
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
                    titulo_tabla   : 'Listado de nuevo',
                    data           : obj_json,
                    columns        : [

                        {data: null, title: 'Cliente',
                            render: function(data, type, full){
                                var icono_premium = '';
                                var clase_premium = '';
                                if(data.id_tipo_contrato == 3){
                                    icono_premium = '<i class="fa fa-diamond fa-lg"></i> ';
                                    clase_premium = 'premium';
                                }

                                return icono_premium + data.cliente;
                            }                                    
                        },
                        {data: null, title: 'Tipo',
                            render: function(data, type, full){
                                var tipo       = Fx.capitalize( Config.obj_tipos_soportes[data.id_tipo_soporte] );
                                
                                if( tipo == 'Tecnico'){tipo = 'Técnico';}

                                return tipo;
                            }                                    
                        },

                        {data: null, title: titulo_fila,
                            render: function(data, type, full){

                                var titulo_o_adjudicatario = '';

                                if( esto.parametro == 'baja'){
                                    titulo_o_adjudicatario = Fx.limpia_undefined(data.cif_adjudicatario) + '-' + Fx.limpia_undefined(data.nombre_adjudicatario);
                                }else{
                                    titulo_o_adjudicatario = Fx.limpia_undefined(data.titulo);
                                }
                                return titulo_o_adjudicatario;
                            }                                    
                        },

                        {data: null, title: 'Expediente',
                            render: function(data, type, full){

                                return Fx.limpia_undefined(data.expediente);
                            }                                    
                        },


                        {data: null, title: 'F. Publicación', 
                            render: function(data, type, full){

                                return ['<span class="d-none">' + data.f_alta + '</span>',
                                    Fx.cambiaf_a_normal( data.f_alta ) + ' ' + data.f_alta.substr(11,5) 
                                ].join('');
        
                            }
                        },
    
                    ],
                    createdRow: function( row, data ) {

                        if( Oclem.es_tecnico() ){
                            
                            if(data.id_tipo_contrato == 3){


                                $('td', row).closest('tr').addClass('premium');
                            }
                        }
                        var ultimo_es_cliente = Oclem.ultimo_es_cliente(data);    
                        
                        var clase_estado = 'cerrado';
                        
                        var tipo       = Fx.capitalize( Config.obj_tipos_soportes[data.id_tipo_soporte] );
                        
                        if( tipo == 'Tecnico'){tipo = 'Técnico';}

                        var id_cliente = data.id_cliente;
                        
                        if( Oclem.es_cliente() ){
                            
                            if( data.leido == 0 && !ultimo_es_cliente ){

                                clase_estado = 'pendiente';
                            
                            }else{
                                
                                if( ultimo_es_cliente ){
                                    if(data.cerrado == 0){
                                        clase_estado = 'abierto';
                                    }else{
                                        clase_estado = 'cerrado';
                                    }
                                    
                                }else{
                                    clase_estado = 'cerrado';	
                                }
                                
                            
                            }

                        }else{

                            if( ultimo_es_cliente && data.cerrado == 0 ){
                                clase_estado = 'abierto';
                                
                            }
                            
                            if( data.cerrado == 1 ){
                                clase_estado = 'cerrado';
                                
                            }

                            if(data.en_proceso == 1){
                                clase_estado = 'pendiente';
                            }

                        }
                        
                        $('td', row).closest('tr').addClass(clase_estado);
                        $('td', row).attr('data-id_soporte', data.id_soporte);
                    }
    
                };

                if (Merca.es_admin() ||Merca.es_tecnico()) {          
                    
                    esto.options.columns.push(
                        
                        {data: null, title: 'F. última resp.', render: function(data, type, full){
                            
                            var f_alta = '',
                                f_alta_hora = '';
                            
                            $.each(data.arr_detalles, function(index, value) {

                                f_alta = value.f_respuesta;
                                f_alta_hora = Fx.cambiaf_a_normal(value.f_respuesta) + ' ' + value.hora_respuesta;
                                return false;

                            });

                            return ['<span class="hidden">' + f_alta.replace(/-/g, '') + ' </span>','<span>' , f_alta_hora , '</span>'].join('');
                        
                        }
                    });

                    esto.options.columns.push(

                        {data: null, title: 'En proceso', render: function(data, type, full){
                            return Fx.si_no(data.en_proceso);
                        }
                    
                    });

                }

                esto.options.columns.push(
                {data: null, title: 'Acciones', class:'acciones', render: function(data, type, full){
                    
                    var href = '#soporte/' + Config.obj_tipos_soportes[ data.id_tipo_soporte ] + '/' + data.id_soporte;
                        
                        var str_filas = 
                            Fx.form_boton({
                                // label: 'Editar',
                                icono: 'eye',
                                clase: 'editar_nuevo btn btn-sm btn-secondary',
                                href: href,
                                atributos: {
                                    'data-toggle' : 'tooltip'
                                    
                                },
                                input_group: 'false',
                                title: 'Ver solicitud'
                            });

                        if( Oclem.es_admin() ){
                            str_filas += Fx.form_boton({
                                // label: 'Eliminar',
                                icono: 'trash-o',
                                clase: 'eliminar_nuevo',
                                href: '#',
                                atributos: {
                                    'data-toggle' : 'tooltip',
                                    'data-id_soporte': data.id_soporte,
                                },
                                input_group: 'false',
                                title: 'Eliminar nuevo'
                            });
                        }
                    
                        return str_filas;

                }});
                
                if (Merca.es_admin() || Merca.es_tecnico()) {
                    esto.options.order = [ [5, 'desc'] ];
                }else{
                    esto.options.order = [ [1, 'desc'] ];
                }
                
                DatatablesView.prototype.initialize.apply( esto, arguments );
                
    
            }, // fin inicializar tabla
    
            
    
        });
    
        return TablaSoportesView;
    
    });