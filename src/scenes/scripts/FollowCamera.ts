import { Node } from "@babylonjs/core/node";
import { visibleInInspector } from "../decorators";
import * as BABYLON from "@babylonjs/core";
import { PointerEventTypes, PointerInfo } from "@babylonjs/core";
import { off } from "process";

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



export default class FollowCamera extends BABYLON.TransformNode {
    @visibleInInspector("Node", "Camera Node")
    public cameraNode: BABYLON.FreeCamera | null = null;
    @visibleInInspector("Node", "Player Node")
    public playerNode: BABYLON.TransformNode | null = null;

    private _yaw: number = 0;
    private _pitch: number = 20; // Starting vertical angle in degrees
    private _radius: number = 12;

    private readonly _offset: number = 3;
    private readonly _sensitivity: number = 0.2;
    private readonly _minPitch: number = -30;
    private readonly _maxPitch: number = 70;

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
        if (this.cameraNode) {
            const camera = this.cameraNode as BABYLON.FreeCamera;
            camera.inputs.clear(); // Remove all default controls
        }

        const scene = this.getScene();

        scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    if (!scene.getEngine().isPointerLock) {
                        scene.getEngine().enterPointerlock();
                    }
                    break;;
                case PointerEventTypes.POINTERMOVE:
                    const dx = pointerInfo.event.movementX;
                    const dy = pointerInfo.event.movementY;

                    this._yaw += dx * this._sensitivity;
                    this._pitch -= dy * this._sensitivity;

                    // Clamp vertical angle
                    this._pitch = Math.max(this._minPitch, Math.min(this._maxPitch, this._pitch));
                    break;
            }
        });
    }


    /**
     * Called each frame.
     */
    public onUpdate(): void {
        if (!this.cameraNode || !this.playerNode) return;

        var playerPosition = this.playerNode.getAbsolutePosition();
        const offsetVector = new BABYLON.Vector3(0, this._offset, 0);
        playerPosition = playerPosition.add(offsetVector);

        // Convert yaw/pitch to radians
        const yawRad = BABYLON.Angle.FromDegrees(this._yaw).radians();
        const pitchRad = BABYLON.Angle.FromDegrees(this._pitch).radians();

        // Spherical to Cartesian conversion
        const x = this._radius * Math.cos(pitchRad) * Math.sin(yawRad);
        const y = this._radius * Math.sin(pitchRad);
        const z = this._radius * Math.cos(pitchRad) * Math.cos(yawRad);

        const desiredCameraPosition = playerPosition.add(new BABYLON.Vector3(x, y, z));

        // Smooth movement
        const currentPosition = this.cameraNode.position;
        const newPosition = BABYLON.Vector3.Lerp(currentPosition, desiredCameraPosition, 0.1);
        this.cameraNode.position.copyFrom(newPosition);

        this.cameraNode.setTarget(playerPosition);
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
