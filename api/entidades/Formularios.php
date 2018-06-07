<?php

	/*******************************************/
	/* limpieza de variables *******************/
	/*******************************************/

	//http://www.phpro.org/tutorials/Filtering-Data-with-PHP.html#12

	class Formularios {

		function valida_email($email){

			if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE){
				/*** if it fails validation ***/
		        return false;
		    }else{
				/*** if the address passes validation ***/
				return true;
		    }
		}

		function valida_url($url){

			if(filter_var($url, FILTER_VALIDATE_URL, FILTER_FLAG_SCHEME_REQUIRED) === FALSE){
				/*** if it fails validation ***/
		        	return false;
		    }else{
				/*** if the address passes validation ***/
				return true;
		    }
		}

		function valida_ip($ip){

			if(filter_var($ip, FILTER_VALIDATE_IP) === FALSE){

				return false;
		    } else {

				return true;
		    }
		}

		function limpia_varchar($string){

			filter_var($string, FILTER_SANITIZE_STRING);
			return $string;
		}

		function limpia_text($string){
			
			//quitar múltiples espacios
			$string = str_replace('&nbsp;',' ',$string);
			$string = preg_replace('/(?:\s\s+|\n|\t)/', ' ', $string);
			
		    //cambiar comillas dobles por sencillas
		    $string = str_replace('"',"'",$string);
		    filter_var($string, FILTER_SANITIZE_SPECIAL_CHARS);
		        
			//$string = htmlspecialchars($string,ENT_QUOTES);
			
			return $string;
		}

		function limpia_email($email){

			filter_var($email, FILTER_SANITIZE_EMAIL);
			return $email;
		}

		function limpia_url($url){
			
			filter_var($url, FILTER_SANITIZE_URL);
			return $url;
		}

		function limpia_nombre_archivo($nombre_archivo) {
			
			//$nombre_archivo = strtolower($nombre_archivo);
			$nombre_archivo = str_replace("#","-",$nombre_archivo);
			$nombre_archivo = str_replace(" ","-",$nombre_archivo);
			$nombre_archivo = str_replace("'","",$nombre_archivo);
			$nombre_archivo = str_replace('"',"",$nombre_archivo);
			$nombre_archivo = str_replace("__","_",$nombre_archivo);
			$nombre_archivo = str_replace("&","and",$nombre_archivo);
			$nombre_archivo = str_replace("/","-",$nombre_archivo);
			$nombre_archivo = str_replace("?","",$nombre_archivo);
			$nombre_archivo = str_replace("¿","",$nombre_archivo);
			$nombre_archivo = str_replace("!","",$nombre_archivo);
			$nombre_archivo = str_replace("¡","",$nombre_archivo);
			$nombre_archivo = str_replace(")","",$nombre_archivo);
			$nombre_archivo = str_replace("(","",$nombre_archivo);
			$nombre_archivo = str_replace("]","",$nombre_archivo);
			$nombre_archivo = str_replace("[","",$nombre_archivo);
			$nombre_archivo = str_replace("}","",$nombre_archivo);
			$nombre_archivo = str_replace("{","",$nombre_archivo);
			$nombre_archivo = str_replace("`","",$nombre_archivo);
			$nombre_archivo = str_replace("^","",$nombre_archivo);
			$nombre_archivo = str_replace("+","",$nombre_archivo);
			$nombre_archivo = str_replace("*","",$nombre_archivo);
			$nombre_archivo = str_replace("@","",$nombre_archivo);
			$nombre_archivo = str_replace("=","",$nombre_archivo);
			$nombre_archivo = str_replace("%","",$nombre_archivo);
			$nombre_archivo = str_replace("ñ","ny",$nombre_archivo);
			$nombre_archivo = str_replace("Ñ","Ny",$nombre_archivo);
			
			$nombre_archivo = str_replace("á","a",$nombre_archivo);
			$nombre_archivo = str_replace("é","e",$nombre_archivo);
			$nombre_archivo = str_replace("í","i",$nombre_archivo);
			$nombre_archivo = str_replace("ó","o",$nombre_archivo);
			$nombre_archivo = str_replace("ú","u",$nombre_archivo);
			$nombre_archivo = str_replace("Á","A",$nombre_archivo);
			$nombre_archivo = str_replace("É","E",$nombre_archivo);
			$nombre_archivo = str_replace("Í","I",$nombre_archivo);
			$nombre_archivo = str_replace("Ó","O",$nombre_archivo);
			$nombre_archivo = str_replace("Ú","U",$nombre_archivo);
			
			return $nombre_archivo;	
		}


		function limpia_video_youtube($video){
			
			// coge una url de youtube y devuelve el id del video limpito
			
			

			$video = str_replace('http://www.youtube.com/watch?v=','',$video);
			$video = str_replace('<iframe width="420" height="315" src="http://www.youtube.com/embed/','',$video);
			$video = str_replace('" frameborder="0" allowfullscreen></iframe>','',$video);
			
			return limpia_nombre_archivo($video);
		}

	}

?>