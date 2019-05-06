fileInput='Representation_3D';
formeInput='Forme_Parametrique';
PARAM_FORME='FormeParametrique';
PARAM_BAT='Representation3D';
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
	console.log('bonjour');
	var engine = undefined;
	var scene;
	document.getElementById(PARAM_TYPE_BATIMENT).oninput = function(e) {
		document.getElementById(PARAM_FORME).required=false;
		document.getElementById(PARAM_FORME).oninput = () => {};
		document.getElementById(PARAM_BAT).oninput = () => {};
		document.getElementById(PARAM_LONGITUDE).oninput = () => {};
		document.getElementById(PARAM_LARGEUR).oninput = () => {};
		document.getElementById(PARAM_LATITUDE).oninput = () => {};
		document.getElementById(PARAM_LONGUEUR).oninput = () => {};
		document.getElementById(PARAM_HAUTEUR).oninput = () => {};
		document.getElementById(PARAM_RAYON).oninput = () => {};
		document.getElementById(PARAM_ANGLE).oninput = () => {};
		document.getElementById(PARAM_ECHELLE).oninput = () => {};

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
		var canvas = document.getElementById('renderCanvas');

		var createScene = function() {
			// This creates a basic Babylon Scene object (non-mesh)
			var scene = new BABYLON.Scene(engine);

			//type arc rotate
			var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
				
			camera.lowerBetaLimit = 0.5;
			camera.upperBetaLimit = Math.PI/2 - 0.1;
			
			camera.lowerRadiusLimit = 10;
			camera.upperRadiusLimit = 150;
			
			scene.activeCamera.panningSensibility = 0;
			
			camera.useBouncingBehavior = true;
			
			// This targets the camera to scene origin
			//camera.setTarget(BABYLON.Vector3.Zero());
			
			//overwrite alpha/beta
			camera.setPosition(new BABYLON.Vector3(-30, 30, 50));

			
			// This attaches the camera to the canvas
			camera.attachControl(canvas, true);

			var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-20, -40, -20), scene);
			light.position = new BABYLON.Vector3(20, 40, 20);
			// Default intensity is 1. Let's dim the light a small amount
			light.intensity = 0.7;
						
			// environnement / skybloc
			
			scene.clearColor = new BABYLON.Color3(0.368, 0.512, 0.956);
			scene.ambientColor = BABYLON.Color3.White();

			BABYLON.SceneLoader.ImportMesh("", "./../../", "domaine.babylon", scene, function(object) {
				// You can apply properties to object.
				object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
				object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
			});
			
			var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
			// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
			var ground = BABYLON.Mesh.CreateGround("ground1", 350, 350, 20, scene);
			ground.material = new BABYLON.StandardMaterial("test_mat", scene);
			ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
			ground.receiveShadows = true;

			return scene;
		}

		var createBat = function() {
			// var reader = new FileReader();
			// var retest;
			var mesh;
			// console.log(e);
			// var test = document.getElementById(PARAM_BAT);
			// test.src = URL.createObjectURL(e.target.files[0]);
			// reader.readAsText(e.target.files[0]);
			// console.log(test);
			var longitude = document.getElementById('Longitude');
			var latitude = document.getElementById('Latitude');
			var echelle = document.getElementById('Echelle');
			var angle = document.getElementById('Angle');

			reader.addEventListener("load", function() {
				retest = reader.result;
				BABYLON.SceneLoader.ImportMesh("", "", "data:"+retest, scene, function(object) {
					// You can apply properties to object.
					mesh = object[0];
					mesh.material = new BABYLON.StandardMaterial("test_mesh", scene);
					mesh.scaling.x = echelle.value;
					mesh.scaling.y = echelle.value;
					mesh.scaling.z = echelle.value;
					mesh.position.x = longitude.value;
					mesh.position.y = latitude.value;
					mesh.rotation.y = angle.value;
				},function(){},function(){});
			}, false);

			longitude.onchange = function(){
				mesh.position.x = longitude.value;
			}
			longitude.oninput = function(){
				mesh.position.x = longitude.value;
			}
			latitude.onchange = function(){
				mesh.position.z = latitude.value;
			}
			latitude.oninput = function(){
				mesh.position.z = latitude.value;
			}
			echelle.onchange = function(){
				mesh.scaling.x = echelle.value;
				mesh.scaling.y = echelle.value;
				mesh.scaling.z = echelle.value;
			}
			echelle.oninput = function(){
				mesh.scaling.x = echelle.value;
				mesh.scaling.y = echelle.value;
				mesh.scaling.z = echelle.value;
			}
			angle.onchange = function(){
				mesh.rotation.y = angle.value;
			}
			angle.oninput = function(){
				mesh.rotation.y = angle.value;
			}
		}

		var createForme = function() {
			document.getElementById(PARAM_FORME).onchange = function(e){
				var monobjet;
				var forme = document.getElementById(PARAM_FORME).value;
				var longitude = document.getElementById(PARAM_LONGITUDE);
				var latitude = document.getElementById(PARAM_LATITUDE);
				var rotation = document.getElementById(PARAM_ANGLE);
				var modif = function(e) {
					for (var i=0;i<Cube.length;i++){
						Cube[i].hidden=true;
					}
					for (var i=0;i<Cylindre.length;i++){
						Cylindre[i].hidden=true;
					}
					for (var i=0;i<Pavé.length;i++){
						Pavé[i].hidden=true;
					}
					if(scene.meshes[scene.meshes.length-1].name == "mesh"){
						scene.meshes[scene.meshes.length-1].dispose();
					}
					var altitude = 1;
					if (forme =="Cube"){
						for(var i=0;i<Cube.length;i++){
							Cube[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateBox("mesh", {size:longueur.value}, scene);
						altitude = longueur.value;
					}
					if (forme =="Cylindre"){
						for(var i=0;i<Cylindre.length;i++){
							Cylindre[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateCylinder("mesh", {height:hauteur.value, diameter:rayon.value}, scene);
						altitude = hauteur.value;
					}
					if (forme =="Pavé"){
						for(var i=0;i<Pavé.length;i++){
							Pavé[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateBox("mesh", {height:hauteur.value, width:largeur.value, depth:longueur.value}, scene);
						altitude = hauteur.value;
					}
					monobjet.material = new BABYLON.StandardMaterial("mat",scene);
					monobjet.material.emissiveColor = new BABYLON.Color3(0,0,1);
					monobjet.rotation.y = rotation.value;
					monobjet.position.x=longitude.value;
					monobjet.position.y=altitude/2;
					monobjet.position.z=latitude.value;
				}
				modif();
				document.getElementById(PARAM_LONGUEUR).oninput = modif;
				document.getElementById(PARAM_LARGEUR).oninput = modif;
				document.getElementById(PARAM_HAUTEUR).oninput = modif;
				document.getElementById(PARAM_RAYON).oninput = modif;
				document.getElementById(PARAM_LONGITUDE).oninput = modif;
				document.getElementById(PARAM_LATITUDE).oninput = modif;
				document.getElementById(PARAM_ANGLE).oninput = modif;
			}
		}

		var createEquip = function() {
			var equip;
			var echelle = document.getElementById(PARAM_ECHELLE);
			var longitude = document.getElementById(PARAM_LONGITUDE);
			var latitude = document.getElementById(PARAM_LATITUDE);
			var rotation = document.getElementById(PARAM_ANGLE);

			BABYLON.SceneLoader.ImportMesh("", "./../../", imported_object, scene, function(object){
				equip = object[0];
				equip.scaling = new BABYLON.Vector3(echelle.value, echelle.value, echelle.value);
				equip.position.x = longitude.value;
				equip.position.z = latitude.value;
				equip.rotation.y = rotation.value;
			});

			var modif = function(e) {
				equip.scaling = new BABYLON.Vector3(echelle.value, echelle.value, echelle.value);
				equip.position.x = longitude.value;
				equip.position.z = latitude.value;
				equip.rotation.y = rotation.value;
			}

			echelle.oninput = modif;
			longitude.oninput = modif;
			latitude.oninput = modif;
			rotation.oninput = modif;
		}

		if(engine != undefined){
			// console.log(scene.meshes);
			// console.log(scene);
			// for(var i = 0; i<scene.meshes.length; i++){
			// 	if(scene.meshes[i].name != "ground1"){
			// 		scene.meshes[i].dispose();
			// 	}
			// }
			// console.log(scene.meshes);
			// BABYLON.SceneLoader.ImportMesh("", "./../../", "domaine.babylon", scene, function(object) {
			// 	// You can apply properties to object.
			// 	object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
			// 	object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
			// });
			scene.dispose();
			scene = createScene();
		}
		else{
			canvas.style.display = "";
			engine = new BABYLON.Engine(canvas, false);
			engine.enableOfflineSupport = false;
			scene = createScene();
			engine.runRenderLoop(function(){
				scene.render();
			});
	
			// the canvas/window resize event handler
			window.addEventListener('resize', function(){
				engine.resize();
			});
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Arret de bus"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
			var imported_object = PARAM_EQUIPEMENT_ARRET;
			canvas.style.display = "";
			
			// call the createScene function
			createEquip();
			// run the render loop
			engine.runRenderLoop(function(){
				scene.render();
			});
	
			// the canvas/window resize event handler
			window.addEventListener('resize', function(){
				engine.resize();
			});
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="PAV"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
			var imported_object = PARAM_EQUIPEMENT_PAV;
			
			// call the createScene function
			createEquip();
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="IRVE"){
			for (var i=0;i<position.length;i++){
				if (position[i].id != fileInput && position[i].id != formeInput){
					position[i].hidden=false;
				}
			}
			var imported_object = PARAM_EQUIPEMENT_IRVE;

			// canvas.style.display = "";
			
			// // call the createScene function
			createEquip();
			// // run the render loop
			// engine.runRenderLoop(function(){
			// 	scene.render();
			// });
	
			// // the canvas/window resize event handler
			// window.addEventListener('resize', function(){
			// 	engine.resize();
			// });
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Forme Paramétrique"){
			for (var i=0;i<FP.length;i++){
					FP[i].hidden=false;
					position[i].hidden=false;
			}
			document.getElementById(PARAM_FORME).required=true;
			var longueur = document.getElementById(PARAM_LONGUEUR);
			var largeur = document.getElementById(PARAM_LARGEUR);
			var hauteur = document.getElementById(PARAM_HAUTEUR);
			var rayon = document.getElementById(PARAM_RAYON);
			var longitude = document.getElementById(PARAM_LONGITUDE);
			var latitude = document.getElementById(PARAM_LATITUDE);
			var rotation = document.getElementById(PARAM_ANGLE);

			// canvas.style.display = "";
			
			// // call the createScene function
			createForme();
			// // run the render loop
			// console.log(scene);
			// engine.runRenderLoop(function(){
			// 	scene.render();
			// });
			// // the canvas/window resize event handler
			// window.addEventListener('resize', function(){
			// 	engine.resize();
			// });
		}

		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Batiment"){
			for (var i=0;i<Modele.length;i++){
				Modele[i].hidden=false;
			}
			var reader;
			var test;
			document.getElementById(PARAM_BAT).onchange = function(e) {
				canvas.style.display = "";

				var files = document.getElementById(PARAM_BAT).files;
				reader = new FileReader();
				var retest;
				test = document.getElementById(PARAM_BAT);
				test.src = URL.createObjectURL(e.target.files[0]);
				reader.readAsText(e.target.files[0]);

				
				// call the createScene function
				createBat();
				// run the render loop
				// engine.runRenderLoop(function(){
				// 	scene.render();
				// });
				
				// // the canvas/window resize event handler
				// window.addEventListener('resize', function(){
				// 	engine.resize();
				// });
			}
		}
	}
});