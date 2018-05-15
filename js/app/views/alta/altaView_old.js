define([
    
    'jquery',
    'underscore',
    'backbone',
    'app/config',
    'app/templates',
    'app/oclem',
    'funciones',
    'app/formulario',
    'app/views/alta/html/altaHtml',
    'app/views/alta/html/demo01Html',
    'app/views/alta/html/con30Html',
    'app/views/alta/html/con120Html',
    'app/views/alta/html/con2000Html',
    'app/views/alta/html/con60Html',
    'app/views/alta/html/con6Html',
    'app/views/alta/html/con3Html',
    'app/views/alta/html/con50Html'
    
], function($, _, Backbone, Config, Templates, Oclem, Fx, Formulario, AltaClienteWebViewHtml, Demo01Html, Con30Html, Con120Html, Con2000Html, Con60Html, Con6Html, Con3Html, Con50Html){

    'use strict';

    var AltaClienteWebView = Backbone.View.extend({

        html: AltaClienteWebViewHtml['altaClienteWeb'],

        views: [],

        obj_actividades: {

            "A. MOVIMIENTO DE TIERRAS Y PERFORACIONES":["1. Desmontes y vaciados","2. Explanaciones","3. Canteras","4. Pozos y galerías","5. Túneles"],
            "B. PUENTES, VIADUCTOS Y GRANDES ESTRUCTURAS":["1. De fábrica u hormigón en masa","2. De hormigón armado","3. De hormigón pretensado","4. Metálicos"],
            "C. EDIFICACIONES":["1. Demoliciones","2. Estructuras de fábrica u hormigón","3. Estructuras metálicas","4. Albañilería, revocos y revestidos","5. Cantería y marmolería","6. Pavimentos, solados y alicatados","7. Aislamientos e impermeabilizaciones","8. Carpintería de madera","9. Carpintería metálica"],
            "D. FERROCARRILES":["1. Tendido de vías","2. Elevados sobre carril o cable","3. Señalizaciones y enclavamientos","4. Electrificación de ferrocarriles","5. Obras de ferrocarriles sin cualificación específica"],
            "E. HIDRÁULICAS":["1. Abastecimientos y saneamientos","2. Presas","3. Canales","4. Acequias y desagües","5. Defensas de márgenes y encauzamientos","6. Conducciones con tuberías de presión de gran diámetro","7. Obras hidráulicas sin cualificación específica"],
            "F. MARÍTIMAS":["1. Dragados","2. Escolleras","3. Con bloques de hormigón","4. Con cajones de hormigón armado","5. Con pilotes y tablestacas","6. Faros, radiofaros, y señalizaciones marítimas","7. Obras marítimas sin cualificación específica","8. Emisarios submarinos"],
            "G. VIALES Y PISTAS":["1. Autopistas, autovías","2. Pistas de aterrizaje","3. Con firmes de hormigón hidráulico","4. Con firmes de mezclas bituminosas","5. Señalizaciones y balizamientos viales","6. Obras viales sin cualificación específica"],
            "H. TRANSPORTES DE PRODUCTOS PETROLÍFEROS Y GASEOSOS":["1. Oleoductos","2. Gaseoductos"],
            "I. INSTALACIONES ELECTRICAS":["1. Alumbrados, iluminaciones y balizamientos luminosos","2. Centrales de producción de energía","3. Líneas eléctricas de transporte","4. Subestaciones","5. Centros de transformación y distribución en alta tensión","6. Distribución en baja tensión","7. Telecomunicaciones e instalaciones radioeléctricas","8. Instalaciones electrónicas","9. Instalaciones eléctricas sin cualificación específica"],
            "J. INSTALACIONES MECANICAS":["1. Elevadoras o transportadoras","2. De ventilación, calefacción y climatización","3. Frigoríficas","4. De fontanería y sanitarias","5. Instalaciones mecánicas sin cualificación específica"],
            "K. ESPECIALES":["1. Cimentaciones especiales","2. Sondeos, inyecciones y pilotajes","3. Tablestacados","4. Pinturas y metalizaciones","5. Ornamentaciones y decoraciones","6. Jardinería y plantaciones","7. Restauración de bienes inmuebles histórico-artísticos","8. Estaciones de tratamiento de aguas","9. Instalaciones contra incendios"],
            "L. SERVICIOS ADMINISTRATIVOS":["1. Servicios auxiliares para trabajos administrativos de archivo y similares","2. Servicios de gestión de cobros","3. Encuestas, toma de datos y servicios análogos","4. Lectura de contadores","5. Organización y promoción de congresos, ferias y exposiciones","6. Servicios de portería, control de accesos e información al público","7. Servicios a empresas: legislación, mercadotecnia, asesoría, selección de personal","8. Servicios administrativos, de seguridad y orden público"],
            "M. SERVICIOS ESPECIALIZADOS":["1. Higienización, desinfección, desinsectación y desratización","2. Servicios de seguridad, custodia y protección","3. Atención y manejo de instalaciones de seguridad","4. Artes gráficas","5. Servicios de bibliotecas, archivos y museos","6. Hostelería y servicios de comida","7. Prevención de incendios forestales","8. Servicios de protección de especies y medio ambiente"],
            "N. SERVICIOS CUALIFICADOS":["1. Actividades médicas y sanitarias","2. Inspección sanitaria de instalaciones","3. Servicios veterinarios para la salud","4. Servicios de esterilización de material sanitario","5. Restauración de obras de arte","6. Mantenimiento, conservación y restauración de materiales cinematográficos y audiovisuales","7. Servicios de arquitectura, ingeniería e inspección"],
            "O. SERVICIOS DE CONSERVACIÓN Y MANTENIMIENTO DE BIENES INMUEBLES":["1. Conservación y mantenimiento de edificios","2. Conservación y mantenimiento de carreteras, pistas, autopistas, autovías y calzadas","3. Conservación y mantenimiento de redes de agua y alcantarillado","4. Conservación y mantenimiento integral de estaciones depuradoras","5. Conservación y mantenimiento de mobiliario urbano","6. Conservación y mantenimiento de montes y jardines","7. Conservación y mantenimiento de monumentos y edificios singulares","8. Conservación y mantenimiento de electricidad y gas"],
            "P. SERVICIOS DE MANTENIMIENTO Y REPARACIÓN DE EQUIPOS E INSTALACIONES":["1. Mantenimiento y reparación de equipos e instalaciones eléctricas y electrónicas","2. Mantenimiento y reparación de equipos e instalaciones de fontanería, conducción de agua y gas","3. Mantenimiento y reparación de equipos e instalaciones de calefacción y aire acondicionado","4. Mantenimiento y reparación de equipos e instalaciones de electromedicina","5. Mantenimiento y reparación de equipos e instalaciones de seguridad y contra incendios","6. Mantenimiento y reparación de equipos y maquinaria de oficina","7. Mantenimiento y reparación de equipos e instalaciones de aparatos elevadores y de translación horiz."],
            "Q. SERVICIOS DE MANTENIMIENTO Y REPARACIÓN DE MAQUINARIA":["1. Mantenimiento y reparación de maquinaria","2. Mantenimiento y reparación de vehículos automotores, incluidos buques y aeronaves","3. Desmontajes de armamento y destrucción de munición","4. Desguaces","5. Instalaciones de maquinaria no determinada"],
            "R. SERVICIOS DE TRANSPORTES":["1. Transporte en general","2. Traslado de enfermos por cualquier medio de transporte","3. Transporte y custodia de fondos","4. Transporte de obras de arte","5. Recogida y transporte de toda clase de residuos","6. Servicios aéreos de fumigación, control, vigilancia aérea y extinción de incendios","7. Servicios de grúa y remolques","8.Remolques de buques","9. Servicios de mensajería, correspondencia y distribución","10. Servicios estacionamiento, repostaje y control de tráfico","11. Alquiler transporte"],
            "S. SERVICIOS DE TRATAMIENTOS DE RESIDUOS Y DESECHOS":["1. Tratamiento e incineración de residuos y desechos urbanos","2. Tratamiento de lodos","3. Tratamiento de residuos radiactivos y ácidos","4. Tratamiento de residuos de centros sanitarios y clínicas veterinarias","5. Tratamiento de residuos oleosos"],
            "T. SERVICIOS DE CONTENIDO":["1. Servicios de publicidad","2. Servicios de radio y televisión","3. Agencias de noticias","4. Realización de material audiovisual","5. Servicios de traductores e interpretes"],
            "U. SERVICIOS GENERALES":["1. Servicios de limpieza en general","2. Lavandería y tinte","3. Almacenaje","4. Agencias de viajes","5. Guarderías infantiles","6. Recogida de carros portaequipajes en estaciones y aeropuertos","7. Otros servicios no determinados","8. Servicio de contestación de llamadas telefónicas","9. Servicios inmobiliarios","10. Servicios culturales y deportivos","11. Servicios financieros y de seguros"],
            "V. SERVICIOS DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES":["1. Servicios de captura de información por medios electrónicos, informáticos y telemáticos","2. Servicios de desarrollo y mantenimiento de programas de ordenador","3. Servicios de mantenimiento y reparación de equipos e instalaciones informáticos y de telecomunicaci","4. Servicios de telecomunicaciones","5. Servicios de explotación y control de sistemas informáticos e infraestructuras telemáticas","6. Servicios de certificación electrónica","7. Servicios de evaluación y certificación tecnológica","8. Otros servicios informáticos o de telecomunicaciones"],
            "W. SERVICIOS DE FORMACIÓN":["1. Servicios de educación y formación profesional"],
            "Z. SUMINISTROS": ["1. Productos de la agricultura, ganadería, pesca, silvicultura y productos afines","2. Cereales, patatas, hortalizas, frutas y frutos de cáscara","3. Productos de la ganadería, la caza y la pesca","4. Madera","5. Derivados del petróleo, combustibles, electricidad y otras fuentes de energía","6. Productos de la minería, de metales de base y productos afines","7. Alimentos","8. Bebidas con alcohol","9. Bebidas sin alcohol","10. Tabaco, productos de tabaco y artículos afines","11. Maquinaria agrícola","12. Ropa laboral","13. Ropa de vestir","14. Ropa interior","15. Complementos de vestir","16. Joyas, relojes y artículos conexos","17. Calzado","18. Artículos de viaje, talabartería, sacos y bolsas","19. Piel y textiles, materiales de plástico y caucho","20. Impresos y productos relacionados","21. Productos químicos","22. Material de oficina (excepto mobiliario y equipos)","23. Máquinas y equipos de oficina","24. Máquinas, aparatos, equipo y productos consumibles eléctricos; iluminación","25. Material de iluminación y lámparas eléctricas","26. Material electrónico, electromecánico y electrotécnico","27. Equipos de radio, televisión, comunicaciones y telecomunicaciones y equipos conexos","28. Equipamiento médico","29. Material farmacéutico, médico y de higiene personal","30. Vehículos de motor","31. Señalización viaria, aérea y marítima y Dispositivos de protección","32. Equipos de seguridad y extinción de incendios","33. Equipos y material de policía y defensa","34. Instrumentos musicales","35. Artículos y material deportivo","36. Juegos, juguetes","37. Artículos para trabajos artesanales y artísticos","38. Equipo de laboratorio, óptico y de precisión (excepto gafas)","39. Instrumentos geológicos y geofísicos","40. Instrumentos de medición","41. Instrumentos de medida o control de características físicas","42. Aparatos de control y prueba","43. Instrumentos ópticos","44. Registradores de asistencia y contadores similares; parquímetros","45. Equipo de control de procesos industriales y equipo con mando a distancia","46. Instrumentos de evaluación o ensayo diversos","47. Mobiliario (incluido el de oficina)","48. Complementos de mobiliario","49. Equipo diverso","50. Equipo de catering","51. Equipo para red de distribución de gas","52. Artículos textiles para uso doméstico","53. Aparatos domésticos","54. Productos de limpieza y pulido","55. Agua recogida y depurada","56. Maquinaria industrial","57. Hornos e incineradores industriales o de laboratorio","58. Equipos de elevación y manipulación, y sus partes","59. Ascensores","60. Transportadores","61. Equipos de refrigeración y ventilación","62. Máquinas herramienta","63. Maquinaria para la fabricación de materias textiles, prendas de vestir y cuero","64. Maquinaria para la producción de papel o cartón","65. Máquinas diversas para usos generales y especiales","66. Maquinaria para la producción de papel, la impresión y la encuadernación, y sus partes","67. Maquinaria para la minería y la explotación de canteras y equipo de construcción","68. Maquinaria para el movimiento de tierras y la excavación, y sus partes","69. Maquinaria y equipo de construcción","70. Máquinas y aparatos para la fabricación de moldes de fundición y el tratamiento de minerales","71. Vehículos oruga","72. Maquinaria para la metalurgia y sus partes","73. Equipo de talleres","74. Estructuras y materiales de construcción; productos auxiliares para la construcción (excepto aparatos eléctricos)","75. Herramientas, cerraduras, llaves, bisagras, elementos de sujeción, cadenas y muelles","76. Radiadores y calderas para calefacción central, y sus partes","77. Pinturas, barnices y mástiques","78. Alquiler de maquinaria y equipo de construcción y de ingeniería civil con maquinista","79. Paquetes de software y sistemas de información"]
        },


        events: {
            
            // 'change #clasificaciones'                  : 'toggle_actividades',
            
            'click #botones_ant_sig ul.pagination li'  : 'determinar_posicion',
            
            // 'click ul.tab-nav li a'                    : 'check_btn_demo',

            'change #sel_todas'                        : 'sel_todas',

            // 'change #aceptar_condiciones'              : 'toggle_aceptar_condiciones',

            // 'click #btn_guardar_cliente'               : 'guardar_cliente',

            'click .tab-nav a'                         : 'check_iso',

            'click .tab-nav a.disabled'                : 'preventDefault',

            // 'click #btn_desplegar_contratar'           : 'desplegar_contratar',

            'change #aceptar_condiciones'              : 'toggle_aceptar_condiciones',          
            'keyup .partes_iban input'                 : 'actualizar_iban',
            'focusout .partes_iban input'              : 'actualizar_iban',

            'click #btn_contratar'                     : 'contratar',

            'change select.categoria'                  : 'activar_checkbox_recibir',

            'keyup #cod_contratacion'                  : 'cambiar_cod_contratacion',
            'click .panel_condiciones a'               : 'cambiar_cod_contratacion',

            

            // 'keyup .partes_iban input'                 : 'actualizar_iban',

            // 'blur #cod_promocional'                    : 'check_cod_promocional',

        },

        posicion: 1,
        

        preventDefault: function(e){
            e.preventDefault();
            return false;
        },

        check_iso: function(){

            var bool_iso = false;

            // Evitar que nos salte el aviso si está todo en blanco
            if( this.$('#nombre').val() == '' ){
                return true;
            }

            $.each( this.$('.normas_iso input[type="checkbox"]'), function(index, value){
                
                if( $(this).is(':checked') ){
                    bool_iso = true;
                }

            });

            if( bool_iso == false){
                alert('Debe seleccionar al menos una norma ISO.');
            }

            return bool_iso;

        },

        determinar_posicion: function(e){

            e.preventDefault();

            // this.check_btn_demo();

            if( this.check_iso() == false ){
                this.posicion = 1;
                return false;
            }

            var className = e.currentTarget.className,
                posicion = this.posicion;
            
            if( className.indexOf('previous') > -1 ){
                posicion--;
            }

            if( className.indexOf('next') > -1 ){
                posicion++;
            }

            if( className.indexOf('first') > -1 ){
                posicion = 1;
            }

            if( className.indexOf('last') > -1 ){
                posicion = 5;
            }

            if(posicion < 1){ posicion = 1;}
            if(posicion > 5){ posicion = 5;}            

            this.$('.tabs_alta_clientes li a[data-pos="' + posicion + '"]').trigger('click');
            
            this.posicion = posicion;

            this.establecer_hash();

        },

        establecer_hash: function(){
            window.location.hash = window.location.hash.split('/')[0] + '/' + this.posicion;
        },

        initialize: function(){

            Merca.cleanUp(this);
            
            Merca.limpiar_datos_sesion();
            
            this.$el.html(this.html);

            Formulario(this);

            $('#menu-trigger, ul.top-menu, #empresa').remove();

            $('#clasificaciones').selectpicker();

            this.$('#aceptar_condiciones').val(1).selectpicker('refresh');

        },

        render: function(){

            var arr_html_clasif          = [],
                arr_html_clasif_no_oficiales = [],
                cont_clasif              = 1,
                html_clasif_no_oficiales = '',
                html_provincias          = '',
                obras_servicios          = 0,
                division_cpv             = '',
                subgrupo                 = '',
                select_oculto            = '',
                esto                     = this;

            // clasificaciones oficiales
            arr_html_clasif[0] = '';
            arr_html_clasif[1] = '';
            arr_html_clasif[2] = '';

            // Establecer hash para que al pulsar atrás no se pierdan los datos
            window.setTimeout(function(){
                window.location.hash = '#alta/1';
            },100);
            

            // $('#btn_demo').hide();

            /*
            if ( window.location.hash.indexOf('/demo') > 3 ){
                this.$('#btn_guardar_cliente').show();
                this.$('#resp_desplegar_contratar').hide();
            }
            */

            $(window).bind('hashchange', function(){
                var posicion = window.location.hash.split('/')[1];
                this.$('.tabs_alta_clientes li a[data-pos="' + posicion + '"]').trigger('click');
            });

            var cont_item = 0;

            $.each( this.obj_actividades, function(letra, arr_valores){
                
                if(cont_clasif > 11){
                    obras_servicios = 1;
                }

                if(cont_clasif > 23){
                    obras_servicios = 2;
                }

                arr_html_clasif[obras_servicios] += '<h4><b>GRUPO: </b>' + letra + '</h4>';

                for (var i = 0; i < arr_valores.length; i++ ){


                    if( arr_valores[i].substr(1,1) == '.' ){
                        subgrupo = arr_valores[i].substr(0,1);  
                    }else{
                        subgrupo = arr_valores[i].substr(0,2);
                    }
                    
                    if( obras_servicios == 2){
                        select_oculto = 'oculto';
                    }else{
                        select_oculto = '';
                    }

                    arr_html_clasif[obras_servicios] += '<div class="linea_clasif">';
                    arr_html_clasif[obras_servicios] += '<span>' + arr_valores[i] + '</span>';

                    arr_html_clasif[obras_servicios] += '<div class="checkbox m-b-15 etiqueta_alta">';
                    arr_html_clasif[obras_servicios] += '<label>';
                    arr_html_clasif[obras_servicios] += '<input data-item="' + cont_item + '"  data-grupo="' + letra.substr(0,1) + '" data-subgrupo="' + subgrupo + '" class="check_recibir checkbox" type="checkbox">';
                    arr_html_clasif[obras_servicios] += '<i class="input-helper"></i>';
                    arr_html_clasif[obras_servicios] += 'Recibir';
                    arr_html_clasif[obras_servicios] += '</label>';
                    arr_html_clasif[obras_servicios] += '</div>';

                    arr_html_clasif[obras_servicios] += '<select data-item="' + cont_item + '" class="categoria pull-right ' + select_oculto + '" data-grupo="' + letra.substr(0,1) + '" data-subgrupo="' + arr_valores[i].substr(0,1) +'" >';
                    arr_html_clasif[obras_servicios] += '<option value="">Clasif. oficial</option>';
                    arr_html_clasif[obras_servicios] += '<option value="">- Sin clasific.</option>';
                    arr_html_clasif[obras_servicios] += '<option value="A">A</option>';
                    arr_html_clasif[obras_servicios] += '<option value="B">B</option>';
                    arr_html_clasif[obras_servicios] += '<option value="C">C</option>';
                    arr_html_clasif[obras_servicios] += '<option value="D">D</option>';

                    if( cont_clasif < 12) {
                        arr_html_clasif[obras_servicios] += '<option value="E">E</option>';
                        arr_html_clasif[obras_servicios] += '<option value="F">F</option>'; 
                    }
                        
                    arr_html_clasif[obras_servicios] += '</select>';

                    arr_html_clasif[obras_servicios] += '</div>';

                    cont_item++;

                }

                cont_clasif ++; 
                    
            });
    
            this.$('.tab_obras').html(arr_html_clasif[0]);
            this.$('.tab_servicios').html(arr_html_clasif[1]);
            this.$('.tab_suministros').html(arr_html_clasif[2]);


            // provincias
            $.each( Config.obj_provincias, function(index, value){

                if(value != ''){
                    html_provincias += '<div class="checkbox m-b-15 col-sm-3 col-lg-3">';
                    html_provincias += '<label>';
                    html_provincias += '<input checked="checked" type="checkbox" value="' + value + '">';
                    html_provincias += '<i class="input-helper"></i>';
                    html_provincias += value;
                    html_provincias += '</label>';
                    html_provincias += '</div>';
    
                }
                
            });

            this.$('#div_provincias').html( html_provincias );

            // this.$('a[href="#accordionTeal-1"]').trigger('click');

            this.$('div.partes_iban').hide();

            return this;
            
        },

        sel_todas: function(){

            var checked = this.$('#sel_todas').prop('checked') == true;
            
            $('#div_provincias input[type="checkbox"]').prop('checked', checked);

        },

        actualizar_obj_cliente: function(){
        
            var esto                                = this,
                cod                                 = '', // variable auxiliar
                num_checked                         = 0,
                num_provincias                      = 52, // número total de provincias
                arr_normas_iso                      = [],
                arr_cods_clasificaciones            = [],
                grupo                               = '',
                subgrupo                            = '',
                item                                = '',
                clasificacion                       = '',
                arr_lugares                         = [];

            this.obj_cliente = Oclem.actualizar_obj_form( this.$('#form_anadir_cliente_web') );

            this.obj_cliente.id_cliente = 0;


            // generar string de normas iso
            $.each( esto.$('.normas_iso input[type="checkbox"]'), function(index, value){
                
                if( $(this).is(':checked') ){
                    arr_normas_iso.push( $(this).val() );   
                }
                
            });

            this.obj_cliente.normas_iso = arr_normas_iso.join(',');


            // generar string de clasificaciones oficiales
            $.each( this.$('.check_recibir:checked'), function(index, value){

                grupo    = $(this).attr('data-grupo');
                subgrupo = $(this).attr('data-subgrupo');
                item     = $(this).attr('data-item');

                clasificacion = $('select.categoria[data-item="' + item + '"]').val();

                arr_cods_clasificaciones.push( grupo + subgrupo + clasificacion );

            });

            this.obj_cliente.cods_clasificaciones = arr_cods_clasificaciones.join(',');


            // generar string de areas geográficas
            $.each( this.$('#div_provincias input[type="checkbox"]'), function(index, value) {

                if( $(this).is(':checked') ){
                    
                    arr_lugares.push( $(this).val() );
                    num_checked ++;
                }


            });


            if( num_checked == num_provincias ){ // Seleccionarmos todas las provincias
                
                // si está seleccionado todo, dejar en blanco   
                arr_lugares = [];
                
            }


            this.obj_cliente.lugares = arr_lugares.join(',');

            // Datos si contratación
            if( this.comprobar_iban_condiciones() ){

                this.obj_cliente.iban = this.$('#iban').val().trim().toUpperCase();

            }


            this.obj_cliente.alta_web = true;

            return this.obj_cliente;

        },

        guardar_cliente: function(){
            

            // validaciones
            var str_error     = '',
                esto          = this,
                obj_cliente   = this.actualizar_obj_cliente(),
                targetObj     = esto.$('#resp_guardar_cliente');

            Oclem.spinner( this, '#resp_guardar_cliente');
            
            // comprobar ISO
            if( this.$( ".normas_iso input:checked" ).length == 0){
                str_error += 'Debe elegir una opción en normas ISO.';
            }

            // comprobación de campos obligatorios
            var arr_campos_oblig = ['nombre','apellido1','email','empresa','direccion','cp'];

            for( var i=0; i < arr_campos_oblig.length; i++ ){
                str_error += Fx.str_check_oblig( esto.$('#' + arr_campos_oblig[i] ).val(), 3, arr_campos_oblig[i]);
            }

            // Comprobar que hay al menos una actividad
            if( this.$('input.check_recibir:checked').length == 0 ){
                str_error += 'Debe seleccionar al menos una actividad<br>';
            }


            if( str_error != '' ){
                targetObj.html( Fx.bs_alert(str_error + 'El alta no se ha podido efectuar', 'danger' ) );
                return false;
            }

            if( Fx.validar_formulario( esto.$('#form_anadir_cliente_web') ) ){
                
                // generar string de normas ISO
                obj_cliente.cod_contratacion = esto.$('#cod_contratacion').val();

                // Guardar el cliente
                var resp = $.ajax({
                    
                    url: Config.base_ajax + 'clientes.php',
                    type: 'POST',
                    data: {
                        accion: 'guardar',
                        hash: 'alta_web',
                        obj_cliente: obj_cliente
                    }

                });

                resp.done(function(mi_json){

                    if(mi_json != ''){
                        
                        mi_json = $.parseJSON(mi_json);
                        
                        if(mi_json.status == 'ko'){

                            targetObj.html(Fx.bs_alert( mi_json.error, 'danger'));
                            
                        }else{

                            if( esto.comprobar_iban_condiciones() ){
                                var mensaje_alert = 'La contratación ha sido efectuada con éxito. <br>Se le ha enviado un email a su dirección de correo con sus claves de acceso.</br>Muchas gracias por trabajar con nosotros.';
                            }else{
                                var mensaje_alert = 'Los datos se guardaron con éxito. <br>Se le ha enviado un email a su dirección de correo con sus claves de acceso.</br>Muchas gracias por trabajar con nosotros.';
                            }
                            
                            targetObj.html(Fx.bs_alert( mensaje_alert, 'success'));

                        }
                    }

                });


            }else{

                // hay errores en el formulario
                targetObj.html( Fx.bs_alert('Existen errores en el formulario. Por favor revíselo.', 'danger') );

            }

        },


        toggle_aceptar_condiciones: function(){

            if( this.$('#aceptar_condiciones, #btn_contratar').val() == 0){
                
                this.$('div.partes_iban').hide();
                this.$('#btn_guardar_cliente').prop('disabled', true);
                
            }else{
                
                this.$('div.partes_iban, #btn_contratar').show();
                this.$('#btn_guardar_cliente').prop('disabled', false);
            
            }
            
        },

        actualizar_iban: function(e){

            e.preventDefault();

            var id = e.target.attributes.id.value;
            var iban = '';
            var num_input = parseInt( id.substr(  this.$('#' + id).val().length  , 1 ), 10 );


            if( id == 'iban4'){
                num_input = 4; // corrige error hiper extraño
            }

            if( parseInt(this.$('#' + id).val().length, 10) == parseInt( this.$('#' + id ).attr('maxlength'), 10) ){
                this.$('#iban' + ( num_input + 1) ).focus();
            }


            iban += this.$('#iban1').val() + ' ';
            iban += this.$('#iban2').val() + ' ';
            iban += this.$('#iban3').val() + ' ';
            iban += this.$('#iban4').val() + ' ';
            iban += this.$('#iban5').val() + ' ';

            this.$('#iban').val(iban);

            if( this.$('#iban').val().length > 27 ){
                this.$('#iban').trigger('blur');
            }
        
        },

        comprobar_iban_condiciones: function(){

            // comprueba si el iban es válido y si se han aceptado las condiciones
            
            var targetObj = this.$('#resp_contratar'),
                esto = this,
                str_error = '',
                iban = this.$('#iban').val();

            // comprobar aceptación de condiciones
            if( this.$('#aceptar_condiciones').val() == 0 ){
            
                str_error += 'Debe aceptar las condiciones.';
            
            }else{

                if( (!IBAN.isValid( iban ) ) && ( $('#cod_contratacion').val() != 'DEMO01') && ( $('#cod_contratacion').val() != 'CLASIF') ){
                    str_error += 'IBAN no válido.';
                }   
            }

            if( str_error != '' ){
                targetObj.html( Fx.bs_alert(str_error + ' La contratación no se ha podido efectuar.<br>Por favor, comprueba los datos aquí arriba y vuelva a hacer click en el botón contratar.', 'danger' ) );
                return false;
            }

            return true;

        },


        contratar: function(e){
            
            e.preventDefault();

            var cod_contratacion = this.$('#cod_contratacion').val();

            this.$('#resp_contratar').empty();

            if( (cod_contratacion != 'CLASIF') && (cod_contratacion != 'DEMO01') && (cod_contratacion != 'CON30') && (cod_contratacion != 'CON60') && (cod_contratacion != 'CON120') && (cod_contratacion != 'CON2000') && (cod_contratacion != 'CON6') && (cod_contratacion != 'CON3') && (cod_contratacion != 'CON50') ){

                this.$('#resp_contratar')
                    .empty()
                    .html( Fx.bs_alert('Por favor, introduzca un código de contratación válido.', 'danger' ) );
                
                return false;
            }

            if( this.comprobar_iban_condiciones() ){
                
                Fx.i('Iniciando la contratación');
                // this.$('#btn_guardar_cliente').trigger('click');

                this.guardar_cliente();

            }else{

                Fx.i('Falló la comprobación de IBAN y condiciones');
            
            }

        },

        activar_checkbox_recibir: function(e){

            e.preventDefault();
            var item = e.target.attributes['data-item'].value;
            
            this.$('input[data-item="' + item + '"]').prop('checked','checked');

        },

        cambiar_cod_contratacion: function(e){
            
            e.preventDefault();
            
            var cod_contratacion = this.$('#cod_contratacion').val(),
                html_contratacion = '',
                enlace_contratacion = '';

            this.$('div.partes_iban').hide();

            this.$('#btn_descargar_contrato')
                .attr('href','')
                .hide();

            this.$('#resp_contratar')
                    .empty()
                    .html( Fx.bs_alert('Si no dispone de un código de contratación, por favor llame al 91 499 49 96 o escríbanos a administracion@oclemconcursos.com.', 'info' ) );
            
            if( cod_contratacion == 'DEMO01'){

                html_contratacion = Demo01Html['demo01'];
                
            }

            if( cod_contratacion == 'CON30'){

                html_contratacion = Con30Html['con30'];
                enlace_contratacion = 'con30.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CON60'){

                html_contratacion = Con60Html['con60'];
                enlace_contratacion = 'con60.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CON120'){
                
                html_contratacion = Con120Html['con120'];
                enlace_contratacion = 'con120.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CON2000'){
                
                html_contratacion = Con2000Html['con2000'];
                enlace_contratacion = 'con2000.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CON6'){

                html_contratacion = Con6Html['con6'];
                enlace_contratacion = 'con6.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CON3'){

                html_contratacion = Con3Html['con3'];
                enlace_contratacion = 'con3.pdf';
                
                this.$('div.partes_iban').show();

            }

            if( cod_contratacion == 'CLASIF'){

                html_contratacion = '';
                
            }


            if( cod_contratacion == 'CON50'){

                html_contratacion = Con50Html['con50'];
                enlace_contratacion = 'con50.pdf';
                
                this.$('div.partes_iban').show();

            }


            if( cod_contratacion != '' && (cod_contratacion == 'DEMO01' || cod_contratacion == 'CON30' || cod_contratacion == 'CON60' || cod_contratacion == 'CON120' || cod_contratacion == 'CON2000' || cod_contratacion == 'CON6' || cod_contratacion == 'CON3' || cod_contratacion == 'CON50' ) ){

                this.$('#btn_descargar_contrato')
                    .attr('href', 'pdf/' + enlace_contratacion)
                    .show();
                
                this.$('#resp_contratar').empty();

            }else{

                // LAS CLASIFICADAS TAMBIÉN ENTRAN POR AQUÍ
                this.$('#btn_descargar_contrato')
                    .attr('href', '')
                    .hide();    
            }

            this.$('#condiciones_contratacion').html( html_contratacion );
            
        
        },


    });

    return AltaClienteWebView;

});