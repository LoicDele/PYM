<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190410123527 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE type_batiment (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE batiment ADD type_batiment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE batiment ADD CONSTRAINT FK_F5FAB00C9DEF5E8A FOREIGN KEY (type_batiment_id) REFERENCES type_batiment (id)');
        $this->addSql('CREATE INDEX IDX_F5FAB00C9DEF5E8A ON batiment (type_batiment_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE batiment DROP FOREIGN KEY FK_F5FAB00C9DEF5E8A');
        $this->addSql('DROP TABLE type_batiment');
        $this->addSql('DROP INDEX IDX_F5FAB00C9DEF5E8A ON batiment');
        $this->addSql('ALTER TABLE batiment DROP type_batiment_id');
    }
}
