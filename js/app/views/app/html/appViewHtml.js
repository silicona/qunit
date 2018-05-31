define([

	'app/config',

], function( Config ){

	var AppViewHtml = {};

	AppViewHtml['vista_app'] = [

		'<main class="container-fluid">',

			'<div class="row">',

				'<header id="header" class="col-sm-12">',

					'<div class="div_logo">',
					
						'<a href="#inicio" title="Ir a Inicio" class="logo">',
							'<img src="media/logo.png" alt="Ir a Inicio de Departamente de Calidad, Grupo Oclem ">',
						'</a>',

						'<span class="nombre_app hidden-xs">',

							'Departamento de Calidad, Grupo Oclem.',

						'<span>',
					
					'</div>',

					'<ul class="menu_botones">',
						
						'<li  id="btn_usuario" class="dropdown">',

							'<a title="Desplegar opciones de usuario" data-toggle="dropdown"  href="" aria-expanded="false">',
								'<span class="icono_header"><i class="fa fa-user fa-3x"></i></span>',
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

				'</header>',

			'</div>',

			'<div class="row">',

				// '<aside class="lateral col-sm-2">',
				// 	'<ul class="lista_opciones">',
				// 		'<li>Opcion Uno - Admin</li>',
				// 		'<li>Opcion Dos - Tecnico</li>',
				// 		'<li>Opcion Tres - Cliente</li>',
				// 	'</ul>',
				// '</aside>',

				'<div id="vista_general" class="col-sm-12"></div>',

				// '<footer id="footer_login">',

		  //           '<h3>Footer</h3>',
		  //           '<a href="#politica">Política de privacidad</a>',

		  //       '</footer>', 

		        '<footer>',

		        	'<p>Grupo Oclem, Departamento de calidad</p>',

		        '</footer>',

			'</div>', // Fin de Row

		'</main>'

	].join('');

	return AppViewHtml;

});