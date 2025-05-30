import { Node } from "@babylonjs/core/node";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import * as BABYLON from "@babylonjs/core";
import { KeyboardEventTypes } from "@babylonjs/core";
import "@babylonjs/loaders";

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameras
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
import { visibleInInspector } from "../decorators";

export default class GameController extends Node {
    @visibleInInspector("string", "Game Start String")
    public gameStartString: string = "Hello, World!";

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        console.log(this.gameStartString);

        const directionalLight = this.getScene().getLightByName("sun") as BABYLON.DirectionalLight;
        directionalLight.shadowMinZ = 0.1; // Set near plane for shadows
        directionalLight.shadowMaxZ = 1000; // Set far plane for shadows

        // var sphere = BABYLON.CreateSphere("sphere", { diameter: 2 }, this.getScene());
        // sphere.position.y = 10;

        // sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0.2 }, this.getScene());
        // sphere.showBoundingBox = true;

        // var sphere2 = BABYLON.CreateSphere("sphere", { diameter: 2 }, this.getScene());
        // sphere2.position.y = 15;

        // sphere2.physicsImpostor = new BABYLON.PhysicsImpostor(sphere2, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0.2 }, this.getScene());
        // sphere2.showBoundingBox = true;
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
        // console.log("GameController updating");
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
