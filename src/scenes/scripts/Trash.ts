import { Node } from "@babylonjs/core/node";
import * as BABYLON from "@babylonjs/core";
import { fromChildren, onKeyboardEvent, visibleInInspector } from "../decorators";
import { KeyboardEventTypes } from "@babylonjs/core";
import Player from "./Player";

export default class Trash extends BABYLON.TransformNode {

    @visibleInInspector("number", "Spawn Count", 10)
    private _spawnCount: number = 10;

    @visibleInInspector("number", "Spawn Radius", 50)
    private _spawnRadius: number = 50;

    @visibleInInspector("Node", "Player Node")
    private _playerNode: BABYLON.TransformNode | null = null;

    private _trashMeshes: BABYLON.Mesh[] = [];
    private _trashCollected: number = 0;
    private _isInitialized: boolean = false; // Flag to track initialization
    private _playerCollisionBox: BABYLON.Mesh | null = null;
    private _targetTrashCount: number = 3;
    private _unlockedAnimations: string[] = [];
    private readonly _animationOrder: string[] = ["Dance", "Death", "No", "Yes", "Punch", "Sitting", "ThumbsUp", "Wave"];


    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    public setPlayer(player: BABYLON.TransformNode): void {
        this._playerNode = player;
    }

    public getTrashCollected(): number {
        return this._trashCollected;
    }

    public getTargetTrashCount(): number {
        return this._targetTrashCount;
    }

    public areAllAnimationsUnlocked(): boolean {
        return this._unlockedAnimations.length >= this._animationOrder.length;
    }

    public getUnlockedAnimations(): string[] {
        return [...this._unlockedAnimations];
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        if (!this._playerNode) {
            console.warn("Player Node not assigned in Trash script. Please set it in the Inspector.");
            return;
        }
    }

    public onUpdate(): void {
        if (!this._isInitialized) {
            this._playerCollisionBox = this._scene.getMeshByName("PlayerCollisionBox") as BABYLON.Mesh;
            if (this._playerCollisionBox && this._playerCollisionBox.physicsImpostor) {
                // Player's physics impostor is ready, initialize trash logic
                // this._spawnTrash();
                // this._setupCollisionDetection();
                // this._setupPickupLogic();
                // this._isInitialized = true; // Prevent re-initialization
                this._isInitialized = true;
                this._spawnTrash().then(() => {
                    this._setupCollisionDetection();
                    this._setupPickupLogic();
                    console.log("Trash script initialized with PlayerCollisionBox.");
                });
                console.log("Trash script initialized with PlayerCollisionBox.");
            } else {
                console.log("Waiting for PlayerCollisionBox to be ready...");
            }
        }

        // Check for animation unlock
        if (this._trashCollected >= this._targetTrashCount && !this.areAllAnimationsUnlocked()) {
            const nextAnimIndex = this._unlockedAnimations.length;
            if (nextAnimIndex < this._animationOrder.length) {
                const animToUnlock = this._animationOrder[nextAnimIndex];
                this._unlockedAnimations.push(animToUnlock);
                (this._playerNode as Player).unlockAnimation(animToUnlock);
                this._targetTrashCount += 3;
                console.log(`Unlocked ${animToUnlock}, new target: ${this._targetTrashCount}`);
            }
        }
    }


    // private _spawnTrash(): void {
    //     for (let i = 0; i < this._spawnCount; i++) {
    //         const trash = BABYLON.MeshBuilder.CreateSphere(`trash_${i}`, { diameter: 1 }, this.getScene());
    //         trash.position = new BABYLON.Vector3(
    //             (Math.random() - 0.5) * this._spawnRadius,
    //             0.5,
    //             (Math.random() - 0.5) * this._spawnRadius
    //         );

    //         const material = new BABYLON.StandardMaterial(`trashMat_${i}`, this.getScene());
    //         material.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
    //         trash.material = material;

    //         const shadowGenerator = this.getScene().getLightByName("sun") as BABYLON.DirectionalLight;
    //         if (shadowGenerator) {
    //             const shadowGen = new BABYLON.ShadowGenerator(1024, shadowGenerator);
    //             shadowGen.addShadowCaster(trash);
    //             trash.receiveShadows = true;
    //         }

