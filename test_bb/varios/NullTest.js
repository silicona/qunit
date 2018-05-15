define([

], function(){

	QUnit.module('Test de null, undefined y otros', function(hooks){

		hooks.beforeEach(function(assert){});

		QUnit.test('test de Null', function(assert){
			
			var variable = null;
			assert.equal( variable, undefined, 'Equal' );
			//assert.deepEqual( variable , null, 'DeepEqual' );
			assert.strictEqual( variable , null, 'StrictEqual' );
			assert.equal( typeof(variable) , 'object', 'Equal + typeof' );

		});

		QUnit.test('test de Undefined', function(assert){

			var variable;
			assert.equal( variable , undefined, 'Equal' );
			assert.strictEqual( variable, undefined, 'StrictEqual' );
			assert.equal( typeof(variable), 'undefined' , 'Equal + typeof' );

		});

		QUnit.test('test de 0', function(assert){

			var variable = 0;
			assert.equal( variable, '0', 'Equal 0 como ' + typeof variable );
			assert.equal( variable, '', 'Equal Sin valor con 0 como ' + typeof variable );
			assert.strictEqual( variable, 0, 'StrictEqual 0 como ' + typeof variable );
			assert.notStrictEqual( variable, '', 'notStrictEqual Sin valor con 0 como ' + typeof variable );
			assert.equal( typeof(variable), 'number' , 'Equal + typeof 0 como ' + typeof variable );

			variable = '0';
			assert.equal( variable, 0, 'Equal 0 como ' + typeof variable );
			assert.notEqual( variable,'', 'notEqual Sin valor con 0 como ' + typeof variable );
			assert.strictEqual( variable, '0', 'StrictEqual 0 como ' + typeof variable );
			assert.equal( typeof(variable), 'string' , 'Equal + typeof 0 como ' + typeof variable );

		});

		QUnit.test('test de string Sin valor', function(assert){

			var variable = '';
			assert.equal( variable, 0, 'Equal Sin valor como ' + typeof variable );
			assert.notEqual( variable, null, 'NotEqual Sin valor con null como ' + typeof variable );
			assert.notEqual( variable, undefined, 'NotEqual Sin valor con undefined como ' + typeof variable );
			assert.strictEqual( variable, '', 'StrictEqual Sin valor como ' + typeof variable );
			assert.notStrictEqual( variable, null, 'notStrictEqual Sin valor con undefined como ' + typeof variable );
			assert.notStrictEqual( variable, undefined, 'notStrictEqual Sin valor con undefined como ' + typeof variable );
			assert.equal( typeof(variable), 'string' , 'Equal + typeof Sin valor como ' + typeof variable );

		});
	});
});