<?php

namespace App\Form;

use App\Entity\Batiment;
use App\Entity\TypeBatiment;
use App\Entity\FormeParametrique;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\RangeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class BatimentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Nom',TextType::class,[
                'label'=>'Nom du batiment'
            ])
            ->add('Nb_etage',null,[
                'data'=>'1',
                'label'=>"Nombre d'étages"
                ])
            ->add('Description',TextType::class,[
                'label'=>'Description'
            ])
            ->add('Acces_handicape',CheckboxType::class,[
                'label'=>'Accès handicapé',
                'required'=>false
            ])
            ->add('TypeBatiment',EntityType::class,[
                'class'=>TypeBatiment::class,
                'label'=>'Sélectionner le type de bâtiment',
                'placeholder'=>'Type de bâtiment'
                
            ])
            ->add('Etat',ChoiceType::class,[
                 'choices'=>['Publié'=>true,'Non Publié'=>false],
                 'label'=>'Etat'
            ])
            ;
        ;

        $formModifier = function(FormInterface $form, TypeBatiment $type=null){
            if ($type=="Batiment"){
                $form->add('Representation3D',FileType::class,[
                    'label'=>'Modèle 3D'
                ]);
                $form->add('Echelle',RangeType::class,[
                    'attr'=>['min'=>1,'max'=>3,'step'=>0.1],
                    'label'=>'Echelle'
                ]);
            }
            if ($type=="Forme Paramétrique"){
                $form->add('FormeParametrique',EntityType::class,[
                    'class'=>FormeParametrique::class,
                    'label'=>'Forme Paramétrique',
                    'choice_value'=>'Nom',
                    'placeholder'=>' '
                ]);
                $form->add('Longueur',RangeType::class,[
                    'label'=>'Longueur'
                ]);
                $form->add('Largeur',RangeType::class,[
                    'label'=>'Largeur'
                ]);
                $form->add('Hauteur',RangeType::class,[
                    'label'=>'Hauteur'
                ]);
                $form->add('Rayon',RangeType::class,[
                    'label'=>'Rayon'
                ]);
                $form->add('Echelle',HiddenType::class,[
                    'label'=>'Echelle',
                    'empty_data'=>'1'
                ]);
            }
            if ((($type=="IRVE") or ($type=="PAV"))or ($type=="Arret de bus")){
                $form->add('Echelle',RangeType::class,[
                    'attr'=>['min'=>1,'max'=>3,'step'=>0.1,'value'=>'2'],
                    'label'=>'Echelle'
                ]);
            }
            $form->add('Longitude',RangeType::class,[
                'attr'=>['min'=>-100,'max'=>100,'step'=>1,'value'=>'1'],
                'label'=>'Longitude'
            ]);
            $form->add('Latitude',RangeType::class,[
                'attr'=>['min'=>-100,'max'=>100,'step'=>1,'value'=>'1'],
                'label'=>'Latitude'
            ]);
            $form->add('Angle',RangeType::class,[
                'attr'=>['min'=>0,'max'=>2*pi(),'step'=>pi()/12,'value'=>pi()],
                'label'=>'Angle'
            ]);
        };

        $builder->get('TypeBatiment')->addEventListener(
            FormEvents::POST_SUBMIT,
            function(FormEvent $event) use ($formModifier){
                $type = $event->getForm()->getData();
                $formModifier($event->getForm()->getParent(),$type);
            }
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Batiment::class,
            "allow_extra_fields" => true
        ]);
    }
}
