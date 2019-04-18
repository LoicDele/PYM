<?php

// src/EventListener/LogoUploadListener.php
namespace App\EventListener;

use App\Entity\Entreprise;
use App\Service\FileUploader;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class LogoUploadListener
{
    private $uploader;

    public function __construct(FileUploader $uploader)
    {
        $this->uploader = $uploader;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {
        // upload only works for Entreprise entities
        if (!$entity instanceof Entreprise) {
            return;
        }

        $file = $entity->getLogo();

        // only upload new files
        if ($file instanceof UploadedFile) {
            $fileName = $this->uploader->upload($file,$entity->getNom());
            $entity->setLogo($fileName);
        } elseif ($file instanceof File) {
            // prevents the full file path being saved on updates
            // as the path is set on the postLoad listener
            $entity->setLogo($file->getFilename());
        }
    }
}