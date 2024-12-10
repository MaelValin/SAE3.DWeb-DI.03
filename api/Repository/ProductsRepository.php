<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Products.php");

/**
 *  Classe ProductsRepository
 * 
 *  Cette classe représente le "stock" de Products.
 *  Toutes les opérations sur les Products doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class ProductsRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Products {
        $requete = $this->cnx->prepare("select * from Products where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;
        
        $product = new Products($answer->id, $answer->product_name, $answer->category, $answer->price, $answer->quantity, $answer->stock);
        return $product;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Products");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $product = new Products($obj->id, $obj->product_name, $obj->category, $obj->price, $obj->quantity, $obj->stock);
            array_push($res, $product);
        }
       
        return $res;
    }


    public function getStatInteration7(){
        $requete = $this->cnx->prepare("SELECT product_name, stock
FROM Products
ORDER BY stock ASC
LIMIT 10;
");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    public function getStatInteration8(){
        $requete = $this->cnx->prepare("SELECT id, product_name, stock
FROM Products
ORDER BY product_name ASC;
");

        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    
public function getStatInteration8date(){
    $requete = $this->cnx->prepare("SELECT DISTINCT DATE_FORMAT(order_date, '%Y-%m') AS month
FROM Orders
ORDER BY month Asc
LIMIT 12;
"); 
$requete->execute();
$answer = $requete->fetchAll(PDO::FETCH_OBJ);
return $answer;
}

    public function save($product){
        // Not implemented ! TODO when needed !          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($product){
        // Not implemented ! TODO when needed !
        return false;
    }
}
