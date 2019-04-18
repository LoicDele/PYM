<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190410123310 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bureau ADD batiment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bureau ADD CONSTRAINT FK_166FDEC4D6F6891B FOREIGN KEY (batiment_id) REFERENCES batiment (id)');
        $this->addSql('CREATE INDEX IDX_166FDEC4D6F6891B ON bureau (batiment_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bureau DROP FOREIGN KEY FK_166FDEC4D6F6891B');
        $this->addSql('DROP INDEX IDX_166FDEC4D6F6891B ON bureau');
        $this->addSql('ALTER TABLE bureau DROP batiment_id');
    }
}
