<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190404070038 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE activite (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(40) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE activite_entreprise (activite_id INT NOT NULL, entreprise_id INT NOT NULL, INDEX IDX_51E964159B0F88B1 (activite_id), INDEX IDX_51E96415A4AEAFEA (entreprise_id), PRIMARY KEY(activite_id, entreprise_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE activite_entreprise ADD CONSTRAINT FK_51E964159B0F88B1 FOREIGN KEY (activite_id) REFERENCES activite (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activite_entreprise ADD CONSTRAINT FK_51E96415A4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprise (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE activite_entreprise DROP FOREIGN KEY FK_51E964159B0F88B1');
        $this->addSql('DROP TABLE activite');
        $this->addSql('DROP TABLE activite_entreprise');
    }
}
