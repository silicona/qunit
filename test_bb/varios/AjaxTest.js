define([

], function(){

	QUnit.module('Basic Ajax');

	QUnit.test('Test basico', function(assert){
		assert.equal( 1, 1, 'uno es uno');
	});

	QUnit.test('Test Ajax', function(assert){

		assert.expect(1);
		
		var ajax_sync = assert.async();

		var ajax = $.ajax({

			type: 'GET',
			url: './varios/test_page.html',

		})

		.always(function(data, status){

			var $datos = $(data);
			var titulo = $datos.filter('title').text();

			assert.equal( titulo, 'Página de test', 'La página debería tener como título \'Página de test\'');
			ajax_sync();

		});

	});

	QUnit.test('Test basico 2', function(assert){
		
		assert.notEqual( 1, 2, 'Uno no es Dos');
	
	});

});