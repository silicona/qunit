(function(){
    require.config({
        paths: {
            'qunit': 'js/libs/qunit-2.6.0',
        },
    });

    require(['qunit'], function(QUnit) {

        QUnit.start();

        QUnit.module('My Module');

        QUnit.test('some normal test', function(assert) {

            assert.ok(true, 'can run a normal QUnit test');
        });

        QUnit.test('some asynchronous test', function(assert) {

            var done = assert.async();

            setTimeout(function() {

                assert.ok(true, 'can run an asynchronous QUnit test');
                done();

            }, 50);
        });
    });
}());