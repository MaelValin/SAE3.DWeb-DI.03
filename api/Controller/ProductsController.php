<?php
require_once "Controller.php";
require_once "Repository/ProductsRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductsController extends Controller {

    private ProductsRepository $products;

    public function __construct(){
        $this->products = new ProductsRepository();
    }

   
    protected function processGetRequest(HttpRequest $request) {

        $stat = $request->getParam('stat');
        if ($stat=='iteration7'){
            return $this->products->getStatInteration7();
        }

        $id = $request->getId("id");
        if ($id){
            // URI is .../Products/{id}
            $p = $this->products->find($id);
            return $p==null ? false :  $p;
        }
        else{
            return $this->products->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request) {
        return false;
    }
   
}

?>