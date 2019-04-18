<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\FormeParametriqueRepository")
 */
class FormeParametrique
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Nom;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Batiment", mappedBy="FormeParametrique")
     */
    private $Batiment;

    public function __construct()
    {
        $this->Batiment = new ArrayCollection();
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

    /**
     * @return Collection|Batiment[]
     */
    public function getBatiment(): Collection
    {
        return $this->Batiment;
    }

    public function addBatiment(Batiment $batiment): self
    {
        if (!$this->Batiment->contains($batiment)) {
            $this->Batiment[] = $batiment;
            $batiment->setFormeParametrique($this);
        }

        return $this;
    }

    public function removeBatiment(Batiment $batiment): self
    {
        if ($this->Batiment->contains($batiment)) {
            $this->Batiment->removeElement($batiment);
            // set the owning side to null (unless already changed)
            if ($batiment->getFormeParametrique() === $this) {
                $batiment->setFormeParametrique(null);
            }
        }

        return $this;
    }

    public function __toString(){
        return $this->Nom;
    }
}
