import { Node } from "@babylonjs/core/node";
import { fromChildren, onKeyboardEvent, visibleInInspector } from "../decorators";
import * as BABYLON from "@babylonjs/core";
import { KeyboardEventTypes } from "@babylonjs/core";
import "@babylonjs/loaders";

export default class Player extends BABYLON.TransformNode {
    @visibleInInspector("Node", "Camera Node")
    public cameraNode: BABYLON.FreeCamera | null = null;
    @visibleInInspector("number", "Speed", 0.2)
    private _speed: number = 0.2;

    public node: BABYLON.TransformNode;
    public outerParent: BABYLON.TransformNode | null = null;
    // @fromChildren("character")
    public character: BABYLON.Mesh | null = null;
    public shadowGenerator: BABYLON.ShadowGenerator | null = null;

    // Animation Groups
    private _idleAnim: BABYLON.AnimationGroup | null = null;
    private _walkAnim: BABYLON.AnimationGroup | null = null;
    private _danceAnim: BABYLON.AnimationGroup | null = null;
    private _deathAnim: BABYLON.AnimationGroup | null = null;
    private _noAnim: BABYLON.AnimationGroup | null = null;
    private _yesAnim: BABYLON.AnimationGroup | null = null;
    private _punchAnim: BABYLON.AnimationGroup | null = null;
    private _sittingAnim: BABYLON.AnimationGroup | null = null;
    private _thumbsUpAnim: BABYLON.AnimationGroup | null = null;
    private _waveAnim: BABYLON.AnimationGroup | null = null;
    private _currentAnim: BABYLON.AnimationGroup | null = null;

    // Animation lock states
    private _animationLocks: { [key: string]: boolean } = {
        Dance: true, // Locked initially
        Death: true,
        No: true,
        Yes: true,
        Punch: true,
        Sitting: true,
        ThumbsUp: true,
        Wave: true
    };

    // Track key states
    private _moveForward = false;
    private _moveBackward = false;
    private _moveLeft = false;
    private _moveRight = false;
    private _isDancing = false;
    private _isDead = false;
    private _isNo = false;
    private _isYes = false;
    private _isPunching = false;
    private _isSitting = false;
    private _isThumbsUp = false;
    private _isWaving = false;

    @onKeyboardEvent("w", KeyboardEventTypes.KEYDOWN)
    public moveForwardDown(): void { this._moveForward = true; }
    @onKeyboardEvent("w", KeyboardEventTypes.KEYUP)
    public moveForwardUp(): void { this._moveForward = false; }

    @onKeyboardEvent("s", KeyboardEventTypes.KEYDOWN)
    public moveBackwardDown(): void { this._moveBackward = true; }
    @onKeyboardEvent("s", KeyboardEventTypes.KEYUP)
    public moveBackwardUp(): void { this._moveBackward = false; }

    @onKeyboardEvent("a", KeyboardEventTypes.KEYDOWN)
    public moveLeftDown(): void { this._moveLeft = true; }
    @onKeyboardEvent("a", KeyboardEventTypes.KEYUP)
    public moveLeftUp(): void { this._moveLeft = false; }

    @onKeyboardEvent("d", KeyboardEventTypes.KEYDOWN)
    public moveRightDown(): void { this._moveRight = true; }
    @onKeyboardEvent("d", KeyboardEventTypes.KEYUP)
    public moveRightUp(): void { this._moveRight = false; }

    @onKeyboardEvent("1", KeyboardEventTypes.KEYDOWN)
    public danceStart(): void { if (!this._animationLocks.Dance) this._isDancing = true; }
    @onKeyboardEvent("1", KeyboardEventTypes.KEYUP)
    public danceStop(): void { this._isDancing = false; }

    @onKeyboardEvent("2", KeyboardEventTypes.KEYDOWN)
    public deathStart(): void { if (!this._animationLocks.Death) this._isDead = true; }
    @onKeyboardEvent("2", KeyboardEventTypes.KEYUP)
    public deathStop(): void { this._isDead = false; }

    @onKeyboardEvent("3", KeyboardEventTypes.KEYDOWN)
    public noStart(): void { if (!this._animationLocks.No) this._isNo = true; }
    @onKeyboardEvent("3", KeyboardEventTypes.KEYUP)
    public noStop(): void { this._isNo = false; }

    @onKeyboardEvent("4", KeyboardEventTypes.KEYDOWN)
    public yesStart(): void { if (!this._animationLocks.Yes) this._isYes = true; }
    @onKeyboardEvent("4", KeyboardEventTypes.KEYUP)
    public yesStop(): void { this._isYes = false; }

