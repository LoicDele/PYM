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
     * @Route("/reference_tables/index", name="reference_tables")
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
     * @Route("reference_tables/add_activite",name="reference_table_add_activite")
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
     * @Route("reference_tables/add_poste",name="reference_table_add_poste")
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
     * @Route("/reference_table/delete_activite/{id}",name="reference_table_delete_activite")
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
     * @Route("/reference_table/delete_poste/{id}",name="reference_table_delete_poste")
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
