define([
	
	'app/formulario',
	'funciones'

], function(Formulario, Fx){
	
	var Templates = {};

    Templates['clientes'] = [

        '<section class="wrapper">',
            
            '<section class="panel">',
                '<div class="panel-body">',
                    
                    '<div class="pull-right boton_anadir_cliente boton_anadir">',
                        '<a href="#clientes/0" id="anadir_cliente" class="btn btn-success">',
                            '<i class="fa fa-plus"></i> Añadir cliente',
                        '</a> ',
                        /*
                        '<a target="_blank" href="" id="excel_clientes" class="btn btn-info">',
                            '<i class="fa fa-download"></i> Exportar',
                        '</a>',
                        */
                        '<button id="refrescar_tabla_clientes" style="display:none">Refrescar</button>',
                    '</div>',

                    '<div class="row">',
                        '<div class="col-sm-12">', 
                            '<h3>Listado de Clientes</h3>',
                        '</div>',
                    '</div>',
                    '<br class="hidden-xs" />',
                    '<hr class="hidden-xs" />',
                    
                    '<div id="resp_listado_clientes" class="oculto"></div>',

                    '<div class="panel-body">',
                            
                            '<div class="botones_clientes btn-group">',
                                //'<button id="btn_activos" data-opcion="activos" class="selected btn btn-default waves-effect" type="button">Activos</button>',
                                '<button id="btn_demos"   data-opcion="demos"   class="btn btn-default waves-effect" type="button">Demo</button>',
                                '<button id="btn_pasados" data-opcion="pasados" class="btn btn-default waves-effect" type="button">Pasados</button>',
                                '<button id="btn_premium" data-opcion="premium" class="btn btn-default waves-effect" type="button">Premium</button>',
                                '<button id="btn_reducida" data-opcion="reducida" class="selected btn btn-default waves-effect" type="button">Reducida</button>',
                                '<button id="btn_clasificadas" data-opcion="clasificadas" class="btn btn-default waves-effect" type="button">Clasif.</button>',
                                '<button id="btn_mini" data-opcion="mini" class="btn btn-default waves-effect" type="button">Mini</button>',
                                '<button id="btn_todos"   data-opcion="todos"   class="btn btn-default waves-effect" type="button">Todos</button>',
                            '</div>',

                            '<div class="btn-group pull-right">',
                                '<a target="_blank href="#" id="btn_excel" class="btn btn-default waves-effect pull-right" type="button"><i class="fa fa-file-excel-o"></i> Excel</a>',
                            '</div>',
                            
                            '<div class="row">',
                                '<div class="col-sm-12">',
                                    '<br class="hidden-xs">',
                                    '<div class="sep"></div>',
                                    '<p id="mensaje_tabla_clientes"></p>',
                                    '<div id="resp_tabla_clientes"></div>',
                                '</div>',
                            '</div>',
                    
                    '</div>',

                '</div>',
            '</section>',
        '</section>'


    ].join('');
	

	return Templates;

});