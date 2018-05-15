define([
	
	'funciones',
    'app/formulario',
	'app/config'

], function(Fx, Formulario, Config){
	
	var Templates = {};

    /*
	Templates['app'] = [
        
        '<header id="empresa" class="hidden-xs hidden-sm hidden-md">',
            '<span class="empresa"></span>',
        '</header>',

		'<header id="header">',

            '<ul class="header-inner">',

                '<li class="logo hidden-xs">',
                    '<a href="#inicio" title="Ir a inicio" ><img src="img/logo.png"><span class="hidden-xs">Grupo Oclem. <br>Plataforma de Concursos</a>',
                '</li>',
                
                '<li id="menu_botones" class="pull-right">',
                '<ul class="top-menu">',

                    '<li id="btn_menu_concursos">',
                        '<a href="#concursos" title="Ver concursos">',
                            '<span class="icono_header"><i class="fa fa-institution fa-2x"></i>&nbsp;</span>',
                        '</a>',
                    '</li>',

                    '<li  id="btn_menu_baja" class="dropdown">',
                        '<a title="Desplegar panel de Baja Estadística" data-toggle="dropdown"  href="" aria-expanded="false">',
                            '<span class="icono_header"><i class="fa fa-bar-chart fa-2x"></i>&nbsp;</span>',
                            '<i class="tmn-counts num_baja">-</i>',
                        '</a>',

                        '<div class="dropdown-menu dropdown-menu-lg pull-right">',
                            '<div class="listview">',
                                '<div class="lv-header">',
                                    'Baja Estadística',
                                '</div>',
                                
                                '<div data-opcion="baja" class="notificaciones lv-body c-overflow" tabindex="1" style="overflow: hidden; outline: none;">',
                                    
                                '</div>',
                                '<p class="lv-footer">',
                                    '<a class="btn btn-success btn-xs" href="' + Config.base_url + '#soporte/baja"><i class="fa fa-table fa-lg"></i> Ver Bajas Estadísticas</a>',
                                    '&nbsp;<a id="btn_solicitar_baja_menu" class="btn btn-warning btn-xs" href=""><i class="fa fa-edit fa-lg"></i> Solicitar Baja Estadística</a>',
                                '</p>',
                                
                            '</div>',
                    
                    '</li>',

                    '<li id="btn_menu_tecnico" class="dropdown">',
                        '<a  title="Desplegar panel de Soporte Técnico" data-toggle="dropdown"  href="" aria-expanded="false">',
                            '<span class="icono_header"><i class="fa fa-desktop fa-2x"></i>&nbsp;</span>',
                            '<i class="tmn-counts num_tecnico">-</i>',
                        '</a>',

                        '<div class="dropdown-menu dropdown-menu-lg pull-right">',
                            '<div class="listview">',
                                '<div class="lv-header">',
                                    'Soporte Técnico',
                                '</div>',
                                '<div data-opcion="tecnico" class="notificaciones lv-body c-overflow" tabindex="1" style="overflow: hidden; outline: none;">',
                                    
                                '</div>',
                                '<p class="lv-footer">',
                                    '<a class="btn btn-success btn-xs" href="' + Config.base_url + '#soporte/tecnico"><i class="fa fa-table fa-lg"></i> Ir a Soporte Técnico</a>',
                                    '&nbsp;<a id="btn_solicitar_soporte_tecnico_menu" class="btn btn-warning btn-xs" href=""><i class="fa fa-edit fa-lg"></i> Solicitar Soporte Técnico</a>',
                                '</p>',
                            '</div>',
                    '</li>',

                    '<li id="btn_menu_administrativo" class="dropdown">',
                        '<a  title="Desplegar panel de Soporte Administrativo" data-toggle="dropdown"  href="" aria-expanded="false">',
                            '<span class="icono_header"><i class="fa fa-paperclip fa-2x"></i>&nbsp;</span>',
                            '<i class="tmn-counts num_administrativo">-</i>',
                        '</a>',

                        '<div class="dropdown-menu dropdown-menu-lg pull-right">',
                            '<div class="listview">',
                                '<div class="lv-header">',
                                    'Soporte Administrativo',
                                '</div>',
                                '<div data-opcion="administrativo" class="notificaciones lv-body c-overflow" tabindex="1" style="overflow: hidden; outline: none;">',
                                    
                                '</div>',
                                '<p class="lv-footer">',
                                    '<a class="btn btn-success btn-xs" href="' + Config.base_url + '#soporte/administrativo"><i class="fa fa-table fa-lg"></i> Ir a Soporte Administrativo</a>',
                                    '&nbsp;<a id="btn_solicitar_soporte_administrativo_menu" class="btn btn-warning btn-xs" href=""><i class="fa fa-edit fa-lg"></i> Solicitar Soporte Administrativo</a>',
                                '</p>',
                            '</div>',
                    '</li>',

                    '<li id="btn_menu_juridico" class="dropdown">',
                        '<a  title="Desplegar panel de Soporte Jurídico" data-toggle="dropdown"  href="" aria-expanded="false">',
                            '<span class="icono_header"><i class="fa fa-legal fa-2x"></i>&nbsp;</span>',
                            '<i class="tmn-counts num_juridico">-</i>',
                        '</a>',

                        '<div class="dropdown-menu dropdown-menu-lg pull-right">',
                            '<div class="listview">',
                                '<div class="lv-header">',
                                    'Soporte Jurídico',
                                '</div>',
                                '<div data-opcion="juridico" class="notificaciones lv-body c-overflow" tabindex="1" style="overflow: hidden; outline: none;">',
                                    
                                '</div>',
                                '<p class="lv-footer">',
                                    '<a class="btn btn-success btn-xs" href="' + Config.base_url + '#soporte/juridico"><i class="fa fa-table fa-lg"></i> Ir a Soporte Jurídico</a>',
                                    '&nbsp;<a id="btn_solicitar_soporte_juridico_menu" class="btn btn-warning btn-xs" href=""><i class="fa fa-edit fa-lg"></i> Solicitar Soporte Jurídico</a>',
                                '</p>',
                            '</div>',
                    '</li>',

                    '<li id="btn_menu_adjudicaciones">',
                        '<a title="Ver bajas solicitadas" id="menu_adjudicaciones" href="#adjudicaciones">',
                            '<span class="icono_header"><i class="fa fa-trophy fa-2x"></i></span>',
                            '<i class="tmn-counts num_adjudicaciones">-</i>',
                        '</a>',
                    '</li>',

                    '<li id="btn_menu_clientes">',
                        '<a title="Ver mis datos" id="menu_clientes" href="#clientes">',
                            '<span class="icono_header"><i class="fa fa-users fa-2x"></i></span>',
                        '</a>',
                    '</li>',

                    '<li id="btn_salir">',
                        '<a title="Salir" id="" href="" class="boton_salir">',
                            '<span class="icono_header"><i class="fa fa-power-off fa-2x" >&nbsp;</i></span>',
                        '</a>',
                    '</li>',

                    '</ul>',
                '</li>',
            '</ul>',
            
            // '<a style="" id="btn_demo" class="pull-right"><i class="fa fa-user fa-2x"></i></a>',

        '</header>',
        

        '<section id="main">',
            
            '<section id="content">',
                '<div class="container" id="contenido_seccion"></div>',
                '<div class="container" id="contenido_detalle"></div>',
            '</section>',
            
        '</section>'
	].join('');
    */
    
    Templates['datatables'] = [
        
        '{{ #botones_export }}',
        '<div class="btn-group botones_tabla">',
            '<a class="imprimir_tabla btn btn-default btn-xs" >Imprimir</a>',
            '<a class="pdf_tabla btn btn-default btn-xs" >Crear PDF</a>',
            '<a class="email_tabla btn btn-default btn-xs" >Enviar por email</a>',
            '<a class="excel_tabla btn btn-default btn-xs" >Exportar a Excel</a>',
        '</div>',
        '{{ /botones_export }}',
        '<div class="display responsive no-wrap tabla_datatables dataTables">',
            '<table id="{{ myclass }}{{ timestring }}" class="display table table-bordered table-striped datatables dataTables {{ myclass }}" >',
              '<thead>',
                '{{{ thead_tabla }}}',
              '</thead>',
              '<tbody>',
                '{{{ tbody_tabla }}}',
              '</tbody>',
            '</table>',
        '</div>'

    ].join('');


    Templates['modal'] = [
        '<div id="mi-modal" class="modal fade">',
          '<div class="modal-dialog modal-lg">',
            '<div class="modal-content">',
              '<div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                '<h4 class="modal-title">{{ title }}</h4>',
              '</div>',
              '<div class="modal-body">',
                '{{ modal-content }}',
              '</div>',
              '<div class="modal-footer">',
                '<button type="button" class="btn btn-danger" data-dismiss="modal">{{ texto_cerrar }}</button>',
                '{{ modal-botones }}',
              '</div>',
            '</div>',
          '</div>',
        '</div>'

    ].join('');

    
    Templates['spinner'] = [
                '<section class="wrapper">',
                '<div class="spinner">',
                    '<div class="bounce1"></div>',
                    '<div class="bounce2"></div>',
                    '<div class="bounce3"></div>',
                '</div>',
                '</section>'
    ].join('');

    Templates['archivo'] = function(data){
        
        var html = [
          '<div class="col-sm-12 archivo_descarga" data-nombre_archivo="{{nombre_archivo}}">',
            '<div class="thumbnail">',
              '<i class="fa fa-file-archive-o fa-4x icono_descarga"></i>',
              '<div class="caption">',
                '<h4>{{nombre_corto_archivo}}</h4>',
                '<p class="botones_descarga">',
                    '<a href="{{enlace_archivo}}" target="_blank" class="descargar_archivo btn btn-primary" role="button"><i class="fa fa-download"></i> Descargar</a>',
                    '<a href="#" data-nombre_archivo="{{nombre_archivo}}" class="eliminar_archivo btn btn-danger" role="button"><i class="fa fa-trash-o"></i> Eliminar</a>',
                '</p>',
              '</div>',
            '</div>',
          '</div>'
        
        ].join('');

        return html;

    };

    Templates['notificacion'] = function(data){
        
        var html = [
            '<a class="lv-item" href="#soporte/{{opcion}}/{{id_soporte}}">',
                '<div class="media">',
                    '<div class="pull-left">',
                        '<i class="fa fa-{{icono}} fa-2x">&nbsp;</i>',
                    '</div>',
                    '<div class="media-body">',
                        '<div class="lv-title">{{f_soporte}}</div>',
                        '<small class="lv-small">{{expediente}}</small>',
                    '</div>',
                '</div>',
            '</a>'
        ].join('');

        return html;

    };


	//Templates['noEncontrado'] = '<br><br><br><br><br><br><br><br>404. Sección no encontrada';
	

	return Templates;

});