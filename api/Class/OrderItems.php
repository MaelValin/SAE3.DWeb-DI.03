<?php
/**
 *  Class OrderItems
 * 
 *  Représente un client avec uniquement 3 propriétés (id, name, category)
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe OrderItems doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class OrderItems implements JsonSerializable {
    private int $id; // id du client
    private int $order_id; 
    private int $product_id;    
    private int $quantity;
    

    public function __construct(int $id, int $order_id, int $product_id, int $quantity){
        $this->id = $id;
        $this->order_id = $order_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the value of order_id
     */ 
    public function getOrderId(): int
    {
        return $this->order_id;
    }

    /**
     * Get the value of product_id
     */ 
    public function getProductId(): int
    {
        return $this->product_id;
    }

    /**
     * Get the value of quantity
     */ 
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "order_id" => $this->order_id,
            "product_id" => $this->product_id,
            "quantity" => $this->quantity
        ];
    }
}
