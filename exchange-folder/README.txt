dans cmd:
sudo a2enmod headers

mettre 000-default.conf dans /etc/apache2/sites-enabled/

changer les lignes
	Alias "/sharedfolder/" "CHEMIN_D'ACCES/PYM/BO-PYM/public/uploads/"

	<Directory "CHEMIN_D'ACCES/PYM/BO-PYM/public/uploads/">
	
mettre le chemin vers le projet 

dans cmd:
sudo systemctl apache2 restart
sudo service apache2 reload
