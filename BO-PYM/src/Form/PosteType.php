<?php

namespace App\Form;

use App\Entity\Poste;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class PosteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('Nom',TextType::class,['attr' => ['placeholder' => "Nom du nouveau poste", 'class' => 'reg reg-end rounded form-control'] , 'label' => ' '])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Poste::class,
        ]);
    }
}
