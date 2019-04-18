<?php

namespace App\Form;

use App\Entity\Utilisateur;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email',EmailType::class,['attr' => ['placeholder' => "Adresse email", 'class' => 'reg-email rounded form-control'] , 'label' => ' '])

            ->add('username',TextType::class, ['attr' => ['placeholder' => "Identifiant", 'class' => 'reg-username rounded form-control'] , 'label' => ' '])

            ->add('role',ChoiceType::class,['choices' => ['Admin' => "Admin",'User' => "User"] , 'label' => ' ', 'attr' => ['class' => 'role rounded rounded']])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Utilisateur::class,
        ]);
    }
}
