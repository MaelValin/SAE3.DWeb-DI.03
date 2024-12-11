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

        $stat = $request->getParam('stat');
        if ($stat == 'iteration9client') {
            return $this->clients->getStatInteration9client();
        }

        $stat = $request->getParam('stat');
        if ($stat == 'iteration9allcategory') {
            return $this->clients->getStatInteration9allcategory();
        }

        $stat = $request->getParam('stat');
        if ($stat == 'iteration9allproduct') {
            return $this->clients->getStatInteration9allproduct();
        }

        $stat = $request->getParam('stat');
        $id = $request->getParam('id');
        if ($stat == 'iteration9category' && $id) {
            return $this->clients->getStatInteration9category($id);
        }

        $stat = $request->getParam('stat');
        $id = $request->getParam('id');
        if ($stat == 'iteration9product' && $id) {
            return $this->clients->getStatInteration9product($id);
        }

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