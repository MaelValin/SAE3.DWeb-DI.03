<?php
require_once "Controller.php";
require_once "Repository/OrdersRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class OrdersController extends Controller {

    private OrdersRepository $orders;

    public function __construct(){
        $this->orders = new OrdersRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {

        $stat = $request->getParam('stat');
        if ($stat=='iteration3'){
            return $this->orders->getStatInteration3();
        }

        $stat = $request->getParam('stat');
        if ($stat=='iteration5'){
            return $this->orders->getStatInteration5();
        }

        $stat = $request->getParam('stat');
        if ($stat=='iteration6-date'){
            return $this->orders->getStatInteration6Date();
        }

        $stat = $request->getParam('stat');
        if ($stat=='iteration6'){
            return $this->orders->getStatInteration6();
        }
        
        $id = $request->getId("id");
        if ($id){
            // URI is .../Orders/{id}
            $p = $this->orders->find($id);
            return $p==null ? false :  $p;
        }
        else{
            return $this->orders->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        return false;
    }
   
}

?>