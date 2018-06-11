define([
    
    'funciones',
    'app/config',
    'app/formulario',
    

], function(Fx, Config, Formulario){
    
    var Templates = {};

    Templates['anadir_cliente'] = [
        
        '<div class="card">',

            '<div class="block-header">',
                '<h2>Ficha del cliente <span id="h2_cliente"></span></h2>',
            '</div>',

            '<div class="card-body card-padding">',
                
                '<div class="form_group text_right">',
                    '<a title="Volver a clientes" href="#clientes" id="volver" class="btn btn-default waves-effect" ><i class="fa fa-angle-double-left fa-lg"></i> &nbsp;Volver</a>',
                '</div>',
                '<br>',

                '<form role="form" id="form_anadir_cliente" class="mi_form form-horizontal">',
            
                    
                    Fx.form_input({
                        label: 'Nombre de la empresa',
                        id: 'empresa',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'direccion de la empresa',
                        id: 'direccion',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    '<div class="row">',

                        '<div class="col-sm-6">',

                            Fx.form_input({
                                label: 'Localidad',
                                id: 'localidad',
                                valor: '',
                                tipo: 'text',
                                clase: 'texto obligatorio',
                                placeholder: '',
                                min_char: '3',
                                col_bs_label: 'col-sm-6',
                                col_bs_input: 'col-sm-6',
                            }),

                        '</div>',

                        '<div class="col-sm-6">',

                            Fx.form_input({
                                label: 'Código postal',
                                id: 'cp',
                                valor: '',
                                tipo: 'text',
                                clase: 'texto cp obligatorio solo_numero',
                                placeholder: '10001',
                                min_char: '4',
                                col_bs_label: 'col-sm-6',
                                col_bs_input: 'col-sm-4',
                            }),

                        '</div>',

                    '</div>',

                    '<div class="row">',

                        '<div class="col-sm-6">',

                            Fx.form_input({
                                label: 'CIF',
                                id: 'cif',
                                valor: '',
                                tipo: 'text',
                                clase: 'nif obligatorio',
                                col_bs_label: 'col-sm-6',
                                col_bs_input: 'col-sm-6',
                            }),

                        '</div>',

                        '<div class="col-sm-6">',

                            Fx.form_input({
                                label: 'Teléfono',
                                id: 'telefono',
                                valor: '',
                                placeholder: '645123789',
                                tipo: 'text',
                                clase: 'telefono solo_numero obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-6',
                                col_bs_input: 'col-sm-4',
                            }),

                        '</div>',

                    '</div>',


                    Fx.form_input({
                        label: 'Correo electrónico de la empresa:',
                        id: 'email',
                        valor: '',
                        placeholder: 'email_de_empresa@suempresa.com',
                        tipo: 'text',
                        clase: 'email obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-8',
                    }),


                    Fx.form_input({
                        label: 'Nombre del responsable de seguridad:',
                        id: 'nombre_responsable',
                        tipo: 'text',
                        clase: 'texto',
                        min_char: '0',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-8',
                    }),


                    Fx.form_input({

                        label: 'Correo electrónico para la LOPD',
                        id: 'email_lopd',
                        ayuda: 'Escriba el email de la persona responsable de la seguridad o, en su defecto, el email utilizado para atender las cuestiones relativas a la LOPD.',
                        placeholder: 'email_para_lopd@suempresa.com',
                        valor: '',
                        tipo: 'text',
                        clase: 'email obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-8',

                    }),

                    Fx.form_select({

                        label: '(*) Indique el sector de su empresa',
                        id: 'sector',
                        clase: 'obligatorio',
                        col_bs_label: 'col-sm-3',
                        col_bs_select: 'col-sm-8',
                        json_valores_et: Config.obj_sectores,

                    }),


                    Fx.form_textarea({
                        label: 'Descripción de la empresa:',
                        id: 'descripcion',
                        placeholder: 'Describa brevemente a qué se dedica su empresa',
                        clase: 'texto',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_textarea: 'col-sm-8',
                    }),


                    Fx.form_input_fecha({
                        label: 'Fecha de alta',
                        id: 'f_alta',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'fecha obligatorio',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),


                    Fx.form_input_fecha({
                        label: 'Fecha de baja',
                        id: 'f_baja',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'fecha',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),


                    Fx.form_select({
                        label            : 'Recibir notificaciones',
                        id               : 'notificaciones',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'No',
                            1: 'Sí'
                        }
                    }),

                    Fx.form_textarea({
                        label: 'Emails para notificaciones (separar con comas)',
                        id: 'emails_notificaciones',
                        valor: '',
                        tipo: 'text',
                        placeholder: 'Las notificaciones se enviarán al email del cliente y a las que se incluyan aquí también.',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_textarea: 'col-sm-6',
                    }),


                

                    Fx.form_textarea({
                        label: 'Observaciones',
                        id: 'obs',
                        valor: '',
                        placeholder: 'Observaciones del cliente',
                        clase: 'texto',
                        disabled: '',
                        col_bs_label : 'col-sm-3',
                        col_bs_textarea : 'col-sm-6'
                    }),


                    '<div id="resp_guardar_cliente" class="resp_detalle sep50"></div>',

                    '<div class="form-group div_guardar sep50 text_center">',
                        '<label class="col-sm-3 control-label" for="nombre" title="">&nbsp;</label>',
                        '<div class="input-group col-sm-6">',
                            '<button id="btn_guardar_cliente" class="btn bgm-green waves-effect"><i class="fa fa-save fa-lg"></i> &nbsp;Guardar</button>&nbsp;',
                            '<a target="_blank" href="" id="btn_descargar_contrato" class="btn bgm-blue waves-effect"><i class="fa fa-download fa-lg"></i> &nbsp;Descargar contrato</button>&nbsp;',
                        '</div>',
                    '</div>',

                '</form>',
                
            '</div>',

        '</div>'

        ].join('');


    return Templates;

});