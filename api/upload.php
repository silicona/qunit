<?php
/*
 * jQuery File Upload Plugin PHP Example 5.2.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */


session_start();

// require_once '../lib/config.php';

ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '80M');

class UploadHandler
{
    private $options;
    
    function __construct($options=null) {
        
        require_once '../lib/config.php';
        
        $id_soporte = (int) $_POST['id_soporte'];
        $opcion = $_POST['opcion'];
        $hash = $_POST['hash'];
        
        if($opcion == 'soporte'){
            
            $this->options = array(
                'script_url' => $_SERVER['PHP_SELF'],
                'upload_dir' => BASE_FILE . 'api/uploads/',
                'upload_url' => BASE_URL . 'api/uploads/',
                'param_name' => 'files',
                // The php.ini settings upload_max_filesize and post_max_size
                // take precedence over the following max_file_size setting:
                'max_file_size' => null,
                'min_file_size' => 1,
                'accept_file_types' => '/.+$/i',
                'max_number_of_files' => null,
                'discard_aborted_uploads' => true,
                'image_versions' => array(
                    // Uncomment the following version to restrict the size of
                    // uploaded images. You can also add additional versions with
                    // their own upload directories:
                    
                )
            );
        }
        
        if ($options) {
            $this->options = array_merge_recursive($this->options, $options);
        }
    }
    
    private function get_file_object($file_name) {
        $file_path = $this->options['upload_dir'].$file_name;
        if (is_file($file_path) && $file_name[0] !== '.') {
            $file = new stdClass();
            $file -> name = $file_name;
            $file -> size = filesize($file_path);
            $file -> url = $this->options['upload_url'].rawurlencode($file -> name);
            foreach($this->options['image_versions'] as $version => $options) {
                if (is_file($options['upload_dir'].$file_name)) {
                    $file -> {$version.'_url'} = $options['upload_url']
                        .rawurlencode($file -> name);
                }
            }
            $file -> delete_url = $this->options['script_url']
                .'?file='.rawurlencode($file -> name);
            $file -> delete_type = 'DELETE';
            return $file;
        }
        return null;
    }
    
    private function get_file_objects() {
        return array_values(array_filter(array_map(
            array($this, 'get_file_object'),
            scandir($this->options['upload_dir'])
        )));
    }

    private function create_scaled_image($file_name, $options) {
        $file_path = $this->options['upload_dir'].$file_name;
        $new_file_path = $options['upload_dir'].$file_name;
        list($img_width, $img_height) = @getimagesize($file_path);
        if (!$img_width || !$img_height) {
            return false;
        }
        
        $scale = min(
            $options['max_width'] / $img_width,
            $options['max_height'] / $img_height
        );
        
        $new_width = $img_width * $scale;
        $new_height = $img_height * $scale;
        
        if( ((int) $options['width'] != 0) && ((int) $options['height'] != 0)){
	        $new_width = $options['width'];
	        $new_height = $options['height'];
        }
        
        $new_img = @imagecreatetruecolor($new_width, $new_height);
        switch (strtolower(substr(strrchr($file_name, '.'), 1))) {
            case 'jpg':
            case 'jpeg':
                $src_img = @imagecreatefromjpeg($file_path);
                $write_image = 'imagejpeg';
                break;
            case 'gif':
                $src_img = @imagecreatefromgif($file_path);
                $write_image = 'imagegif';
                break;
            case 'png':
                $src_img = @imagecreatefrompng($file_path);
                $write_image = 'imagepng';
                break;
            default:
                $src_img = $image_method = null;
        }
        $success = $src_img && @imagecopyresampled(
            $new_img,
            $src_img,
            0, 0, 0, 0,
            $new_width,
            $new_height,
            $img_width,
            $img_height
        ) && $write_image($new_img, $new_file_path);
        // Free up memory (imagedestroy does not delete files):
        @imagedestroy($src_img);
        @imagedestroy($new_img);
        return $success;
    }
    
    private function has_error($uploaded_file, $file, $error) {
        if ($error) {
            return $error;
        }
        if (!preg_match($this->options['accept_file_types'], $file -> name)) {
            return 'acceptFileTypes';
        }
        if ($uploaded_file && is_uploaded_file($uploaded_file)) {
            $file_size = filesize($uploaded_file);
        } else {
            $file_size = $_SERVER['CONTENT_LENGTH'];
        }
        if ($this->options['max_file_size'] && (
                $file_size > $this->options['max_file_size'] ||
                $file -> size > $this->options['max_file_size'])
            ) {
            return 'maxFileSize';
        }
        if ($this->options['min_file_size'] &&
            $file_size < $this->options['min_file_size']) {
            return 'minFileSize';
        }
        if (is_int($this->options['max_number_of_files']) && (
                count($this->get_file_objects()) >= $this->options['max_number_of_files'])
            ) {
            return 'maxNumberOfFiles';
        }
        return $error;
    }
    
