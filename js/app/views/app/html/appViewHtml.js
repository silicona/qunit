define([

	'app/config',

], function( Config ){

	var AppViewHtml = {};

	AppViewHtml['vista_app'] = [

	
			'<header id="header">',

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

			'<section id="main">',

				'<div id="content">',

					'<div id="vista_general" class="container"></div>',

				'</div>',

				// '<footer id="footer_login">',

		  //           '<h3>Footer</h3>',
		  //           '<a href="#politica">Política de privacidad</a>',

		  //       '</footer>', 

		        // '<footer>',

		        // 	'<p>Grupo Oclem, Departamento de calidad</p>',

		        // '</footer>',

			'</section>', // Fin de Row

		'</main>'

	].join('');

	return AppViewHtml;

});