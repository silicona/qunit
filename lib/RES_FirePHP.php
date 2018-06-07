<?php
/**
*	INICIALIZA FIREPHP
*	
	Crea un objeto Fire PHP
	Pasa todos los errores de PHP a la consola
	
	http://phpmaster.com/debugging-php-code-with-firephp/
	
	EJEMPLOS: 
	FB::log('Log message');
	FB::info('Info message');
	FB::warn('Warn message');
	FB::error('Error message');
	
	Mostrar objeto:
	$turtles = $zooService->fetchAllTurtles();
	FB::info($turtles, "All Turtles");
	
	Grupos:
	$specialHashes = array();
	FB::group('Special Hashes');
	for ($x = 0; $x < 5; $x++) {
	    $specialHashes[$x] = sha1($x . 'somesalt');
	    FB::info($specialHashes[$x], "Hash #" . $x);
    }
    FB::groupEnd();
    
    Tablas:
    $specialHashes = array();
    for ($x = 0; $x < 5; $x++) {
	    $specialHashes[] = array($x, sha1($x . 'somesalt'));
	}
	 
	$headers = array('Hash #', 'Hash Value');
	$logTable = array($headers) + $specialHashes;
	FB::table("Special Hashes", $logTable);
	
	Trazas:
	FB::trace('Simple Trace');
    
	
*/

	ob_start();
    require_once 'FirePHPCore/fb.php';
	
	// crea objeto Fire PHP
	$firephp = FirePHP::getInstance(true);
	
	
	// Pasa todos los errores de PHP a la consola
	$firephp->registerErrorHandler(
            $throwErrorExceptions=false);
	$firephp->registerExceptionHandler();
	$firephp->registerAssertionHandler(
	            $convertAssertionErrorsToExceptions=true,
	            $throwAssertionExceptions=false);
	 

	 
	 /*
	try {
	  throw new Exception('Test Exception');
	  	  
	} catch(Exception $e) {
	  $firephp->error($e);  // or FB::
	}
	*/

?>
