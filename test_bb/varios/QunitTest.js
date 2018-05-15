define([

	//'funciones',

], function(/*Fx*/){
	
	const { test } = QUnit;
	QUnit.module('Modulo QUnit Principal', hooks => {

		hooks.beforeEach( t => {
			t.notOk( false, 'Todo bien antes' );
		});

		test( 'Test de módulo pricipal', t => {
			t.ok( true, 'todo bien');
		});

		QUnit.module('Submodulo', hooks => {

			hooks.beforeEach( t => {
				t.notOk( '', 'Todo bien en el before del submodulo' );
			});

			test('Test de submódulo', t => {
				t.ok(true, 'todo bien más alla');
			});

		});

	});

});