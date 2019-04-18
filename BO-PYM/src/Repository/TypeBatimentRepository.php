<?php

namespace App\Repository;

use App\Entity\TypeBatiment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method TypeBatiment|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeBatiment|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeBatiment[]    findAll()
 * @method TypeBatiment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeBatimentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, TypeBatiment::class);
    }

    // /**
    //  * @return TypeBatiment[] Returns an array of TypeBatiment objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TypeBatiment
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
