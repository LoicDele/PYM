<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190401113637 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE poste (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(40) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact_poste (contact_id INT NOT NULL, poste_id INT NOT NULL, INDEX IDX_51A31FA4E7A1254A (contact_id), INDEX IDX_51A31FA4A0905086 (poste_id), PRIMARY KEY(contact_id, poste_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact_poste ADD CONSTRAINT FK_51A31FA4E7A1254A FOREIGN KEY (contact_id) REFERENCES contact (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE contact_poste ADD CONSTRAINT FK_51A31FA4A0905086 FOREIGN KEY (poste_id) REFERENCES poste (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact_poste DROP FOREIGN KEY FK_51A31FA4A0905086');
        $this->addSql('DROP TABLE poste');
        $this->addSql('DROP TABLE contact_poste');
    }
}