    private function handle_file_upload($uploaded_file, $name, $size, $type, $error) {


        $time = time() . '_';
        
        $file = new stdClass();
        $file -> name = limpia_nombre_archivo(urlencode(basename(stripslashes($time.$name))));
        $file -> size = intval($size);
        $file -> type = $type;
        $error = $this->has_error($uploaded_file, $file, $error);
        if (!$error && $file -> name) {
            if ($file -> name[0] === '.') {
                $file -> name = substr($file -> name, 1);
            }
            $file_path = $this->options['upload_dir'].$file -> name;
            $append_file = is_file($file_path) && $file -> size > filesize($file_path);
            clearstatcache();
            if ($uploaded_file && is_uploaded_file($uploaded_file)) {
                // multipart/formdata uploads (POST method uploads)
			   if ($append_file) {
                    file_put_contents(
                        $file_path,
                        fopen($uploaded_file, 'r'),
                        FILE_APPEND
                    );
                } else {
                    move_uploaded_file($uploaded_file, $file_path);
                    
                }
            } else {
                // Non-multipart uploads (PUT method support)
                file_put_contents(
                    $file_path,
                    fopen('php://input', 'r'),
                    $append_file ? FILE_APPEND : 0
                );
            }
            $file_size = filesize($file_path);
            if ($file_size === $file -> size) {
                $file -> url = $this->options['upload_url'].rawurlencode($file -> name);
                foreach($this->options['image_versions'] as $version => $options) {
                    if ($this->create_scaled_image($file -> name, $options)) {
                        $file -> {$version.'_url'} = $options['upload_url']
                            .rawurlencode($file -> name);
                    }
                }
            } else if ($this->options['discard_aborted_uploads']) {
                @unlink($file_path);
                $file -> error = 'abort';
            }
            $file -> size = $file_size;
            $file -> delete_url = $this -> options['script_url']
                .'?file='.rawurlencode($file -> name);
            $file -> delete_type = 'DELETE';
            

            require_once '../lib/config.php';
            $link = conectarse(DB_HOST, DB_NOMBRE, DB_USER, DB_PASS);
            
            if($_POST['opcion'] == 'soporte' ){
                
                $id_soporte = (int) $_POST['id_soporte'];
                
                $archivos = coger_campo_misma_tabla($link, 'archivos', '4887_soportes', 'id_soporte', $id_soporte);
                $arr_archivos = explode(',', $archivos);
                array_push( $arr_archivos, $file -> name);

                $campos = array('archivos');
                $valores = array( implode(',', $arr_archivos ) );

                $where = ' WHERE id_soporte = ' . $id_soporte;
                sql_update($link,'4887_soportes',$campos,$valores,$where);

            }
            
        } else {
            $file -> error = $error;
        }

        
        return $file;
    }
    
    public function get() {
        
        $file_name = isset($_REQUEST['file']) ?
            basename(stripslashes($_REQUEST['file'])) : null; 
        if ($file_name) {
            $info = $this->get_file_object($file_name);
        } else {
            $info = $this->get_file_objects();
        }
        header('Content-type: application/json');
        echo json_encode($info);
    }
    
    public function post() {
        $upload = isset($_FILES[$this->options['param_name']]) ?
            $_FILES[$this->options['param_name']] : array(
                'tmp_name' => null,
                'name' => null,
                'size' => null,
                'type' => null,
                'error' => null
            );
        $info = array();
        if (is_array($upload['tmp_name'])) {
            foreach ($upload['tmp_name'] as $index => $value) {
                $info[] = $this->handle_file_upload(
                    $upload['tmp_name'][$index],
                    isset($_SERVER['HTTP_X_FILE_NAME']) ?
                        $_SERVER['HTTP_X_FILE_NAME'] : limpia_nombre_archivo($upload['name'][$index]),
                    isset($_SERVER['HTTP_X_FILE_SIZE']) ?
                        $_SERVER['HTTP_X_FILE_SIZE'] : $upload['size'][$index],
                    isset($_SERVER['HTTP_X_FILE_TYPE']) ?
                        $_SERVER['HTTP_X_FILE_TYPE'] : $upload['type'][$index],
                    $upload['error'][$index]
                );
            }
        } else {
            $info[] = $this->handle_file_upload(
                $upload['tmp_name'],
                isset($_SERVER['HTTP_X_FILE_NAME']) ?
                    $_SERVER['HTTP_X_FILE_NAME'] : limpia_nombre_archivo($upload['name']),
                isset($_SERVER['HTTP_X_FILE_SIZE']) ?
                    $_SERVER['HTTP_X_FILE_SIZE'] : $upload['size'],
                isset($_SERVER['HTTP_X_FILE_TYPE']) ?
                    $_SERVER['HTTP_X_FILE_TYPE'] : $upload['type'],
                $upload['error']
            );
        }
        header('Vary: Accept');
        if (isset($_SERVER['HTTP_ACCEPT']) &&
            (strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
            header('Content-type: application/json');
        } else {
            header('Content-type: text/plain');
        }
        echo json_encode($info);
    }
    
    public function delete() {
        $file_name = isset($_REQUEST['file']) ?
            basename(stripslashes($_REQUEST['file'])) : null;
        $file_path = $this->options['upload_dir'].$file_name;
        $success = is_file($file_path) && $file_name[0] !== '.' && unlink($file_path);
        if ($success) {
            foreach($this->options['image_versions'] as $version => $options) {
                $file = $options['upload_dir'].$file_name;
                if (is_file($file)) {
                    unlink($file);
                }
            }
        }
        header('Content-type: application/json');
        echo json_encode($success);
    }
}

$upload_handler = new UploadHandler();





header('Pragma: no-cache');
header('Cache-Control: private, no-cache');
header('Content-Disposition:inline;filename="files.txt"');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'HEAD':
    case 'GET':
        $upload_handler->get();
        break;
    case 'POST':
        $upload_handler->post();
        break;
    case 'DELETE':
        $upload_handler->delete();
        break;
    default:
        header('HTTP/1.0 405 Method Not Allowed');
}



?>