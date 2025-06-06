"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var BABYLON = require("@babylonjs/core");
var core_1 = require("@babylonjs/core");
require("@babylonjs/loaders");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function Player() {
        var _this = this;
        _this.cameraNode = null;
        _this._speed = 0.2;
        _this.outerParent = null;
        // @fromChildren("character")
        _this.character = null;
        _this.shadowGenerator = null;
        // Animation Groups
        _this._idleAnim = null;
        _this._walkAnim = null;
        _this._danceAnim = null;
        _this._deathAnim = null;
        _this._noAnim = null;
        _this._yesAnim = null;
        _this._punchAnim = null;
        _this._sittingAnim = null;
        _this._thumbsUpAnim = null;
        _this._waveAnim = null;
        _this._currentAnim = null;
        // Animation lock states
        _this._animationLocks = {
            Dance: true,
            Death: true,
            No: true,
            Yes: true,
            Punch: true,
            Sitting: true,
            ThumbsUp: true,
            Wave: true
        };
        // Track key states
        _this._moveForward = false;
        _this._moveBackward = false;
        _this._moveLeft = false;
        _this._moveRight = false;
        _this._isDancing = false;
        _this._isDead = false;
        _this._isNo = false;
        _this._isYes = false;
        _this._isPunching = false;
        _this._isSitting = false;
        _this._isThumbsUp = false;
        _this._isWaving = false;
        return _this;
    }
    Player.prototype.moveForwardDown = function () { this._moveForward = true; };
    Player.prototype.moveForwardUp = function () { this._moveForward = false; };
    Player.prototype.moveBackwardDown = function () { this._moveBackward = true; };
    Player.prototype.moveBackwardUp = function () { this._moveBackward = false; };
    Player.prototype.moveLeftDown = function () { this._moveLeft = true; };
    Player.prototype.moveLeftUp = function () { this._moveLeft = false; };
    Player.prototype.moveRightDown = function () { this._moveRight = true; };
    Player.prototype.moveRightUp = function () { this._moveRight = false; };
    Player.prototype.danceStart = function () { if (!this._animationLocks.Dance)
        this._isDancing = true; };
    Player.prototype.danceStop = function () { this._isDancing = false; };
    Player.prototype.deathStart = function () { if (!this._animationLocks.Death)
        this._isDead = true; };
    Player.prototype.deathStop = function () { this._isDead = false; };
    Player.prototype.noStart = function () { if (!this._animationLocks.No)
        this._isNo = true; };
    Player.prototype.noStop = function () { this._isNo = false; };
    Player.prototype.yesStart = function () { if (!this._animationLocks.Yes)
        this._isYes = true; };
    Player.prototype.yesStop = function () { this._isYes = false; };
    Player.prototype.punchStart = function () { if (!this._animationLocks.Punch)
        this._isPunching = true; };
    Player.prototype.punchStop = function () { this._isPunching = false; };
    Player.prototype.sittingStart = function () { if (!this._animationLocks.Sitting)
        this._isSitting = true; };
    Player.prototype.sittingStop = function () { this._isSitting = false; };
    Player.prototype.thumbsUpStart = function () { if (!this._animationLocks.ThumbsUp)
        this._isThumbsUp = true; };
    Player.prototype.thumbsUpStop = function () { this._isThumbsUp = false; };
    Player.prototype.waveStart = function () { if (!this._animationLocks.Wave)
        this._isWaving = true; };
    Player.prototype.waveStop = function () { this._isWaving = false; };
    Player.prototype.onStart = function () {
        this.node = this;
        this._loadCharacterAndAnimations();
    };
    Player.prototype._loadCharacterAndAnimations = function () {
        var _this = this;
        var scene = this.getScene();
        BABYLON.SceneLoader.ImportMeshAsync("", "assets/Model/Robot/", "RobotExpressive.glb", scene).then(function (result) {
            var loadedMeshes = result.meshes[0];
            //set loadedMeshes to children of this.node
            loadedMeshes.parent = _this.node;
            loadedMeshes.position.set(0, -2, 0); // Reset position of loaded meshes
            // Create invisible capsule impostor
            var capsule = BABYLON.MeshBuilder.CreateBox("PlayerCollisionBox", { height: 4, width: 3, depth: 2 }, scene);
            capsule.position.y = 2;
            _this._applyCharacterPhysics(capsule, scene); // Physics setup
            capsule.isVisible = false;
            capsule.showBoundingBox = true; // Show bounding box for debugging
            capsule.checkCollisions = true;
            capsule.position.z = _this.node.position.z; // Align with character root position
            capsule.position.x = _this.node.position.x; // Align with character root position
            _this.node.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0)); // Reset position of this.node to origin
            _this.node.parent = capsule;
            _this.node = capsule;
            _this.node.setAbsolutePosition(new BABYLON.Vector3(0, 2, 0)); // Reset position of this.node to origin
            capsule.physicsImpostor.registerBeforePhysicsStep(function () {
                var angularVelocity = capsule.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
                angularVelocity.x = 0;
                angularVelocity.z = 0; // Prevent rotation around X and Z axes
                capsule.physicsImpostor.setAngularVelocity(angularVelocity);
                //set y linear velocity to 0
                // const linearVelocity = capsule.physicsImpostor.getLinearVelocity() || BABYLON.Vector3.Zero();
                // linearVelocity.y = 0; // Prevent vertical movement
                // capsule.physicsImpostor.setLinearVelocity(linearVelocity);
            });
            // Enable shadow casting for all meshes
            _this.shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.getLightByName("sun"));
            // shadowGenerator.getShadowMap().renderList.push(...result.meshes); // Add all meshes to shadow map
            _this.shadowGenerator.useContactHardeningShadow = true;
            _this.shadowGenerator.normalBias = 0.02;
            _this.shadowGenerator.bias = 0.001;
            _this.shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
            _this.shadowGenerator.darkness = 0.6;
            result.meshes.forEach(function (mesh) {
                if (mesh instanceof BABYLON.Mesh) {
                    _this.shadowGenerator.addShadowCaster(mesh); // Add mesh to shadow caster
                    mesh.receiveShadows = true; // Enable shadow receiving
                    if (mesh.material) {
                        var material = mesh.material;
                        material.useLightmapAsShadowmap = true; // Use lightmap for shadows
                        material.directIntensity = 10;
                    }
                }
            });
            // Find first mesh with a skeleton
            var skinnedMesh = result.meshes.find(function (mesh) { return mesh.skeleton; });
            if (!skinnedMesh) {
                console.warn("No skinned mesh found in imported model.");
                return;
            }
            _this.character = skinnedMesh;
            console.log("result.animationGroup" + result.animationGroups);
            _this._walkAnim = result.animationGroups.find(function (anim) { return anim.name === "Walking"; }) || null;
            _this._idleAnim = result.animationGroups.find(function (anim) { return anim.name === "Idle"; }) || null;
            _this._danceAnim = result.animationGroups.find(function (anim) { return anim.name === "Dance"; }) || null;
            _this._deathAnim = result.animationGroups.find(function (anim) { return anim.name === "Death"; }) || null;
            _this._noAnim = result.animationGroups.find(function (anim) { return anim.name === "No"; }) || null;
            _this._yesAnim = result.animationGroups.find(function (anim) { return anim.name === "Yes"; }) || null;
            _this._punchAnim = result.animationGroups.find(function (anim) { return anim.name === "Punch"; }) || null;
            _this._sittingAnim = result.animationGroups.find(function (anim) { return anim.name === "Sitting"; }) || null;
            _this._thumbsUpAnim = result.animationGroups.find(function (anim) { return anim.name === "ThumbsUp"; }) || null;
            _this._waveAnim = result.animationGroups.find(function (anim) { return anim.name === "Wave"; }) || null;
            //Stop all animation of result.animationGroups
            result.animationGroups.forEach(function (anim) {
                anim.stop();
            });
            scene.onBeforeRenderObservable.add(function () {
            });
        });
    };
    Player.prototype._applyCharacterPhysics = function (capsule, scene) {
        capsule.physicsImpostor = new BABYLON.PhysicsImpostor(capsule, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 50,
            friction: 0.9,
            restitution: 0.0
        }, scene);
    };
    Player.prototype.unlockAnimation = function (animName) {
        if (this._animationLocks[animName] !== undefined) {
            this._animationLocks[animName] = false;
            console.log("Unlocked animation: ".concat(animName));
        }
    };
    Player.prototype.getUnlockedAnimations = function () {
        var _this = this;
        return Object.keys(this._animationLocks).filter(function (anim) { return !_this._animationLocks[anim]; });
    };
    Player.prototype.onUpdate = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this.cameraNode)
            return;
        var forward = this.cameraNode.getDirection(BABYLON.Axis.Z);
        var right = this.cameraNode.getDirection(BABYLON.Axis.X);
        var moveVector = new BABYLON.Vector3();
        if (this._moveForward)
            moveVector.addInPlace(forward);
        if (this._moveBackward)
            moveVector.subtractInPlace(forward);
        if (this._moveLeft)
            moveVector.subtractInPlace(right);
        if (this._moveRight)
            moveVector.addInPlace(right);
        moveVector.y = 0; // Ignore vertical component
        var isMoving = moveVector.lengthSquared() > 0;
        if (isMoving) {
            moveVector.normalize();
            // Move the player
            // this.node.position.addInPlace(moveVector.scale(this._speed));
            var desiredVelocity = moveVector.scale(this._speed * 50);
            (_a = this.node.physicsImpostor) === null || _a === void 0 ? void 0 : _a.setLinearVelocity(new BABYLON.Vector3(desiredVelocity.x, ((_c = (_b = this.node.physicsImpostor) === null || _b === void 0 ? void 0 : _b.getLinearVelocity()) === null || _c === void 0 ? void 0 : _c.y) || 0, // Preserve vertical velocity
            desiredVelocity.z));
            // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(desiredVelocity);
            // Rotate player to face the move direction
            var angle = Math.atan2(moveVector.x, moveVector.z);
            // this.node.rotation.y = angle;
            var quaternion = BABYLON.Quaternion.FromEulerAngles(0, angle, 0);
            this.node.rotationQuaternion = quaternion;
            (_d = this.node.physicsImpostor) === null || _d === void 0 ? void 0 : _d.setAngularVelocity(BABYLON.Vector3.Zero()); // Optional: Stop unwanted spinning
        }
        else {
            //reset velocity when not moving
            // (this.node as BABYLON.Mesh).physicsImpostor?.setLinearVelocity(BABYLON.Vector3.Zero());
            var currentVelocity = ((_e = this.node.physicsImpostor) === null || _e === void 0 ? void 0 : _e.getLinearVelocity()) || BABYLON.Vector3.Zero();
            (_f = this.node.physicsImpostor) === null || _f === void 0 ? void 0 : _f.setLinearVelocity(new BABYLON.Vector3(0, currentVelocity.y, 0));
            (_g = this.node.physicsImpostor) === null || _g === void 0 ? void 0 : _g.setAngularVelocity(BABYLON.Vector3.Zero()); // Stop unwanted spinning
        }
        // Animation logic
        // Animation logic
        if (this._isDancing) {
            this._playAnimation(this._danceAnim);
        }
        else if (this._isDead) {
            this._playAnimation(this._deathAnim);
        }
        else if (this._isNo) {
            this._playAnimation(this._noAnim);
        }
        else if (this._isYes) {
            this._playAnimation(this._yesAnim);
        }
        else if (this._isPunching) {
            this._playAnimation(this._punchAnim);
        }
        else if (this._isSitting) {
            this._playAnimation(this._sittingAnim);
        }
        else if (this._isThumbsUp) {
            this._playAnimation(this._thumbsUpAnim);
        }
        else if (this._isWaving) {
            this._playAnimation(this._waveAnim);
        }
        else if (isMoving) {
            this._playAnimation(this._walkAnim);
        }
        else {
            this._playAnimation(this._idleAnim);
        }
    };
    Player.prototype._playAnimation = function (anim) {
        var _a, _b;
        if (this._currentAnim === anim)
            return;
        (_a = this._currentAnim) === null || _a === void 0 ? void 0 : _a.stop();
        if (anim === this._idleAnim && ((_b = this.character) === null || _b === void 0 ? void 0 : _b.skeleton)) {
            this.character.skeleton.returnToRest(); // <-- important line
        }
        anim === null || anim === void 0 ? void 0 : anim.start(true, 1.0, anim.from, anim.to, false);
        this._currentAnim = anim;
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    Player.prototype.onStop = function () {
        var _a;
        (_a = this._currentAnim) === null || _a === void 0 ? void 0 : _a.stop();
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    Player.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("Node", "Camera Node")
    ], Player.prototype, "cameraNode", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Speed", 0.2)
    ], Player.prototype, "_speed", void 0);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("w", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "moveForwardDown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("w", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "moveForwardUp", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("s", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "moveBackwardDown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("s", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "moveBackwardUp", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("a", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "moveLeftDown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("a", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "moveLeftUp", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("d", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "moveRightDown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("d", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "moveRightUp", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("1", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "danceStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("1", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "danceStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("2", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "deathStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("2", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "deathStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("3", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "noStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("3", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "noStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("4", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "yesStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("4", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "yesStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("5", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "punchStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("5", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "punchStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("6", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "sittingStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("6", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "sittingStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("7", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "thumbsUpStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("7", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "thumbsUpStop", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("8", core_1.KeyboardEventTypes.KEYDOWN)
    ], Player.prototype, "waveStart", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("8", core_1.KeyboardEventTypes.KEYUP)
    ], Player.prototype, "waveStop", null);
    return Player;
}(BABYLON.TransformNode));
exports.default = Player;
//# sourceMappingURL=Player.js.map