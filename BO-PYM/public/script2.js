fileInput='Representation_3D';
formeInput='Forme_Parametrique';
PARAM_FORME='FormeParametrique';
PARAM_BAT='Representation3D';
PARAM_TYPE_BATIMENT='TypeBatiment';
PARAM_EQUIPEMENT_IRVE = 'IRVE.babylon';
PARAM_EQUIPEMENT_PAV = 'PAV_Poubelles.babylon';
PARAM_EQUIPEMENT_ARRET = 'ARRET.babylon';
PARAM_LONGITUDE = 'Longitude';
PARAM_LATITUDE = 'Latitude';
PARAM_LONGUEUR = 'Longueur';
PARAM_LARGEUR = 'Largeur';
PARAM_HAUTEUR = 'Hauteur';
PARAM_RAYON = 'Rayon'
PARAM_ANGLE = 'Angle';
PARAM_ECHELLE = 'Echelle';
LISTE_BATIMENTS = [];
ID_BAT = 0;
PARAM_URL = "http://127.0.0.1:8000/uploads/modeles/";

window.addEventListener('DOMContentLoaded', function() {
	var engine = undefined;
	var scene;
	$.ajax({
		type: "GET",
		url: "/api/batiments",
		complete: function(result){
			LISTE_BATIMENTS = result.responseJSON;
			console.log(LISTE_BATIMENTS);
			var url = document.location.pathname.split("/");
			ID_BAT = parseInt(url[url.length-1]);
			var batiment_mod = LISTE_BATIMENTS.find(x => x.id==ID_BAT);
			var canvas = document.getElementById('renderCanvas');
			var position= document.getElementsByClassName("position");
			var FP= document.getElementsByClassName("FP");
			var Modele= document.getElementsByClassName("Modele");
			var Cube= document.getElementsByClassName("Cube");
			var Cylindre= document.getElementsByClassName("Cylindre");
			var Pavé= document.getElementsByClassName("Pavé");
			console.log(ID_BAT);
			console.log(batiment_mod);
			var createScene = function() {
				// This creates a basic Babylon Scene object (non-mesh)
				var scene = new BABYLON.Scene(engine);
	
				//type arc rotate
				var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
					
				camera.lowerBetaLimit = 0.5;
				camera.upperBetaLimit = Math.PI/2 - 0.1;
				
				camera.lowerRadiusLimit = 10;
				camera.upperRadiusLimit = 330;
				
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
				
				var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
				// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
				var ground = BABYLON.Mesh.CreateGround("ground1", 650, 600, 20, scene);
				ground.material = new BABYLON.StandardMaterial("test_mat", scene);
				ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
				ground.material.diffuseTexture = new BABYLON.Texture("http://map-pym.com/sharedfolder/domaine/domaine.png", scene);
				ground.receiveShadows = true;
	
				return scene;
			}
			// Manage scale, rotation, position of a mesh
			function pos(mesh, x, y, z, echelle, rot){
				mesh.setPositionWithLocalVector(new BABYLON.Vector3(x, z, y));
				mesh.scaling = new BABYLON.Vector3(echelle, echelle, echelle);
				mesh.rotation.y = rot;
			}
			var pose_batiments = function(){
				for (let bat of LISTE_BATIMENTS){
					if(bat["id"]!=ID_BAT){
						if(bat["formeParamétrique"] == null){
						BABYLON.SceneLoader.ImportMesh("", PARAM_URL, bat["url"], scene, (object)=>{
							// You can apply properties to object.
							pos(object[0], bat["x"], bat["y"], 0, bat["scale"], bat["angle"]);
						});
						}
						else{
							let altitude;
							let afficher = true;
							switch(bat["formeParamétrique"]){
								case "Cube":{    //cube
								scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat["nom"], {size : bat["longueur"]}, scene));
								altitude = bat["longueur"]/2;
								break;
								}
								case "Pavé":{    //pave
								scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat["nom"], {height : bat["hauteur"], width : bat["largeur"], depth : bat["longueur"]}, scene));
								altitude = bat["hauteur"]/2;
								break;
								}
								case "Cylindre":{    //cylindre
								scene.meshes.push(BABYLON.MeshBuilder.CreateCylinder(bat["nom"], {height : bat["hauteur"], diameter : bat["rayon"]}, scene));
								altitude = bat["hauteur"]/2;
								break;
								}
								default:{   //id not found handler
								console.log("ID for bat "+bat["nom"]+" not found");
								afficher = false;
								break;
								}
							}
							if(afficher){
								var texture = new BABYLON.StandardMaterial(bat["nom"],scene);
								texture.emissiveColor = new BABYLON.Color3(0,0,1);
								scene.meshes[scene.meshes.length-1].material = texture;
								pos(scene.meshes[scene.meshes.length-1], bat["x"], bat["y"], altitude, bat["scale"], bat["angle"]);
							}
						}
				  }
				}
			}
			var createBat = function() {
				var mesh;
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
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
				}
				longitude.oninput = function(){
					mesh.position.x = longitude.value;
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
				}
				latitude.onchange = function(){
					mesh.position.z = latitude.value;
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
				}
				latitude.oninput = function(){
					mesh.position.z = latitude.value;
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
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
			var generate_forme = function() {
				document.getElementById(PARAM_FORME).oninput = function(){
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
						if(scene.meshes[scene.meshes.length-1].name == "my_mesh"){
							scene.meshes[scene.meshes.length-1].dispose();
						}
						var altitude = 1;
						if (forme =="Cube"){
							for(var i=0;i<Cube.length;i++){
								Cube[i].hidden=false;
							}
							monobjet = BABYLON.MeshBuilder.CreateBox("my_mesh", {size:longueur.value}, scene);
							altitude = longueur.value;
						}
						if (forme =="Cylindre"){
							for(var i=0;i<Cylindre.length;i++){
								Cylindre[i].hidden=false;
							}
							monobjet = BABYLON.MeshBuilder.CreateCylinder("my_mesh", {height:hauteur.value, diameter:rayon.value}, scene);
							altitude = hauteur.value;
						}
						if (forme =="Pavé"){
							for(var i=0;i<Pavé.length;i++){
								Pavé[i].hidden=false;
							}
							monobjet = BABYLON.MeshBuilder.CreateBox("my_mesh", {height:hauteur.value, width:largeur.value, depth:longueur.value}, scene);
							altitude = hauteur.value;
						}
						monobjet.material = new BABYLON.StandardMaterial("mat",scene);
						monobjet.material.emissiveColor = new BABYLON.Color3(0,0,1);
						monobjet.rotation.y = rotation.value;
						monobjet.position.x=longitude.value;
						monobjet.position.y=altitude/2;
						monobjet.position.z=latitude.value;
						scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
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
				var monobjet;
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
					if(scene.meshes[scene.meshes.length-1].name == "my_mesh"){
						scene.meshes[scene.meshes.length-1].dispose();
					}
					if(scene.meshes[scene.meshes.length-1].name == "my_mesh"){
						scene.meshes[scene.meshes.length-1].dispose();
					}
					var altitude = 1;
					if (batiment_mod["formeParamétrique"] =="Cube"){
						for(var i=0;i<Cube.length;i++){
							Cube[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateBox("my_mesh", {size:longueur.value}, scene);
						altitude = longueur.value;
					}
					else if (batiment_mod["formeParamétrique"] =="Cylindre"){
						for(var i=0;i<Cylindre.length;i++){
							Cylindre[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateCylinder("my_mesh", {height:hauteur.value, diameter:rayon.value}, scene);
						altitude = hauteur.value;
					}
					else {
						for(var i=0;i<Pavé.length;i++){
							Pavé[i].hidden=false;
						}
						monobjet = BABYLON.MeshBuilder.CreateBox("my_mesh", {height:hauteur.value, width:largeur.value, depth:longueur.value}, scene);
						altitude = hauteur.value;
					}
					monobjet.material = new BABYLON.StandardMaterial("mat",scene);
					monobjet.material.emissiveColor = new BABYLON.Color3(0,0,1);
					monobjet.rotation.y = rotation.value;
					monobjet.position.x=longitude.value;
					monobjet.position.y=altitude/2;
					monobjet.position.z=latitude.value;
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
				}
				document.getElementById(PARAM_LONGUEUR).oninput = modif;
				document.getElementById(PARAM_LARGEUR).oninput = modif;
				document.getElementById(PARAM_HAUTEUR).oninput = modif;
				document.getElementById(PARAM_RAYON).oninput = modif;
				document.getElementById(PARAM_LONGITUDE).oninput = modif;
				document.getElementById(PARAM_LATITUDE).oninput = modif;
				document.getElementById(PARAM_ANGLE).oninput = modif;
			};

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
			pose_batiments();
			if(batiment_mod["formeParamétrique"]==null){
				var echelle = document.getElementById(PARAM_ECHELLE);
				var longitude = document.getElementById(PARAM_LONGITUDE);
				var latitude = document.getElementById(PARAM_LATITUDE);
				var rotation = document.getElementById(PARAM_ANGLE);
				scene.meshes[scene.meshes.length-1].dispose();
				BABYLON.SceneLoader.ImportMesh("", PARAM_URL, batiment_mod["url"], scene, (object)=>{
					// You can apply properties to object.
					pos(object[0], batiment_mod["x"], batiment_mod["y"], 0, batiment_mod["scale"], batiment_mod["angle"]);
					scene.cameras[0].setTarget(object[0], false, true);
					longitude.onchange = function(){
						object[0].position.x = longitude.value;
						scene.cameras[0].setTarget(object[0], false, true);
					}
					longitude.oninput = function(){
						object[0].position.x = longitude.value;
						scene.cameras[0].setTarget(object[0], false, true);
					}
					latitude.onchange = function(){
						object[0].position.z = latitude.value;
						scene.cameras[0].setTarget(object[0], false, true);
					}
					latitude.oninput = function(){
						object[0].position.z = latitude.value;
						scene.cameras[0].setTarget(object[0], false, true);
					}
					echelle.onchange = function(){
						object[0].scaling.x = echelle.value;
						object[0].scaling.y = echelle.value;
						object[0].scaling.z = echelle.value;
					}
					echelle.oninput = function(){
						object[0].scaling.x = echelle.value;
						object[0].scaling.y = echelle.value;
						object[0].scaling.z = echelle.value;
					}
					rotation.onchange = function(){
						object[0].rotation.y = rotation.value;
					}
					rotation.oninput = function(){
						object[0].rotation.y = rotation.value;
					}
					scene.cameras[0].setTarget(object[0], false, true);
				});
				if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Arret de bus"){
					for (var i=0;i<Modele.length;i++){
						if(Modele[i].id != fileInput)
							Modele[i].hidden=false;
					}
				}
				if (document.getElementById(PARAM_TYPE_BATIMENT).value =="PAV"){
					for (var i=0;i<Modele.length;i++){
						if(Modele[i].id != fileInput)
							Modele[i].hidden=false;
					}
				}
				if (document.getElementById(PARAM_TYPE_BATIMENT).value =="IRVE"){
					for (var i=0;i<Modele.length;i++){
						if(Modele[i].id != fileInput)
							Modele[i].hidden=false;
					}
				}
				if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Batiment"){
					for (var i=0;i<Modele.length;i++){
						Modele[i].hidden=false;
					}
					var reader;
					var test;
					document.getElementById(PARAM_BAT).onchange = function(e) {
						canvas.style.display = "";
						scene.dispose()
						scene = createScene();
						pose_batiments();
						var files = document.getElementById(PARAM_BAT).files;
						reader = new FileReader();
						var retest;
						test = document.getElementById(PARAM_BAT);
						test.src = URL.createObjectURL(e.target.files[0]);
						reader.readAsText(e.target.files[0]);
		
						createBat();
					}
				}
			}
			else {
				for (var i=0;i<FP.length;i++){
						FP[i].hidden=false;
						position[i].hidden=false;
				}
				var longueur = document.getElementById(PARAM_LONGUEUR);
				var largeur = document.getElementById(PARAM_LARGEUR);
				var hauteur = document.getElementById(PARAM_HAUTEUR);
				var rayon = document.getElementById(PARAM_RAYON);
				
				generate_forme();
			}
		}
	});
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
			camera.upperRadiusLimit = 330;
			
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

			// BABYLON.SceneLoader.ImportMesh("", "./../../", "domaine.babylon", scene, function(object) {
			// 	// You can apply properties to object.
			// 	object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
			// 	object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
			// });
			
			var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
			// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
			var ground = BABYLON.Mesh.CreateGround("ground1", 650, 600, 20, scene);
			ground.material = new BABYLON.StandardMaterial("test_mat", scene);
			ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
			ground.material.diffuseTexture = new BABYLON.Texture("http://map-pym.com/sharedfolder/domaine/domaine.png", scene);
			ground.receiveShadows = true;

			return scene;
		}
		// Manage scale, rotation, position of a mesh
		function pos(mesh, x, y, z, echelle, rot){
			mesh.setPositionWithLocalVector(new BABYLON.Vector3(x, z, y));
			mesh.scaling = new BABYLON.Vector3(echelle, echelle, echelle);
			mesh.rotation.y = rot;
		}
		var pose_batiments = function(){
			for (let bat of LISTE_BATIMENTS){
				if(bat["id"]!=ID_BAT){
					if(bat["formeParamétrique"] == null){
					BABYLON.SceneLoader.ImportMesh("", PARAM_URL, bat["url"], scene, (object)=>{
						// You can apply properties to object.
						pos(object[0], bat["x"], bat["y"], 0, bat["scale"], bat["angle"]);
					});
					}
					else{
					let altitude;
					let afficher = true;
					switch(bat["formeParamétrique"]){
						case "Cube":{    //cube
						scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat["nom"], {size : bat["longueur"]}, scene));
						altitude = bat["longueur"]/2;
						break;
						}
						case "Pavé":{    //pave
						scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat["nom"], {height : bat["hauteur"], width : bat["largeur"], depth : bat["longueur"]}, scene));
						altitude = bat["hauteur"]/2;
						break;
						}
						case "Cylindre":{    //cylindre
						scene.meshes.push(BABYLON.MeshBuilder.CreateCylinder(bat["nom"], {height : bat["hauteur"], diameter : bat["rayon"]}, scene));
						altitude = bat["hauteur"]/2;
						break;
						}
						default:{   //id not found handler
						console.log("ID for bat "+bat["nom"]+" not found");
						afficher = false;
						break;
						}
					}
					if(afficher){
						var texture = new BABYLON.StandardMaterial(bat["nom"],scene);
						texture.emissiveColor = new BABYLON.Color3(0,0,1);
						scene.meshes[scene.meshes.length-1].material = texture;
						pos(scene.meshes[scene.meshes.length-1], bat["x"], bat["y"], altitude, bat["scale"], bat["angle"]);
					}
					}
			  }
			}
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
					scene.cameras[0].setTarget(object[0], false, true);
				},function(){},function(){});
			}, false);

			longitude.onchange = function(){
				mesh.position.x = longitude.value;
				scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
			}
			longitude.oninput = function(){
				mesh.position.x = longitude.value;
				scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
			}
			latitude.onchange = function(){
				mesh.position.z = latitude.value;
				scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
			}
			latitude.oninput = function(){
				mesh.position.z = latitude.value;
				scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
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
					scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
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
				scene.cameras[0].setTarget(object[0], false, true);
			});

			var modif = function(e) {
				equip.scaling = new BABYLON.Vector3(echelle.value, echelle.value, echelle.value);
				equip.position.x = longitude.value;
				equip.position.z = latitude.value;
				equip.rotation.y = rotation.value;
				scene.cameras[0].setTarget(scene.meshes[scene.meshes.length-1], false, true);
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
		pose_batiments();
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="Arret de bus"){
			// for (var i=0;i<position.length;i++){
			// 	if (position[i].id != fileInput && position[i].id != formeInput){
			// 		position[i].hidden=false;
			// 	}
			// }
			for (var i=0;i<Modele.length;i++){
				if(Modele[i].id != fileInput)
					Modele[i].hidden=false;
			}
			var imported_object = PARAM_EQUIPEMENT_ARRET;
			
			// call the createScene function
			createEquip();
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="PAV"){
			for (var i=0;i<Modele.length;i++){
				if(Modele[i].id != fileInput)
					Modele[i].hidden=false;
			}
			var imported_object = PARAM_EQUIPEMENT_PAV;
			
			// call the createScene function
			createEquip();
		}
		if (document.getElementById(PARAM_TYPE_BATIMENT).value =="IRVE"){
			for (var i=0;i<Modele.length;i++){
				if(Modele[i].id != fileInput)
					Modele[i].hidden=false;
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
				scene.dispose()
				scene = createScene();
				pose_batiments();
				
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