    @onKeyboardEvent("5", KeyboardEventTypes.KEYDOWN)
    public punchStart(): void { if (!this._animationLocks.Punch) this._isPunching = true; }
    @onKeyboardEvent("5", KeyboardEventTypes.KEYUP)
    public punchStop(): void { this._isPunching = false; }

    @onKeyboardEvent("6", KeyboardEventTypes.KEYDOWN)
    public sittingStart(): void { if (!this._animationLocks.Sitting) this._isSitting = true; }
    @onKeyboardEvent("6", KeyboardEventTypes.KEYUP)
    public sittingStop(): void { this._isSitting = false; }

    @onKeyboardEvent("7", KeyboardEventTypes.KEYDOWN)
    public thumbsUpStart(): void { if (!this._animationLocks.ThumbsUp) this._isThumbsUp = true; }
    @onKeyboardEvent("7", KeyboardEventTypes.KEYUP)
    public thumbsUpStop(): void { this._isThumbsUp = false; }

    @onKeyboardEvent("8", KeyboardEventTypes.KEYDOWN)
    public waveStart(): void { if (!this._animationLocks.Wave) this._isWaving = true; }
    @onKeyboardEvent("8", KeyboardEventTypes.KEYUP)
    public waveStop(): void { this._isWaving = false; }

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    public onStart(): void {
        this.node = this as BABYLON.TransformNode;

        this._loadCharacterAndAnimations();
    }

    private _loadCharacterAndAnimations(): void {
        const scene = this.getScene();

        BABYLON.SceneLoader.ImportMeshAsync("", "assets/Model/Robot/", "RobotExpressive.glb", scene).then((result) => {
            const loadedMeshes = result.meshes[0];

            //set loadedMeshes to children of this.node
            loadedMeshes.parent = this.node;
            loadedMeshes.position.set(0, -2, 0); // Reset position of loaded meshes


            // Create invisible capsule impostor
            const capsule = BABYLON.MeshBuilder.CreateBox("PlayerCollisionBox", { height: 4, width: 3, depth: 2 }, scene);
            capsule.position.y = 2;
            this._applyCharacterPhysics(capsule, scene); // Physics setup
            capsule.isVisible = false;
            capsule.showBoundingBox = true; // Show bounding box for debugging
            capsule.checkCollisions = true;
            capsule.position.z = this.node.position.z; // Align with character root position
            capsule.position.x = this.node.position.x; // Align with character root position
            this.node.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0)); // Reset position of this.node to origin
            this.node.parent = capsule;
            this.node = capsule
            this.node.setAbsolutePosition(new BABYLON.Vector3(0, 2, 0)); // Reset position of this.node to origin


            capsule.physicsImpostor.registerBeforePhysicsStep(() => {
                const angularVelocity = capsule.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
                angularVelocity.x = 0;
                angularVelocity.z = 0; // Prevent rotation around X and Z axes
                capsule.physicsImpostor.setAngularVelocity(angularVelocity);
                //set y linear velocity to 0
                // const linearVelocity = capsule.physicsImpostor.getLinearVelocity() || BABYLON.Vector3.Zero();
                // linearVelocity.y = 0; // Prevent vertical movement
                // capsule.physicsImpostor.setLinearVelocity(linearVelocity);
            });

            // Enable shadow casting for all meshes
            this.shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.getLightByName("sun") as BABYLON.DirectionalLight);
            // shadowGenerator.getShadowMap().renderList.push(...result.meshes); // Add all meshes to shadow map
            this.shadowGenerator.useContactHardeningShadow = true;
            this.shadowGenerator.normalBias = 0.02;
            this.shadowGenerator.bias = 0.001;
            this.shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
            this.shadowGenerator.darkness = 0.6;

            result.meshes.forEach((mesh) => {
                if (mesh instanceof BABYLON.Mesh) {
                    this.shadowGenerator.addShadowCaster(mesh); // Add mesh to shadow caster
                    mesh.receiveShadows = true; // Enable shadow receiving

                    if (mesh.material) {
                        const material = mesh.material as BABYLON.PBRMaterial;
                        material.useLightmapAsShadowmap = true; // Use lightmap for shadows
                        material.directIntensity = 10;
                    }
                }
            });

            // Find first mesh with a skeleton
            const skinnedMesh = result.meshes.find(mesh => (mesh as BABYLON.Mesh).skeleton) as BABYLON.Mesh;

            if (!skinnedMesh) {
                console.warn("No skinned mesh found in imported model.");
                return;
            }

            this.character = skinnedMesh;

            console.log("result.animationGroup" + result.animationGroups);

