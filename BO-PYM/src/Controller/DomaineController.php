<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DomaineController extends AbstractController
{
    /**
     * @Route("/domaine", name="domaine")
     */
    public function index()
    {
        return $this->render('domaine/index.html.twig', [
            'controller_name' => 'DomaineController',
        ]);
    }
}
