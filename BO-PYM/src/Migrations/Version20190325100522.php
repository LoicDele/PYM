<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190325100522 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE entreprise (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(30) NOT NULL, site_internet VARCHAR(200) NOT NULL, nb_salaries INT NOT NULL, telephone VARCHAR(20) NOT NULL, mail VARCHAR(40) NOT NULL, logo VARCHAR(40) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact ADD entreprise_id INT NOT NULL');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638A4AEAFEA FOREIGN KEY (entreprise_id) REFERENCES entreprise (id)');
        $this->addSql('CREATE INDEX IDX_4C62E638A4AEAFEA ON contact (entreprise_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E638A4AEAFEA');
        $this->addSql('DROP TABLE entreprise');
        $this->addSql('DROP INDEX IDX_4C62E638A4AEAFEA ON contact');
        $this->addSql('ALTER TABLE contact DROP entreprise_id');
    }
}
