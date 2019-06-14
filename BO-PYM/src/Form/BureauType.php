<?php

namespace App\Form;

use App\Entity\Bureau;
use App\Entity\Entreprise;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
class BureauType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Numero' ,NumberType::class,[ 'required' => false, 'attr' => ['class' => 'reg rounded form-control', 'id' =>"numero"], 'label' => 'Numéro'])
            ->add('Etage' ,NumberType::class,[ 'required' => false, 'attr' => ['class' => 'reg rounded form-control', 'id' =>"etage"], 'label' => 'Étage'])
            ->add('Entreprise',EntityType::class,[
                'class'=>Entreprise::class,
                'attr' => ['class' => 'reg rounded form-control'],
                'choice_label'=>'Nom',
                'label' => 'Entreprise',
                'placeholder'=>'Choisir',
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
