<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EntrepriseRepository")
 */
class Entreprise
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=30)
     */
    private $Nom;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $Site_Internet;

    /**
     * @ORM\Column(type="integer")
     */
    private $Nb_Salaries;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $Telephone;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $Mail;

    /**
     * @ORM\Column(type="string", length=40)
     * @Assert\NotBlank(message="Joindre un fichier jpg")
     * @Assert\File(mimeTypes={"image/jpeg","image/png"})
     */
    private $Logo;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Contact", mappedBy="entreprise")
     */
    private $Contact;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Activite", mappedBy="entreprise")
     */
    private $activites;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Bureau", mappedBy="entreprise")
     */
    private $bureaux;

    public function __construct()
    {
        $this->Contact = new ArrayCollection();
        $this->activites = new ArrayCollection();
        $this->bureaux = new ArrayCollection();
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

    public function getSiteInternet(): ?string
    {
        return $this->Site_Internet;
    }

    public function setSiteInternet(string $Site_Internet): self
    {
        $this->Site_Internet = $Site_Internet;

        return $this;
    }

    public function getNbSalaries(): ?int
    {
        return $this->Nb_Salaries;
    }

    public function setNbSalaries(int $Nb_Salaries): self
    {
        $this->Nb_Salaries = $Nb_Salaries;

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

    public function getMail(): ?string
    {
        return $this->Mail;
    }

    public function setMail(string $Mail): self
    {
        $this->Mail = $Mail;

        return $this;
    }

    public function getLogo()
    {
        return $this->Logo;
    }

    public function setLogo($Logo)
    {
        $this->Logo = $Logo;

        return $this;
    }

    /**
     * @return Collection|Contact[]
     */
    public function getContact(): Collection
    {
        return $this->Contact;
    }

    public function addContact(Contact $contact): self
    {
        if (!$this->Contact->contains($contact)) {
            $this->Contact[] = $contact;
            $contact->setEntreprise($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): self
    {
        if ($this->Contact->contains($contact)) {
            $this->Contact->removeElement($contact);
            // set the owning side to null (unless already changed)
            if ($contact->getEntreprise() === $this) {
                $contact->setEntreprise(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Activite[]
     */
    public function getActivites(): Collection
    {
        return $this->activites;
    }

    public function addActivite(Activite $activite): self
    {
        if (!$this->activites->contains($activite)) {
            $this->activites[] = $activite;
            $activite->addEntreprise($this);
        }

        return $this;
    }

    public function removeActivite(Activite $activite): self
    {
        if ($this->activites->contains($activite)) {
            $this->activites->removeElement($activite);
            $activite->removeEntreprise($this);
        }

        return $this;
    }

    /**
     * @return Collection|Bureau[]
     */
    public function getBureaux(): Collection
    {
        return $this->bureaux;
    }

    public function addBureaux(Bureau $bureaux): self
    {
        if (!$this->bureaux->contains($bureaux)) {
            $this->bureaux[] = $bureaux;
            $bureaux->setEntreprise($this);
        }

        return $this;
    }

    public function removeBureaux(Bureau $bureaux): self
    {
        if ($this->bureaux->contains($bureaux)) {
            $this->bureaux->removeElement($bureaux);
            // set the owning side to null (unless already changed)
            if ($bureaux->getEntreprise() === $this) {
                $bureaux->setEntreprise(null);
            }
        }

        return $this;
    }
}
