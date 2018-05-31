define([

], function(){
	
	var InicioViewHtml = {};

	InicioViewHtml['inicio'] = [

	    '<div class="row">',

            '<div class="col-sm-12">',
                '<div class="titulo">',
                    '<p class="lead"><br>Bienvenido a la Plataforma del departamento de Calidad del Grupo Oclem</p>',
                '</div>',
            '</div>',

        '</div>',

		'<div class="row botones_inicio">',

			'<div class="col-sm-3" id="boton_lopd">',
				'<div class="boton_inicio">',
					'<a href="#lopd" title="Accede al cuestionario de la LOPD">',
						'<i class="fa fa-university fa-4x"></i>',
						'<span>LOPD</span>',
					'</a>',
				'</div>',
			'</div>',

			'<div class="col-sm-3" id="boton_soporte">',
				'<div class="boton_inicio">',
					'<a href="#soporte" title="Consulta a OclemCalidad">',
						'<i class="fa fa-desktop fa-4x"></i>',
						'<span>Soporte</span>',
					'</a>',	
				'</div>',
			'</div>',
			/*
			'<div class="col-sm-3" id="boton_cliente">',
				'<a href="#clientes/misdatos" class="boton_inicio" title="Ver los datos de tu empresa">',
					'<i class="fa fa-user fa-4x"></i>',
					'<span>Mis datos de empresa</span>',
				'</a>',
			'</div>',
			

			'<div class="col-sm-3" id="boton_perfil">',
				'<a href="#usuarios/perfil" class="boton_inicio" title="Ver tu perfil">',
					'<i class="fa fa-user fa-4x"></i>',
					'<span>Tu perfil</span>',
				'</a>',
			'</div>',

			'<div class="col-sm-3" id="boton_misusuarios">',
				'<a href="#usuarios/misusuarios" class="boton_inicio" title="Ver tus usuarios">',
					'<i class="fa fa-users fa-4x"></i>',
					'<span>Tus usuarios</span>',
				'</a>',
			'</div>',

			'<div class="col-sm-3" id="boton_test">',
				'<a href="#test" class="boton_inicio" title="Acceder a los tests">',
					'<i class="fa fa-institution fa-4x"></i>',
					'<span>Test de Backbone</span>',
				'</a>',
			'</div>',

			'<div class="col-sm-3" id="mercamadrid">',
				'<a href="http://mercamadrid.com" class="boton_inicio" title="Acceder a la web de MercaMadrid">',
					'<i class="fa fa-institution fa-4x"></i>',
					'<span>Web de MercaMadrid</span>',
				'</a>',
			'</div>',
			*/

		'</div>',

	].join('');

	return InicioViewHtml;

});