<?php
require_once "Controller.php";
require_once "Repository/ClientsRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ClientsController extends Controller {

    private ClientsRepository $clients;

    public function __construct(){
        $this->clients = new ClientsRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId("id");
        if ($id){
            // URI is .../clients/{id}
            $p = $this->clients->find($id);
            return $p==null ? false :  $p;
        }
        else{
            return $this->clients->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        return false;
    }
   
}

?>