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
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
class Batiment2Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Nom',TextType::class, ['attr' => ['class'=> 'form-control reg rounded']])
            ->add('Nb_etage',NumberType::class,[
                'data'=>'0',
                'attr' => ['class'=> 'reg form-control'],
                'label' => "Nombre d'étages"
            ])
            ->add('Description',TextareaType::class, ['attr' => ['class'=> 'form-control reg rounded']])
            ->add('Adresse',TextareaType::class,['attr'=>['class'=>'form-control reg rounded']])
            ->add('Acces_handicape',CheckboxType::class,[
                'required'=>false,
                'attr' => ['class' =>'form-check-input reg'],
                'label' => 'Accés handicapé'
            ])
            ->add('Etat',ChoiceType::class,[
                'choices'=>[
                    'Publié'=>true,
                    'Non Publié'=>false,
                ],
                'placeholder'=>'Etat du bâtiment',
                'label' => ' ',
                'attr' => ['class' =>'form-control reg-select'],
            ])
            ->add('Accessoire',CheckboxType::class,[
                'required'=>false,
                'attr' => ['class' =>'form-check-input reg'],
                'label' => 'Accessoire'
            ])
            ->add('Representation3D',FileType::class,[
                'required'=>false,
                'data_class'=>null,
                'attr' => ['class' => 'form-control-file'],
                'label' => 'Représentation 3D',
            ])
            ->add('Longitude',RangeType::class,[
                'attr'=>['min'=>-250,'max'=>250,'step'=>1,'value'=>'1','class' =>"reg form-control-range"],
                'label'=>'Longitude',
                'empty_data'=>'0'])

            ->add('Latitude',RangeType::class,[
                'attr'=>['min'=>-250,'max'=>250,'step'=>1,'value'=>'1','class' =>"reg form-control-range"],
                'label'=>'Latitude',
                'empty_data'=>'0'
            ])
            ->add('Angle',RangeType::class,[
                'attr'=>['min'=>0,'max'=>2*pi(),'step'=>pi()/12,'value'=>pi(),'class' =>"reg form-control-range"],
                'label'=>'Angle',
                'empty_data'=>pi()
            ])
            ->add('Echelle',RangeType::class,[
                'attr'=>['min'=>1,'max'=>3,'step'=>0.1,'class' =>"reg form-control-range"],
                'empty_data'=>'1'
            ])
            ->add('Longueur',RangeType::class,[
                'empty_data'=>'8',
                'attr' => ['class' =>"reg form-control-range"],
            ])
            ->add('Largeur',RangeType::class,[
                'empty_data'=>'8',
                'attr' => ['class' =>"reg form-control-range"],
            ])
            ->add('Rayon',RangeType::class,[
                'empty_data'=>'8',
                'attr' => ['class' =>"reg form-control-range"],
            ])
            ->add('Hauteur',RangeType::class,[
                'empty_data'=>'8',
                'attr' => ['class' =>"form-control-range"],
            ])
            ->add('TypeBatiment',EntityType::class,[
                'class'=>TypeBatiment::class,
                'choice_value'=>'Nom',
                'placeholder'=>'type bâtiment',
                'label' => ' ',
                'attr' => ['class' =>'form-control reg-select'],
            ])
            ->add('FormeParametrique',EntityType::class,[
                'class'=>FormeParametrique::class,
                'choice_value'=>'Nom',
                'placeholder'=>' ',
                'required'=>false,
                'placeholder'=>'Type de forme',
                'label' => ' ',
                'attr' => ['class' =>'form-control reg-select'],
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
