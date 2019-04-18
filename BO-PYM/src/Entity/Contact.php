<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ContactRepository")
 */
class Contact
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $Mail;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $Telephone;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $Nom;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $Prenom;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Entreprise", inversedBy="Contact")
     * @ORM\JoinColumn(nullable=false)
     */
    private $entreprise;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Poste", inversedBy="contacts")
     * @Assert\NotBlank()
     */
    private $poste;

    public function __construct()
    {
        $this->poste = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMail(): ?string
    {
        return $this->Mail;
    }

    public function setMail(string $Mail): self
    {
        $this->Mail = $Mail;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->Telephone;
    }

    public function setTelephone(string $Telephone): self
    {
        $this->Telephone = $Telephone;

        return $this;
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

    public function getPrenom(): ?string
    {
        return $this->Prenom;
    }

    public function setPrenom(string $Prenom): self
    {
        $this->Prenom = $Prenom;

        return $this;
    }

    public function getEntreprise(): ?Entreprise
    {
        return $this->entreprise;
    }

    public function setEntreprise(?Entreprise $entreprise): self
    {
        $this->entreprise = $entreprise;

        return $this;
    }

    /**
     * @return Collection|Poste[]
     */
    public function getPoste(): Collection
    {
        return $this->poste;
    }

    public function addPoste(Poste $poste): self
    {
        if (!$this->poste->contains($poste)) {
            $this->poste[] = $poste;
        }

        return $this;
    }

    public function removePoste(Poste $poste): self
    {
        if ($this->poste->contains($poste)) {
            $this->poste->removeElement($poste);
        }

        return $this;
    }
}
