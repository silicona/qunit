(function () {
    // Configure RequireJS so it resolves relative module paths from the `src`
	// folder.
    require.config({
        baseUrl: "../js",

        paths: { },

    });

	/*
	 * A list of all QUnit test Modules.  
	 *
	 * Make sure you include the `.js` extension so RequireJS resolves them as relative paths 
	 * rather than using the `baseUrl` value supplied above.
	*/
	var testModules = [
		"app/CalidadTest.js",
		"app/FuncionesTest.js",
		"vistas/appViewTest.js",
		"vistas/inicioViewTest.js",
		"vistas/lopdViewTest.js",
		/*"varios/AjaxTest.js",
		"varios/QunitTest.js",
		"varios/NullTest.js",
		"varios/RegStringTest.js",*/
	];
	
    // Resolve all testModules and then start the Test Runner.
	require(testModules, function(){

		// Listener de Qunit

			// runStart	: Indicates the beginning of a testsuite, triggered just once.
			// suiteStart	: Triggered at the start of each group of tests within a testsuite.
			// testStart	: Triggered at the start of each test.
			// testEnd		: Triggered at the end of each test.
			// suiteEnd	: Triggered at the end of each group of tests within a testsuite.
			// runEnd		: Indicates the end of a testsuite, triggered just once.

		//QUnit.on( 'testEnd', function( objeto ){	console.dir('Final de test', objeto ); });
		//QUnit.on( 'suiteEnd', function( objeto ){	console.dir('Final de Suite', objeto ); });

		QUnit.on( "runEnd", function( data ){
		 
			/*
				Estructura de data:
					- childSuites
					- fullname
					- name
					- runtime
					- status
					- testCounts
					- tests
			*/
			console.dir('Final de QUnit', data.testCounts);

		});

		// Log de QUnit en consola
		QUnit.log(function( details ) {

			/*
			 * Ejemplo de Log de test fallados en consola
			 * Aplica a todos los modulos cargados
			 *
			 * Estructura de details
			 *	- actual
			 *	- expected
			 *	- message
			 *	- module
			 *	- name
			 *	- negative
			 * 	- result
			 *	- runtime
			 *	- testId
			 *	- todo
			 *	- source - ¿No es propiedad de details?
			*/

			if ( details.result ) { // Salta los test con resultado true
			 	return;
			}

			var loc = details.module + ": " + details.name + ": ";

			output = "FAILED: " + loc + ( details.message ? details.message + ", " : "" );

			if ( details.actual ) {
				output += "expected: " + details.expected + ", actual: " + details.actual;
			}

			if ( details.source ) {
				output += ", fuente: " + details.source;
			}

			salida = {
				lugar     : loc,
				mensaje   : details.message  || 'Sin mensaje',
				res_previs: details.expected || 'No Aplica',
				res_actual: details.actual   || 'No Aplica',
				z_fuente  : details.source   || 'No Disponible',
			};

			//console.error( 'Test Incorrecto', output );
			console.dir( 'Test Incorrecto', salida );

		});

    	QUnit.load();
    	QUnit.start();

	});

}());