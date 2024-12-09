<?php
/**
 *  Class Products
 * 
 *  Représente un produit avec ses propriétés (id, product_name, category, price, quantity, stock)
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Products doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class Products implements JsonSerializable {
    private int $id;
    private string $product_name; 
    private string $category; 
    private float $price; 
    private int $quantity;
    private int $stock;

    public function __construct(int $id, string $product_name, string $category, float $price, int $quantity, int $stock){
        $this->id = $id;
        $this->product_name = $product_name;
        $this->category = $category;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->stock = $stock;
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the value of product_name
     */ 
    public function getProductName(): string
    {
        return $this->product_name;
    }

    /**
     * Set the value of product_name
     *
     * @return  self
     */ 
    public function setProductName(string $product_name): self
    {
        $this->product_name = $product_name;
        return $this;
    }

    /**
     * Get the value of category
     */ 
    public function getCategory(): string
    {
        return $this->category;
    }

    /**
     * Set the value of category
     *
     * @return  self
     */ 
    public function setCategory(string $category): self
    {
        $this->category = $category;
        return $this;
    }

    /**
     * Get the value of price
     */ 
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */ 
    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    /**
     * Get the value of quantity
     */ 
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * Set the value of quantity
     *
     * @return  self
     */ 
    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;
        return $this;
    }

    /**
     * Get the value of stock
     */ 
    public function getStock(): int
    {
        return $this->stock;
    }

    /**
     * Set the value of stock
     *
     * @return  self
     */ 
    public function setStock(int $stock): self
    {
        $this->stock = $stock;
        return $this;
    }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "product_name" => $this->product_name,
            "category" => $this->category,
            "price" => $this->price,
            "quantity" => $this->quantity,
            "stock" => $this->stock
        ];
    }
}
