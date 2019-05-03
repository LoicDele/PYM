<?php

namespace App\Form;

use App\Entity\Batiment;
use App\Entity\TypeBatiment;
use App\Entity\FormeParametrique;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class Batiment2Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Nom')
            ->add('Nb_etage',null,[
                'data'=>'1'
            ])
            ->add('Description',TextareaType::class)
            ->add('Acces_handicape',CheckboxType::class,[
                'required'=>false
            ])
            ->add('Etat',ChoiceType::class,[
                'choices'=>[
                    'Publié'=>true,
                    'Non Publié'=>false
                ],
                'placeholder'=>' '
            ])
            ->add('Representation3D',FileType::class,[
                'required'=>false,
                'data_class'=>null
            ])
            ->add('Longitude',RangeType::class,[
                'attr'=>['min'=>-100,'max'=>100,'step'=>1,'value'=>'1'],
                'label'=>'Longitude',
                'empty_data'=>'0'])

            ->add('Latitude',RangeType::class,[
                'attr'=>['min'=>-100,'max'=>100,'step'=>1,'value'=>'1'],
                'label'=>'Latitude',
                'empty_data'=>'0'
            ])
            ->add('Angle',RangeType::class,[
                'attr'=>['min'=>0,'max'=>2*pi(),'step'=>pi()/12,'value'=>pi()],
                'label'=>'Angle',
                'empty_data'=>pi()
            ])
            ->add('Echelle',RangeType::class,[
                'attr'=>['min'=>1,'max'=>3,'step'=>0.1],
                'empty_data'=>'1'
            ])
            ->add('Longueur',RangeType::class,[
                'empty_data'=>'8'
            ])
            ->add('Largeur',RangeType::class,[
                'empty_data'=>'8'
            ])
            ->add('Rayon',RangeType::class,[
                'empty_data'=>'8'
            ])
            ->add('Hauteur',RangeType::class,[
                'empty_data'=>'8'
            ])
            ->add('TypeBatiment',EntityType::class,[
                'class'=>TypeBatiment::class,
                'choice_value'=>'Nom',
                'placeholder'=>' '
            ])
            ->add('FormeParametrique',EntityType::class,[
                'class'=>FormeParametrique::class,
                'choice_value'=>'Nom',
                'placeholder'=>' ',
                'required'=>false
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Batiment::class,
        ]);
    }
}
