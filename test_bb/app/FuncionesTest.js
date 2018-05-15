define([

	'funciones',

], function(Fx){
	
	const { test } = QUnit;
	QUnit.module('Modulo de funciones', hooks => {

		hooks.before( t => {

			console.log('T',t);
			console.log('This', this);

		});

		hooks.beforeEach( t => {
			//t.notOk( false, 'Todo bien antes' );
			this.evento_test = {
				target: {
					innerHTML: '<b>innerHTML de prueba</b>',
				},

				currentTarget: {
					className: 'clase_test',
				},
			};

			this.evento_invalido_test = [];
			this.evento_invalido_test.target = [];
			this.evento_invalido_test.target.innerHTML = '<b>innerHTML de prueba</b>';
			
			this.evento_invalido_test.currentTarget = [];
			this.evento_invalido_test.currentTarget.className = 'clase_test';

		});

		test('test_devuelve_innerHtml', t => {

			arr_ejemplos = [
				this.evento_test,
				this.evento_invalido_test,
			];

			for( var indice in arr_ejemplos ){

				var e = arr_ejemplos[indice];
				var salida_sin_valor = false;

				// coge el evento y devuelve el innerHtml
				if( typeof e != 'object' ){
					//return '';
					salida_sin_valor = true;
				}

				//return e.target.innerHTML;
				if( salida_sin_valor ){
					
					t.notOk(typeof e != 'object', 'La prueba no es un objeto');
					t.strictEqual( '', Fx.devuelve_innerHtml(e), 'La función devuelve string Sin valor si el evento no es un objeto');

				} else {

					var resultado = e.target.innerHTML;
					t.equal('<b>innerHTML de prueba</b>', resultado, 'Devuelve el html del objeto de prueba');
					t.strictEqual( resultado, Fx.devuelve_innerHtml(e), 'La función devuelve el html del objeto de prueba');	
				}

			}


		});

		test('test_devuelve_clase', t => {

			var arr_ejemplos = [
				this.evento_test,
				this.evento_invalido_test,
			];

			for( var indice in arr_ejemplos ){

				var e = arr_ejemplos[indice];
				var salida_sin_valor = false;


				// coge el evento y devuelve la clase
				if( typeof e != 'object' ){
					//return '';
					t.ok(typeof e != 'object', 'La prueba no es un objeto');
					salida_sin_valor = true;
				}

				//return e.currentTarget.className;
				if( salida_sin_valor ){

					t.strictEqual( '', Fx.devuelve_clase(e), 'La función devuelve string Sin valor si el evento no es un objeto');
				
				} else {			

					var resultado = e.currentTarget.className;
					t.equal('clase_test', resultado, 'Devuelve la clase del objeto de prueba');
					t.strictEqual( resultado, Fx.devuelve_clase(e), 'La función devuelve la clase del objeto de prueba');
				}

			}

		});

		test('test_is_numeric', t => {

			var arr_ejemplos = [ 1, 5, '7', -3, 'hola', '2018-03-03'];

			for( var indice in arr_ejemplos ){

				var n = arr_ejemplos[indice];

		      	//return !isNaN(parseFloat(n)) && isFinite(n);
		      	var resultado = !isNaN(parseFloat(n)) && isFinite(n);

		      	if( resultado ){

			      	t.ok( resultado, 'Devuelve true con ' + n );
			      	t.strictEqual( resultado, Fx.is_numeric(n), 'La función devuelve true con ' + n );

			    } else {

			      	t.notOk( resultado, 'Devuelve false con ' + n );
			      	t.strictEqual( resultado, Fx.is_numeric(n), 'La función devuelve false con ' + n );

			    }

			}


	    });

	    test('test_is_integer', t => {

	    	var arr_ejemplos = [null, undefined, '', -23, '23', 'hola', '12dd', '06', '-23', '-3de'];

	    	for( var indice in arr_ejemplos ){

	    		var val = arr_ejemplos[indice];
	    		var salida_false = false;

		    	if( val == null ){ 
		    		//return false;
		    		t.notOk( val, 'Devuelve false con ' + val);
		    		continue;
		    	}

		    	if (val.length == 0){ 
		    		//return false;
		    		t.notOk( val, 'Devuelve false con ' + val);
		    		continue;
		    	}

		    	for (var i = 0; i < val.length; i++){

		    		var ch = val.charAt(i);
		    		if (i == 0 && ch == "-"){
		    			t.ok( true, 'Detectado - al inicio en ' + val );
		    			continue; // Este continue está en la función

		    		}

		    		if (ch < "0" || ch > "9"){
		    			//return false;
						t.ok( ch < "0" || ch > "9", 'Devuelve false con ' + val + ' debido al ch: ' + ch );
		    			salida_false = true;
		    			break;
		    		}
		    	}

		    	//return true;
		    	if( salida_false ){

		    		t.notOk( Fx.is_integer(val), 'La función devuelve False con ' + val );

		    	} else {
		    	
		    		t.ok( Fx.is_integer(val), 'La funcion devuelve true con ' + val );	
		    	}

		    }

	    });

	    test('test_str_check_oblig', t => {

	    	var no_definida;
	    	var arr_ejemplos = [
	    		['Carabela', 5, 'nombre'], 	// Correcto
	    		//[no_definida, 5, 'apellido'],	// Incorrecto
	    		['Meco', 5, 'apellido'],	// Incorrecto
	    	];

	    	for( var indice in arr_ejemplos ){

	    		ejemplo = arr_ejemplos[indice];
	    		var salida_return = false;
	    		var resultado = '';

				var string_check = ejemplo[0],
					min_chars    = ejemplo[1],
					nombre_elem  = ejemplo[2];
		    	//nction(string_check, min_chars, nombre_elem){

				if( typeof (string_check) == 'undefined' ){
					//return '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
					resultado = '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
					salida_return = true;
				}

				// devuelve vacío si se cumple, texto si no,
				if( string_check.length < min_chars){
					//return '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
					resultado = '(*) Dato incorrecto: ' + nombre_elem + '.<br>';
					salida_return = true;
				}

				//return '';
				if( salida_return ){

					t.equal( '(*) Dato incorrecto: ' + nombre_elem + '.<br>', resultado, 'Devuelve mensaje de error previsto con ' + ejemplo.join(', ') );
					t.strictEqual( resultado, Fx.str_check_oblig(string_check, min_chars, nombre_elem), 'La función devuelve mensaje de error previsto con ' + ejemplo.join(', ') );

				} else {
					
					t.notOk( resultado, 'Devuelve String Sin valor con ' + ejemplo.join(', ') );
					t.strictEqual( resultado, Fx.str_check_oblig(string_check, min_chars, nombre_elem), 'La función devuelve String Sin valor con ' + ejemplo.join(', ') );
				}

	    	}
				
		});
/*
		separar_comas: function(string){

			// convierte una cadena tipo aaa,bbb,ccc en aaa, bbb, ccc

			string = this.limpia_undefined(string);

			if (typeof string == 'string') {
				return string.replace(/,/gi, ', ');	
			}

			return '';
			

		},

		string_a_obj: function(string, separador){

			if(string == ''){
				return {};
			}

			// convierte una cadena tipo aaa, bbb, cccc en {0: 'aaa', 1: 'bbb', 2: 'ccc'}
			var separador = separador || ',',
				arr_aux = string.trim().split(separador),
				obj_aux = {};

			$.each(arr_aux, function(index, value){
				obj_aux[index] = value;
			});

			return obj_aux;

		},

		obj_a_select: function(id_select, obj, atributos){

			// devuelve un select con los valores del objeto
			
			var str_html = '';
			var atributos = atributos || '';

			$.each(obj, function (index, value) {
				
				str_html += '<option value="' + index + '">' + value.trim() + '</option>';

			});

			return '<select id="' + id_select + '" ' + atributos + '>' + str_html + '</select>';

		},

		arr_a_select: function(id_select, array){

			var str_html = '';

			$.each(array, function(index, value){
				str_html += '<option value="' + index + '">' + value.trim() + '</option>';
			});

			return '<select id="' + id_select + '">' + str_html + '</select>';

		},

		devuelve_checked: function(valor){

			var valor = valor || false;

			if( (valor == true) || (valor == 1) ){
				return ' checked="checked" ';
			}else{
				return '';
			}

		},
*/
		QUnit.module('Submodulo', hooks => {

			hooks.beforeEach( t => {
				t.notOk( '', 'Todo bien en el before del submodulo' );
			});

			test('subBasico', t => {
				t.ok(true, 'todo bien más alla');
			});

		});

	});

});