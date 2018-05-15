define([
	
	'app/formulario',
	'funciones'

], function(Formulario, Fx){
	
	var Templates = {};

    Templates['soportes'] = [

        '<section class="wrapper">',
            
            '<section class="panel">',
                '<div class="panel-body">',
                    
                    '<div class="btn-group pull-right boton_anadir_soporte boton_anadir">',
                        /*
                        '<a href="#soporte/0" id="anadir_soporte" class="btn btn-success">',
                            '<i class="fa fa-plus"></i> Solicitar soporte',
                        '</a>',
                        */
                        
                        '<button id="refrescar_tabla_soportes" style="display:none">Refrescar</button>',
                    '</div>',

                    '<div class="row">',
                        '<div class="col-sm-12">', 
                            '<h3 id="titulo_seccion">Lista de Solicitudes de soporte</h3>',
                        '</div>',
                    '</div>',
                    '<br class="hidden-xs" />',
                    '<hr class="hidden-xs" />',
                    
                    '<div id="resp_listado_soportes" class="oculto"></div>',

                    '<div class="panel-body">',
                                
                            '<div class="row">',
                                '<div class="col-sm-12">',
                                    '<br class="hidden-xs">',
                                    '<div class="sep"></div>',
                                    '<div id="resp_tabla_soportes"></div>',
                                '</div>',
                            '</div>',
                    
                    '</div>',

                '</div>',
            '</section>',
        '</section>'


    ].join('');
	

	return Templates;

});