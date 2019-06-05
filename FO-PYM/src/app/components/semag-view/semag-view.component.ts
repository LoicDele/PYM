import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Batiment } from 'src/app/class/batiment/batiment';
import { BatimentService } from 'src/app/services/batiment-service/batiment.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'pepjs';
@Component({
  selector: 'app-semag-view',
  templateUrl: './semag-view.component.html',
  styleUrls: ['./semag-view.component.scss']
})
export class SemagViewComponent implements OnInit {
  private batiments: Batiment[] = [];
  subscriptionBatiment: Subscription;
  private formes: [{"forme": BABYLON.AbstractMesh, "altitude": any}];
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;
  private _light: BABYLON.Light;

  constructor(private batimentService: BatimentService, private router: Router) {
  }

  ngOnInit() {
    var complete = () => {
      //window.addEventListener('DOMContentLoaded', () => {
          // Create canvas and engine.
      this._canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

      this._engine = new BABYLON.Engine(this._canvas, true);

      // Create the scene.
      this.createScene();

      // Start render loop.
      this.doRender();
      //});
    }
    /*this.subscriptionBatiment = this.batimentService.subjectBatiments.subscribe(res => {
      _this.batiments = res;
      console.log(_this.batiments);
    },
    err=>{console.log("error")},
    ()=>complete());*/
    const myObserver = {
      next: res => {
        this.batiments = res;
        complete();
      },
      error: err => console.error(err),
      complete: () => {
        complete();
      }
    }
    this.subscriptionBatiment = this.batimentService.subjectBatiments.subscribe(myObserver);
    //this.batimentService.getBatimentByHTTP();
  }

