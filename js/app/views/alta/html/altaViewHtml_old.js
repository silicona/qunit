define([
    
    'funciones',
    'app/config',
    'app/formulario'
    
], function(Fx, Config, Formulario){
    
    var AltaClienteWebViewHtml = {};
    
    AltaClienteWebViewHtml['altaClienteWeb'] = [

         '<div class="card">',

            '<div class="block-header">',
                '<h2>Alta de clientes</h2>',
            '</div>',

            '<div class="card-body card-padding">',

                '<p class="text-right ayuda_contratacion"><i class="fa fa-phone fa-lg"></i> Ayuda a la contratación: <b>91 499 49 96</b> | <i class="fa fa-download"></i> <a target="_blank" href="' + Config.base_url + 'pdf/ayuda_contratacion.pdf">Descargar ayuda</a></p>',
                
                    '<ul class="tab-nav text-center tabs_alta_clientes">',
                        '<li class="active" ><a data-pos="1" href="#tab1" data-toggle="tab">Datos generales</a></li>',
                        //'<li id="tab_actividades" class="tab_actividades"><a data-pos="2" href="#tab2" data-toggle="tab">Actividades</a></li>',
                        // '<li id="tab_sin_clasificacion" class="tab_sin_clasificacion"><a href="#tab3" data-pos="3" data-toggle="tab">Empresas sin clasificación</a></li>',
                        '<li ><a href="#tab3" data-pos="3" data-toggle="tab">Importe</a></li>',
                        '<li ><a href="#tab4" data-pos="4" data-toggle="tab">Áreas geográficas</a></li>',
                        '<li ><a href="#tab5" data-pos="5" data-toggle="tab">Alta</a></li>',
                    '</ul>',
                    
                    '<form role="form" id="form_anadir_cliente_web" class="mi_form form-horizontal">',   
                        
                        '<div class="tab-content">',

                            '<div class="tab-pane fade active in" id="tab1">',
                                '<div class="sep50"></div>',

                                Fx.form_input({
                                    label: 'Nombre',
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
                                    label: 'Apellido 1',
                                    id: 'apellido1',
                                    valor: '',
                                    tipo: 'text',
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
                                    clase: 'texto',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_input: 'col-sm-6',
                                }),

                                Fx.form_input({
                                    label: 'Email',
                                    id: 'email',
                                    valor: '',
                                    placeholder: '',
                                    tipo: 'text',
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
                                    clase: 'texto obligatorio',
                                    min_char: '3',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_input: 'col-sm-6',
                                }),

                                Fx.form_textarea({
                                    label: 'Actividad:',
                                    id: 'actividad',
                                    placeholder: 'Describa brevemente a qué se dedica su empresa',
                                    clase: 'texto',
                                    min_char: '3',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_textarea: 'col-sm-6',
                                }),

                                Fx.form_input({
                                    label: 'CIF / NIF',
                                    id: 'cif',
                                    valor: '',
                                    placeholder: '',
                                    tipo: 'text',
                                    clase: 'nif obligatorio',
                                    min_char: '3',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_input: 'col-sm-6',
                                }),

                                Fx.form_textarea({
                                    label: 'Dirección',
                                    id: 'direccion',
                                    clase: 'texto obligatorio',
                                    min_char: '3',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_textarea: 'col-sm-6',
                                }),

                                Fx.form_input({
                                    label: 'Código postal',
                                    id: 'cp',
                                    valor: '',
                                    tipo: 'text',
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
                                    clase: 'texto obligatorio',
                                    min_char: '2',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_input: 'col-sm-6',
                                }),

                                '<div class="form-group sep50 text_center">',
                                    '<label class="col-sm-3 control-label" for="nombre" title="">Normas ISO (*)</label>',
                                    '<div class="input-group col-sm-6">',
                                        '<div class="checkbox normas_iso m-b-15 col-sm-6 col-lg-6">',
                                            
                                            '<label>',
                                                '<input id="sin_normas_iso" type="checkbox" value="">',
                                                '<i class="input-helper"></i>',
                                                'No tengo ninguna ISO',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="ISO-9001">',
                                                '<i class="input-helper"></i>',
                                                'ISO-9001',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="ISO-14001">',
                                                '<i class="input-helper"></i>',
                                                'ISO-14001',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="ISO-20001">',
                                                '<i class="input-helper"></i>',
                                                'ISO-20001',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="ISO-27001">',
                                                '<i class="input-helper"></i>',
                                                'ISO-27001',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="OSHAS-18001">',
                                                '<i class="input-helper"></i>',
                                                'OSHAS-18001',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                            '<label>',
                                                '<input type="checkbox" value="Otras">',
                                                '<i class="input-helper"></i>',
                                                'Otras',
                                            '</label><br>',
                                            '<div class="sep10"></div>',

                                        '</div>',
                                    '</div>',

                                    '<p>(*) Debe seleccionar al menos una opción de Normas ISO</p>',
                                '</div>',

                                /*
                                Fx.form_select({
                                    label            : '¿Tiene clasificaciones oficiales?',
                                    id               : 'clasificaciones',
                                    clase            : 'form-control',
                                    col_bs_label     : 'col-sm-3',
                                    col_bs_select    : 'col-sm-6',
                                    json_valores_et  : {
                                        0: 'No, no tengo ninguna',
                                        1: 'Sí, tengo una o más'
                                    }
                                }),
                                */

                                /*
                                Fx.form_input({
                                    label: 'Código de acceso',
                                    id: 'cod_promocional',
                                    valor: '',
                                    tipo: 'text',
                                    placeholder: '',
                                    clase: '',
                                    min_char: '',
                                    col_bs_label: 'col-sm-3',
                                    col_bs_input: 'col-sm-6',
                                }),

                                '<div id="resp_cod_promocional"><div class="col-sm-3 control-label"></div><div class="col-sm-6 control-input">(*) Si no tiene código de acceso, déjelo en blanco.</div></div>',

                                */ 
                            '</div>',

                            '<div class="tab-pane fade" id="tab2">',

                                '<p><b>IMPORTANTE:</b> Piche en la casilla de los epígrafes de los que quiere recibir concursos. Si además dispone de clasificación oficial para ese epígrafe, seleccionela del menú &quot;Clasif. oficial&quot;.</p>',

                                '<div role="tabpanel" class="tab">',
                                    
                                    '<ul class="tab-nav" role="tablist">',
                                        '<li class="active"><a href="#obras" aria-controls="obras" role="tab" data-toggle="tab">Obras</a></li>',
                                        '<li role="presentation"><a href="#servicios" aria-controls="servicios" role="tab" data-toggle="tab">Servicios</a></li>',
                                        '<li role="presentation"><a href="#suministros" aria-controls="suministros" role="tab" data-toggle="tab">Suministros</a></li>',
                                    '</ul>',
                                  
                                    '<div class="tab-content">',
                                        '<div role="tabpanel" class="tab-pane active animated fadeInRight in tab_obras" id="obras"></div>',
                                        '<div role="tabpanel" class="tab-pane animated fadeInRight tab_servicios" id="servicios"></div>',
                                        '<div role="tabpanel" class="tab-pane animated fadeInRight tab_suministros" id="suministros"></div>',
                                        
                                    '</div>',

                                '</div>',
                            '</div>',

                            /*
                            '<div class="tab-pane fade" id="tab3">',
                                '<div id="div_no_oficiales"></div>',
                            '</div>',
                            */

                            '<div class="tab-pane fade" id="tab3">',

                                '<h4>Importes:</h4>',
                                '<p>Introduzca los importes mínimo y máximo de los concursos a los que quiere optar. Si no quiere establecer límites, deje los valores por defecto:</p>',

                                '<div class="row">',

                                    Fx.form_select({
                                        label            : 'Importe mínimo',
                                        id               : 'importe_min',
                                        clase            : 'form-control',
                                        col_bs_label     : 'col-sm-3',
                                        col_bs_select    : 'col-sm-6',
                                        json_valores_et  : {
                                            0        : '0€',
                                            500000   : '500.000€',
                                            1000000  : '1.000.000€',
                                            2000000  : '2.000.000€',
                                            5000000  : '5.000.000€',
                                        }
                                    }),

                                    Fx.form_select({
                                        label            : 'Importe máximo',
                                        id               : 'importe_max',
                                        clase            : 'form-control',
                                        col_bs_label     : 'col-sm-3',
                                        col_bs_select    : 'col-sm-6',
                                        json_valores_et  : {
                                            0:           'Sin límite',
                                            500000:      '500.000€',
                                            1000000:     '1.000.000€',
                                            2000000:     '2.000.000€',
                                            5000000:     '5.000.000€',
                                        }
                                    }),
                                    
                                '</div>',

                                '<hr>',

                                /*
                                '<h4>Proyectos en el extranjero:</h4>',
                                '<div class="col-lg-12">',
                                    '<div class="checkbox m-b-15">',
                                        '<label>',
                                            '<input id="exterior" type="checkbox" value="" checked="checked">',
                                            '<i class="input-helper"></i>',
                                            'Participar en proyectos en el extranjero',
                                        '</label>',
                                    '</div>',
                                '</div>',
                                */
                                
                            '</div>',

                            '<div class="tab-pane fade" id="tab4">',

                                '<h4>Provincias:</h4>',
                                '<div class="row">',
                                    
                                    '<div class="col-lg-12">',
                                            '<div class="checkbox m-b-15">',
                                                '<label>',
                                                    '<input id="sel_todas" type="checkbox" value="" checked="checked">',
                                                    '<i class="input-helper"></i>',
                                                    'Seleccionar todas las provincias',
                                                '</label>',
                                            '</div>',
                                    '</div>',
                                    
                                '</div>',

                                '<div class="row">',
                                    '<div id="div_provincias" class="col-lg-12"></div>',
                                '</div>',

                                '<hr>',
                                
                            '</div>',
                            
                            '<div class="tab-pane fade" id="tab5">',

                                '<h2>Condiciones de contratación</h2>',
                                '<br>',
                                '<div class="panel-group" data-collapse-color="teal" id="accordionTeal" role="tablist" aria-multiselectable="true">',
                                    
                                    '<div class="panel panel-collapse panel_condiciones">',
                                    
                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-1" aria-expanded="false">',
                                                    '1. AVISO LEGAL  /  POLITICA DE PRIVACIDAD',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-1" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>La sociedad mercantil GRUPO OCLEM S.L. Dicha compañía tiene su domicilio social en Rivas Vaciamadrid  (MADRID) calle Marie Curie número 5 y provista de CIF. Número: B- 86679594.</p>',
                                                '<p>Al utilizar la plataforma de concurso de  GRUPO OCLEM,  atribuye la condición de usuario (en adelante, el "Usuario") e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal. Dichas disposiciones pueden sufrir modificaciones por parte de GRUPO OCLEM  y es el Usuario el responsable de consultarlas en cada una de las ocasiones en que se proponga utilizar alguno de los servicios de GRUPO OCLEM Para facilitar a los Usuarios el conocimiento de estas modificaciones, se incluye al final de la página la fecha actual.</p>',
                                                '<p>Algunos de los servicios ofrecidos a los Usuarios a través de GRUPO OCLEM  se encuentra sometida a condiciones particulares propias, que según los casos, sustituyen, completan y/o modifican el presente Aviso Legal. Por lo tanto, con anterioridad a la utilización de dichos servicios, el Usuario también habrá de leer las correspondientes Condiciones Particulares.</p>',
                                                '<p>El presente aviso e información legales  regula el uso del sitio Web www.oclem.com que GRUPO OCLEM ofrece a través de Internet.</p>',
                                            '</div>',
                                        '</div>',
                                    
                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a class="collapsed" data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-2" aria-expanded="false">',
                                                    '2.- USUARIOS',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-2" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>El acceso y/o uso de este portal de GRUPO OCLEM  atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.</p>',
                                                '<p>GRUPO OCLEM facilita a los Usuarios el acceso y la utilización de diversos servicios y contenidos puestos a disposición por GRUPO OCLEM o por terceros. Los servicios ofrecidos giran en torno a la información de concursos y licitaciones públicas que GRUPO OCLEM recoge y clasifica con el objeto de ofrecerla de una forma adaptada a las necesidades de cada Usuario.</p>',
                                                '<p>GRUPO OCLEM La información de concursos públicos se ofrece como referencia hacia la fuente válida que será siempre el Organismo adjudicador o cualquier otro medio de publicación de acceso libre. GRUPO OCLEM, no ofrece como suya ninguna información,  actúa como buscador de concursos y facilita a sus Usuarios el conocimiento y acceso a los concursos públicos.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-3" aria-expanded="false">',
                                                    '3. USO DEL PORTAL',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-3" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM desde web  www.oclem.com proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a GRUPO OCLEM  o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita. Como consecuencia de este registro, al USUARIO se le puede proporcionar una contraseña de la que será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma. El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios (como por ejemplo servicios de chat, foros de discusión o grupos de noticias) que Nombre de la empresa creadora del sitio web ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para (i) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; (ii) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos; provocar daños en los sistemas físicos y lógicos de GRUPO OCLEM, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados; (iv) intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes. GRUPO OCLEM se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En cualquier caso, GRUPO OCLEM no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u otras herramientas de participación.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-4" aria-expanded="false">',
                                                    '4. PROPIEDAD INTELECTUAL E INDUSTRIAL',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-4" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM  por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de Nombre de la empresa creadora del sitio web o bien de sus licenciantes. Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de GRUPO OCLEM. El USUARIO se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de GRUPO OCLEM. Podrá visualizar los elementos del portal e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. El USUARIO deberá abstenerse de suprimir, alterar, eludir o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera instalado en el las páginas de GRUPO OCLEM.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-5" aria-expanded="false">',
                                                    '5.- EXCLUSIÓN DE GARANTÍAS Y DE RESPONSABILIDAD',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-5" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM,  no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, GRUPO OCLEM no garantiza la veracidad, exactitud, exhaustividad y actualidad de los Contenidos. GRUPO OCLEM  no será responsable en ningún caso de los daños y perjuicios derivados de errores en la información suministrada, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-6" aria-expanded="false">',
                                                    '6.- PROTECCIÓN DE DATOS PERSONALES',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-6" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM cumple con las directrices de la Ley Orgánica 15/1999 de 13 de diciembre de Protección de Datos de Carácter Personal, el Real Decreto 1720/2007 de 21 de diciembre por el que se aprueba el Reglamento de desarrollo de la Ley Orgánica y demás normativa vigente en cada momento, y vela por garantizar un correcto uso y tratamiento de los datos personales del usuario. Para ello, junto a cada formulario de recabo de datos de carácter personal, en los servicios que el usuario pueda solicitar a GRUPO OCLEM , hará saber al usuario de la existencia y aceptación de las condiciones particulares del tratamiento de sus datos en cada caso, informándole de la responsabilidad del fichero creado, la dirección del responsable, la posibilidad de ejercer sus derechos de acceso, rectificación, cancelación u oposición, la finalidad del tratamiento y las comunicaciones de datos a terceros en su caso. Asimismo, GRUPO OCLEM  informa que da cumplimiento a la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y el Comercio Electrónico y le solicitará su consentimiento al tratamiento de su correo electrónico con fines comerciales en cada momento.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-7" aria-expanded="false">',
                                                    '7.- MODIFICACIÓN DE LAS PRESENTES CONDICIONES',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-7" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen. La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-8" aria-expanded="false">',
                                                    '8.- DERECHO DE EXCLUSIÓN',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-8" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM  se reserva el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-9" aria-expanded="false">',
                                                    '9.- DURACIÓN Y TERMINACIÓN',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-9" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>La prestación de los Servicios tendrá una duración de un año (1),  contándose desde la firma del presente acuerdo.  Llegado el termino del mismo, este se prorrogará tácitamente y de año en año salvo notificación fehaciente de cualquiera de las partes a la otra, de su voluntad inequívoca e incondicionada de no prorrogar el Contrato, siempre que dicha notificación sea recibida con una antelación mínima de UN MES  a la fecha de finalización del plazo inicial o de sus prórrogas, no obstante, está autorizada para dar por terminada o suspender la prestación de los Servicios en cualquier momento, sin perjuicio de lo que se hubiere dispuesto al respecto en las correspondientes Condiciones Particulares. Cuando ello sea razonablemente posible, GRUPO OCLEM advertirá previamente la terminación o suspensión de la prestación de los Servicios.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-10" aria-expanded="false">',
                                                    '10.- GENERALIDADES',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-10" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>GRUPO OCLEM perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-11" aria-expanded="false">',
                                                    '11.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN',
                                                '</a>',
                                            '</h4>',
                                        '</div>',
                                        '<div id="accordionTeal-11" class="collapse" role="tabpanel">',
                                            '<div class="panel-body">',
                                                '<p>La relación entre GRUPO OCLEM y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.</p>',
                                            '</div>',
                                        '</div>',

                                        '<div class="panel-heading" role="tab">',
                                            '<h4 class="panel-title">',
                                                '<a data-toggle="collapse" data-parent="#accordionTeal" href="#accordionTeal-12" aria-expanded="false">',
                                                    '12.- CONTRATO',
                                                '</a>',
                                            '</h4>',
                                        '</div>',

                                        '<section id="condiciones_contratacion"></section>',
                                    '</div>',

                                    '<form role="form" id="form_contratacion" class="mi_form form-horizontal">',   
                                        
                                        '<div class="sep50"></div>',
                                            
                                        Fx.form_input({
                                            label: '',
                                            id: 'iban',
                                            valor: '',
                                            tipo: 'text',
                                            placeholder: '',
                                            // clase: 'iban',
                                            min_char: '24',
                                            col_bs_label: 'col-sm-3',
                                            col_bs_input: 'col-sm-6',
                                            atributos: {
                                                'style': 'margin-bottom:0'
                                            }
                                        }),

                                        '<div id="resp_contratar" class="resp_detalle">',
                                            Fx.bs_alert('Si no dispone de un código de contratación, por favor llame al 91 499 49 96 o escríbanos a administracion@oclemconcursos.com.', 'info' ),
                                        '</div>',

                                        Fx.form_input({
                                            label: 'Código de contratación',
                                            id: 'cod_contratacion',
                                            valor: '',
                                            tipo: 'text',
                                            placeholder: '',
                                            // clase: 'iban',
                                            min_char: '24',
                                            col_bs_label: 'col-sm-3',
                                            col_bs_input: 'col-sm-6',
                                            atributos: {
                                                'style': 'margin-bottom:0'
                                            }
                                        }),

                                        '<div class="form-group partes_iban" >',
                                            '<label class="col-sm-3 control-label" for="iban" title="">IBAN</label>',
                                            '<div class="input-group col-sm-6">',
                                                '<input id="iban1" type="text" value="" maxlength="4"  size="4"  />',
                                                '<input id="iban2" type="text" value="" maxlength="4"  size="4"  />',
                                                '<input id="iban3" type="text" value="" maxlength="4"  size="4"  />',
                                                '<input id="iban4" type="text" value="" maxlength="2"  size="2"  />',
                                                '<input id="iban5" type="text" value="" maxlength="10" size="10" />',

                                            '</div>',
                                            
                                        '</div>',
                                        
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

                                        '<div class="form-group" >',
                                            '<label class="col-sm-3 control-label" for="" title="">&nbsp;</label>',
                                            '<div class="input-group col-sm-6">',
                                                '<button id="btn_contratar" class="btn bgm-green waves-effect"><i class="fa fa-pencil fa-lg"></i> &nbsp;Contratar</button>&nbsp;',
                                                '<a id="btn_descargar_contrato" target="_blank" download="Contratación de la Plataforma de Concurso Público del Grupo Oclem" href="#" class="btn-large btn bgm-blue waves-effect oculto"><i class="fa fa-download fa-lg"></i> &nbsp;Descargar contrato&nbsp;</a>&nbsp;',
                                            '</div>',
                                        '</div>',

                                        '<div id="resp_guardar_cliente" class="resp_detalle sep30"></div>',

                                    '</form>',

                                '</div>',

                            '</div>',
                            
                            '<div id="botones_ant_sig"  style="width:100%;clear:both;float:left">',
                                '<ul class="fw-footer pagination">',
                                    '<li class="previous first"><a class="a-prevent" href="#alta"><i class="md md-more-horiz"></i></a></li>',
                                    '<li class="previous"><a class="a-prevent" href="#alta"><i class="md md-chevron-left"></i></a></li>',
                                    '<li class="next"><a class="a-prevent" href="#alta"><i class="md md-chevron-right"></i></a></li>',
                                    '<li class="next last"><a class="a-prevent" href="#alta"><i class="md md-more-horiz"></i></a></li>',
                                '</ul>',
                            '</div>',

                        '</div>',

                    '</div>',
                '</form>',
            
        '</div>',
    '</div>'

    ].join('');

    return AltaClienteWebViewHtml;

});