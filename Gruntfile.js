/*global module:false*/
module.exports = function(grunt) {
    


  // Project configuration.
  grunt.initConfig({

    qunit: {
      all: ['test_bb/index.html'],
      
      options:{
      //   urls: ['http://localhost/merca/test_bb/index.html'],
      //   timeout: 10000,
        console: true, // No funciona?
      }
      
    },
    
    jshint: {
      
      files: {
        src: ['js/app/**/*.js', 'js/*.js', 'test_bb/**/*.js'],
        tests: ['test_bb/vistas/**/*.js'],
        options: {
          '-W041': true, // Use '!==' to compare with '' || Use '!==' to compare with ''
          '-W099': true, // Mixed spaces and tabs.
          '-W024': true, // Expected an identifier and instead saw 'this' (a reserved word).'
          '-W030': true, // Expected an assignment or function call and instead saw an expression.
          //'-W033': true, // Missing semicolon.
          '-W038': true, // 'mensaje_alert' used out of scope.'
          '-W004': true, // 'mensaje_alert' <variable> is already defined.'
          '-W065': true, // Missing radix parameter.'
        },
      },
      
      options: {
        // Web de opciones: http://jshint.com/docs/options/
        force: true,
        reporterOutput: '', // Si no es '', provoca Path must be a string
        browser: true, // Standard browser globals e.g. `window`, `document`.
        esnext: true,
        //ES6: true, // Allow EcmaScript 5 syntax.
        //esversion: 5, // Version de JS
        curly: true, // Asegura el uso de {} en if, for y while
        eqeqeq: false, // W116: Asegura el uso de === SIEMPRE, en vez de ==
        immed: true,
        latedef: true, // This option prohibits the use of a variable before it was defined.
        multistr: true, // This option suppresses warnings about multi-line strings. Deprecated
        newcap: false, // W064: This option requires you to capitalize names of constructor functions. Deprecated
        noarg: true, // This option prohibits the use of arguments.caller and arguments.callee.
        sub: true,
        undef: false, // W117: Prohibe el uso de variable no declaradas
        asi: false, // W033: This option suppresses warnings about missing semicolons.
        boss: true,
        eqnull: false, // This option suppresses warnings about == null comparisons. 
        devel: false, // Permite expresiones de desarrollo como console.log()
        globals: {
          QUnit: true, 
          jQuery: true,
          define: true,
        },
      },
      
    },

    uglify: {}
  });
  grunt.registerTask('default', ['jshint','qunit']);

  grunt.event.on('qunit.spawn', function (url) {
    grunt.log.ok('Running qunit.spawn: ' + url);
  });

  grunt.event.on('qunit.fail.load', function (url) {
      grunt.log.ok('Running qunit.fail.load: ' + url);
  });

  grunt.event.on('qunit.begin', function () {
      grunt.log.ok('Running qunit.begin');
  });

  grunt.event.on('qunit.moduleStart', function (name) {
      grunt.log.ok('Running qunit.moduleStart: ' + name);
  });

  grunt.event.on('qunit.testDone', function (name) {
      grunt.log.ok('Running qunit.testDone: ' + name);
  });

  grunt.event.on('qunit.testStart', function (name) {
      grunt.log.ok('Running qunit.testStart: ' + name);
  });

  grunt.event.on('qunit.moduleDone', function (name) {
      grunt.log.ok('Running qunit.moduleDone: ' + name);
  });

  grunt.event.on('qunit.fail.timeout', function (url) {
      grunt.log.ok('Running qunit.fail.timeout: ' + url);
  });

  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

};
