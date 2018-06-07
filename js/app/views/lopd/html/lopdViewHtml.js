define([

	'funciones',
	'app/config',
	'app/formulario',

], function( Fx, Config, Formulario ){

	var LopdViewHtml = {};

	LopdViewHtml['vista'] = [

        '<div class="container">',

            '<div class="sep30"></div>',

            '<div class="block-header">',
                '<h2 id="h2">Cuestionario de LOPD</h2>',
            '</div>',

            '<div class="card-body card-padding">',

                //'<p class="text-right ayuda_contratacion"><i class="fa fa-phone fa-lg"></i> Ayuda a la contratación: <b>91 499 49 96</b> | <i class="fa fa-download"></i> <a target="_blank" href="' + Config.base_url + 'pdf/ayuda_contratacion.pdf">Descargar ayuda</a></p>',
                
                '<ul class="tab-nav text-center tabs_lopd">',
                    '<li class="active" ><a data-pos="1" href="#tab1" data-toggle="tab">Su empresa</a></li>',
                    '<li ><a href="#tab2" data-pos="2" data-toggle="tab">Su estructura</a></li>',
                    '<li ><a href="#tab3" data-pos="3" data-toggle="tab">Clientes</a></li>',
                    '<li ><a href="#tab4" data-pos="4" data-toggle="tab">Futuros clientes</a></li>',
                    '<li ><a href="#tab5" data-pos="5" data-toggle="tab">Empleados</a></li>',
                    '<li ><a href="#tab6" data-pos="6" data-toggle="tab">Candidatos</a></li>',
                    '<li ><a href="#tab7" data-pos="7" data-toggle="tab">Proveedores</a></li>',
                    '<li ><a href="#tab8" data-pos="8" data-toggle="tab">Empresas externas</a></li>',
                    '<li ><a href="#tab9" data-pos="9" data-toggle="tab">Procesar datos</a></li>',
                '</ul>',
                    
                '<form role="form" id="form_lopd" class="mi_form form-horizontal">',   
                    
                    '<div class="tab-content">',

                    	// Datos generales
                        '<div class="tab-pane fade active in" id="tab1">',

                            '<div class="col-sm-10 col-sm-offset-1 campo">',

                                '<p>Los datos que incorpore en el programa desde esta pantalla hasta la finalización del programa, se van a utilizar para elaborar los documentos que se generan automáticamente adaptados a su organización.</p>',
                            
                            '</div>',

                            '<div class="sep30 col-sm-10 col-sm-offset-1">',

                                '<div id="form_lopd_empresa" class="mi_form">',

                                    Fx.form_input({
                                        label: 'Nombre de la empresa',
                                        id: 'empresa',
                                        valor: '',
                                        placeholder: '',
                                        tipo: 'text',
                                        clase: 'texto obligatorio',
                                        min_char: '3',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-8',
                                    }),

                                    Fx.form_input({
                                        label: 'Dirección de la empresa',
                                        id: 'direccion',
                                        valor: '',
                                        placeholder: 'CAlle y número',
                                        tipo: 'text',
                                        clase: 'texto obligatorio',
                                        min_char: '3',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-8',
                                    }),

                                    Fx.form_input({
                                        label: 'Código postal',
                                        id: 'cp',
                                        valor: '',
                                        tipo: 'text',
                                        clase: 'texto obligatorio',
                                        min_char: '3',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-8',
                                    }),

                                    Fx.form_input({
                                        label: 'CIF',
                                        id: 'cif',
                                        valor: '',
                                        tipo: 'text',
                                        clase: 'texto obligatorio',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-5',
                                    }),

                                    Fx.form_input({
                                        label: 'Teléfono',
                                        id: 'telefono',
                                        valor: '',
                                        tipo: 'text',
                                        clase: 'telefono',
                                        min_char: '3',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-5',
                                    }),


                                    Fx.form_input({
                                        label: 'Dirección de correo electrónico de la empresa:',
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
                                        min_char: '3',
                                        col_bs_label: 'col-sm-3',
                                        col_bs_input: 'col-sm-8',
                                    }),


                                    Fx.form_input({
                                        
                                        label: 'Dirección de correo electrónico para la LOPD',
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

                                        label: 'Indique el sector de su empresa',
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

                                '</div>',

                            '</div>',

                        '</div>',

                        // Infraestructura
                        '<div class="tab-pane fade" id="tab2">',

                            // '<div class="col-sm-10 col-sm-offset-1 campo">',

                            //     '<p>Los datos que incorpore en el programa desde esta pantalla hasta la finalización del programa, se van a utilizar para elaborar los documentos que se generan automáticamente adaptados a su organización.</p>',
                            
                            // '</div>',

                            '<div id="form_lopd_infra" class="sep30 col-sm-10 col-sm-offset-1 clearfix">',

                                '<div class="row">',

                                    '<div class="col-sm-6 campo">',

                                        '<p><b>¿Cómo almacena los datos de caracter personal?</b></p>',

                                        '<div class="col-sm-12 checkbox">',

                                            Fx.form_input_check({
                                                label: 'Los almaceno de forma electrónica',
                                                id: 'almacen_elec',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Los almaceno de forma física',
                                                id: 'almacen_fis',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                                
                                            }),

                                        '</div>',

                                    '</div>',

                                    '<div class="col-sm-6 campo">',

                                        '<p><b>¿Que tipo de acceso es necesario para acceder a los datos almacenados?</b></p>',

                                        '<div class="checkbox col-sm-12">',
                                        
                                            Fx.form_input_check({

                                                label: 'Usuario y Contraseña (formato digital)',
                                                id: 'almacen_acceso_digital',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({

                                                label: 'Armarios con llave de acceso (formato papel)',
                                                id: 'almacen_acceso_fisico',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                        '</div>',

                                    '</div>',
 
                                '</div>',


                                '<div class="row">',

                                    '<div class="col-sm-12 campo radio">',
                                        
                                        Fx.form_input_radio({

                                            titulo: '<b>¿Su organización capta imágenes mediante cámaras de videovigilancia con fines de seguridad?</b>',
                                            subtitulo: 'Si tiene instaladas cámaras de videovigilancia en su negocio, márquelo y le daremos pautas a seguir para poder utilizarlas cumpliendo con la normativa de protección de datos.',
                                            id: 'almacen_imagenes',
                                            clase_grupo: '',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            }
                                        }),
                                    
                                    '</div>',

                                '</div>',
                                
                                /*
                                '<div class="col-sm-6 campo radio">',

                                    Fx.form_input_radio({

                                        titulo: '<b>¿Su empresa almacena datos de caracter personal electrónicamente?</b>',
                                        subtitulo: '',
                                        id: 'datos_electronicos',
                                        clase_grupo: '',
                                        inline: true,

                                        col_bs_label: 'col-sm-12',
                                        col_bs_radio: 'col-sm-1',
                                        opciones_json: {
                                            0: 'si',
                                            1: 'no'
                                        }
                                    }),

                                '</div>',

                                    Fx.form_input_radio({

                                        titulo: '<b>¿Su empresa almacena datos personales en formato papel?</b>',
                                        subtitulo: '',
                                        id: 'datos_fisicos',
                                        clase_grupo: '',
                                        inline: true,

                                        col_bs_label: 'col-sm-12',
                                        col_bs_radio: 'col-sm-1',
                                        opciones_json: {
                                            0: 'si',
                                            1: 'no'
                                        }
                                    }),                 
                                */
                                '<div class="row">',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Cada cuanto tiempo se borran las imágenes grabadas?</b>',
                                            subtitulo: '(no conteste si no guarda imágenes)',
                                            id: 'almacen_borrado',
                                            clase_grupo: '',
                                            inline: '',

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-12',
                                            opciones_json: {
                                                0: '1 semana.',
                                                1: '2 semanas.',
                                                2: '1 mes.',
                                                3: '3 meses.'
                                            }
                                        }),

                                    '</div>',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Dispone de dispositivos de almacenaje de datos personales propio?</b>',
                                            subtitulo: '(servidores, discos duros, pen-drives, ordenadores de trabajo en local)',
                                            id: 'almacen_propio',
                                            clase_grupo: '',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            }
                                        }),
                                    '</div>',

                                '</div>',

                                '<div class="row">',

                                    '<div class="col-sm-6 campo">',

                                        '<p>Especifique la cantidad de dispositivos de su empresa</p>',

                                        Fx.form_input({
                                            label: 'Servidores de datos',
                                            id: 'almacen_servidores',
                                            ayuda: '',
                                            placeholder: '',
                                            valor: '',
                                            tipo: 'text',
                                            clase: 'solo_numero',
                                            //min_char: '3',
                                            col_bs_label: 'col-sm-8 col-sm-offset-1',
                                            col_bs_input: 'col-sm-2',
                                        }),

                                        Fx.form_input({
                                            label: 'Discos duros',
                                            id: 'almacen_discos',
                                            ayuda: '',
                                            placeholder: '',
                                            valor: '',
                                            tipo: 'text',
                                            clase: 'solo_numero',
                                            //min_char: '3',
                                            col_bs_label: 'col-sm-8 col-sm-offset-1',
                                            col_bs_input: 'col-sm-2',
                                        }),
                                        
                                        Fx.form_input({
                                            label: 'USB Pendrives',
                                            id: 'almacen_pen',
                                            ayuda: '',
                                            placeholder: '',
                                            valor: '',
                                            tipo: 'text',
                                            clase: 'solo_numero',
                                            //min_char: '3',
                                            col_bs_label: 'col-sm-8 col-sm-offset-1',
                                            col_bs_input: 'col-sm-2',
                                        }),

                                        Fx.form_input({
                                            label: 'Ordenadores de trabajo en local',
                                            id: 'almacen_pc',
                                            ayuda: '',
                                            placeholder: '',
                                            valor: '',
                                            tipo: 'text',
                                            clase: 'solo_numero',
                                            //min_char: '3',
                                            col_bs_label: 'col-sm-8 col-sm-offset-1',
                                            col_bs_input: 'col-sm-2',
                                        }),

                                    '</div>',

                                    /*
                                    '<div class="col-sm-6 campo radio">',
                                        Fx.form_input_radio({

                                            titulo: '<b>¿Es necesario estár autorizado para acceder a los datos personales que almacena?</b>',
                                            subtitulo: '',
                                            id: 'datos_acceso',
                                            clase_grupo: '',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            },
                                        }),

                                    '</div>',
                                    */

                                '</div>',

                                '<div class="row">',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Su empresa realiza las tareas de mantenimiento informático?</b>',
                                            subtitulo: '',
                                            id: 'almacen_manteni',
                                            clase_grupo: '',
                                            inline: '',

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-12',
                                            opciones_json: {
                                                0: 'si, las realiza personal de mi empresa.',
                                                1: 'si, tenemos externalizado este servicio.',
                                                2: 'no, no realizamos mantenimiento.'
                                            },
                                        }),

                                    '</div>',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Cada tiempo cuanto realizan copias de seguridad de sus datos?</b>',
                                            subtitulo: '',
                                            id: 'almacen_backup',
                                            clase_grupo: '',
                                            inline: '',

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-12',
                                            opciones_json: {
                                                0: 'Diariamente.',
                                                1: 'Semanalmente.',
                                                2: 'Mensualmente.',
                                                3: 'No realizo copia de seguridad.'
                                            }
                                        }),

                                    '</div>',

                                '</div>',

                                '<div id="div_datos_acceso" class="row">',


                                '</div>',

                            '</div>',

                        '</div>',

                        // Datos de clientes
                        '<div class="tab-pane fade" id="tab3">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',

                                Fx.form_input_radio({

                                    titulo: '<b>¿Su organización trata datos personales de clientes (personas físicas)?</b>',
                                    subtitulo: 'Se refiere a datos personales de aquellas personas con las que usted mantiene una relación comercial.',
                                    id: 'tipo_sino',
                                    clase_grupo: 'lopd_sino',
                                    inline: true,

                                    col_bs_label: 'col-sm-12',
                                    col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }
                                }),

                            '</div>',

                            '<div id="tipo_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="tipo_tipo" class="col-sm-6 campo">',

                                		'<p><b>A continuación, marque qué datos personales trata de sus clientes:</b></p>',

                                		'<div class="checkbox">',
      
                                            Fx.form_input_check({
                                    			label: 'Identificación (nombre, apellidos, NIF, dirección postal, teléfono, email)',
    		                                	id: 'tipo_identificacion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad)',
    		                                	id: 'tipo_caracteristicas',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                	
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos académicos',
    		                                	id: 'tipo_academicos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos bancarios',
    		                                	id: 'tipo_bancarios',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

                                	'<div id="tipo_uso"  class="col-sm-6 campo">',

                                		'<p><b>Marque para qué utiliza los datos personales que solicita a sus clientes</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Prestarles un servicio',
    		                                	id: 'tipo_servicio',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Facturar',
    		                                	id: 'tipo_facturar',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Enviar publicidad postal o por correo electrónico',
    		                                	id: 'tipo_publicidad',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Servicio postventa y fidelizacion',
    		                                	id: 'tipo_post',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

		                        '</div>',

                                '<div class="row sep20">',

                                    '<p><b>Marque a quien entrega los datos personales de sus clientes.</b></p>',

                                '</div>',

                                '<div class="row clearfix">',

                                    '<div id="tipo_entrega" class="col-sm-6 campo">',
                                        
                                        '<p><b>Cumplimiento de obligaciones legales:</b></p>',
                                
                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Administracion tributaria',
    		                                	id: 'tipo_tributaria',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Seguridad Social',
    		                                	id: 'tipo_ss',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-112',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Bancos y entidades financieras',
    		                                	id: 'tipo_bancos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Cuerpos y fuerzas de seguridad del estado',
    		                                	id: 'tipo_seguridad',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Otros',
    		                                	id: 'tipo_otros',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

                                	'<div id="tipo_entrega_otros" class="col-sm-6 campo">',

                                		'<p><b>Otros:</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Gestoría',
    		                                	id: 'tipo_gestoria',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de futuros clientes
                        '<div class="tab-pane fade" id="tab4">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',
    
                                Fx.form_input_radio({
                                	titulo: '<b>¿Su organización trata datos personales de futuros clientes (personas físicas)?</b>',
                                	subtitulo: 'Se refiere a datos personales de aquellas personas físicas con las que usted todavía no mantiene una relación comercial.',
                                    id: 'futuro_sino',
                                	clase_grupo: 'lopd_sino',
                                    inline: true,

                                	col_bs_label: 'col-sm-12',
                                	col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }
                                }),

                            '</div>',

                            '<div id="futuro_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="futuro_tipo" class="col-sm-6 campo">',

                                		'<p><b>A continuación, marque qué datos personales trata de sus futuros clientes:</b></p>',

                                        '<div class="checkbox">',
    
                                    		Fx.form_input_check({
                                    			label: 'Identificación (nombre, apellidos, dirección postal, teléfono, email).',
    		                                	id: 'futuro_identificacion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad).',
    		                                	id: 'futuro_caracteristicas',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos académicos.',
    		                                	id: 'futuro_academicos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

                                	'<div id="futuro_procedencia"  class="col-sm-6 campo">',

                                		'<p><b>Marque de donde obtiene los datos personales de sus futuros clientes:</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Los facilitan ellos.',
    		                                	id: 'futuro_propio',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Los compro a una tercera empresa.',
    		                                	id: 'futuro_tercera',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="futuro_compartir" class="col-sm-6 campo">',

                                		'<p><b>Si comparte los datos personales de sus futuros clientes, marque a quién se los entrega:</b></p>',

                                        '<div class="checkbox">',
                                		
                                            Fx.form_input_check({
                                    			label: 'Agencia de marketing.',
    		                                	id: 'futuro_agencia',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-8',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Imprentas.',
    		                                	id: 'futuro_imprenta',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-8',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'No comparto los datos personales de mis futuros clientes.',
    		                                	id: 'futuro_exclusivo',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-8',
    		                                }),

    		                            '</div>',

                                    '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de empleades
                        '<div class="tab-pane fade" id="tab5">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',

                                Fx.form_input_radio({
                                	titulo: '<b>¿Su organización trata datos personales de empleados?</b>',
                                    subtitulo: 'Se refiere a datos personales de sus empleados.',
                                	id: 'empleados_datos',
                                	clase_grupo: 'lopd_sino',
                                	inline: true,

                                    col_bs_label: 'col-sm-12',
                                	col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }
                                }),

                            '</div>',

                            '<div id="empleados_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="empleados_tipo" class="col-sm-6 campo">',

                                		'<p><b>A continuación marque qué datos personales trata de sus empleados</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Identificación (nombre, apellidos, número de la Seguridad Social, dirección postal, teléfono, email).',
    		                                	id: 'empleados_identificacion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad, porcentaje de discapacidad).',
    		                                	id: 'empleados_caracteristicas',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos académicos.',
    		                                	id: 'empleados_academicos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos profesionales.',
    		                                	id: 'empleados_profesion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos bancarios.',
    		                                	id: 'empleados_bancos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',
                               
                                    '<div id="empleados_compartir" class="col-sm-6 campo">',

                                        '<p><b>Marque para qué utiliza los datos personales que solicita a sus empleados:</b></p>',

                                        '<div class="checkbox">',

                                            Fx.form_input_check({
                                                label: 'Gestionar la nómina.',
                                                id: 'empleados_nomina',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Formación.',
                                                id: 'empleados_formacion',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Mantenimiento de la relación laboral.',
                                                id: 'empleados_relacion',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                        '</div>',

                                    '</div>',

		                        '</div>',

                            	'<div class="row clearfix">',

                                    '<div id="empleados_procedencia"  class="col-sm-6 campo">',

                                        '<p><b>Marque de donde obtiene los datos personales de sus empleados:</b></p>',

                                        '<div class="checkbox">',

                                            Fx.form_input_check({
                                                label: 'Los facilitan ellos.',
                                                id: 'empleados_propio',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Los facilita una agencia de colocación.',
                                                id: 'empleados_tercera',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                        '</div>',

                                    '</div>',
                                
                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿La gestión de la nómina la realiza una gestoría?</b>',
                                            id: 'empleados_gestion_nomina',
                                            clase_grupo: 'opciones',
                                            clase: 'text-center',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            },
                                        }),

                                    '</div>',

                                '</div>',

                                '<div class="row clearfix">',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Dispone de mutua de accidentes?</b>',
                                            id: 'empleados_mutua',
                                            clase_grupo: 'opciones',
                                            clase: 'text-center',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            },
                                        }),

                                    '</div>',

                                	'<div class="col-sm-6 campo radio">',

                                		Fx.form_input_radio({

                                            titulo: '<b>¿Dan formación a los trabajadores?</b>',
                                            id: 'empleados_formacion',
                                            clase_grupo: 'opciones',
                                            clase: 'text-center',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            },
                                        }),

		                            '</div>',

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Dispone de servicio de prevencion ajeno?</b>',
                                            id: 'empleados_prevencion',
                                            clase_grupo: 'opciones',
                                            clase: 'text-center',
                                            inline: true,

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-1',
                                            opciones_json: {
                                                0: 'si',
                                                1: 'no'
                                            },
                                        }),

                                    '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de candidates
                        '<div class="tab-pane fade" id="tab6">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',

                                Fx.form_input_radio({

                                	titulo: '<b>¿Su organización trata datos personales de personas candidatas?</b>',
                                	subtitulo: 'Se refiere a datos personales de aquellas personas que dejan su currículum o rellenan un formulario de solicitud de empleo.',
                                    id: 'candidatos_datos',
                                	clase_grupo: 'lopd_sino',
                                    inline: true,

                                	col_bs_label: 'col-sm-12',
                                	col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }                                
                                }),

                            '</div>',

                            '<div id="candidatos_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="candidatos_tipo" class="col-sm-6 campo">',

                                		'<p><b>A continuación, marque qué datos personales trata de personas candidatas a un empleo:</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Identificación (nombre, apellidos, dirección postal, teléfono, email).',
    		                                	id: 'candidatos_identificacion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad, otros excluyendo datos de raza, salud o afiliciación sindical).',
    		                                	id: 'candidatos_caracteristicas',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos académicos.',
    		                                	id: 'candidatos_academicos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos profesionales.',
    		                                	id: 'candidatos_profesion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

                                	'<div class="col-sm-6 campo">',

                                        '<p><b>Marque de donde obtiene los datos personales de sus candidatos a un empleo:</b></p>',

                                        '<div class="checkbox">',

                                            Fx.form_input_check({
                                                label: 'Los facilitan ellos en curriculum papel.',
                                                id: 'candidatos_curriculum',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Los incorporan ellos a mi página web.',
                                                id: 'candidatos_web',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                            Fx.form_input_check({
                                                label: 'Rellenan un formulario.',
                                                id: 'candidatos_web',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                        '</div>',

                                    '</div>',

                                '</div>',

                                '<div class="row clearfix">',
                                    /*
                                    '<div id="candidatos_procedencia" class="col-sm-6 campo">',

                                		'<p><b>Plazo de eliminación de los datos personales:</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Un año',
    		                                	id: 'candidatos_curriculum',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Dos años.',
    		                                	id: 'candidatos_web',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                            Fx.form_input_check({
                                                label: 'Tres años.',
                                                id: 'candidatos_web',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),
                                            Fx.form_input_check({
                                                label: 'Cuatro años.',
                                                id: 'candidatos_web',
                                                class: 'opciones',
                                                col_bs_label: 'col-sm-12',
                                            }),

                                    		Fx.form_input_check({
                                    			label: 'Cinco años.',
    		                                	id: 'candidatos_web',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

    		                        '</div>',
                                    */

                                    '<div class="col-sm-6 campo radio">',

                                        Fx.form_input_radio({

                                            titulo: '<b>¿Cada cuanto tiempo elimina los datos de los candidatos?</b>',
                                            subtitulo: '',
                                            id: 'candidatos_eliminacion',
                                            clase_grupo: '',
                                            inline: '',

                                            col_bs_label: 'col-sm-12',
                                            col_bs_radio: 'col-sm-12',
                                            opciones_json: {
                                                0: '1 año.',
                                                1: '2 años.',
                                                2: '3 años.',
                                                3: '5 años.'
                                            }
                                        }),

                                    '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de proveedores
                        '<div class="tab-pane fade" id="tab7">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',
    
                                Fx.form_input_radio({

                                	titulo: '<b>¿Su organización trata datos personales de proveedores (personas físicas)?</b>',
                                	subtitulo: 'Se refiere a datos personales de aquellas personas físicas que proveen de productos o servicios a su empresa. Si sus proveedores son personas jurídicas no tiene que marcar la casilla de proveedores.',
                                    id: 'proveedores_datos',
                                    clase_grupo: 'lopd_sino',
                                    inline: true,

                                	col_bs_label: 'col-sm-12',
                                	col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }

                                }),

                            '</div>',

                            '<div id="proveedores_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="proveedores_tipo" class="col-sm-6 campo">',

                                		'<p><b>A continuación, marque qué datos personales tratas de sus proveedores:</b></p>',

                                        '<div class="checkbox">',

                                    		Fx.form_input_check({
                                    			label: 'Identificación (nombre, apellidos, NIF, dirección postal, teléfono, email).',
    		                                	id: 'proveedores_identificacion',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Datos bancarios.',
    		                                	id: 'proveedores_bancos',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

                                	'<div id="proveedores_uso" class="col-sm-6 campo">',

                                		'<p><b>Marque para qué utiliza los datos personales que solicita a sus proveedores:</b></p>',

                                		'<div class="checkbox">',

                                            Fx.form_input_check({
                                    			label: 'Facturación.',
    		                                	id: 'proveedores_factura',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                    		Fx.form_input_check({
                                    			label: 'Realizar pedidos.',
    		                                	id: 'proveedores_pedido',
    		                                	class: 'opciones',
    		                                	col_bs_label: 'col-sm-12',
    		                                }),

                                        '</div>',

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',,

                        // Terceras empresas
                        '<div class="tab-pane fade" id="tab8">',

                            '<div class="col-sm-offset-1 col-sm-10 campo radio">',

                                Fx.form_input_radio({
                                	titulo: '<b>¿Su organización tiene contratadas terceras empresas que le prestan servicios como pueden ser los de mantenimiento de su página web, desarrollo de programas informáticos, proveedor de correo electrónico, hosting, servicio de limpieza, servicio de videovigilancia u otros?</b>',
                                	subtitulo: '',
                                    id: 'terceros_datos',
                                    clase_grupo: 'lopd_sino',
                                    inline: true,

                                    col_bs_label: 'col-sm-12',
                                    col_bs_radio: 'col-sm-1',
                                    opciones_json: {
                                        0: 'si',
                                        1: 'no'
                                    }
                                }),

                            '</div>',

                            '<div id="terceros_extra" class="col-sm-12">',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="terceros_empresa1" class="col-sm-6 campo ficha">',

                                        '<p><b>Datos de la primera empresa:</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre1',
		                                	class: 'opciones',
		                                	col_bs_label: 'col-sm-12',
		                                	col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección de la empresa',
		                                	id: 'terceros_direccion1',
		                                	class: 'opciones',
		                                	col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'CIF',
		                                	id: 'terceros_cif1',
		                                	class: 'opciones',
		                                	col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_textarea({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio1',
		                                	class: 'opciones',
		                                	col_bs_label: 'col-sm-12',
                                            col_bs_textarea: 'col-sm-10 col-sm-offset-1',
		                                }),

		                            '</div>',
                            	
                                	'<div id="terceros_empresa2" class="col-sm-6 campo ficha">',

                                		'<p><b>Datos de la segunda empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre2',
		                                	class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección de la empresa',
		                                	id: 'terceros_direccion2',
		                                	class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'CIF',
		                                	id: 'terceros_cif2',
		                                	class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio2',
		                                	class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_textarea: 'col-sm-10 col-sm-offset-1',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row clearfix">',
                            	
                                	'<div id="terceros_empresa3" class="col-sm-6 campo ficha">',

                                		'<p><b>Datos de la tercera empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre3',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección de la empresa',
		                                	id: 'terceros_direccion3',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'CIF',
		                                	id: 'terceros_cif3',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio3',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_textarea: 'col-sm-10 col-sm-offset-1',
		                                }),

		                            '</div>',
                            	
                                	'<div id="terceros_empresa4" class="col-sm-6 campo ficha">',

                                		'<p><b>Datos de la cuarta empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre4',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección de la empresa',
		                                	id: 'terceros_direccion4',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'CIF',
		                                	id: 'terceros_cif4',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_input: 'col-sm-10 col-sm-offset-1',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio4',
                                            class: 'opciones',
                                            col_bs_label: 'col-sm-12',
                                            col_bs_textarea: 'col-sm-10 col-sm-offset-1',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Procesar Datos
                        '<div class="tab-pane fade" id="tab9">',

                            '<div class="col-sm-offset-1 col-sm-10 campo">',

                                '<p>',
                                    'El programa ha terminado. Cuando pulse el botón de PROCESAR se generaran diversos documentos en formato editable.',
                                    '<br>',
                                    'RECUERDE: aunque se le ofrecen los documentos mínimos indispensables para estar en disposición de cumplir con el Reglamento de Protección de Datos, usted también debe realizar las siguientes acciones:',
                                '</p>',

                                '<ol>',
                                    '<li>Incluir las cláusulas informativas en los formularios de solicitud de información, bien si utiliza formularios en papel o a través de su página web.</li>',
                                    '<li>Implantar las medidas técnicas y organizativas que se le indican en el documento correspondiente.</li>',
                                    '<li>Revisar los contratos que dispone actualmente e incluir las cláusulas contractuales y firmarlas en la última hoja.</li>',
                                    '<li>Elaborar aquellos contratos que todavía no tiene e igualmente incluir las cláusulas contractuales y firmarlas en la última hoja.</li>',
                                    '<li>Custodiar y mantener actualizados todos los documentos.</li>',
                                    '<li>No olvide que no debe enviar nada a la Agencia Española de Protección de Datos, tan solo debe entregárselos si se los solicita.</li>',
                                    '<li>Recuerde que la Agencia Española de Protección de Datos no almacena la información que usted haya introducido en esta herramienta.</li>',
                                '</ol>',


                                '<div class="form-group">',

                                    //'<label class="col-sm-3 control-label" for="" title="">&nbsp;</label>',

                                    '<div class="input-group col-sm-6 col-sm-offset-3">',
                                        '<button id="btn_procesar" class="btn btn-block bgm-green waves-effect"><i class="fa fa-pencil fa-lg"></i>Procesar los datos</button>',
                                        
                                        //'<a id="btn_descargar_contrato" target="_blank" download="Contratación de la Plataforma de Concurso Público del Grupo Oclem" href="#" class="btn-large btn bgm-blue waves-effect oculto"><i class="fa fa-download fa-lg"></i> &nbsp;Descargar contrato&nbsp;</a>&nbsp;',
                                    '</div>',

                                '</div>',

                                '<div id="resp_procesar_lopd" class="sep30"></div>',

                            '</div>',

                        '</div>',

                        '<div id="botones_ant_sig">',
                            '<ul class="fw-footer pagination">',
                                // '<li class="previous first"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                                '<li class="first"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                                '<li class="previous"><a class="a-prevent" href="#lopd"><i class="md md-chevron-left"></i></a></li>',
                                '<li class="next"><a class="a-prevent" href="#lopd"><i class="md md-chevron-right"></i></a></li>',
                                '<li class="last"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                                // '<li class="next last"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                            '</ul>',
                        '</div>',

                    '</div>',
                        
                '</form>',

            '</div>',
            
        '</div>',

	].join('');

	return LopdViewHtml;
});