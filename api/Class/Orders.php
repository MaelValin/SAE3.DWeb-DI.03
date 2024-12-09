<?php
/**
 *  Class Orders
 * 
 *  Représente une commande avec plusieurs propriétés
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Orders doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class Orders implements JsonSerializable {
    private int $id; // id de la commande
    private int $client_id; 
    private string $order_date;
    private string $order_status;
    private int $weight;
    private float $shipping_cost;

    public function __construct(int $id, int $client_id, string $order_date, string $order_status, int $weight, float $shipping_cost){
        $this->id = $id;
        $this->client_id = $client_id;
        $this->order_date = $order_date;
        $this->order_status = $order_status;
        $this->weight = $weight;
        $this->shipping_cost = $shipping_cost;
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the value of client_id
     */ 
    public function getclientId(): int
    {
        return $this->client_id;
    }

    /**
     * Get the value of order_date
     */ 
    public function getOrderDate(): string
    {
        return $this->order_date;
    }

    /**
     * Get the value of order_status
     */ 
    public function getOrderStatus(): string
    {
        return $this->order_status;
    }

    /**
     * Get the value of weight
     */ 
    public function getWeight(): int
    {
        return $this->weight;
    }

    /**
     * Get the value of shipping_cost
     */ 
    public function getShippingCost(): float
    {
        return $this->shipping_cost;
    }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "client_id" => $this->client_id,
            "order_date" => $this->order_date,
            "order_status" => $this->order_status,
            "weight" => $this->weight,
            "shipping_cost" => $this->shipping_cost
        ];
    }
}
