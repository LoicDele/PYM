<?php

namespace App\Repository;

use App\Entity\Batiment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Batiment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Batiment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Batiment[]    findAll()
 * @method Batiment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BatimentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Batiment::class);
    }

    // /**
    //  * @return Batiment[] Returns an array of Batiment objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Batiment
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
