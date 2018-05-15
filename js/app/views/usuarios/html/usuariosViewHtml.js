define([
	
	'app/formulario',
	'funciones'

], function(Formulario, Fx){
	
	var Templates = {};

    Templates['usuarios'] = [

        '<section class="wrapper">',
            
            '<section class="panel">',
                '<div class="panel-body">',
                    
                    '<div class="btn-group pull-right boton_anadir_usuario boton_anadir">',
                        '<a href="#" id="anadir_usuario" class="btn btn-success">',
                            '<i class="fa fa-plus"></i> Añadir un usuario',
                        '</a>',
                        '<button id="refrescar_tabla_usuarios" style="display:none">Refrescar</button>',
                    '</div>',

                    '<div class="row">',
                        '<div class="col-sm-12">', 
                            '<h3 id="titulo_seccion">Lista de Usuarios</h3>',
                        '</div>',
                    '</div>',
                    '<br class="hidden-xs" />',
                    '<hr class="hidden-xs" />',
                    
                    '<div id="resp_listado_usuarios" class="oculto"></div>',

                    '<div class="panel-body">',
                            
                            '<div class="botones_usuarios btn-group">',
                                '<button id="btn_empleados" data-opcion="empleados" class="selected btn btn-default waves-effect" type="button">Empleados</button>',
                                '<button id="btn_clientes"  data-opcion="clientes"  class="btn btn-default waves-effect" type="button">Clientes</button>',
                            '</div>',
                            
                            '<div class="row">',
                                '<div class="col-sm-12">',
                                    '<br class="hidden-xs">',
                                    '<div class="sep"></div>',
                                    '<div id="resp_tabla_usuarios"></div>',
                                '</div>',
                            '</div>',
                    
                    '</div>',

                '</div>',
            '</section>',
        '</section>'


    ].join('');
	

	return Templates;

});