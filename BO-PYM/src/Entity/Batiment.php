<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BatimentRepository")
 */
class Batiment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $Nom;

    /**
     * @ORM\Column(type="integer")
     */
    private $Nb_etage;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Description;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Acces_handicape;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Etat;

    /**
     * @ORM\Column(type="string", length=40, nullable=true)
     */
    private $Representation3D;

    /**
     * @ORM\Column(type="float")
     */
    private $Longitude;

    /**
     * @ORM\Column(type="float")
     */
    private $Latitude;

    /**
     * @ORM\Column(type="float")
     */
    private $Angle;

    /**
     * @ORM\Column(type="float")
     */
    private $Echelle;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Bureau", mappedBy="Batiment")
     */
    private $Bureaux;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TypeBatiment", inversedBy="Batiment")
     */
    private $TypeBatiment;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\FormeParametrique", inversedBy="Batiment")
     */
    private $FormeParametrique;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Longueur;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Largeur;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Rayon;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Hauteur;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Adresse;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Accessoire;

    public function __construct()
    {
        $this->Bureaux = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getNbEtage(): ?int
    {
        return $this->Nb_etage;
    }

    public function setNbEtage(int $Nb_etage): self
    {
        $this->Nb_etage = $Nb_etage;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getAccesHandicape(): ?bool
    {
        return $this->Acces_handicape;
    }

    public function setAccesHandicape(bool $Acces_handicape): self
    {
        $this->Acces_handicape = $Acces_handicape;

        return $this;
    }

    public function getEtat(): ?bool
    {
        return $this->Etat;
    }

    public function setEtat(bool $Etat): self
    {
        $this->Etat = $Etat;

        return $this;
    }

    public function getRepresentation3D(): ?string
    {
        return $this->Representation3D;
    }

    public function setRepresentation3D(?string $Representation3D): self
    {
        $this->Representation3D = $Representation3D;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->Longitude;
    }

    public function setLongitude(float $Longitude): self
    {
        $this->Longitude = $Longitude;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->Latitude;
    }

    public function setLatitude(float $Latitude): self
    {
        $this->Latitude = $Latitude;

        return $this;
    }

    public function getAngle(): ?float
    {
        return $this->Angle;
    }

    public function setAngle(float $Angle): self
    {
        $this->Angle = $Angle;

        return $this;
    }

    public function getEchelle(): ?float
    {
        return $this->Echelle;
    }

    public function setEchelle(float $Echelle): self
    {
        $this->Echelle = $Echelle;

        return $this;
    }

    /**
     * @return Collection|Bureau[]
     */
    public function getBureaux(): Collection
    {
        return $this->Bureaux;
    }

    public function addBureaux(Bureau $bureaux): self
    {
        if (!$this->Bureaux->contains($bureaux)) {
            $this->Bureaux[] = $bureaux;
            $bureaux->setBatiment($this);
        }

        return $this;
    }

    public function removeBureaux(Bureau $bureaux): self
    {
        if ($this->Bureaux->contains($bureaux)) {
            $this->Bureaux->removeElement($bureaux);
            // set the owning side to null (unless already changed)
            if ($bureaux->getBatiment() === $this) {
                $bureaux->setBatiment(null);
            }
        }

        return $this;
    }

    public function getTypeBatiment(): ?TypeBatiment
    {
        return $this->TypeBatiment;
    }

    public function setTypeBatiment(?TypeBatiment $TypeBatiment): self
    {
        $this->TypeBatiment = $TypeBatiment;

        return $this;
    }

    public function getFormeParametrique(): ?FormeParametrique
    {
        return $this->FormeParametrique;
    }

    public function setFormeParametrique(?FormeParametrique $FormeParametrique): self
    {
        $this->FormeParametrique = $FormeParametrique;

        return $this;
    }

    public function __toString(){
        return $this->Nom;
    }

    public function getLongueur(): ?float
    {
        return $this->Longueur;
    }

    public function setLongueur(?float $Longueur): self
    {
        $this->Longueur = $Longueur;

        return $this;
    }

    public function getLargeur(): ?float
    {
        return $this->Largeur;
    }

    public function setLargeur(?float $Largeur): self
    {
        $this->Largeur = $Largeur;

        return $this;
    }

    public function getRayon(): ?float
    {
        return $this->Rayon;
    }

    public function setRayon(?float $Rayon): self
    {
        $this->Rayon = $Rayon;

        return $this;
    }

    public function getHauteur(): ?float
    {
        return $this->Hauteur;
    }

    public function setHauteur(?float $Hauteur): self
    {
        $this->Hauteur = $Hauteur;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->Adresse;
    }

    public function setAdresse(?string $Adresse): self
    {
        $this->Adresse = $Adresse;

        return $this;
    }

    public function getAccessoire(): ?bool
    {
        return $this->Accessoire;
    }

    public function setAccessoire(bool $Accessoire): self
    {
        $this->Accessoire = $Accessoire;

        return $this;
    }
}