  createScene(): void {
    var PARAM_URL = "http://map-pym.com/sharedfolder/modeles/";
    // Mouse over animations
    var makeOverOut = (mesh: any, x: any, y: any, z: any) => {
      mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));
      mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh.material, "emissiveColor", BABYLON.Color3.White()));
      mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, "scaling", new BABYLON.Vector3(x, y, z), 150));
      mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, "scaling", new BABYLON.Vector3(1.05 * x, 1.05 * y, 1.05 * z), 150));
      mesh.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          this._camera,
          'target',
          new BABYLON.Vector3(mesh.position.x, mesh.position.y, mesh.position.z),
          1000
        )
      );
      mesh.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          this._camera,
          'beta',
          1.15,
          1000
        )
      );
      mesh.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
          BABYLON.ActionManager.OnPickTrigger,
          this._camera,
          'radius',
          65,
          1000
        )
      );
    }
    // Manage scale, rotation, position of a mesh
    function pos(mesh:any, x:any, y:any, z:any, echelle:any, rot:any){
      mesh.setPositionWithLocalVector(new BABYLON.Vector3(x, z, y));
      mesh.scaling = new BABYLON.Vector3(echelle, echelle, echelle);
      mesh.rotation.y = rot;
    }
    // Create a basic BJS Scene object.
    this._scene = new BABYLON.Scene(this._engine);

    // Create an ArcRotate camera, with limited movements and smooth zoom
    this._camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
    this._camera.lowerBetaLimit = 0.5;
    this._camera.upperBetaLimit = Math.PI / 2 - 0.1;

    this._camera.lowerRadiusLimit = 10;
    this._camera.upperRadiusLimit = 330;

    //this._scene.activeCamera.panningSensibility = 0;
    this._camera.useBouncingBehavior = true;

    // Target the camera to scene origin.
    this._camera.setPosition(new BABYLON.Vector3(-30, 30, 50));

    // Attach the camera to the canvas.
    this._camera.attachControl(this._canvas, false);

    // Create a basic light, aiming 0,1,0, light intensity 0.7
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    this._light.intensity = 0.7;
    this._light.specular = new BABYLON.Color3(0, 0, 0);

    // Create color for environnement
    this._scene.clearColor = new BABYLON.Color4(0.368, 0.512, 0.956, 1);

    // Create a built-in "ground" shape.
    let ground = BABYLON.MeshBuilder.CreateGround('ground1',
      { width: 650, height: 600, subdivisions: 20 }, this._scene);
    var backgroundMaterial = new BABYLON.BackgroundMaterial("ground_material", this._scene);
    backgroundMaterial.diffuseTexture = new BABYLON.Texture("http://map-pym.com/sharedfolder/domaine/domaine.png", this._scene);
    backgroundMaterial.shadowLevel = 0.4;

    ground.material = backgroundMaterial;
    // BABYLON.SceneLoader.ImportMesh("", "../../assets/objets/", "domaine.babylon", this._scene, function(object) {
    //   // You can apply properties to object.
    //   object[0].scaling = new BABYLON.Vector3(0.30, 0.30, 0.30);
    //   object[0].setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));
    // });
    for (let bat of this.batiments){
      //console.log(bat);
      if(bat.formeParamétrique == null){
        BABYLON.SceneLoader.ImportMesh("", PARAM_URL, bat.url, this._scene, (object)=>{
          // You can apply properties to object.
          pos(object[0], bat.x, bat.y, 0, bat.scale, bat.angle);
          object[0].actionManager = new BABYLON.ActionManager(this._scene);
          object[0].actionManager.registerAction(
            new BABYLON.InterpolateValueAction(
              BABYLON.ActionManager.OnPickTrigger,
              this._light,
              'diffuse',
              new BABYLON.Color3(Math.random(), Math.random(), Math.random()),
              1000
            )
          );
          makeOverOut(object[0], bat.scale,bat.scale,bat.scale);
          object[0].actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              {
                trigger: BABYLON.ActionManager.OnPickTrigger
              },
              () => {this.router.navigate(['/batiment',bat.id]);}
            )
          );
        });
      }
      else{
        let altitude;
        let afficher = true;
        switch(bat.formeParamétrique){
          case "Cube":{    //cube
            this._scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat.nom, {size : bat.longueur}, this._scene));
            altitude = bat.longueur/2;
            break;
          }
          case "Pavé":{    //pave
            this._scene.meshes.push(BABYLON.MeshBuilder.CreateBox(bat.nom, {height : bat.hauteur, width : bat.largeur, depth : bat.longueur}, this._scene));
            altitude = bat.hauteur/2;
            break;
          }
          case "Cylindre":{    //cylindre
            this._scene.meshes.push(BABYLON.MeshBuilder.CreateCylinder(bat.nom, {height : bat.hauteur, diameter : bat.rayon}, this._scene));
            altitude = bat.hauteur/2;
            break;
          }
          default:{   //id not found handler
            console.log("ID for bat "+bat.nom+" not found");
            afficher = false;
            break;
          }
        }
        if(afficher){
          var texture = new BABYLON.StandardMaterial(bat.nom,this._scene);
          texture.emissiveColor = new BABYLON.Color3(0,0,1);
          this._scene.meshes[this._scene.meshes.length-1].material = texture;
          this._scene.meshes[this._scene.meshes.length-1].actionManager = new BABYLON.ActionManager(this._scene);
          pos(this._scene.meshes[this._scene.meshes.length-1], bat.x, bat.y, altitude, bat.scale, bat.angle);
          makeOverOut(this._scene.meshes[this._scene.meshes.length-1], bat.scale, bat.scale, bat.scale);
          this._scene.meshes[this._scene.meshes.length-1].actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              {
                trigger: BABYLON.ActionManager.OnPickTrigger
              },
              () => {this.router.navigate(['/batiment',bat.id]);}
            )
          );
        }
        //console.log(this._scene.meshes);
      }
    }
  }

  doRender(): void {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener('resize', () => {
      this._canvas.height = window.innerHeight;
      this._canvas.width = window.innerWidth;
      this._engine.resize();
    });
  }
}
