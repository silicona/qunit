define([
    
    'funciones',
    'app/config',
    'app/formulario'

], function(Fx, Config, Formulario){
    
    var Templates = {};

    Templates['anadir_usuario'] = [
        
        '<div class="card">',

            '<div class="block-header">',
                '<h2>Ficha del usuario <span id="h2_usuario"></span></h2>',
            '</div>',

            '<div class="card-body card-padding">',
                
                '<div class="form_group text_right">',
                    '<a title="Volver" href="#usuarios" id="btn_volver" class="btn btn-default waves-effect" ><i class="fa fa-angle-double-left fa-lg"></i> &nbsp;Volver</a>',
                '</div>',
                '<br>',

                '<form role="form" id="form_anadir_usuario" class="mi_form form-horizontal">',
                    
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
                        label: 'Email',
                        id: 'email',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'email obligatorio',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Login',
                        id: 'login',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),

                    Fx.form_input({
                        label: 'Password',
                        id: 'password',
                        valor: '',
                        tipo: 'text',
                        placeholder: '',
                        clase: 'texto obligatorio',
                        min_char: '3',
                        col_bs_label: 'col-sm-3',
                        col_bs_input: 'col-sm-6',
                    }),
                    
                    /*
                    Fx.form_select({
                        label            : 'Comercial',
                        id               : 'comercial',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'No',
                            1: 'Sí'
                        }
                    }),
                    */
                    
                    Fx.form_select({
                        label            : 'Técnico',
                        id               : 'tecnico',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'No',
                            1: 'Sí'
                        }
                    }),

                    Fx.form_select({
                        label            : 'Empresa',
                        id               : 'id_cliente',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : Config.obj_clientes
                    }),

                    Fx.form_select({
                        label            : 'Cliente admin',
                        id               : 'cliente_admin',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'No',
                            1: 'Sí'
                        }
                    }),

                    Fx.form_select({
                        label            : 'Activo',
                        id               : 'activo',
                        clase            : 'form-control',
                        col_bs_label     : 'col-sm-3',
                        col_bs_select    : 'col-sm-6',
                        json_valores_et  : {
                            0: 'No',
                            1: 'Sí'
                        }
                    }),

                    '<div id="resp_guardar_usuario" class="resp_detalle sep50"></div>',

                    '<div class="form-group div_guardar sep50 text_center">',
                        '<label class="col-sm-3 control-label" for="nombre" title="">&nbsp;</label>',
                        '<div class="input-group col-sm-6">',
                            '<button id="btn_guardar_usuario" class="btn bgm-blue waves-effect"><i class="fa fa-save fa-lg"></i> &nbsp;Guardar</button>&nbsp;',
                        '</div>',
                    '</div>',

                '</form>',
                
            '</div>',

        '</div>'

        ].join('');

    return Templates;

});