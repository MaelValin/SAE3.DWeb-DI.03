<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Orders.php");

/**
 *  Classe OrdersRepository
 * 
 *  Cette classe représente le "stock" de Orders.
 *  Toutes les opérations sur les Orders doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class OrdersRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Orders {
        $requete = $this->cnx->prepare("select * from Orders where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;
        
        $order = new Orders($answer->id, $answer->client_id, $answer->order_date, $answer->order_status, $answer->weight, $answer->shipping_cost);
        return $order;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Orders");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $order = new Orders($obj->id, $obj->client_id, $obj->order_date, $obj->order_status, $obj->weight, $obj->shipping_cost);
            array_push($res, $order);
        }
       
        return $res;
    }

    public function save($order){
        // Not implemented ! TODO when needed !          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($order){
        // Not implemented ! TODO when needed !
        return false;
    }
}
