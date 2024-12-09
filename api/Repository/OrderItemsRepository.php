<?php

require_once("Repository/EntityRepository.php");
require_once("Class/OrderItems.php");

/**
 *  Classe OrderItemsRepository
 * 
 *  Cette classe représente le "stock" de OrderItems.
 *  Toutes les opérations sur les OrderItems doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class OrderItemsRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?OrderItems {
        $requete = $this->cnx->prepare("select * from OrderItems where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;
        
        $orderItem = new OrderItems($answer->id, $answer->order_id, $answer->product_id, $answer->quantity);
        return $orderItem;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from OrderItems");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $orderItem = new OrderItems($obj->id, $obj->order_id, $obj->product_id, $obj->quantity);
            array_push($res, $orderItem);
        }
       
        return $res;
    }

    public function save($orderItem){
        // Not implemented ! TODO when needed !          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($orderItem){
        // Not implemented ! TODO when needed !
        return false;
    }
}
