define([

	'funciones',
	'app/config',
	'app/formulario',

], function( Fx, Config, Formulario ){

	var LopdViewHtml = {};

	LopdViewHtml['vista'] = [

        '<div class="container">',

            '<div class="sep50"></div>',

            '<div class="block-header">',
                '<h2>Cuestionario de LOPD</h2>',
            '</div>',

            '<div class="card-body card-padding">',

                //'<p class="text-right ayuda_contratacion"><i class="fa fa-phone fa-lg"></i> Ayuda a la contratación: <b>91 499 49 96</b> | <i class="fa fa-download"></i> <a target="_blank" href="' + Config.base_url + 'pdf/ayuda_contratacion.pdf">Descargar ayuda</a></p>',
                
                '<ul class="tab-nav text-center tabs_lopd">',
                    '<li class="active" ><a data-pos="1" href="#tab1" data-toggle="tab">Su empresa</a></li>',
                    '<li ><a href="#tab2" data-pos="2" data-toggle="tab">Clientes</a></li>',
                    '<li ><a href="#tab3" data-pos="3" data-toggle="tab">Futuros clientes</a></li>',
                    '<li ><a href="#tab4" data-pos="4" data-toggle="tab">Empleados</a></li>',
                    '<li ><a href="#tab5" data-pos="5" data-toggle="tab">Candidatos</a></li>',
                    '<li ><a href="#tab5" data-pos="6" data-toggle="tab">Proveedores</a></li>',
                    '<li ><a href="#tab5" data-pos="7" data-toggle="tab">videovigilancia</a></li>',
                    '<li ><a href="#tab5" data-pos="8" data-toggle="tab">Empresas externas</a></li>',
                '</ul>',
                    
                '<form role="form" id="form_anadir_cliente_web" class="mi_form form-horizontal">',   
                    
                    '<div class="tab-content">',

                    	// Datos generales
                        '<div class="tab-pane fade active in" id="tab1">',

                            '<div class="sep50"></div>',

                            '<p>Los datos que incorpore en el programa desde esta pantalla hasta la finalización del programa, se van a utilizar para elaborar los documentos que se generan automáticamente adaptados a su organización.</p>',
                            
                            Fx.form_input({
                                label: 'Nombre de la empresa',
                                id: 'nombre',
                                valor: '',
                                placeholder: '',
                                tipo: 'text',
                                clase: 'texto obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-6',
                            }),

                            Fx.form_input({
                                label: 'Dirección completa de la empresa',
                                id: 'direccion',
                                valor: '',
                                tipo: 'text',
                                clase: 'texto obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-6',
                            }),

                            Fx.form_input({
                                label: 'NIF',
                                id: 'nif',
                                valor: '',
                                tipo: 'text',
                                clase: 'texto',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-4',
                            }),

                            Fx.form_input({
                                label: 'Teléfono',
                                id: 'telefono',
                                valor: '',
                                tipo: 'text',
                                clase: 'telefono',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-4',
                            }),

                            Fx.form_input({
                                label: 'Dirección de correo electrónico',
                                id: 'email',
                                valor: '',
                                placeholder: '',
                                tipo: 'text',
                                clase: 'email obligatorio',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_input: 'col-sm-6',
                            }),

                            Fx.form_textarea({
                                label: 'Descripción de la empresa:',
                                id: 'descripcion',
                                placeholder: 'Describa brevemente a qué se dedica su empresa',
                                clase: 'texto',
                                min_char: '3',
                                col_bs_label: 'col-sm-3',
                                col_bs_textarea: 'col-sm-6',
                            }),
                            
                        '</div>',

                        // Datos de clientes
                        '<div class="tab-pane fade" id="tab2">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización trata datos personales de clientes (personas físicas)?',
                            	id: 'tipo_datos',
                            	ayuda: 'Se refiere a datos personales de aquellas personas con las que usted mantiene una relación comercial.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                            //'</div>',

                            '<div id="tipo_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="tipo_tipo" class="col-sm-6">',

                                		'<p><b>A continuación marque qué datos personales trata de sus clientes</b></p>',

                                		Fx.form_input_check({
                                			label: 'Identificación (nombre, apellidos, NIF, dirección postal, teléfono, email)',
		                                	id: 'tipo_identificacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad)',
		                                	id: 'tipo_caracteristicas',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos académicos',
		                                	id: 'tipo_academicos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos bancarios',
		                                	id: 'tipo_bancarios',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

                                	'<div id="tipo_uso"  class="col-sm-6">',

                                		'<p><b>Marque para qué utiliza los datos personales que solicita a sus clientes</b></p>',

                                		Fx.form_input_check({
                                			label: 'Prestarles un servicio',
		                                	id: 'tipo_servicio',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Facturar',
		                                	id: 'tipo_facturar',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Enviar publicidad postal o por correo electrónico',
		                                	id: 'tipo_publicidad',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Servicio postventa y fidelizacion',
		                                	id: 'tipo_post',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),
		                            '</div>',

		                        '</div>',

                            	'<div class="row">',

                            		'<p><b>Marque a quien entrega los datos personales de sus clientes.</b></p>',
                            	
                                	'<div id="tipo_entrega" class="col-sm-6">',

                                		'<p>Cumplimiento de obligaciones legales</p>',

                                		Fx.form_input_check({
                                			label: 'Administracion tributaria',
		                                	id: 'tipo_tributaria',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Seguridad Social',
		                                	id: 'tipo_ss',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Bancos y entidades financieras',
		                                	id: 'tipo_bancos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Cuerpos y fuerzas de seguridad del estado',
		                                	id: 'tipo_seguridad',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Otros',
		                                	id: 'tipo_otros',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

                                	'<div id="tipo_entrega_otros" class="col-sm-6">',

                                		'<p>Otros:</p>',

                                		Fx.form_input_check({
                                			label: 'Gestoría',
		                                	id: 'tipo_gestoria',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de clientes potenciales
                        '<div class="tab-pane fade" id="tab3">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización trata datos personales de potenciales clientes (personas físicas)?',
                            	id: 'potencial_datos',
                            	ayuda: 'Se refiere a datos personales de aquellas personas físicas con las que usted todavía no mantiene una relación comercial.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                            //'</div>',

                            '<div id="potencial_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="potencial_tipo" class="col-sm-12">',

                                		'<p><b>A continuación marque qué datos personales trata de sus potenciales clientes</b></p>',

                                		Fx.form_input_check({
                                			label: 'Identificación (nombre, apellidos, dirección postal, teléfono, email)',
		                                	id: 'potencial_identificacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad)',
		                                	id: 'potencial_caracteristicas',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos académicos',
		                                	id: 'potencial_academicos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                        '<div class="row">',

                                	'<div id="potencial_procedencia"  class="col-sm-12">',

                                		'<p><b>Marque de donde obtiene los datos personales de sus potenciales clientes</b></p>',

                                		Fx.form_input_check({
                                			label: 'Los facilitan ellos',
		                                	id: 'potencial_propio',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Los compro a una tercera empresa',
		                                	id: 'potencial_tercera',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="potencial_compartir" class="col-sm-12">',

                                		'<p><b>Si comparte los datos personales de sus potenciales clientes, marque a quién se los entrega</b></p>',

                                		Fx.form_input_check({
                                			label: 'Agencia de marketing',
		                                	id: 'potencial_agencia',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Imprentas',
		                                	id: 'potencial_imprenta',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'No comparto los datos personales de mis potenciales clientes',
		                                	id: 'potencial_exclusivo',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de empleades
                        '<div class="tab-pane fade" id="tab4">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización trata datos personales de empleados?',
                            	id: 'empleados_datos',
                            	ayuda: 'Se refiere a datos personales de sus empleados.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                            //'</div>',

                            '<div id="empleados_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="empleados_tipo" class="col-sm-12">',

                                		'<p><b>A continuación marque qué datos personales trata de sus empleados</b></p>',

                                		Fx.form_input_check({
                                			label: 'Identificación (nombre, apellidos, número de la Seguridad Social, dirección postal, teléfono, email)',
		                                	id: 'empleados_identificacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad, porcentaje de discapacidad)',
		                                	id: 'empleados_caracteristicas',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos académicos',
		                                	id: 'empleados_academicos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos profesionales',
		                                	id: 'empleados_profesion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos bancarios',
		                                	id: 'empleados_bancos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                        '<div class="row">',

                                	'<div id="empleados_procedencia"  class="col-sm-12">',

                                		'<p><b>Marque de donde obtiene los datos personales de sus empleados</b></p>',

                                		Fx.form_input_check({
                                			label: 'Los facilitan ellos',
		                                	id: 'empleados_propio',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Los facilita una agencia de colocación',
		                                	id: 'empleados_tercera',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="empleados_compartir" class="col-sm-12">',

                                		'<p><b>Marque para qué utiliza los datos personales que solicita a sus empleados</b></p>',

                                		Fx.form_input_check({
                                			label: 'Gestionar la nómina',
		                                	id: 'empleados_nomina',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Formación',
		                                	id: 'empleados_formacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Mantenimiento de la relación laboral',
		                                	id: 'empleados_relacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="empleados_compartir" class="col-sm-12">',

                                		'<p><b>La gestión de la nómina la realiza una gestoría</b></p>',

                                		Fx.form_input_check({
                                			label: 'Si',
		                                	id: 'empleados_si',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'No',
		                                	id: 'empleados_no',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de candidates
                        '<div class="tab-pane fade" id="tab5">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización trata datos personales de personas candidatas?',
                            	id: 'candidatos_datos',
                            	ayuda: 'Se refiere a datos personales de aquellas personas que dejan su currículum o rellenan un formulario de solicitud de empleo.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                            //'</div>',

                            '<div id="candidatos_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="candidatos_tipo" class="col-sm-12">',

                                		'<p><b>A continuación marque qué datos personales trata de personas candidatas a un empleo</b></p>',

                                		Fx.form_input_check({
                                			label: 'Identificación (nombre, apellidos, dirección postal, teléfono, email)',
		                                	id: 'candidatos_identificacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Características personales (estado civil, fecha y lugar de nacimiento, edad, sexo, nacionalidad, otros excluyendo datos de raza, salud o afiliciación sindical)',
		                                	id: 'candidatos_caracteristicas',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos académicos',
		                                	id: 'candidatos_academicos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos profesionales',
		                                	id: 'candidatos_profesion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                        '<div class="row">',

                                	'<div id="candidatos_procedencia" class="col-sm-12">',

                                		'<p><b>Marque de donde obtiene los datos personales de sus candidatos a un empleo</b></p>',

                                		Fx.form_input_check({
                                			label: 'Los facilitan ellos en curriculum papel',
		                                	id: 'candidatos_curriculum',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Los incorporan ellos a mi página web',
		                                	id: 'candidatos_web',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Rellenan un formulario',
		                                	id: 'candidatos_web',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Datos de proveedores
                        '<div class="tab-pane fade" id="tab6">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización trata datos personales de proveedores (personas físicas)?',
                            	id: 'proveedores_datos',
                            	ayuda: 'Se refiere a datos personales de aquellas personas físicas que proveen de productos o servicios a su empresa. Si sus proveedores son personas jurídicas no tiene que marcar la casilla de proveedores.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                            //'</div>',

                            '<div id="proveedores_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="proveedores_tipo" class="col-sm-12">',

                                		'<p><b>A continuación marque qué datos personales tratas de sus proveedores</b></p>',

                                		Fx.form_input_check({
                                			label: 'Identificación (nombre, apellidos, NIF, dirección postal, teléfono, email)',
		                                	id: 'proveedores_identificacion',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Datos bancarios',
		                                	id: 'proveedores_bancos',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                        '<div class="row">',

                                	'<div id="proveedores_uso" class="col-sm-12">',

                                		'<p>Marque para qué utiliza los datos personales que solicita a sus proveedores</b></p>',

                                		Fx.form_input_check({
                                			label: 'Facturación',
		                                	id: 'proveedores_factura',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input_check({
                                			label: 'Realizar pedidos',
		                                	id: 'proveedores_pedido',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                        // Captación de imágenes
                        '<div class="tab-pane fade" id="tab7">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización capta imágenes mediante cámaras de videovigilancia con fines de seguridad?',
                            	id: 'seguridad_datos',
                            	ayuda: 'Si tiene instaladas cámaras de videovigilancia en su negocio, márquelo y le daremos pautas a seguir para poder utilizarlas cumpliendo con la normativa de protección de datos.',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),

                        '</div>',

                        // Terceras empresas
                        '<div class="tab-pane fade" id="tab8">',

                            '<div class="sep50"></div>',

                            //'<div class="row">',
                            Fx.form_sino({
                            	label: '¿Su organización tiene contratadas terceras empresas que le prestan servicios como pueden ser los de mantenimiento de su página web, desarrollo de programas informáticos, proveedor de correo electrónico, hosting, servicio de limpieza, servicio de videovigilancia u otros?',
                            	id: 'terceros_datos',
                            	ayuda: '',
                            	class: 'caja_sino',
                            	col_bs_label: 'col-sm-12',
                            	col_bs_input: 'col-sm-12',
                            }),


                            '<div id="terceros_extra" class="col-sm-12">',

                            	'<div class="row">',
                            	
                                	'<div id="terceros_empresa1" class="col-sm-12">',

                                		'<p><b>Datos de la empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre1',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección',
		                                	id: 'terceros_direccion1',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'NIF',
		                                	id: 'terceros_nif1',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio1',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="terceros_empresa2" class="col-sm-12">',

                                		'<p><b>Datos de la segunda empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre2',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección',
		                                	id: 'terceros_direccion2',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'NIF',
		                                	id: 'terceros_nif2',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio2',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="terceros_empresa3" class="col-sm-12">',

                                		'<p><b>Datos de la empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre3',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección',
		                                	id: 'terceros_direccion3',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'NIF',
		                                	id: 'terceros_nif3',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio3',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

                            	'<div class="row">',
                            	
                                	'<div id="terceros_empresa4" class="col-sm-12">',

                                		'<p><b>Datos de la empresa</b></p>',

                                		Fx.form_input({
                                			label: 'Nombre de la empresa',
		                                	id: 'terceros_nombre4',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Dirección',
		                                	id: 'terceros_direccion4',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'NIF',
		                                	id: 'terceros_nif4',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

                                		Fx.form_input({
                                			label: 'Descripción del servicio prestado',
		                                	id: 'terceros_servicio4',
		                                	class: '',
		                                	col_bs_label: 'col-sm-8',
		                                	col_bs_select: 'col-sm-2',
		                                }),

		                            '</div>',

		                        '</div>',

		                    '</div>',

                        '</div>',

                    '</div>',
                        
                    '<div id="botones_ant_sig"  style="width:100%;clear:both;float:left">',
                        '<ul class="fw-footer pagination">',
                            '<li class="previous first"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                            '<li class="previous"><a class="a-prevent" href="#lopd"><i class="md md-chevron-left"></i></a></li>',
                            '<li class="next"><a class="a-prevent" href="#lopd"><i class="md md-chevron-right"></i></a></li>',
                            '<li class="next last"><a class="a-prevent" href="#lopd"><i class="md md-more-horiz"></i></a></li>',
                        '</ul>',
                    '</div>',

                '</form>',

            '</div>',
            
        '</div>',

	].join('');

	LopdViewHtml['final'] = [

		'<div class="card">',

			'<p>',
				'El programa ha terminado, cuando pulse el botón de FINALIZAR se generaran diversos documentos en formato editable.',
				'<br>',
				'RECUERDE, aunque se le ofrecen los documentos mínimos indispensables para estar en disposición de cumplir con el Reglamento de Protección de Datos, usted también debe realizar las siguientes acciones:',
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

		'</div>',

	].join('');

	return LopdViewHtml;
});