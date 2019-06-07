<?php

namespace App\Controller;

use App\Entity\Poste;
use App\Entity\Bureau;
use App\Entity\Contact;
use App\Form\PosteType;
use App\Entity\Activite;
use App\Form\ContactType;
use App\Entity\Entreprise;
use App\Form\ActiviteType;
use App\Form\EntrepriseType;
use App\Service\FileUploader;
use Intervention\Image\ImageManagerStatic as Image;
use App\Form\EntrepriseEditType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
header("Access-Control-Allow-Origin: *");

class EntrepriseController extends AbstractController
{
    /**
     * @Route("/entreprises/lister", name="entreprises")
     */
    public function index()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprises = $repository->findAll();

        return  $this->render("entreprise/index.html.twig",['entreprises'=>$entreprises]);
    }

    /**
     * @Route("/entreprises/ajouter",name="entreprise_add")
     */


    public function  add(Request $request,ObjectManager $manager, FileUploader $fileUploader)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $entreprise = new Entreprise();

        $form= $this->createForm(EntrepriseType::class,$entreprise);
        $form -> handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            $repo = $this->getDoctrine()->getRepository(Activite::class);
            if ($form->get('activites')->getData() != null){
                $activite = $repo->findOneBy(['Nom'=>$form->get('activites')->getData()->getNom()]);
                if(!$activite){
                    throw $this->createNotFoundException('No activity found');
                }
                $entreprise->addActivite($activite);
                $manager->persist($activite);
            }

            $file = $entreprise->getLogo();
            $nom_entreprise = $entreprise->getNom();
            for($i=0,$size=strlen($nom_entreprise);$i<$size;$i++){
                if ($nom_entreprise[$i]==" "){
                    $nom_entreprise[$i]="_";
                }
            }
            $filename = $fileUploader->upload($file,$nom_entreprise);
            $img=Image::make('uploads/logos/'.$filename);
            $img->resize(500,500);
            $img->save('uploads/logos/'.$filename);
            $entreprise->setLogo($filename);
            

            
           
            $manager->persist($entreprise);
            $manager->flush();

            return $this->redirectToRoute('entreprises');
        }

        return $this->render("entreprise/add.html.twig",['form'=>$form->createView()]);
    }


    /**
    * @Route("/entreprises/modifier/{id}",name="entreprise_edit")
    */

    public function edit($id,Request $request,ObjectManager $manager,FileUploader $fileUploader){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise_to_edit = $repository->find($id);
        
        if (!$entreprise_to_edit){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id
            );
        }
        $file = $entreprise_to_edit->getLogo();
        $entreprise_to_edit->setLogo(new File('uploads/logos/'.$file));
        $old_value = $entreprise_to_edit->getLogo();
        $form = $this->createForm(EntrepriseType::class,$entreprise_to_edit);
        $form -> handleRequest($request);

        if($form->isSubmitted() ){

            $new_file = $form->get('Logo')->getData();
            if ($new_file != null){
                $nom_entreprise = $entreprise_to_edit->getNom();
                $filename = $fileUploader->upload($new_file,$nom_entreprise);
                $entreprise_to_edit->setLogo($filename);
            }
            else{
                $logo=$entreprise_to_edit->getLogo();
                $entreprise_to_edit->setLogo($old_value);
            }

            if ($form->get('activites')->getData()!=null){
                $entreprise_to_edit->addActivite($form->get('activites')->getData());
            }

            $manager->flush();
            
            return $this->redirectToRoute('entreprises');
        }

        return $this->render('entreprise/edit.html.twig',['entreprise'=>$entreprise_to_edit,'form' => $form->createView(),'file'=>$file]);
    }

    /**
     * @Route("/entreprises/voir/{id}",name="entreprise_show")
     */

     public function show($id){

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

         $repository = $this->getDoctrine()->getRepository(Entreprise::class);
         $entreprise = $repository->find($id);

         if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id
            );
        }

         $file = $entreprise->getLogo();
         
         $contacts = $entreprise->getContact();
         $activites = $entreprise->getActivites();

         return $this->render('entreprise/show.html.twig',['entreprise'=>$entreprise,'file'=>$file,'contacts'=>$contacts,'activites'=>$activites]);
     }

    /**
    * @Route("/entreprises/{id}/ajouter_contact",name="entreprise_add_contact")
    */

    public function add_contact($id,Request $request,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise = $repository->find($id);

        if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id
            );
        }

        $contact = new Contact;

        $form = $this->createForm(ContactType::class,$contact);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            $repo=$this->getDoctrine()->getRepository(Poste::class);
            if ($form->get('poste')->getData() != null){
                $poste = $repo->findOneBy(['Nom'=>$form->get('poste')->getData()->getNom()]);
                if (!$poste){
                    throw $this->createNotFoundException('No poste found ');
                }
                $contact->addPoste($poste);
                $manager->persist($poste);
            }
            
            $entreprise->addContact($contact);

            $manager->persist($contact);
            $manager->persist($entreprise);
            

            $manager->flush();

            return $this->redirectToRoute('entreprises');
        }
    
        return $this->render('entreprise/contact/add.html.twig',['form'=>$form->createView(),'entreprise'=>$entreprise]);
    }

    /**
     * @Route("/entreprises/ajouter_poste",name="entreprise_add_poste")
     */

    public function add_poste(Request $request, ObjectManager $manager){
        $poste=new Poste;
        $form=$this->createForm(PosteType::class,$poste);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($poste);
            $manager->flush();
            return $this->redirectToRoute('auth_connexion');
        }
        return $this->render('entreprise/poste/add.html.twig',['form'=>$form->createView()]);
    }

    /**
     * @Route("/entreprises/ajouter_activite",name="entreprise_add_activite")
     */

    public function add_activite(Request $request, ObjectManager $manager){
        $activite=new Activite;
        $form=$this->createForm(ActiviteType::class,$activite);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($activite);
            $manager->flush();
            return $this->redirectToRoute('auth_connexion');
        }
        return $this->render('entreprise/activite/add.html.twig',['form'=>$form->createView()]);
    }

    /**
    * @Route("/entreprises/{id_ent}/modifier_contact/{id_cont}",name="entreprise_edit_contact")
    */

    public function edit_contact($id_ent,$id_cont,Request $request,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise = $repository->find($id_ent);

        if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id_ent
            );
        }

        $repo=$this->getDoctrine()->getRepository(Contact::class);
        $contact = $repo->find($id_cont);

        if (!$contact){
            throw $this->createNotFoundException(
                'No contact found for id'/$id_cont
            );
        }

        

        $form = $this->createForm(ContactType::class,$contact);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()){

            if ($form->get('poste')->getData() != null){
                $repos=$this->getDoctrine()->getRepository(Poste::class);
                $poste=$repos->findOneBy(['Nom'=>$form->get('poste')->getData()->getNom()]);
                if (!$poste){
                    throw $this->createNotFoundException(
                        'No poste found'
                    );
                }
                $contact->addPoste($form->get('poste')->getData());
            }
            
            $manager->flush();
            return $this->redirectToRoute('entreprises');
        } 
    
        return $this->render('entreprise/contact/edit.html.twig',['entreprise'=>$entreprise,'contact'=>$contact,'form'=>$form->createView()]);
    }

    /**
    * @Route("/entreprises/{id_ent}/supprimer_contact/{id_cont}",name="entreprise_delete_contact")
    */

    public function delete_contact($id_ent,$id_cont,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise = $repository->find($id_ent);

        if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id_ent
            );
        }

        $repo=$this->getDoctrine()->getRepository(Contact::class);
        $contact = $repo->find($id_cont);

        if (!$contact){
            throw $this->createNotFoundException(
                'No contact found for id'/$id_cont
            );
        }

        $manager->remove($contact);
        $manager->flush();       
            
        return $this->redirectToRoute('entreprises');
    }

    /**
     * @Route("/entreprises/{id_ent}/supprimer_poste/{poste}/{id_cont}",name="entreprise_delete_poste")
     */

    public function delete_poste($id_ent,$id_cont,$poste,ObjectManager $manager){
        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise = $repository->find($id_ent);
        if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id_ent
            );
        }

        $repo=$this->getDoctrine()->getRepository(Contact::class);
        $contact = $repo->find($id_cont);

        if (!$contact){
            throw $this->createNotFoundException(
                'No contact found for id'/$id_cont
            );
        }
        $repos=$this->getDoctrine()->getRepository(Poste::class);
        $poste_to_delete = $repos->findOneBy(['Nom'=>$poste]);
        $contact->removePoste($poste_to_delete);
        $manager->flush();
        return $this->redirectToRoute('entreprises');
    }

    /**
     * @Route("/entreprises/{id_ent}/supprimer_activite/{activite}",name="entreprise_delete_activite")
     */

    public function delete_activite($id_ent,$activite,ObjectManager $manager){
        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise = $repository->find($id_ent);
        if (!$entreprise){
            throw $this->createNotFoundException(
                'No entreprise found for id'/$id_ent
            );
        }
        $repos=$this->getDoctrine()->getRepository(Activite::class);
        $activite_to_delete = $repos->findOneBy(['Nom'=>$activite]);
        $entreprise->removeActivite($activite_to_delete);
        $manager->flush();
        return $this->redirectToRoute('entreprises');
    }

    /**
    * @Route("/entreprises/supprimer/{id}",name="entreprise_delete")   
    */

    public function delete($id,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Entreprise::class);
        $entreprise_to_delete = $repository->find($id);

        $repo=$this->getDoctrine()->getRepository(Contact::class);
        $contacts_to_delete = $repo->findBy(['entreprise'=>$entreprise_to_delete]);
        for ($i=0,$size=sizeof($contacts_to_delete)-1;$i<=$size;$i++){
            $manager->remove($contacts_to_delete[$i]);
        }

        $repo2=$this->getDoctrine()->getRepository(Bureau::class);
        $bureaux=$repo2->findBy(['entreprise'=>$entreprise_to_delete]);
        for ($i=0,$size=sizeof($bureaux)-1;$i<=$size;$i++){
            $manager->remove($bureaux[$i]);
        }
        
        $manager->remove($entreprise_to_delete);
        $manager->flush();
        
        return $this->redirectToRoute('entreprises');
    }
    /**
    * @Route("/api/entreprises")
    * 
    * return array;
    */
    public function SendAllEntrepriseAction(){
        $entreprises = $this->getDoctrine()->getRepository(Entreprise::class)->findAll();
        $arrayCollection = array();
        foreach($entreprises as $item) {
            array_push($arrayCollection, array(
                'id' => $item->getId(),
                'nom' => $item->getNom(),
                'site_internet' => $item->getSiteInternet(),
                'nb_salaries' => $item->getNbSalaries(),
                'telephone' => $item->getTelephone(),
                'mail' => $item->getMail(),
                'logo' => $item->getLogo()
            ));
        }
        $response = new JsonResponse($arrayCollection);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
        /**
    * @Route("/api/contacts")
    * 
    * return array;
    */
    public function SendAllContactAction(){
        $contacts = $this->getDoctrine()->getRepository(Contact::class)->findAll();
        $arrayCollection = array();
        foreach($contacts as $item) {
            array_push($arrayCollection, array(
                'id' => $item->getId(),
                'nom' => $item->getNom(),
                'prenom' => $item->getPrenom(),
                'telephone' => $item->getTelephone(),
                'mail' => $item->getMail(),
                'idEntreprise' => $item->getEntreprise()->getId(),
            ));
        }
        $response = new JsonResponse($arrayCollection);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}