<?php
require_once "Controller.php";
require_once "Repository/OrderItemsRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class OrderItemsController extends Controller {

    private OrderItemsRepository $orderItems;

    public function __construct(){
        $this->orderItems = new OrderItemsRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {

        $stat = $request->getParam('stat');
        if ($stat=='iteration4'){
            return $this->orderItems->getStatInteration4();
        }

        $id = $request->getId("id");
        if ($id){
            // URI is .../orderItems/{id}
            $p = $this->orderItems->find($id);
            return $p==null ? false :  $p;
        }
        else{
            return $this->orderItems->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        return false;
    }
   
}

?>