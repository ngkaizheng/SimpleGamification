import { Node } from "@babylonjs/core/node";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import * as BABYLON from "@babylonjs/core";

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

export default class Ground extends Node {
    @visibleInInspector("Node", "Ground Node")
    public groundNode: BABYLON.GroundMesh | null = null;
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
        // const scene = this.getScene();
        // const groundMat = new PBRMaterial("/textures/sand_03_albedo_1k.png", scene);
        // const groundTexture = new Texture("/textures/sand_03_albedo_1k.png", scene);

        // this.groundNode.material
        // // Make it repeat 10x10 times
        // groundTexture.uScale = 10;
        // groundTexture.vScale = 10;
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
