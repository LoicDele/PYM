<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190410123836 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE forme_parametrique (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE batiment ADD forme_parametrique_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE batiment ADD CONSTRAINT FK_F5FAB00CB5967262 FOREIGN KEY (forme_parametrique_id) REFERENCES forme_parametrique (id)');
        $this->addSql('CREATE INDEX IDX_F5FAB00CB5967262 ON batiment (forme_parametrique_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE batiment DROP FOREIGN KEY FK_F5FAB00CB5967262');
        $this->addSql('DROP TABLE forme_parametrique');
        $this->addSql('DROP INDEX IDX_F5FAB00CB5967262 ON batiment');
        $this->addSql('ALTER TABLE batiment DROP forme_parametrique_id');
    }
}
