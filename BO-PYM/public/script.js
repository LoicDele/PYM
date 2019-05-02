fileInput='Representation_3D';
formeInput='Forme_Parametrique';
PARAM_FORME='FormeParametrique';
PARAM_TYPE_BATIMENT='TypeBatiment';
PARAM_EQUIPEMENT_IRVE = 'ARRET.babylon';
PARAM_EQUIPEMENT_PAV = 'ARRET.babylon';
PARAM_EQUIPEMENT_ARRET = 'ARRET.babylon';
PARAM_LONGITUDE = 'Longitude';
PARAM_LATITUDE = 'Latitude';
PARAM_LONGUEUR = 'Longueur';
PARAM_LARGEUR = 'Largeur';
PARAM_HAUTEUR = 'Hauteur';
PARAM_RAYON = 'Rayon'
PARAM_ANGLE = 'Angle';
PARAM_ECHELLE = 'Echelle';

window.addEventListener('DOMContentLoaded', function() {
	document.getElementById(PARAM_TYPE_BATIMENT).onchange = function(e) {
		var position= document.getElementsByClassName("position");
		var FP= document.getElementsByClassName("FP");
		var Modele= document.getElementsByClassName("Modele");
		var Cube= document.getElementsByClassName("Cube");
		var Cylindre= document.getElementsByClassName("Cylindre");
		var Pavé= document.getElementsByClassName("Pavé");
		for (var i=0;i<position.length;i++){
			position[i].hidden=true;
		}
		for (var i=0;i<FP.length;i++){
			FP[i].hidden=true;
		}
		for (var i=0;i<Modele.length;i++){
			Modele[i].hidden=true;
		}
		for (var i=0;i<Cube.length;i++){
			Cube[i].hidden=true;
		}
		for (var i=0;i<Cylindre.length;i++){
			Cylindre[i].hidden=true;
		}
		for (var i=0;i<Pavé.length;i++){
			Pavé[i].hidden=true;
		}

		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Arret de bus"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="PAV"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="IRVE"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Forme Paramétrique"){
			for (var i=0;i<FP.length;i++){
					FP[i].hidden=false;
					position[i].hidden=false;
			}
			document.getElementById(PARAM_FORME).onchange = function(e){
				for (var i=0;i<Cube.length;i++){
					Cube[i].hidden=true;
				}
				for (var i=0;i<Cylindre.length;i++){
					Cylindre[i].hidden=true;
				}
				for (var i=0;i<Pavé.length;i++){
					Pavé[i].hidden=true;
				}
				if (document.getElementById(PARAM_FORME).value =="Cube"){
					for(var i=0;i<Cube.length;i++){
						Cube[i].hidden=false;
					}
				}
				if (document.getElementById(PARAM_FORME).value =="Cylindre"){
					for(var i=0;i<Cylindre.length;i++){
						Cylindre[i].hidden=false;
					}
				}
				if (document.getElementById(PARAM_FORME).value =="Pavé"){
					for(var i=0;i<Pavé.length;i++){
						Pavé[i].hidden=false;
					}
				}
			}
		}

		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Batiment"){
			for (var i=0;i<Modele.length;i++){
				Modele[i].hidden=false;
			}
		}
	}
});