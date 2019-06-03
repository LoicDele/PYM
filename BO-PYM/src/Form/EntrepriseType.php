<?php

namespace App\Form;

use App\Entity\Activite;
use App\Entity\Entreprise;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;

class EntrepriseType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('Nom',TextType::class,['attr' => ['placeholder' => "Nom", 'class' => 'reg rounded form-control'] , 'label' => ' '])
            ->add('Site_Internet',TextType::class,['attr' => ['placeholder' => "Site internet", 'class' => 'reg rounded form-control'] , 'label' => ' '])
            ->add('Nb_Salaries',NumberType::class,['attr' => ['placeholder' => "Nombre de salariés", 'class' => 'reg rounded form-control'] , 'label' => ' '])
            ->add('Telephone',TelType::class,['attr' => ['placeholder' => "Numéro de téléphone", 'class' => 'reg rounded form-control'] , 'label' => ' '])
            ->add('Mail',EmailType::class,['attr' => ['placeholder' => "Adresse email", 'class' => 'reg rounded form-control'] , 'label' => ' '])
            ->add('activites',EntityType::class,array(
                'required'=>false,
                'class'=>Activite::class,
                'choice_label'=>'Nom',  
                'mapped'=>false,
                'label'=>' ',
                'placeholder'=>'Choisir une activite',
                'attr' => ['class' => 'reg reg-end rounded form-control']
            ))
            ->add('Logo',FileType::class,['label'=>'Importer un logo: (JPEG ou PNG)','required'=>false, 'attr' => ['class' => 'import btn']])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Entreprise::class,
        ]);
    }
}
