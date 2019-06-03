<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DomaineRepository")
 */
class Domaine
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Joindre un fichier png")
     * @Assert\File(mimeTypes={"image/png"})
     */
    private $Fichier;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFichier(): ?string
    {
        return $this->Fichier;
    }

    public function setFichier(string $Fichier): self
    {
        $this->Fichier = $Fichier;

        return $this;
    }
}
