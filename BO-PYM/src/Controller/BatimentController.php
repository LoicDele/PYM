<?php

namespace App\Controller;

use App\Entity\Bureau;
use App\Entity\Batiment;
use App\Form\BureauType;
use App\Entity\Entreprise;
use App\Form\BatimentType;
use App\Entity\TypeBatiment;
use App\Service\FileUploader;
use App\Form\Batiment2Type;
use App\Entity\FormeParametrique;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
header("Access-Control-Allow-Origin: *");

class BatimentController extends AbstractController
{
    /**
     * @Route("/batiments/index", name="batiments")
     */
    public function index()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Batiment::class);
        $batiments = $repository->findAll();

        return $this->render('batiment/index.html.twig', [
            'batiments'=>$batiments
        ]);
    }

    /**
     * @Route("/batiment/add/0",name="batiment_add")
     */

    public function new(Request $request,ObjectManager $manager,FileUploader $fileUploader){
        $this->denyAccessUnlessGranted('ROLE_ADMIN');


        $batiment=new Batiment;

        $form=$this->createForm(Batiment2Type::class,$batiment);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            switch($batiment->getTypeBatiment()){
                case "Arret de bus":
                    $batiment->setRepresentation3D("ARRET.babylon");
                    break;
                case "PAV":
                    $batiment->setRepresentation3D("ARRET.babylon");
                    break;
                case "IRVE":
                    $batiment->setRepresentation3D("ARRET.babylon");
                    break;
                case "Batiment":
                    $model = $form->get('Representation3D')->getData();
                    $nom_batiment=$batiment->getNom();
                    for($i=0,$size=strlen($nom_batiment);$i<$size;$i++){
                        if ($nom_batiment[$i]==" "){
                            $nom_batiment[$i]="_";
                        }
                    }
                    $filename = $fileUploader->upload($model,$nom_batiment);
                    $batiment->setRepresentation3D($filename);
                    break;
                case "Forme Paramétrique":
                    if ($batiment->getFormeParametrique() == null){
                        // return new Response("Veuillez saisir une forme paramétrique.");
                    }
                    
            }
            
            $manager->persist($batiment);
            $manager->flush();
            return $this->redirectToRoute('batiments/index');
        }
        return $this->render('batiment/add2.html.twig',[
            'form'=>$form->createView()
        ]);
    }

    /**
     * @Route("batiment/edit/{id}",name="batiment_edit")
     */

     public function edit($id,ObjectManager $manager, Request $request,FileUploader $fileUploader){
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository=$this->getDoctrine()->getRepository(Batiment::class);
        $batiment=$repository->find($id);

        if (!$batiment){
            throw $this->createNotFoundException(
                'No batiment found for id'/$id
            );
        }        

        $form=$this->createForm(Batiment2Type::class,$batiment);
        $form->handleRequest($request);

        
        if ($form->isSubmitted() && $form->isValid()){
            if ($batiment->getTypeBatiment()=="Arret de bus"){
                $batiment->setRepresentation3D("ARRET.babylon");
            }
            if ($batiment->getTypeBatiment()=="PAV"){
                $batiment->setRepresentation3D("ARRET.babylon");
            }
            if ($batiment->getTypeBatiment()=="IRVE"){
                $batiment->setRepresentation3D("ARRET.babylon");
            }
            if ($batiment->getTypeBatiment()=="Batiment"){
                $model = $form->get('Representation3D')->getData();
                $nom_batiment=$batiment->getNom();
                for($i=0,$size=strlen($nom_batiment);$i<$size;$i++){
                    if ($nom_batiment[$i]==" "){
                        $nom_batiment[$i]="_";
                    }
                }
                $filename = $fileUploader->upload($model,$nom_batiment);
                $batiment->setRepresentation3D($filename);
            }
            $manager->flush();
            return $this->redirectToRoute('batiments');
        }

        return $this->render('batiment/edit.html.twig',[
            'form'=>$form->createView(),'batiment'=>$batiment
            ]);
     }

    /**
     * @Route("batiments/{id}/add_bureau",name="batiment_add_bureau")
     */

    public function add_bureau($id,Request $request,ObjectManager $manager){
        
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Batiment::class);
        $batiment = $repository->find($id);

        if (!$batiment){
            throw $this->createNotFoundException(
                'No batiment found for id'/$id
            );
        }
        $repo=$this->getDoctrine()->getRepository(Entreprise::class);
        $entreprises=$repo->findAll();

        $bureau = new Bureau;

        $form = $this->createForm(BureauType::class,$bureau);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){
            $bureau->setBatiment($batiment);
            $entreprise=$bureau->getEntreprise();
            $entreprise->addBureaux($bureau);
            $batiment->addBureaux($bureau);
            $manager->persist($bureau);
            $manager->persist($entreprise);
            $manager->persist($batiment);
            $manager->flush();
            return $this->redirectToRoute('batiments');
        }
    
        return $this->render('batiment/bureau/add.html.twig',['form'=>$form->createView(),'entreprises'=>$entreprises]);
    }

    /**
    * @Route("/batiments/{id_bat}/edit_bureau/{id_bur}",name="batiment_edit_bureau")
    */

    public function edit_bureau($id_bat,$id_bur,ObjectManager $manager,Request $request){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Batiment::class);
        $batiment = $repository->find($id_bat);

        if (!$batiment){
            throw $this->createNotFoundException(
                'No batiment found for id'/$id_bat
            );
        }

        $repo=$this->getDoctrine()->getRepository(Bureau::class);
        $bureau = $repo->find($id_bur);

        if (!$bureau){
            throw $this->createNotFoundException(
                'No bureau found for id'/$id_bur
            );
        }

        $form = $this->createForm(BureauType::class,$bureau);
        $form ->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->flush();
            return $this->redirectToRoute('batiments');
        }
        
        return $this->render('batiment/bureau/edit.html.twig',['form'=>$form->createView(),'bureau'=>$bureau]);
        
    }

    /**
     * @Route("batiments/{id_bur}/delete_bureau",name="batiment_delete_bureau")
     */

     public function delete_bureau($id_bur,ObjectManager $manager){
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Bureau::class);
        $bureau = $repository->find($id_bur);

        if (!$bureau){
            throw $this->createNotFoundException(
                'No bureau found for id'/$id_bur
            );
        }
        $manager->remove($bureau);
        $manager->flush();

        return $this->redirectToRoute('batiments');
     }

     /**
    * @Route("batiments/delete/{id}",name="batiment_delete")   
    */

    public function delete($id,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Batiment::class);
        $batiment_to_delete = $repository->find($id);

        $repo=$this->getDoctrine()->getRepository(Bureau::class);
        $bureaux_to_delete = $repo->findBy(['Batiment'=>$batiment_to_delete]);
        for ($i=0,$size=sizeof($bureaux_to_delete)-1;$i<=$size;$i++){
            $manager->remove($bureaux_to_delete[$i]);
        }

        $manager->remove($batiment_to_delete);
        
        $manager->flush();
        
        return $this->redirectToRoute('batiments');
    }

    /**
    * @Route("/api/batiments")
    * 
    * return array;
    */
    public function SendAllBatimentAction(){
        $batiments = $this->getDoctrine()->getRepository(Batiment::class)->findAll();
        $arrayCollection = array();
        foreach($batiments as $item) {
            if($item->getEtat() == true)
                if($item->getTypeBatiment()->getNom() == "Forme Paramétrique"){
                    array_push($arrayCollection, array(
                        'id' => $item->getId(),
                        'nom' => $item->getNom(),
                        'nbEtage' => $item->getNbEtage(),
                        'description' => $item->getDescription(),
                        'accesHandicape' => $item->getAccesHandicape(),
                        'url' => $item->getRepresentation3D(),
                        'x' => $item->getLongitude(),
                        'y' => $item->getLatitude(),
                        'largeur' => $item->getLargeur(),
                        'longueur' => $item->getLongueur(),
                        'rayon' => $item->getRayon(),
                        'hauteur' => $item->getHauteur(),
                        'angle' => $item->getAngle(),
                        'scale' => $item->getEchelle(),
                        'type' => $item->getTypeBatiment()->getNom(),
                        'formeParamétrique' => $item->getFormeParametrique()->getNom(),
                    ));
                }
                else{
                    array_push($arrayCollection, array(
                        'id' => $item->getId(),
                        'nom' => $item->getNom(),
                        'nbEtage' => $item->getNbEtage(),
                        'description' => $item->getDescription(),
                        'accesHandicape' => $item->getAccesHandicape(),
                        'url' => $item->getRepresentation3D(),
                        'x' => $item->getLongitude(),
                        'y' => $item->getLatitude(),
                        'largeur' => $item->getLargeur(),
                        'longueur' => $item->getLongueur(),
                        'rayon' => $item->getRayon(),
                        'hauteur' => $item->getHauteur(),
                        'angle' => $item->getAngle(),
                        'scale' => $item->getEchelle(),
                        'type' => $item->getTypeBatiment()->getNom(),
                        'formeParamétrique' => null,
                    ));

                }

        }
        $response = new JsonResponse($arrayCollection);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    
}

