// import { Node } from "@babylonjs/core/node";
// import { fromChildren, onKeyboardEvent, visibleInInspector } from "../decorators";
// import * as BABYLON from "@babylonjs/core";
// import { KeyboardEventTypes } from "@babylonjs/core";
// export default class Player extends BABYLON.TransformNode {
//     @visibleInInspector("Node", "Camera Node")
//     public cameraNode: BABYLON.FreeCamera | null = null;
//     @visibleInInspector("number", "Speed", 0.2)
//     private _speed: number = 0.2;
//     public node: BABYLON.TransformNode;
//     @fromChildren("character")
//     public character: BABYLON.Mesh | null = null;
//     // Animation Groups
//     private _idleAnim: BABYLON.AnimationGroup | null = null;
//     private _walkAnim: BABYLON.AnimationGroup | null = null;
//     private _danceAnim: BABYLON.AnimationGroup | null = null;
//     private _currentAnim: BABYLON.AnimationGroup | null = null;
//     // Track key states
//     private _moveForward = false;
//     private _moveBackward = false;
//     private _moveLeft = false;
//     private _moveRight = false;
//     private _isDancing = false;
//     @onKeyboardEvent("w", KeyboardEventTypes.KEYDOWN)
//     public moveForwardDown(): void {
//         this._moveForward = true;
//     }
//     @onKeyboardEvent("w", KeyboardEventTypes.KEYUP)
//     public moveForwardUp(): void {
//         this._moveForward = false;
//     }
//     @onKeyboardEvent("s", KeyboardEventTypes.KEYDOWN)
//     public moveBackwardDown(): void {
//         this._moveBackward = true;
//     }
//     @onKeyboardEvent("s", KeyboardEventTypes.KEYUP)
//     public moveBackwardUp(): void {
//         this._moveBackward = false;
//     }
//     @onKeyboardEvent("a", KeyboardEventTypes.KEYDOWN)
//     public moveLeftDown(): void {
//         this._moveLeft = true;
//     }
//     @onKeyboardEvent("a", KeyboardEventTypes.KEYUP)
//     public moveLeftUp(): void {
//         this._moveLeft = false;
//     }
//     @onKeyboardEvent("d", KeyboardEventTypes.KEYDOWN)
//     public moveRightDown(): void {
//         this._moveRight = true;
//     }
//     @onKeyboardEvent("d", KeyboardEventTypes.KEYUP)
//     public moveRightUp(): void {
//         this._moveRight = false;
//     }
//     @onKeyboardEvent("b", KeyboardEventTypes.KEYDOWN)
//     public danceStart(): void {
//         this._isDancing = true;
//     }
//     @onKeyboardEvent("b", KeyboardEventTypes.KEYUP)
//     public danceStop(): void {
//         this._isDancing = false;
//     }
//     /**
//      * Override constructor.
//      * @warn do not fill.
//      */
//     // @ts-ignore ignoring the super call as we don't want to re-init
//     protected constructor() { }
//     public onStart(): void {
//         this.node = this as BABYLON.TransformNode;
//         // Find animation groups
//         const scene = this.getScene();
//         this._walkAnim = scene.getAnimationGroupByName("Walking") || null;
//         this._idleAnim = scene.getAnimationGroupByName("Idle") || null;
//         this._danceAnim = scene.getAnimationGroupByName("Dance") || null;
//         console.log("Found walking animation group:", this._walkAnim?.name); // Should be "Walking"
//         console.log("Player animations loaded:", {
//             walk: this._walkAnim,
//             idle: this._idleAnim,
//             dance: this._danceAnim
//         });
//         // Start with idle animation
//         this._playAnimation(this._idleAnim);
//     }
//     public onUpdate(): void {
//         if (!this.cameraNode) return;
//         const forward = this.cameraNode.getDirection(BABYLON.Axis.Z);
//         const right = this.cameraNode.getDirection(BABYLON.Axis.X);
//         const moveVector = new BABYLON.Vector3();
//         if (this._moveForward) moveVector.addInPlace(forward);
//         if (this._moveBackward) moveVector.subtractInPlace(forward);
//         if (this._moveLeft) moveVector.subtractInPlace(right);
//         if (this._moveRight) moveVector.addInPlace(right);
//         moveVector.y = 0; // Ignore vertical component
//         const isMoving = moveVector.lengthSquared() > 0;
//         if (isMoving) {
//             moveVector.normalize();
//             // Move the player
//             this.node.position.addInPlace(moveVector.scale(this._speed));
//             // Rotate player to face the move direction
//             const angle = Math.atan2(moveVector.x, moveVector.z);
//             this.node.rotation.y = angle;
//         }
//         // Animation logic
//         if (this._isDancing) {
//             this._playAnimation(this._danceAnim);
//         } else if (isMoving) {
//             this._playAnimation(this._walkAnim);
//         } else {
//             this._playAnimation(this._idleAnim);
//         }
//     }
//     private _playAnimation(anim: BABYLON.AnimationGroup | null): void {
//         if (this._currentAnim === anim) return;
//         console.log(anim?.targetedAnimations.map(a => a.target.name));
//         this._currentAnim?.stop();
//         anim?.start(true, 1.0, anim.from, anim.to, false);
//         console.log("Playing animation:", anim?.name, "from", anim?.from, "to", anim?.to);
//         this._currentAnim = anim;
//     }
//     /**
//      * Called on the object has been disposed.
//      * Object can be disposed manually or when the editor stops running the scene.
//      */
//     public onStop(): void {
//         this._currentAnim?.stop();
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
//# sourceMappingURL=Player%20copy.js.map