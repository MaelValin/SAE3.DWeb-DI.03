<?php
/**
 *  Class Clients
 * 
 *  Représente un client avec uniquement 3 propriétés (id, name, category)
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Clients doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class Clients implements JsonSerializable {
    private int $id; // id du client
    private string $first_name; // nom du client
    private string $last_name; // prénom du client
    private string $email; // email du client
    private string $country; // pays du client
    private string $city; // ville du client
    private string $lat; // latitude du client
    private string $lng; // longitude du client

    public function __construct(int $id){
        $this->id = $id;
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "country" => $this->country,
            "city" => $this->city,
            "lat" => $this->lat,
            "lng" => $this->lng
        ];
    }

    /**
     * Get the value of first_name
     */ 
    public function getFirstName(): string
    {
        return $this->first_name;
    }

    /**
     * Set the value of first_name
     *
     * @return  self
     */ 
    public function setFirstName(string $first_name): self
    {
        $this->first_name = $first_name;
        return $this;
    }

    /**
     * Get the value of last_name
     */ 
    public function getLastName(): string
    {
        return $this->last_name;
    }

    /**
     * Set the value of last_name
     *
     * @return  self
     */ 
    public function setLastName(string $last_name): self
    {
        $this->last_name = $last_name;
        return $this;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get the value of country
     */ 
    public function getCountry(): string
    {
        return $this->country;
    }

    /**
     * Set the value of country
     *
     * @return  self
     */ 
    public function setCountry(string $country): self
    {
        $this->country = $country;
        return $this;
    }

    /**
     * Get the value of city
     */ 
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * Set the value of city
     *
     * @return  self
     */ 
    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    /**
     * Get the value of lat
     */ 
    public function getLat(): string
    {
        return $this->lat;
    }

    /**
     * Set the value of lat
     *
     * @return  self
     */ 
    public function setLat(string $lat): self
    {
        $this->lat = $lat;
        return $this;
    }

    /**
     * Get the value of lng
     */ 
    public function getLng(): string
    {
        return $this->lng;
    }

    /**
     * Set the value of lng
     *
     * @return  self
     */ 
    public function setLng(string $lng): self
    {
        $this->lng = $lng;
        return $this;
    }
}