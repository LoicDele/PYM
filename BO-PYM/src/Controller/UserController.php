<?php

namespace App\Controller;

use App\Form\UserEditType;

use App\Entity\Utilisateur;
use App\Form\RegistrationType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{


    /**
     * @Route("/users/lister", name="users")
     */
    public function index()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(Utilisateur::class);
        $users = $repository->findAll();


        return  $this->render("user/index.html.twig",['users'=>$users]);
    }


    /**
     * @Route("/users/modifier",name="user_edit")
     */
    public function edit(Request $request,ObjectManager $manager,UserPasswordEncoderInterface $encoder)
    {

        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $this -> getUser();

        $form = $this->createFormBuilder($user)
        ->add('email',EmailType::class,[
            'attr' => [
                'placeholder' => "Adresse e-mail",
                'class' => 'reg-email rounded form-control'],
                'label' => ' '])
        ->add('password',PasswordType::class,[
            'attr' => [
                'placeholder' => "Mot de passe",
                'class' => 'reg-email rounded form-control'],
                'label' => ' '])
        ->add('confirm_password',PasswordType::class,[
            'attr' => [
                'placeholder' => "Confirmation du mot de passe",
                'class' => 'reg-username rounded form-control'],
                'label' => ' '])
        ->getForm();

        $form -> handleRequest($request);


        if($form->isSubmitted() && $form->isValid()){
            

            $hash = $encoder->encodePassWord($user,$user->getPassword());
            $user->setPassword($hash);
            

            $manager->persist($user);
            $manager->flush();

            return $this->redirectToRoute('auth_connexion');
        }

    
        return $this->render("user/edit.html.twig",['user'=>$user,'form' => $form->createView()]);
    }

    /**
     * @Route("/users/modifier/{id}",name="user_edit_other")
     */

    public function edit_other($id,Request $request,ObjectManager $manager,UserPasswordEncoderInterface $encoder,\Swift_Mailer $mailer){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Utilisateur::class);
        $user_to_edit = $repository->find($id);
        if (!$user_to_edit){
            throw $this->createNotFoundException(
                'No user found for id'/$id
            );
        }

        $user = $this->getUser();

        $form = $this->createForm(UserEditType::class,$user_to_edit);
        $form -> handleRequest($request);

        if($form->isSubmitted() ){
            $password=$user_to_edit->getPassword();
            $hash = $encoder->encodePassWord($user_to_edit,$user_to_edit->getPassword());
            $user_to_edit->setPassword($hash);
            

            $message =(new \Swift_Message('Modification de votre compte'))
                -> setFrom('projetindu6@gmail.com')
                -> setTo($user_to_edit->getEmail())
                -> setBody(
                    $this->renderView(
                        "auth/email/resetpassword.html.twig",
                        ['password'=>$password]
                    )
                );

            $manager->flush();

            $mailer->send($message);        

            
            return $this->redirectToRoute('users');
        }

        return $this->render('user/edit.html.twig',['user'=>$user_to_edit,'user_connected'=>$user,'form' => $form->createView()]);
    }

    /**
     * @Route("/users/supprimer/{id}",name="user_delete")   
     */

    public function delete($id,ObjectManager $manager){

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $repository = $this->getDoctrine()->getRepository(Utilisateur::class);
        $user_to_delete = $repository->find($id);

        $manager->remove($user_to_delete);
        $manager->flush();
        
        return $this->redirectToRoute('users');
    }
}
