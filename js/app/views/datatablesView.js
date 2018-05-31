define([
	
	'jquery',
	'underscore',
	'backbone',
	'app/config',
	'funciones',
	'app/formulario',
	'app/calidad',
	'datatables',
	'datatables-responsive',
	'app/views/datatablesViewHtml'

], function($, _, Backbone, Config, Fx, Formulario, Calidad, Datatables, DatatablesResponsive, DatatablesViewHtml){

	'use strict';

	var DatatablesView = Backbone.View.extend({

		events: {

			'click #select_all'   : 'seleccionar_todas'
		
		},

		initialize: function(options){

			this.addPlugins();
			
			var target = 'table.datatables';

			var esto 		= this,
				obj_init    = {},
				oTable      = {},

				appendTo    = this.options.appendTo     || 'body',
				thead_tabla = this.options.thead_tabla  || '',
				tbody_tabla = this.options.tbody_tabla  || '',
				
				data        = this.options.data         || {},
				columns     = this.options.columns      || [],
				order       = this.options.order        || '',
				createdRow	= this.options.createdRow 	|| false,
				rowCallback = this.options.createdRow 	|| false;

			Calidad.cleanUp( this );
			Calidad.spinner( this, target);
			
			
			// CARGA DEL HTML
			this.$(appendTo).html( DatatablesViewHtml );

			if( $.isEmptyObject( data ) || data === undefined || data === '' || !data ){
                
                this.$('div.dataTables').html( Oclem.bs_alert( 'No se encontraron datos', 'warning') );
                return true;

            }


            // INICIALIZACIÓN
			obj_init = {

		        responsive: true,
	
	            
				sPaginationType: "full_numbers",
				
				oLanguage: {
					"sProcessing":     "Procesando...",
					"sLengthMenu":     "Mostrar _MENU_ registros",
					"sZeroRecords":    "No se encontraron resultados",
					"sEmptyTable":     "Ningún dato disponible en esta tabla",
					"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
					"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
					"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
					"sInfoPostFix":    "",
					"sSearch":         "",
					"sUrl":            "",
					"sInfoThousands":  ",",
					"sLoadingRecords": "Cargando...",
					"oPaginate": {
						"sFirst":    "<<",
						"sLast":     ">>",
						"sNext":     ">",
						"sPrevious": "<"
					},
					"oAria": {
						"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
						"sSortDescending": ": Activar para ordenar la columna de manera descendente"
					}
				},			
	            
	            bDestroy: true
		    
		    };

		    if( order !== '' && order !== undefined ){
		    	obj_init.order = order;
		    }

		    if( columns.length > 0){
		    	
		    	obj_init.data = data;
		    	obj_init.columns = columns;

		    	obj_init.deferRender = true;

		    	thead_tabla = '';
		    	tbody_tabla = '';

			}

			obj_init.createdRow = this.options.createdRow;
			obj_init.rowCallback = this.options.rowCallback;


			// Añadir evento de seleccionar todas
		    obj_init.initComplete = function(){

		    	var select_all = esto.$('#select_all');

		    	if( select_all.length == 1 ){

		    		select_all.on('click', function(e){

			    		esto.seleccionar_todas(e);

			    	});	
		    	}

		    };
			
			oTable = this.$( target ).DataTable( obj_init );
			
			if( columns.length === 0 ){
				this.$('table thead').html( thead_tabla );
				this.$('table tbody').html( tbody_tabla );
			}

			this.id = 'datatables-view' + Fx.hoy_timestamp();
			this.$('div.dataTables table').attr('id', this.id );

		    
			// AJUSTES DE VISUALIZACIÓN
		    // Cambiar texto "All" por Todos
		    this.$('option[value="-1"]').text( 'todos' );

		    this.$('select').selectpicker();

		    this.$('.dataTables_filter input')
		    	.addClass('form-control input-sm')
		    	.attr('placeholder', 'buscar...');

		    this.$('a[data-toggle="tooltip"], button[data-toggle="tooltip"]').tooltip();

		    this.$('table').css('width','100%');

		    Calidad.quitar_spinner();

		},

		render: function(){

			return this;

		},

		addPlugins: function(){
			
			$.extend( $.fn.dataTableExt.oSort, {
			
			    "numeric-comma-pre": function ( a ) {

			        a = a.replace('€','');
			        a = a.replace( '.', '' );
			        a = a.replace( '.', '' );

			        var x = (a == "-") ? 0 : a.replace( /,/, "." );
			        return parseFloat( x );
			    },
			 
			    "numeric-comma-asc": function ( a, b ) {

			        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			    },
			 
			    "numeric-comma-desc": function ( a, b ) {
			        
			        a = a.replace('€','');

			        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
			    }
			} );

		}, // fin addPlugins


		seleccionar_todas: function(e){
			
			// e.preventDefault(); // Ojo, no poner, si no la casilla no se marca.
			e.stopPropagation(); // Para impedir que se ordenen por seleccionado / no seleccinoado

			this.$('tbody .checkbox').trigger('click');

		},


	});

	return DatatablesView;

});