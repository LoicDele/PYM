<?php

// src/Service/FileUploader.php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Response;

class FileUploader
{
    private $targetDirectory;

    public function __construct($targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }

    public function upload($file,$name,$domaine=0)
    {
        if (is_null($file)){

        }
        else{
            
            
            try {
                if ($file->guessExtension()=="txt"){
                    $fileName =$name.'.'."babylon";
                   $file->move($this->getTargetDirectory().'modeles',$fileName); 
                }
                elseif($domaine != 0){
                    $fileName = $name.'.'.$file->guessExtension();
                    $file->move($this->getTargetDirectory().'domaine',$fileName);
                }
                else {
                    $fileName = $name.'.'.$file->guessExtension();
                    $file->move($this->getTargetDirectory().'logos',$fileName);
                }
            } catch (FileException $e) {
            // ... handle exception if something happens during file upload
            }

        return $fileName;
        }
    }
    
    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }
}