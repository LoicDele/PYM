<?php

namespace App\Form;

use App\Entity\Bureau;
use App\Entity\Entreprise;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BureauType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Numero')
            ->add('Adresse')
            ->add('Etage')
            ->add('entreprise',EntityType::class,[
                'class'=>Entreprise::class,
                'choice_label'=>'Nom'
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Bureau::class,
        ]);
    }
}
