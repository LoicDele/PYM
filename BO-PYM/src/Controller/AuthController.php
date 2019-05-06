<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Form\RegistrationType;
use App\Form\ResetPasswordType;

use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthController extends AbstractController
{

    /**
     * @Route("/users/add", name="add_user")
     */
    public function registration(\Swift_Mailer $mailer,Request $request,ObjectManager $manager,UserPasswordEncoderInterface $encoder)
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        
        $user = new Utilisateur();

        $form = $this->createForm(RegistrationType::class,$user);
        $form -> handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $chaine='azertyuiopqsdfghjklmwxcvbn123456789';
            $nb_lettre=strlen($chaine);
            $nb_car = mt_rand(8,12);
            $password='';
            for ($i=0;$i<$nb_car;$i++){
                $pos=mt_rand(0,$nb_lettre-1);
                $car=$chaine[$pos];
                $password .=$car;
            }

            $hash = $encoder->encodePassWord($user,$password);
            $user->setPassword($hash);
            $user->setUsername($user->getEmail());
            $user->setRole("Admin");
            $manager->persist($user);
            $manager->flush();

            $message =(new \Swift_Message('Voici votre mot de passe'))
            -> setFrom('projetindu6@gmail.com')
            -> setTo($user->getEmail())
            -> setBody(
                $this->renderView(
                    "email/resetpassword.html.twig",
                    ['password'=>$password,'role'=>$user->getRoles()]
                )
            );

            $mailer->send($message);

            return $this->redirectToRoute('users');
        }

        return $this->render('auth/registration.html.twig', [
            'form' => $form->createView()
        ]);
    }
    /**
     * @Route("/",name="auth_connexion")
     */
    public function login(AuthenticationUtils $authUtils){
        $error=$authUtils->getLastAuthenticationError();
        return $this->render('auth/login.html.twig',[
            'error'=>$error
        ]);
    }

    /**
     * @Route("/deconnexion",name="auth_deconnexion")
     */

    public function deconnexion(){

    }

    /**
     * @Route("/reset_password",name="auth_resetpassword")
     */

    public function reset_password(ObjectManager $manager,Request $request,\Swift_Mailer $mailer,UserPasswordEncoderInterface $encoder){

        $user = new Utilisateur();
        
        $form = $this->createForm(ResetPasswordType::class,$user);
        $form -> handleRequest($request);

        $email=$user->getEmail();

        if($form->isSubmitted() && $form->isValid()){

            $repository = $this->getDoctrine()->getRepository(Utilisateur::class);
            $user = $repository->findOneBy(['email'=>$email]);

            if (!$user){
                $error="Email non existant";
                return $this->render('auth/resetpassword.html.twig', [
                    'form' => $form->createView(),
                    'error'=>$error
                ]);
            }

            $chaine='azertyuiopqsdfghjklmwxcvbn123456789';
            $nb_lettre=strlen($chaine);
            $nb_car = mt_rand(8,12);
            $password='';
            for ($i=0;$i<$nb_car;$i++){
                $pos=mt_rand(0,$nb_lettre-1);
                $car=$chaine[$pos];
                $password .=$car;
            }

            $hash = $encoder->encodePassWord($user,$password);
            $user->setPassword($hash);

            $message =(new \Swift_Message('Récupération du mot de passe'))
                -> setFrom('projetindu6@gmail.com')
                -> setTo($email)
                -> setBody(
                    $this->renderView(
                        "email/resetpassword.html.twig",
                        ['password'=>$password]
                    )
                );

            $manager->persist($user);
            $manager->flush();

            $mailer->send($message);        

            return $this->redirectToRoute('auth_connexion');
        }
        $error=null;
        return $this->render('auth/resetpassword.html.twig', [
            'form' => $form->createView(),
            'error'=>$error
        ]);
    }
}