            this._walkAnim = result.animationGroups.find(anim => anim.name === "Walking") || null;
            this._idleAnim = result.animationGroups.find(anim => anim.name === "Idle") || null;
            this._danceAnim = result.animationGroups.find(anim => anim.name === "Dance") || null;
            this._deathAnim = result.animationGroups.find(anim => anim.name === "Death") || null;
            this._noAnim = result.animationGroups.find(anim => anim.name === "No") || null;
            this._yesAnim = result.animationGroups.find(anim => anim.name === "Yes") || null;
            this._punchAnim = result.animationGroups.find(anim => anim.name === "Punch") || null;
            this._sittingAnim = result.animationGroups.find(anim => anim.name === "Sitting") || null;
            this._thumbsUpAnim = result.animationGroups.find(anim => anim.name === "ThumbsUp") || null;
            this._waveAnim = result.animationGroups.find(anim => anim.name === "Wave") || null;

            //Stop all animation of result.animationGroups
            result.animationGroups.forEach(anim => {
                anim.stop();
            });

            scene.onBeforeRenderObservable.add(() => {
            });
        });
    }

    private _applyCharacterPhysics(capsule: BABYLON.Mesh, scene: BABYLON.Scene): void {
        capsule.physicsImpostor = new BABYLON.PhysicsImpostor(
            capsule,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {
                mass: 50,
                friction: 0.9,
                restitution: 0.0
            },
            scene
        );
    }

    public unlockAnimation(animName: string): void {
        if (this._animationLocks[animName] !== undefined) {
            this._animationLocks[animName] = false;
            console.log(`Unlocked animation: ${animName}`);
        }
    }

    public getUnlockedAnimations(): string[] {
        return Object.keys(this._animationLocks).filter(anim => !this._animationLocks[anim]);
    }


    public onUpdate(): void {
        if (!this.cameraNode) return;

        const forward = this.cameraNode.getDirection(BABYLON.Axis.Z);
        const right = this.cameraNode.getDirection(BABYLON.Axis.X);

        const moveVector = new BABYLON.Vector3();

        if (this._moveForward) moveVector.addInPlace(forward);
        if (this._moveBackward) moveVector.subtractInPlace(forward);
        if (this._moveLeft) moveVector.subtractInPlace(right);
        if (this._moveRight) moveVector.addInPlace(right);

        moveVector.y = 0; // Ignore vertical component
        const isMoving = moveVector.lengthSquared() > 0;

        if (isMoving) {
            moveVector.normalize();

            // Move the player
            // this.node.position.addInPlace(moveVector.scale(this._speed));
            const desiredVelocity = moveVector.scale(this._speed * 50);
            (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(new BABYLON.Vector3(
                desiredVelocity.x,
                (this.node as BABYLON.Mesh).physicsImpostor?.getLinearVelocity()?.y || 0, // Preserve vertical velocity
                desiredVelocity.z
            ));
            // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(desiredVelocity);


            // Rotate player to face the move direction
            const angle = Math.atan2(moveVector.x, moveVector.z);
            // this.node.rotation.y = angle;
            const quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
            this.node.rotationQuaternion = quaternion;
            (this.node as BABYLON.Mesh).physicsImpostor?.setAngularVelocity(BABYLON.Vector3.Zero()); // Optional: Stop unwanted spinning

        } else {
            //reset velocity when not moving
            // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(BABYLON.Vector3.Zero());
            const currentVelocity = (this.node as BABYLON.Mesh).physicsImpostor?.getLinearVelocity() || BABYLON.Vector3.Zero();
            (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(new BABYLON.Vector3(0, currentVelocity.y, 0));
            (this.node as BABYLON.Mesh).physicsImpostor?.setAngularVelocity(BABYLON.Vector3.Zero()); // Stop unwanted spinning
        }

        // Animation logic
        // Animation logic
        if (this._isDancing) {
            this._playAnimation(this._danceAnim);
        } else if (this._isDead) {
            this._playAnimation(this._deathAnim);
        } else if (this._isNo) {
            this._playAnimation(this._noAnim);
        } else if (this._isYes) {
            this._playAnimation(this._yesAnim);
        } else if (this._isPunching) {
            this._playAnimation(this._punchAnim);
        } else if (this._isSitting) {
            this._playAnimation(this._sittingAnim);
        } else if (this._isThumbsUp) {
            this._playAnimation(this._thumbsUpAnim);
        } else if (this._isWaving) {
            this._playAnimation(this._waveAnim);
        } else if (isMoving) {
            this._playAnimation(this._walkAnim);
        } else {
            this._playAnimation(this._idleAnim);
        }
    }

    private _playAnimation(anim: BABYLON.AnimationGroup | null): void {
        if (this._currentAnim === anim) return;

        this._currentAnim?.stop();
        if (anim === this._idleAnim && this.character?.skeleton) {
            this.character.skeleton.returnToRest(); // <-- important line
        }

        anim?.start(true, 1.0, anim.from, anim.to, false);
        this._currentAnim = anim;
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        this._currentAnim?.stop();
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
