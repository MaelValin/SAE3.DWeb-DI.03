<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Clients.php");

/**
 *  Classe ClientsRepository
 * 
 *  Cette classe représente le "stock" de Clients.
 *  Toutes les opérations sur les Clients doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class ClientsRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Clients {
        $requete = $this->cnx->prepare("select * from Clients where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;
        
        $client = new Clients($answer->id);
        $client->setFirstName($answer->first_name)
               ->setLastName($answer->last_name)
               ->setEmail($answer->email)
               ->setCountry($answer->country)
               ->setCity($answer->city)
               ->setLat($answer->lat)
               ->setLng($answer->lng);
        return $client;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Clients");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $client = new Clients($obj->id);
            $client->setFirstName($obj->first_name)
                   ->setLastName($obj->last_name)
                   ->setEmail($obj->email)
                   ->setCountry($obj->country)
                   ->setCity($obj->city)
                   ->setLat($obj->lat)
                   ->setLng($obj->lng);
            array_push($res, $client);
        }
       
        return $res;
    }


    public function getStatInteration9category($id){
        $requete = $this->cnx->prepare("SELECT 
    p.category AS category,
    SUM(oi.quantity) AS total_quantity
FROM 
    Clients c
JOIN 
    Orders o ON c.id = o.client_id
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    c.id = $id
GROUP BY 
    p.category;


");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    public function getStatInteration9product($id){
        $requete = $this->cnx->prepare("SELECT 
    P.product_name AS Product,
    SUM(OI.quantity) AS Total_Quantity
FROM 
    Clients C
JOIN 
    Orders O ON C.id = O.client_id
JOIN 
    OrderItems OI ON O.id = OI.order_id
JOIN 
    Products P ON OI.product_id = P.id
WHERE 
    C.id = $id
   
GROUP BY 
     P.product_name
ORDER BY 
     Product desc;


");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    public function getStatInteration9allcategory(){
        $requete = $this->cnx->prepare("SELECT 
    p.category AS category,
    SUM(oi.quantity) AS total_quantity
FROM 
    Clients c
JOIN 
    Orders o ON c.id = o.client_id
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
GROUP BY 
    p.category;


");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    public function getStatInteration9allproduct(){
        $requete = $this->cnx->prepare("SELECT 
    P.product_name AS Product,
    SUM(OI.quantity) AS Total_Quantity
FROM 
    Clients C
JOIN 
    Orders O ON C.id = O.client_id
JOIN 
    OrderItems OI ON O.id = OI.order_id
JOIN 
    Products P ON OI.product_id = P.id
   
GROUP BY 
     P.product_name
ORDER BY 
     Product DESC;


");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    public function getStatInteration9client(){
        $requete = $this->cnx->prepare("SELECT id, first_name, last_name FROM Clients order by first_name asc


");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

   



    public function save($client){
        // Not implemented ! TODO when needed !          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($client){
        // Not implemented ! TODO when needed !
        return false;
    }
}