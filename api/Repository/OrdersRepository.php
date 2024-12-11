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

    public function getStatInteration3(){
        $requete = $this->cnx->prepare("select order_status, count(*) as montant from Orders group by order_status");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    public function getStatInteration5(){
        $requete = $this->cnx->prepare("SELECT 
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity * p.price) AS monthly_sales
FROM 
    Orders o
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    o.order_date >= CURDATE() - INTERVAL 4 MONTH
GROUP BY 
    month
ORDER BY 
    month ASC;");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    public function getStatInteration6Date(){
        $requete = $this->cnx->prepare("SELECT DISTINCT DATE_FORMAT(order_date, '%Y-%m') AS month
FROM Orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 4 MONTH)
ORDER BY month ASC;
");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    public function getStatInteration6(){
        $requete = $this->cnx->prepare("SELECT 
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    p.category AS product_category,
    SUM(oi.quantity * p.price) AS total_sales
FROM 
    Orders o
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    o.order_date >= CURDATE() - INTERVAL 4 MONTH
GROUP BY 
    month, product_category
ORDER BY 
   product_category ASC, month ASC;





");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    public function getStatInteration8($id){
        $requete = $this->cnx->prepare("SELECT 
p.product_name,
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity) AS total_quantity_sold
FROM 
    Orders o
JOIN 
    OrderItems oi ON o.id = oi.order_id
    JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    oi.product_id = $id
    AND o.order_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY 
    DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY 
    month ASC;





");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }

    public function getStatInteration8idnone(){
        $requete = $this->cnx->prepare("SELECT 
    p.product_name,
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(oi.quantity) AS total_quantity_sold
FROM 
    Orders o
JOIN 
    OrderItems oi ON o.id = oi.order_id
JOIN 
    Products p ON oi.product_id = p.id
WHERE 
    o.order_date >= CURDATE() - INTERVAL 12 MONTH
GROUP BY 
    p.product_name,
    DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY 
    month ASC, 
    p.product_name DESC;

   





");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        return $answer;
    }


    

}
