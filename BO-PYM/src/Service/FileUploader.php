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

    public function upload($file,$name)
    {
        if (is_null($file)){

        }
        else{
            
            
            try {
                if ($file->guessExtension()=="txt"){
                    $fileName =$name.'.'."babylon";
                   $file->move('uploads/modeles',$fileName); 
                }
                else {
                    $fileName = $name.'.'.$file->guessExtension();
                    $file->move('uploads/logos',$fileName);
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