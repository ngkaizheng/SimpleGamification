// import { Node } from "@babylonjs/core/node";
// import { fromChildren, onKeyboardEvent, visibleInInspector } from "../decorators";
// import * as BABYLON from "@babylonjs/core";
// import { KeyboardEventTypes } from "@babylonjs/core";
// import "@babylonjs/loaders";
// export default class Player extends BABYLON.TransformNode {
//     @visibleInInspector("Node", "Camera Node")
//     public cameraNode: BABYLON.FreeCamera | null = null;
//     @visibleInInspector("number", "Speed", 0.2)
//     private _speed: number = 0.2;
//     public node: BABYLON.TransformNode;
//     public outerParent: BABYLON.TransformNode | null = null;
//     // @fromChildren("character")
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
//         this._loadCharacterAndAnimations();
//     }
//     private _loadCharacterAndAnimations(): void {
//         const scene = this.getScene();
//         BABYLON.SceneLoader.ImportMeshAsync("", "/assets/Model/Robot/", "RobotExpressive.glb", scene).then((result) => {
//             const loadedMeshes = result.meshes[0];
//             //set loadedMeshes to children of this.node
//             loadedMeshes.parent = this.node;
//             loadedMeshes.position.set(0, -2, 0); // Reset position of loaded meshes
//             // Create invisible capsule impostor
//             const capsule = BABYLON.MeshBuilder.CreateBox("PlayerCollisionBox", { height: 4, width: 3, depth: 2 }, scene);
//             capsule.position.y = 2;
//             this._applyCharacterPhysics(capsule, scene); // Physics setup
//             capsule.isVisible = false;
//             capsule.showBoundingBox = true; // Show bounding box for debugging
//             capsule.checkCollisions = true;
//             capsule.position.z = this.node.position.z; // Align with character root position
//             capsule.position.x = this.node.position.x; // Align with character root position
//             this.node.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0)); // Reset position of this.node to origin
//             this.node.parent = capsule;
//             this.node = capsule
//             capsule.physicsImpostor.registerBeforePhysicsStep(() => {
//                 const angularVelocity = capsule.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
//                 angularVelocity.x = 0;
//                 angularVelocity.z = 0; // Prevent rotation around X and Z axes
//                 capsule.physicsImpostor.setAngularVelocity(angularVelocity);
//                 //set y linear velocity to 0
//                 // const linearVelocity = capsule.physicsImpostor.getLinearVelocity() || BABYLON.Vector3.Zero();
//                 // linearVelocity.y = 0; // Prevent vertical movement
//                 // capsule.physicsImpostor.setLinearVelocity(linearVelocity);
//             });
//             // Enable shadow casting for all meshes
//             const shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.getLightByName("sun") as BABYLON.DirectionalLight);
//             // shadowGenerator.getShadowMap().renderList.push(...result.meshes); // Add all meshes to shadow map
//             shadowGenerator.useContactHardeningShadow = true;
//             shadowGenerator.normalBias = 0.02;
//             shadowGenerator.bias = 0.001;
//             shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
//             shadowGenerator.darkness = 0.6;
//             result.meshes.forEach((mesh) => {
//                 if (mesh instanceof BABYLON.Mesh) {
//                     shadowGenerator.addShadowCaster(mesh); // Add mesh to shadow caster
//                     mesh.receiveShadows = true; // Enable shadow receiving
//                     if (mesh.material) {
//                         const material = mesh.material as BABYLON.PBRMaterial;
//                         material.useLightmapAsShadowmap = true; // Use lightmap for shadows
//                         material.directIntensity = 10;
//                     }
//                 }
//             });
//             // Find first mesh with a skeleton
//             const skinnedMesh = result.meshes.find(mesh => (mesh as BABYLON.Mesh).skeleton) as BABYLON.Mesh;
//             if (!skinnedMesh) {
//                 console.warn("No skinned mesh found in imported model.");
//                 return;
//             }
//             this.character = skinnedMesh;
//             console.log("result.animationGroup" + result.animationGroups);
//             this._walkAnim = result.animationGroups.find(anim => anim.name === "Walking") || null;
//             this._idleAnim = result.animationGroups.find(anim => anim.name === "Idle") || null;
//             this._danceAnim = result.animationGroups.find(anim => anim.name === "Dance") || null;
//             //Stop all animation of result.animationGroups
//             result.animationGroups.forEach(anim => {
//                 anim.stop();
//             });
//             scene.onBeforeRenderObservable.add(() => {
//             });
//         });
//     }
//     private _applyCharacterPhysics(capsule: BABYLON.Mesh, scene: BABYLON.Scene): void {
//         capsule.physicsImpostor = new BABYLON.PhysicsImpostor(
//             capsule,
//             BABYLON.PhysicsImpostor.BoxImpostor,
//             {
//                 mass: 50,
//                 friction: 0.9,
//                 restitution: 0.0
//             },
//             scene
//         );
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
//             // this.node.position.addInPlace(moveVector.scale(this._speed));
//             const desiredVelocity = moveVector.scale(this._speed * 50);
//             (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(new BABYLON.Vector3(
//                 desiredVelocity.x,
//                 (this.node as BABYLON.Mesh).physicsImpostor?.getLinearVelocity()?.y || 0, // Preserve vertical velocity
//                 desiredVelocity.z
//             ));
//             // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(desiredVelocity);
//             // Rotate player to face the move direction
//             const angle = Math.atan2(moveVector.x, moveVector.z);
//             // this.node.rotation.y = angle;
//             const quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
//             this.node.rotationQuaternion = quaternion;
//             (this.node as BABYLON.Mesh).physicsImpostor?.setAngularVelocity(BABYLON.Vector3.Zero()); // Optional: Stop unwanted spinning
//         } else {
//             //reset velocity when not moving
//             // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(BABYLON.Vector3.Zero());
//             const currentVelocity = (this.node as BABYLON.Mesh).physicsImpostor?.getLinearVelocity() || BABYLON.Vector3.Zero();
//             (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(new BABYLON.Vector3(0, currentVelocity.y, 0));
//             (this.node as BABYLON.Mesh).physicsImpostor?.setAngularVelocity(BABYLON.Vector3.Zero()); // Stop unwanted spinning
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
//         this._currentAnim?.stop();
//         if (anim === this._idleAnim && this.character?.skeleton) {
//             this.character.skeleton.returnToRest(); // <-- important line
//         }
//         anim?.start(true, 1.0, anim.from, anim.to, false);
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
//# sourceMappingURL=Player%20copy%202.js.map