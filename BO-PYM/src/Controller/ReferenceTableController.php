<?php

namespace App\Controller;

use App\Entity\Poste;
use App\Form\PosteType;
use App\Entity\Activite;
use App\Entity\Entreprise;
use App\Form\ActiviteType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReferenceTableController extends AbstractController
{
    /**
     * @Route("/tables_reference/lister", name="reference_tables")
     */
    public function index()
    {

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Activite::class);
        $activites = $repository->findAll();

        $repo =$this->getDoctrine()->getRepository(Poste::class);
        $postes = $repo->findAll();

        return $this->render('reference_table/index.html.twig', [
            'activites'=>$activites,
            'postes'=>$postes
        ]);
    }

    /**
     * @Route("tables_reference/ajouter_activite",name="reference_table_add_activite")
     */

     public function add_activite(Request $request, ObjectManager $manager){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $activite=new Activite;
        $form=$this->createForm(ActiviteType::class,$activite);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($activite);
            $manager->flush();
            return $this->redirectToRoute('reference_tables');
        }
        return $this->render('entreprise/activite/add.html.twig',['form'=>$form->createView()]);
     }

     /**
     * @Route("tables_reference/modifier_activite/{id}",name="reference_table_edit_activite")
     */

    public function edit_activite($id,Request $request, ObjectManager $manager){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Activite::class);
        $activite = $repository->findOneBy(['id'=>$id]);
        
        $form=$this->createForm(ActiviteType::class,$activite);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            //$manager->persist($activite);
            $manager->flush();
            return $this->redirectToRoute('reference_tables');
        }
        return $this->render('entreprise/activite/add.html.twig',['form'=>$form->createView()]);
     }


     /**
     * @Route("tables_reference/ajouter_poste",name="reference_table_add_poste")
     */

    public function add_poste(Request $request, ObjectManager $manager){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $poste=new Poste;
        $form=$this->createForm(PosteType::class,$poste);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($poste);
            $manager->flush();
            return $this->redirectToRoute('reference_tables');
        }
        return $this->render('entreprise/poste/add.html.twig',['form'=>$form->createView()]);
     }




    /**
     * @Route("/tables_reference/supprimer_activite/{id}",name="reference_table_delete_activite")
     */

     public function delete_activite(ObjectManager $manager,$id){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Activite::class);
        $activite_to_delete = $repository->findOneBy(['id'=>$id]);

        $manager->remove($activite_to_delete);
        $manager->flush();

        return $this->redirectToRoute('reference_tables');
     }


     /**
     * @Route("tables_reference/modifier_poste/{id}",name="reference_table_edit_poste")
     */

    public function edit_poste($id,Request $request, ObjectManager $manager){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Poste::class);
        $poste = $repository->findOneBy(['id'=>$id]);
        
        $form=$this->createForm(PosteType::class,$poste);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            //$manager->persist($activite);
            $manager->flush();
            return $this->redirectToRoute('reference_tables');
        }
        return $this->render('entreprise/poste/add.html.twig',['form'=>$form->createView()]);
     }

     /**
     * @Route("/tables_reference/supprimer_poste/{id}",name="reference_table_delete_poste")
     */

    public function delete_poste(ObjectManager $manager,$id){
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Poste::class);
        $poste_to_delete = $repository->findOneBy(['id'=>$id]);

        $manager->remove($poste_to_delete);
        $manager->flush();

        return $this->redirectToRoute('reference_tables');
     }
}
