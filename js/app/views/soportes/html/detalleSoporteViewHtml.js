define([
    
    'funciones',
    'app/config',
    'app/formulario' 

], function(Fx, Config, Formulario){
    
    var Templates = {};

    Templates['anadir_soporte'] = [
        
        '<div class="card">',

            '<div class="block-header">',
                '<h2>Ficha del soporte <span id="h2_soporte"></span></h2>',
            '</div>',

            '<div class="card-body card-padding" style="overflow:hidden">',
                '<div id="botones_consulta">',
                    '<div class="btn-group pull-right">',
                        '<a id="btn_cerrar_consulta" class="tooltip-button btn btn-default" title="Cerrar consulta" ><i class="fa fa-lock fa-lg"></i> Cerrar consulta</a>',
                        '<a id="btn_reabrir_consulta" class="tooltip-button btn btn-default" title="Reabrir consulta" ><i class="fa fa-unlock fa-lg"></i> Reabrir consulta</a>',
                    '</div>',
                '</div>',
                '<br / >',
                '<hr class="sep width100" />',
                '<form role="form" id="form_anadir_soporte" class="mi_form form-horizontal">',
                    
                    '<div class="row">',

                        '<div class="col-xs-4 col-sm-4 col-md-4">',

                        Fx.form_input({
                            label: 'Expte.',
                            id: 'expediente',
                            valor: '',
                            tipo: 'text',
                            placeholder: 'Introduzca un número de expediente válido.',
                            clase: 'texto obligatorio',
                            disabled: 'disabled',
                            min_char: '3',
                            col_bs_label: 'col-sm-4',
                            col_bs_input: 'col-sm-7',
                        }),
                        
                        '<div id="resp_expediente"></div>',
                        '<p id="enlace_expediente"><br><a id="" href="">Ir a la ficha del expediente</a></p>',
                        

                        Fx.form_select({
                            label            : 'En proceso',
                            id               : 'en_proceso',
                            clase            : 'form-control',
                            col_bs_label     : 'col-sm-4',
                            col_bs_select    : 'col-sm-7',
                            json_valores_et  : {
                                0: 'No',
                                1: 'Sí'
                            }
                        }),

                        Fx.form_select({
                            label            : 'Empresa',
                            id               : 'id_cliente',
                            clase            : 'form-control',
                            col_bs_label     : 'col-sm-4',
                            col_bs_select    : 'col-sm-7',
                            json_valores_et  : {}
                        }),

                        Fx.form_input({
                            label: 'Usuario',
                            id: 'nombre',
                            valor: '',
                            tipo: 'text',
                            clase: 'texto',
                            disabled: 'disabled',
                            col_bs_label: 'col-sm-4',
                            col_bs_input: 'col-sm-7',
                        }),

                        Fx.form_select({
                            label            : 'Tipo de solicitud',
                            id               : 'id_tipo_soporte',
                            clase            : 'form-control',
                            col_bs_label     : 'col-sm-4',
                            col_bs_select    : 'col-sm-7',
                            json_valores_et  : Config.obj_tipos_soportes
                        }),

                        Fx.form_input_fecha({
                            label: 'F. solicitud',
                            id: 'f_alta',
                            valor: '',
                            tipo: 'text',
                            placeholder: '',
                            clase: 'fecha',
                            disabled: 'disabled',
                            col_bs_label: 'col-sm-4',
                            col_bs_input: 'col-sm-7',
                        }),

                        Fx.form_textarea({
                            label: 'Obs. cliente',
                            id: 'obs',
                            valor: '',
                            placeholder: 'Observaciones del cliente',
                            clase: 'texto',
                            disabled: 'disabled',
                            col_bs_label: 'col-sm-4',
                            col_bs_input: 'col-sm-7',
                        }),

                        '</div>',

                        '<div class="col-xs-8 col-sm-8 col-md-8" style="border-left:1px solid #ddd;">',
                            Fx.form_input({
                                label: 'Asunto',
                                id: 'titulo',
                                valor: '',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'texto obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-2',
                                col_bs_input: 'col-sm-8',
                            }),

                            /*
                            '<div class="lv-body" id="resp_detalles_soportes">',

                            '</div>',


                            '<div class="lv-footer ms-reply">',
                                //'<textarea class="texto obligatorio summernote" data-min_char="3" id="texto" placeholder="Escribe tu mensaje aquí..."></textarea>',
                                
                            '</div>',
                            */

                            '<div id="resp_detalles_soportes"></div>',
                            '<div id="texto" class="html-editor"></div>',

                            '<button class="btn btn-default pull-right" id="btn_guardar_soporte"><i class="fa fa-envelope"></i> Enviar</button>',

                            '<div id="seccion_condiciones" class="oculto">', // para mostrar u ocultar
                                
                                Fx.form_select({
                                    label            : 'Aceptar condiciones',
                                    id               : 'aceptar_condiciones',
                                    clase            : 'form-control',
                                    col_bs_label     : 'col-sm-3',
                                    col_bs_select    : 'col-sm-6',
                                    json_valores_et  : {
                                        0: 'No, no acepto',
                                        1: 'Sí, acepto'
                                    }
                                }),
                                
                                '<p class="text_center">',
                                    '<button class="btn btn-default" id="btn_guardar_soporte_baja"><i class="fa fa-pencil"></i> Solicitar Baja estadística</button>',
                                '</p>',


                                '<div id="ver_condiciones">',
                                    '<a target="_blank" href="#verCondicionesBaja"><i class="fa fa-eye"></i> Ver condiciones</a>',
                                '</div>',

                            '</div>',

                            /*
                            Fx.form_textarea({
                                label: 'Descripción',
                                id: 'descr',
                                valor: '',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'texto obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_textarea: 'col-sm-6',
                            }),

                            Fx.form_textarea({
                                label: 'Respuesta',
                                id: 'respuesta',
                                valor: '',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'texto',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_textarea: 'col-sm-6',
                            }),

                            Fx.form_textarea({
                                label: 'Comunicación',
                                id: 'replica',
                                valor: '',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'texto',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_textarea: 'col-sm-6',
                            }),

                            Fx.form_textarea({
                                label: 'Contra Réplica',
                                id: 'contrarreplica',
                                valor: '',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'texto',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_textarea: 'col-sm-6',
                            }),
                            */

                            Fx.form_input({
                                label: 'Baja estadística (%)',
                                id: 'baja_estadistica',
                                valor: '0',
                                tipo: 'text',
                                placeholder: '',
                                clase: 'numerico',
                                min_char: '3',
                                disabled: 'disabled',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-6',
                            }),

                            Fx.form_input({
                                label: 'Cerrado por',
                                id: 'usuario_cierre',
                                tipo: 'text',
                                placeholder: '',
                                clase: '',
                                disabled: 'disabled',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-6',
                            }),

                            '<div id="resp_guardar_soporte" class="resp_detalle sep50"></div>',

                            '<div class="margin30" style="width:100%;clear:both"></div>',

                            '<div class="form-group div_archivos">',
                                '<label class="col-sm-3 control-label titulo_archivos"><b>Archivos:</b></label>',
                                '<div class="input-group col-sm-9 btn_archivos">',
                                    '<button class="btn btn-default" id="subir_archivos_soporte"><i class="fa fa-upload"></i> Subir archivos</button>',
                                    '<button class="btn btn-default" id="refrescar_archivos_soporte"><i class="fa fa-refresh"></i> Refrescar archivos</button>',
                                '</div>',
                            '</div>',

                            '<div id="resp_archivos_soportes"></div>',
                            

                        '</div>',
                    '</div>', // fin row

                    '<div class="row">',
                        '<hr class="sep margin50"></div>',

                        /*
                        '<div id="seccion_condiciones" class="oculto">', // para mostrar u ocultar
                            
                            Fx.form_select({
                                label            : 'Aceptar condiciones',
                                id               : 'aceptar_condiciones',
                                clase            : 'form-control',
                                col_bs_label     : 'col-sm-3',
                                col_bs_select    : 'col-sm-6',
                                json_valores_et  : {
                                    0: 'No, no acepto',
                                    1: 'Sí, acepto'
                                }
                            }),

                            '<div id="ver_condiciones">',
                                '<a target="_blank" href="#verCondicionesBaja"><i class="fa fa-eye"></i> Ver condiciones</a>',
                            '</div>',
                        '</div>',
                        */

                        /*
                        '<div class="form-group div_guardar sep50 text_center">',
                            '<label class="col-sm-3 control-label" for="nombre" title="">&nbsp;</label>',
                            '<div class="input-group col-sm-6">',
                                '<button id="btn_guardar_soporte" class="btn bgm-green waves-effect"><i class="fa fa-envelope fa-lg"></i> &nbsp;Enviar</
                                >&nbsp;',
                            '</div>',
                        '</div>',
                        */
                    '</div>', // fin row
                '</form>',
                
            '</div>',

        '</div>'

        ].join('');

    return Templates;

});