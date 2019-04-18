<?php

namespace App\Repository;

use App\Entity\FormeParametrique;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method FormeParametrique|null find($id, $lockMode = null, $lockVersion = null)
 * @method FormeParametrique|null findOneBy(array $criteria, array $orderBy = null)
 * @method FormeParametrique[]    findAll()
 * @method FormeParametrique[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FormeParametriqueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, FormeParametrique::class);
    }

    // /**
    //  * @return FormeParametrique[] Returns an array of FormeParametrique objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FormeParametrique
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
