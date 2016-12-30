<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	class FileManager {

		//private const MISSING_ACTION = 'Missing action';
        //private const UNKNOWN_ACTION = 'Unknown action';


		private $link;

		public function __construct() {
			$this->response = array();
   		}

		public function action($action){
			switch ($action) {
				case 'sendFile':
					# code...
					break;

				case 'getFile':
					# code...
					break;

				case 'getFileList':

					break;

				case 'setFileInfo':

					break;

				default:
					$this->setKeyValue('error', True);
					$this->setKeyValue('reason', 'Unknown action');
					break;
			}
		}

		private function setKeyValue($key, $value){
			array_push($this->response, $key, $value);
		}

		public function send(){
			header('Content-type: application/json');
			if (empty($this->response)){
				$this->setKeyValue('error', True);
				$this->setKeyValue('reason', 'Missing action');
			}
			echo json_encode($this->response);
		}
	}


	//session_start();

	$fm = new FileManager();
	if (isset($_POST['action'])) {
		$fm->action($_POST['action']);
	}
	$fm->send();



?>
