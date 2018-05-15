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
                        label: 'Nombre',
                        id: 'nombre',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Apellido 1',
                        id: 'apellido1',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Apellido 2',
                        id: 'apellido2',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Email',
                        id: 'email',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'email obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Teléfono',
                        id: 'telefono',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'telefono',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Empresa',
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
                        label: 'Actividad',
                        id: 'actividad',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'CIF',
                        id: 'cif',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'nif obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_textarea({
                        label: 'Dirección',
                        id: 'direccion',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_textarea: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Código Postal',
                        id: 'cp',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '5',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Población',
                        id: 'poblacion',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'IBAN',
                        id: 'iban',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'iban',
                        min_char: '24',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Clasificaciones (separe con comas, 3 letras si clasif. oficial, 2 si no oficial)',
                        id: 'cods_clasificaciones',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_textarea({
                        label: 'Códs CPV (si existen, se mostrarán también los concursos correspondientes a estos CPV)',
                        id: 'cods_cpv',
                        valor: '',
                        tipo: 'text',
                        placeholder: 'Separar con comas, sin espacios, 8 dígitos',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_textarea: 'col-sm-6',
                    }),

                    Fx.form_textarea({
                        label: 'Códs CPV a Ignorar (los concursos con estos CPV NO se mostrarán)',
                        id: 'cods_cpv_ignorar',
                        valor: '',
                        tipo: 'text',
                        placeholder: 'Separar con comas, sin espacios, 8 dígitos',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_textarea: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Lugares (separe con comas, en blanco si todos)',
                        id: 'lugares',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Importe mínimo',
                        id: 'importe_min',
                        valor: '',
                        tipo: 'numerico obligatorio',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Importe máximo',
                        id: 'importe_max',
                        valor: '',
                        tipo: 'numerico obligatorio',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Normas ISO (separe con comas)',
                        id: 'normas_iso',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
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

                    Fx.form_input({
                        label: 'Comercial',
                        id: 'comercial',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto',
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


                    Fx.form_select({
                        label            : 'Tipo de contrato',
                        id               : 'id_tipo_contrato',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'Demo',
                            1: 'Contrato 30 - 3 meses de permanencia',
                            2: 'Contrato 120 - 1 año de permanencia',
                            3: 'Contrato 2000 - Premium',
                            4: 'Contrato 60 - 6 meses de permanencia',
                            5: 'Contrato Online6 - 6 meses de permanencia',
                            6: 'Contrato Online3 - 3 meses de permanencia',
                            7: 'Empresa Clasificada - 1 año de permanencia'
                        }
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

                    Fx.form_enlace({
                        label: 'Contratación',
                        enlace: '',
                        id: 'enlace_contratacion',
                        clase: 'enlace_form',
                        target: '_blank',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
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