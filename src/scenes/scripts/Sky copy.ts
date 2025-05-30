// import { Node } from "@babylonjs/core/node";
// import * as BABYLON from "@babylonjs/core";
// import { onKeyboardEvent, visibleInInspector } from "../decorators";
// import { KeyboardEventTypes } from "@babylonjs/core";

// export default class MyScript extends Node {
//     // @visibleInInspector("string", "Morning Texture Path", "/textures/skybox_morning")
//     private _morningTexturePath: string = "/assets/materials/skybox/skybox";

//     // @visibleInInspector("string", "Evening Texture Path", "/textures/skybox_evening")
//     private _eveningTexturePath: string = "/assets/materials/night/night";

//     private _skybox: BABYLON.Mesh | null = null;
//     private _skyboxMaterial: BABYLON.StandardMaterial | null = null;
//     private _morningTexture: BABYLON.CubeTexture | null = null;
//     private _eveningTexture: BABYLON.CubeTexture | null = null;
//     private _isMorning: boolean = true;

//     /**
//      * Override constructor.
//      * @warn do not fill.
//      */
//     // @ts-ignore ignoring the super call as we don't want to re-init
//     protected constructor() { }

//     /**
//      * Called on the node is being initialized.
//      * This function is called immediatly after the constructor has been called.
//      */
//     public onInitialize(): void {
//         // ...
//     }

//     /**
//      * Called on the node has been fully initialized and is ready.
//      */
//     public onInitialized(): void {
//         // ...
//     }



//     /**
//      * Called each frame.
//      */
//     public onUpdate(): void {
//         // ...
//     }

//     public onStart(): void {
//         // const scene = this.getScene();

//         // // Create skybox
//         // this._skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
//         // // this._skybox.parent = this;

//         // // Create skybox material
//         // this._skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
//         // this._skyboxMaterial.backFaceCulling = false;
//         // // this._skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
//         // // this._skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

//         // // Define PNG extensions for skybox textures    
//         // // const textureExtensions = ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"];
//         // // Load textures
//         // th2is._skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(this._morningTexturePath, scene);
//         // this._skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//         // // this._eveningTexture = new BABYLON.CubeTexture(this._eveningTexturePath, scene);
//         // // this._eveningTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//         // // // Load textures
//         // // this._morningTexture = new BABYLON.CubeTexture(this._morningTexturePath, scene, textureExtensions);
//         // // this._morningTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
//         // // this._eveningTexture = new BABYLON.CubeTexture(this._eveningTexturePath, scene, textureExtensions);
//         // // this._eveningTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

//         // // Set initial texture (morning)
//         // // this._skyboxMaterial.reflectionTexture = this._morningTexture;
//         // this._skybox.material = this._skyboxMaterial;
//         // this._skybox.applyFog = false; // Disable fog for skybox
//         // this._skybox.infiniteDistance = true; // Make skybox infinite

//         // console.log("Sky initialized with morning texture");
//     }

//     @onKeyboardEvent("t", KeyboardEventTypes.KEYDOWN)
//     public toggleEnvironment(): void {
//         if (!this._skyboxMaterial || !this._morningTexture || !this._eveningTexture) {
//             console.warn("Skybox material or textures not initialized");
//             return;
//         }

//         this._isMorning = !this._isMorning;
//         this._skyboxMaterial.reflectionTexture = this._isMorning ? this._morningTexture : this._eveningTexture;
//         console.log(`Switched to ${this._isMorning ? "morning" : "evening"} skybox`);
//     }

//     public onStop(): void {
//         // Clean up resources
//         if (this._skybox) {
//             this._skybox.dispose();
//             this._skybox = null;
//         }
//         if (this._skyboxMaterial) {
//             this._skyboxMaterial.dispose();
//             this._skyboxMaterial = null;
//         }
//         if (this._morningTexture) {
//             this._morningTexture.dispose();
//             this._morningTexture = null;
//         }
//         if (this._eveningTexture) {
//             this._eveningTexture.dispose();
//             this._eveningTexture = null;
//         }
//     }

//     /**
//      * Called on a message has been received and sent from a graph.
//      * @param name defines the name of the message sent from the graph.
//      * @param data defines the data sent in the message.
//      * @param sender defines the reference to the graph class that sent the message.
//      */
//     public onMessage(name: string, data: any, sender: any): void {
//         switch (name) {
//             case "myMessage":
//                 // Do something...
//                 break;
//         }
//     }
// }