    //         this._applyPhysics(trash);
    //         this._trashMeshes.push(trash);
    //     }
    // }
    private async _spawnTrash(): Promise<void> {
        this._trashMeshes.forEach(trash => trash.dispose());
        this._trashMeshes = [];

        const scene = this.getScene();
        const fallbackMaterial = new BABYLON.StandardMaterial("trashMat", scene);
        fallbackMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);

        const shadowGenerator = scene.getLightByName("sun") as BABYLON.DirectionalLight;
        let shadowGen: BABYLON.ShadowGenerator | null = null;
        // if (shadowGenerator) {
        //     shadowGen = new BABYLON.ShadowGenerator(1024, shadowGenerator);
        //     shadowGen.useContactHardeningShadow = true;
        //     shadowGen.normalBias = 0.02;
        //     shadowGen.bias = 0.001;
        //     shadowGen.contactHardeningLightSizeUVRatio = 0.05;
        //     shadowGen.darkness = 0.6;
        // }

        // Create an array of promises for all trash meshes
        const trashPromises = [];

        for (let i = 0; i < this._spawnCount; i++) {
            try {
                const promise = BABYLON.SceneLoader.ImportMeshAsync("", "assets/Model/Bottle/", "plastic_bottle.glb", scene).then((result) => {
                    const loadedMesh = result.meshes[0] as BABYLON.Mesh;

                    // Create invisible box collider
                    const collisionBox = BABYLON.MeshBuilder.CreateBox(`trash_${i}_box`, {
                        height: 1,
                        width: 0.5,
                        depth: 0.5
                    }, scene);

                    // Position the box
                    collisionBox.position = new BABYLON.Vector3(
                        (Math.random() - 0.5) * this._spawnRadius, // Reduced radius for testing
                        0.5, // Above ground
                        (Math.random() - 0.5) * this._spawnRadius
                    );

                    // Apply scaling to the box (overall size)
                    collisionBox.scaling = new BABYLON.Vector3(1, 2, 1);

                    // Apply rotation: x = 90°, y = random 0–360°, z = 0°
                    const xRotation = BABYLON.Angle.FromDegrees(90).radians();
                    const yRotation = BABYLON.Angle.FromDegrees(Math.random() * 360).radians();
                    collisionBox.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(xRotation, yRotation, 0);

                    // Configure the box
                    collisionBox.isVisible = false;
                    collisionBox.checkCollisions = true;
                    collisionBox.name = `trash_${i}`;

                    // Apply physics to the box
                    collisionBox.physicsImpostor = new BABYLON.PhysicsImpostor(
                        collisionBox,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        {
                            mass: 1,
                            friction: 0.9,
                            restitution: 0.0,
                        },
                        scene
                    );
                    collisionBox.physicsImpostor.registerBeforePhysicsStep(() => {
                        const angularVelocity = collisionBox.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
                        angularVelocity.x = 0;
                        angularVelocity.z = 0;
                        collisionBox.physicsImpostor.setAngularVelocity(angularVelocity);
                    });

                    // Parent the GLTF model to the box
                    loadedMesh.parent = collisionBox;
                    loadedMesh.position.set(0, -0.6, 0); // Center within box
                    loadedMesh.scaling = new BABYLON.Vector3(50, 25, 50); // Relative scaling
                    loadedMesh.rotationQuaternion = null;
                    loadedMesh.rotation.set(0, 0, 0);

                    // Apply material and shadows to GLTF meshes
                    result.meshes.forEach((mesh) => {
                        if (mesh instanceof BABYLON.Mesh) {
                            mesh.isVisible = true;
                            mesh.alwaysSelectAsActiveMesh = true;
                            // if (!mesh.material) {
                            //     mesh.material = fallbackMaterial;
                            // }
                            // if (shadowGen) {
                            //     shadowGen.addShadowCaster(mesh);
                            //     mesh.receiveShadows = true;
                            // }
                            if (mesh.material instanceof BABYLON.PBRMaterial) {
                                mesh.material.useLightmapAsShadowmap = true;
                                mesh.material.directIntensity = 10;
                            }
                        }
                    });

                    // Debug logging
                    console.log(`Loaded trash model for trash_${i}`, {
                        boxPosition: collisionBox.position.asArray(),
                        boxScaling: collisionBox.scaling.asArray(),
                        modelPosition: loadedMesh.position.asArray(),
                        modelScaling: loadedMesh.scaling.asArray(),
                        isVisible: loadedMesh.isVisible,
                        childMeshes: result.meshes.length
                    });

                    // Store the collision box as the trash mesh
                    this._trashMeshes.push(collisionBox);
                }).catch((error) => {
                    console.error(`Failed to load trash model for trash_${i}:`, error);
                });
                trashPromises.push(promise); // Add the promise to the array
            } catch (error) {
                console.error(`Error setting up trash_${i}:`, error);
            }
        }
        await Promise.all(trashPromises); // Wait for all promises to resolve
    }


    // private _applyPhysics(trash: BABYLON.Mesh): void {
    //     trash.physicsImpostor = new BABYLON.PhysicsImpostor(
    //         trash,
    //         BABYLON.PhysicsImpostor.SphereImpostor,
    //         {
    //             mass: 0,
    //             friction: 1.0,
    //             restitution: 0.0
    //         },
    //         this.getScene()
    //     );

    //     trash.physicsImpostor.registerBeforePhysicsStep(() => {
    //         const angularVelocity = trash.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
    //         angularVelocity.x = 0;
    //         angularVelocity.z = 0;
    //         trash.physicsImpostor.setAngularVelocity(angularVelocity);
    //     });
    // }

    private _setupCollisionDetection(): void {
        if (!this._playerCollisionBox || !this._playerCollisionBox.physicsImpostor) return;

        console.log("Setting up collision detection for trash...");

        this._trashMeshes.forEach((trash) => {
            trash.physicsImpostor.registerOnPhysicsCollide(
                this._playerCollisionBox.physicsImpostor,
                (collider, collided) => {
                    trash.metadata = trash.metadata || {};
                    trash.metadata.isCollectible = true;
                    console.log(`Trash ${trash.name} is now collectible.`);
                }
            );

            trash.physicsImpostor.onCollideEvent = (collider, collided) => {
                // console.log("collided.object as BABYLON.Mesh).name:", (collided.object as BABYLON.Mesh).name);
                // console.log("collided.object:", collided.object);
                // console.log("collided.object.metadata:", (collided.object as BABYLON.Mesh).metadata);
                if ((collided.object as BABYLON.Mesh).name !== "PlayerCollisionBox") {
                    trash.metadata.isCollectible = false;
                    // console.log("Trash is not collectible anymore.");
                }
            };
        });
    }

    @onKeyboardEvent("e", KeyboardEventTypes.KEYDOWN)
    private _handlePickup(): void {
        if (!this._playerNode) return;

        console.log("Checki1ng for trash pickup...");

        this._trashMeshes = this._trashMeshes.filter((trash) => {
            if (trash.metadata?.isCollectible) {
                const distance = BABYLON.Vector3.Distance(this._playerCollisionBox!.position, trash.position);
                if (distance < 5) {
                    this._trashCollected++;
                    console.log(`Trash collected! Total: ${this._trashCollected}`);
                    trash.dispose();
                    return false;
                }
            }
            return true;
        });

        if (this._trashMeshes.length === 0) {
            console.log("All trash collected! Respawning...");
            // this._spawnTrash();
            // this._setupCollisionDetection(); // Setup collisions for new trash
            // this._setupPickupLogic(); // Setup pickup logic for new trash
            this._spawnTrash().then(() => {
                this._setupCollisionDetection();
                this._setupPickupLogic();
            });
        }
    }

    private _setupPickupLogic(): void {
        this._trashMeshes.forEach((trash) => {
            trash.metadata = trash.metadata || {};
            trash.metadata.isCollectible = false;
        });
    }


    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        this._trashMeshes.forEach((trash) => trash.dispose());
        this._trashMeshes = [];
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
