fileInput='Representation3D';
formeInput='FormeParametrique';
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
	if(document.getElementById(fileInput)!=null){
		document.getElementById(fileInput).onchange = function(e) {
			var files = document.getElementById(fileInput).files;
			var t = files[0];
			var canvas = document.getElementById('renderCanvas');
			canvas.style.display = "";
			
			var engine = new BABYLON.Engine(canvas, false);
			engine.enableOfflineSupport = false;
				
			var createScene = function () {

				// This creates a basic Babylon Scene object (non-mesh)
				var scene = new BABYLON.Scene(engine);

				// This creates and positions a free camera (non-mesh)
				// var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
				var reader = new FileReader();
				var retest;
				var mesh;

				var test = document.getElementById(fileInput);
				test.src = URL.createObjectURL(e.target.files[0]);
				reader.readAsText(e.target.files[0]);
				console.log(test);

				reader.addEventListener("load", function() {
					retest = reader.result;
					//console.log(retest);
					BABYLON.SceneLoader.ImportMesh("", "", "data:"+retest, scene, function(object) {
						// You can apply properties to object.
						getS(t.name, object[0]);
						mesh = object[0];
						mesh.material = new BABYLON.StandardMaterial("test_mesh", scene);
						mesh.scaling.x = 1;
						mesh.scaling.y = 1;
						mesh.scaling.z = 1;
						mesh.position.x = 0;
						mesh.position.y = 0;
						mesh.rotation.y = 0;
						//object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
						//object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
					},function(){},function(){});
				}, false)
				
				
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

				// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
				var temps = new Date().getHours();
				if(temps<6.5){
					temps = 6.5;
				}
				else if(temps>17){
					temps = 17.5;
				}
				var xlight = 20;
				var ylight = 40*(-Math.abs((temps-12)/6)+1);//40*Math.cos(Math.PI/2*(-Math.abs(temps/6-2)+2));
				var zlight = 20*(temps-12)/6;//20*Math.sin(Math.PI/2*(temps/6-2));
				var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-xlight, -ylight, -zlight), scene);
				light.position = new BABYLON.Vector3(xlight, ylight, zlight);
				// Default intensity is 1. Let's dim the light a small amount
				light.intensity = 0.7;
				
				//light.specular = new BABYLON.Color3(0,0,0);
				
				// environnement / skybloc
				
				scene.clearColor = new BABYLON.Color3(0.368, 0.512, 0.956);
				scene.ambientColor = BABYLON.Color3.White();

				// GUI
				var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
				var textblock = new BABYLON.GUI.TextBlock();
				textblock.text = "";
				textblock.fontSize = 30;
				textblock.top = "-40%";
				textblock.color = "white";
				//advancedTexture.addControl(textblock);
				var posX = function(value) {
					mesh.position.x = value;
					var longitude = document.getElementById("Longitude");
					longitude.value = value;
				}
				
				var posY = function(value) {
					mesh.position.z = value;
					var latitude = document.getElementById("Latitude");
					latitude.value = value;
				}
				
				var scale_mesh = function(value) {
					mesh.scaling.x = value;
					mesh.scaling.y = value;
					mesh.scaling.z = value;
					var echelle = document.getElementById("Echelle");
					echelle.value = value;
				}
				
				var rotate_mesh = function(value) {
					mesh.rotation.y = value;
					var angle = document.getElementById("Angle");
					angle.value = value;
				}
				
				var displayValue = function(value) {
					return value;
				}
				
				var getS = function (texte, objet){
					size = objet.getBoundingInfo().boundingBox.extendSize;
					console.log(texte + size);
				}
				
				var posGroup = new BABYLON.GUI.SliderGroup("Position");
				var scaleGroup = new BABYLON.GUI.SliderGroup("Echelle");
				var rotateGroup = new BABYLON.GUI.SliderGroup("Rotation");
				
				posGroup.addSlider("X", posX, "", -50, 50, 0, displayValue);
				posGroup.addSlider("Y", posY, "", -50, 50, 0, displayValue);
				
				scaleGroup.addSlider("Echelle", scale_mesh, "", 1, 10, 1, displayValue);
				
				rotateGroup.addSlider("Rotation", rotate_mesh, "", 0, 2*Math.PI, 0, displayValue);
				console.log(posGroup[0]);
				var panel = new BABYLON.GUI.SelectionPanel("select", [posGroup, scaleGroup, rotateGroup]);
				panel.width = "300px";
				panel.name = "panel";
				panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
				panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
				//advancedTexture.addControl(panel);
				
				//allow mouse over animations
				var makeOverOut = function (mesh,x,y,z) {
				mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));
				mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh.material, "emissiveColor", BABYLON.Color3.White()));
				mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, "scaling", new BABYLON.Vector3(x, y, z), 150));
				mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, "scaling", new BABYLON.Vector3(1.05*x, 1.05*y, 1.05*z), 150));
				}
				var ajout_texte = function (mesh, texte) {
					mesh.actionManager.registerAction(
						new BABYLON.SetValueAction(
							BABYLON.ActionManager.OnPointerOverTrigger,
							textblock,
							"text",
							texte
						)
					);
					mesh.actionManager.registerAction(
						new BABYLON.SetValueAction(
							BABYLON.ActionManager.OnPointerOutTrigger,
							textblock,
							"text",
							""
						)
					);
				}
				
				BABYLON.SceneLoader.ImportMesh("", "", "domaine.babylon", scene, function(object) {
					// You can apply properties to object.
					getS("domaine", object[0]);
					object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
					object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
					
				});
				
				var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
				// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
				var ground = BABYLON.Mesh.CreateGround("ground1", 350, 350, 20, scene);
				ground.material = new BABYLON.StandardMaterial("test_mat", scene);
				ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
				ground.receiveShadows = true;

				var longitude = document.getElementById('Longitude');
				longitude.onchange = function(){
					mesh.position.x = longitude.value;
				}
				longitude.oninput = function(){
					mesh.position.x = longitude.value;
				}
				var latitude = document.getElementById('Latitude');
				latitude.onchange = function(){
					mesh.position.z = latitude.value;
				}
				latitude.oninput = function(){
					mesh.position.z = latitude.value;
				}
				var echelle = document.getElementById('Echelle');
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
				var angle = document.getElementById('Angle');
				angle.onchange = function(){
					mesh.rotation.y = angle.value;
				}
				angle.oninput = function(){
					mesh.rotation.y = angle.value;
				}
				
				return scene;

			}
			
			// call the createScene function
			var scene = createScene();

			// run the render loop
			engine.runRenderLoop(function(){
				scene.render();
			});

			// the canvas/window resize event handler
			window.addEventListener('resize', function(){
				engine.resize();
			});
		}
	}
	else if (document.getElementById(formeInput)!=null){
		var longueur = document.getElementById(PARAM_LONGUEUR);
	    var largeur = document.getElementById(PARAM_LARGEUR);
	    var hauteur = document.getElementById(PARAM_HAUTEUR);
	    var rayon = document.getElementById(PARAM_RAYON);
	    var longitude = document.getElementById(PARAM_LONGITUDE);
	    var latitude = document.getElementById(PARAM_LATITUDE);
	    var rotation = document.getElementById(PARAM_ANGLE);
	    
		var canvas = document.getElementById('renderCanvas');
		canvas.style.display = "";
		var engine = new BABYLON.Engine(canvas, false);
		engine.enableOfflineSupport = false;
			
		var createScene = function () {
		    
		    // This creates a basic Babylon Scene object (non-mesh)
		    var scene = new BABYLON.Scene(engine);
		    
		    // This creates and positions a free camera (non-mesh)
		    // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

		    //type arc rotate
		    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
		    
		   // camera.lowerBetaLimit = 0.5;
		   // camera.upperBetaLimit = Math.PI/2 - 0.1;
		    
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

			// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
			var temps = new Date().getHours();
			if(temps<6.5){
				temps = 6.5;
			}
			else if(temps>17){
				temps = 17.5;
			}
			var xlight = 20;
			var ylight = 40*(-Math.abs((temps-12)/6)+1);//40*Math.cos(Math.PI/2*(-Math.abs(temps/6-2)+2));
			var zlight = 20*(temps-12)/6;//20*Math.sin(Math.PI/2*(temps/6-2));
			var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-xlight, -ylight, -zlight), scene);
			light.position = new BABYLON.Vector3(xlight, ylight, zlight);
		    // Default intensity is 1. Let's dim the light a small amount
			light.intensity = 0.7;
			
			//light.specular = new BABYLON.Color3(0,0,0);
			
		    // environnement / skybloc
		    
		    scene.clearColor = new BABYLON.Color3(0.368, 0.512, 0.956);
		    scene.ambientColor = BABYLON.Color3.White();
		    
			document.getElementById(formeInput).onchange = function() {
				var monobjet;
				var forme = document.getElementById(formeInput).value;
				var modif = function(e) {
					longueur.style.display = "none";
					largeur.style.display = "none";
					hauteur.style.display = "none";
					rayon.style.display = "none";
					if(scene.meshes[scene.meshes.length-1].name == "mesh"){
						scene.meshes[scene.meshes.length-1].dispose();
					}
					
					var altitude = 1;
					if(forme == "Cube"){
							longueur.style.display = "";
					    	monobjet = BABYLON.MeshBuilder.CreateBox("mesh", {size:longueur.value}, scene);
					    	altitude = longueur.value;
					    }
					else if(forme == "Pavé"){
					    	longueur.style.display = "";
					    	largeur.style.display = "";
					    	hauteur.style.display = "";
					    	monobjet = BABYLON.MeshBuilder.CreateBox("mesh", {height:hauteur.value, width:largeur.value, depth:longueur.value}, scene);
					    	altitude = hauteur.value;
					    }
				 	else if(forme == "Cylindre"){
					    	hauteur.style.display = "";
					    	rayon.style.display = "";
					    	monobjet = BABYLON.MeshBuilder.CreateCylinder("mesh", {height:hauteur.value, diameter:rayon.value}, scene);
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
			BABYLON.SceneLoader.ImportMesh("", "", "domaine.babylon", scene, function(object) {
				// You can apply properties to object.
				object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
				object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
				
			});
		    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
			var ground = BABYLON.Mesh.CreateGround("ground1", 350, 350, 20, scene);
			ground.material = new BABYLON.StandardMaterial("test_mat", scene);
			ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
			ground.receiveShadows = true;
		    return scene;

		}
	    // call the createScene function
	    var scene = createScene();

	    // run the render loop
	    engine.runRenderLoop(function(){
	        scene.render();
	    });

	    // the canvas/window resize event handler
	    window.addEventListener('resize', function(){
	        engine.resize();
	    });
	}
	else{
		var imported_object;
		if(document.getElementById('IRVE')!=null){
	    	imported_object = PARAM_EQUIPEMENT_IRVE;
	    }
	    else if(document.getElementById('PAV')!=null){
	    	imported_object = PARAM_EQUIPEMENT_PAV;
	    }
	    else{
	    	imported_object = PARAM_EQUIPEMENT_ARRET;
	    }

	    var echelle = document.getElementById(PARAM_ECHELLE);
	    var longitude = document.getElementById(PARAM_LONGITUDE);
	    var latitude = document.getElementById(PARAM_LATITUDE);
	    var rotation = document.getElementById(PARAM_ANGLE);
	    
		var canvas = document.getElementById('renderCanvas');
		canvas.style.display = "";
		
		var engine = new BABYLON.Engine(canvas, false);
		engine.enableOfflineSupport = false;
			
		var createScene = function () {
		    
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

		    //overwrite alpha/beta
		    camera.setPosition(new BABYLON.Vector3(-30, 30, 50));

		    
		    // This attaches the camera to the canvas
		    camera.attachControl(canvas, true);

			// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
			var temps = new Date().getHours();
			if(temps<6.5){
				temps = 6.5;
			}
			else if(temps>17){
				temps = 17.5;
			}
			var xlight = 20;
			var ylight = 40*(-Math.abs((temps-12)/6)+1);//40*Math.cos(Math.PI/2*(-Math.abs(temps/6-2)+2));
			var zlight = 20*(temps-12)/6;//20*Math.sin(Math.PI/2*(temps/6-2));
			var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-xlight, -ylight, -zlight), scene);
			light.position = new BABYLON.Vector3(xlight, ylight, zlight);
		    // Default intensity is 1. Let's dim the light a small amount
			light.intensity = 0.7;
			
			//light.specular = new BABYLON.Color3(0,0,0);
			
		    // environnement / skybloc
		    
		    scene.clearColor = new BABYLON.Color3(0.368, 0.512, 0.956);
			scene.ambientColor = BABYLON.Color3.White();
			
			var equip;
			
			BABYLON.SceneLoader.ImportMesh("", "", imported_object, scene, function(object){
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

			document.getElementById(PARAM_ECHELLE).oninput = modif;
			document.getElementById(PARAM_LONGITUDE).oninput = modif;
			document.getElementById(PARAM_LATITUDE).oninput = modif;
			document.getElementById(PARAM_ANGLE).oninput = modif;
			
			BABYLON.SceneLoader.ImportMesh("", "", "domaine.babylon", scene, function(object) {
				// You can apply properties to object.
				object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
				object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
				
			});
		    

		    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
			var ground = BABYLON.Mesh.CreateGround("ground1", 350, 350, 20, scene);
			ground.material = new BABYLON.StandardMaterial("test_mat", scene);
			ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
			ground.receiveShadows = true;
		    return scene;

		}
	    // call the createScene function
	    var scene = createScene();

	    // run the render loop
	    engine.runRenderLoop(function(){
	        scene.render();
	    });

	    // the canvas/window resize event handler
	    window.addEventListener('resize', function(){
	        engine.resize();
	    });
	}
});