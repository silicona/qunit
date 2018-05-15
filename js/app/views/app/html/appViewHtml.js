define([

	'app/config',

], function( Config ){

	var AppViewHtml = {};

	AppViewHtml['vista_app'] = [
		'<main class="container-fluid">',

			'<div class="row">',

				'<header class="superior col-sm-12">',

					'<ul class="barra_superior">',
						
						'<li class="menu_botones pull-right">',

							'<ul class="top-menu">',

								'<li  id="btn_usuario" class="dropdown">',
									'<a title="Desplegar opciones de usuario" data-toggle="dropdown"  href="" aria-expanded="false">',
										'<span class="icono_header"><i class="fa fa-user fa-3x"></i>&nbsp;</span>',
									'</a>',

									'<div class="dropdown-menu dropdown-menu-lg pull-right">',
										'<a href="#usuarios/perfil" title="Accede a tu perfil">Ver Perfil</a>',
										'<br>',
										'<a href="promociones" title="Promociones de Oclem Mercamadrid">Promociones (wip)</a>',            
									'</div>',

								'</li>',

								'<li id="btn_salir">',
									'<a title="Cerrar sesión" href="" class="boton_salir">',
									'<span class="icono_header"><i class="fa fa-power-off fa-3x" >&nbsp;</i></span>',
									'</a>',
								'</li>',

							'</ul>',

						'<li>',

					'</ul>',

				'</header>',
			'</div>',	// Fin de Row header

			'<div class="row">',

				'<aside class="lateral col-sm-2">',
				
					'<div class="logo">',
							'<a href="#inicio" title="Ir a la Landing">',
								'<img src="media/logo.png" alt="Ir a Inicio de Oclem Mercadona">',
							'</a>',
					'</div>',

					'<ul class="lista_opciones">',
						'<li>Opcion Uno - Admin</li>',
						'<li>Opcion Dos - Tecnico</li>',
						'<li>Opcion Tres - Cliente</li>',
					'</ul>',
				'</aside>',

				'<div id="vista_general" class="col-md-10"></div>',
				//'<div id="vista_general" class="col-md-10"><b>VISTA GENERAL VACÍA</b></div>',

			'</div>', // Fin de Row

		'</main>'

	].join('');

	return AppViewHtml;

});