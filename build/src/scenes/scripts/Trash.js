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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var BABYLON = require("@babylonjs/core");
var decorators_1 = require("../decorators");
var core_1 = require("@babylonjs/core");
var Trash = /** @class */ (function (_super) {
    __extends(Trash, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function Trash() {
        var _this = this;
        _this._spawnCount = 10;
        _this._spawnRadius = 100;
        _this._playerNode = null;
        _this._trashMeshes = [];
        _this._trashCollected = 0;
        _this._isInitialized = false; // Flag to track initialization
        _this._playerCollisionBox = null;
        _this._targetTrashCount = 3;
        _this._unlockedAnimations = [];
        _this._animationOrder = ["Dance", "Death", "No", "Yes", "Punch", "Sitting", "ThumbsUp", "Wave"];
        return _this;
    }
    Trash.prototype.setPlayer = function (player) {
        this._playerNode = player;
    };
    Trash.prototype.getTrashCollected = function () {
        return this._trashCollected;
    };
    Trash.prototype.getTargetTrashCount = function () {
        return this._targetTrashCount;
    };
    Trash.prototype.areAllAnimationsUnlocked = function () {
        return this._unlockedAnimations.length >= this._animationOrder.length;
    };
    Trash.prototype.getUnlockedAnimations = function () {
        return __spreadArray([], this._unlockedAnimations, true);
    };
    /**
     * Called on the scene starts.
     */
    Trash.prototype.onStart = function () {
        if (!this._playerNode) {
            console.warn("Player Node not assigned in Trash script. Please set it in the Inspector.");
            return;
        }
    };
    Trash.prototype.onUpdate = function () {
        var _this = this;
        if (!this._isInitialized) {
            this._playerCollisionBox = this._scene.getMeshByName("PlayerCollisionBox");
            if (this._playerCollisionBox && this._playerCollisionBox.physicsImpostor) {
                this._isInitialized = true;
                this._spawnTrash().then(function () {
                    _this._setupCollisionDetection();
                    _this._setupPickupLogic();
                    console.log("Trash script initialized with PlayerCollisionBox.");
                });
                console.log("Trash script initialized with PlayerCollisionBox.");
            }
            else {
                console.log("Waiting for PlayerCollisionBox to be ready...");
            }
        }
        // Check for animation unlock
        if (this._trashCollected >= this._targetTrashCount && !this.areAllAnimationsUnlocked()) {
            var nextAnimIndex = this._unlockedAnimations.length;
            if (nextAnimIndex < this._animationOrder.length) {
                var animToUnlock = this._animationOrder[nextAnimIndex];
                this._unlockedAnimations.push(animToUnlock);
                this._playerNode.unlockAnimation(animToUnlock);
                this._targetTrashCount += 3;
                console.log("Unlocked ".concat(animToUnlock, ", new target: ").concat(this._targetTrashCount));
            }
        }
    };
    // private async _spawnTrash(): Promise<void> {
    //     this._trashMeshes.forEach(trash => trash.dispose());
    //     this._trashMeshes = [];
    //     const scene = this.getScene();
    //     const fallbackMaterial = new BABYLON.StandardMaterial("trashMat", scene);
    //     fallbackMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
    //     // const shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.getLightByName("sun") as BABYLON.DirectionalLight);
    //     // Create an array of promises for all trash meshes
    //     const trashPromises = [];
    //     for (let i = 0; i < this._spawnCount; i++) {
    //         try {
    //             const promise = BABYLON.SceneLoader.ImportMeshAsync("", "assets/Model/Bottle/", "plastic_bottle.glb", scene).then((result) => {
    //                 const loadedMesh = result.meshes[0] as BABYLON.Mesh;
    //                 // Create invisible box collider
    //                 const collisionBox = BABYLON.MeshBuilder.CreateBox(`trash_${i}_box`, {
    //                     height: 1,
    //                     width: 0.5,
    //                     depth: 0.5
    //                 }, scene);
    //                 // Position the box
    //                 collisionBox.position = new BABYLON.Vector3(
    //                     (Math.random() - 0.5) * this._spawnRadius, // Reduced radius for testing
    //                     2.0, // Above ground
    //                     (Math.random() - 0.5) * this._spawnRadius
    //                 );
    //                 // Apply scaling to the box (overall size)
    //                 collisionBox.scaling = new BABYLON.Vector3(1.3, 3, 1.3);
    //                 // Apply rotation: x = 90°, y = random 0–360°, z = 0°
    //                 const xRotation = BABYLON.Angle.FromDegrees(90).radians();
    //                 const yRotation = BABYLON.Angle.FromDegrees(Math.random() * 360).radians();
    //                 collisionBox.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(xRotation, yRotation, 0);
    //                 // Configure the box
    //                 collisionBox.isVisible = false;
    //                 collisionBox.checkCollisions = true;
    //                 collisionBox.name = `trash_${i}`;
    //                 // Apply physics to the box
    //                 collisionBox.physicsImpostor = new BABYLON.PhysicsImpostor(
    //                     collisionBox,
    //                     BABYLON.PhysicsImpostor.BoxImpostor,
    //                     {
    //                         mass: 1,
    //                         friction: 0.9,
    //                         restitution: 0.0,
    //                     },
    //                     scene
    //                 );
    //                 collisionBox.physicsImpostor.registerBeforePhysicsStep(() => {
    //                     const angularVelocity = collisionBox.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
    //                     angularVelocity.x = 0;
    //                     angularVelocity.z = 0;
    //                     collisionBox.physicsImpostor.setAngularVelocity(angularVelocity);
    //                 });
    //                 // Parent the GLTF model to the box
    //                 loadedMesh.parent = collisionBox;
    //                 loadedMesh.position.set(0, -0.6, 0); // Center within box
    //                 loadedMesh.scaling = new BABYLON.Vector3(50, 25, 50); // Relative scaling
    //                 loadedMesh.rotationQuaternion = null;
    //                 loadedMesh.rotation.set(0, 0, 0);
    //                 // Apply material and shadows to GLTF meshes
    //                 result.meshes.forEach((mesh) => {
    //                     if (mesh instanceof BABYLON.Mesh) {
    //                         mesh.isVisible = true;
    //                         mesh.alwaysSelectAsActiveMesh = true;
    //                         // if (!mesh.material) {
    //                         //     mesh.material = fallbackMaterial;
    //                         // }
    //                         // shadowGenerator.addShadowCaster(mesh);
    //                         (this._playerNode as Player).shadowGenerator.addShadowCaster(mesh);
    //                         mesh.receiveShadows = true;
    //                         if (mesh.material instanceof BABYLON.PBRMaterial) {
    //                             // mesh.material.useLightmapAsShadowmap = true;
    //                             mesh.material.directIntensity = 10;
    //                         }
    //                     }
    //                 });
    //                 // Debug logging
    //                 console.log(`Loaded trash model for trash_${i}`, {
    //                     boxPosition: collisionBox.position.asArray(),
    //                     boxScaling: collisionBox.scaling.asArray(),
    //                     modelPosition: loadedMesh.position.asArray(),
    //                     modelScaling: loadedMesh.scaling.asArray(),
    //                     isVisible: loadedMesh.isVisible,
    //                     childMeshes: result.meshes.length
    //                 });
    //                 // Store the collision box as the trash mesh
    //                 this._trashMeshes.push(collisionBox);
    //             }).catch((error) => {
    //                 console.error(`Failed to load trash model for trash_${i}:`, error);
    //             });
    //             trashPromises.push(promise); // Add the promise to the array
    //         } catch (error) {
    //             console.error(`Error setting up trash_${i}:`, error);
    //         }
    //     }
    //     await Promise.all(trashPromises); // Wait for all promises to resolve
    // }
    Trash.prototype._spawnTrash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var trashPromises, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Clear existing trash
                        this._trashMeshes.forEach(function (trash) { return trash.dispose(); });
                        this._trashMeshes = [];
                        trashPromises = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._spawnCount)) return [3 /*break*/, 5];
                        if (!(i > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        trashPromises.push(this._spawnSingleTrash(i));
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, Promise.all(trashPromises)];
                    case 6:
                        _a.sent();
                        console.log("Spawned ".concat(this._spawnCount, " trash items"));
                        return [2 /*return*/];
                }
            });
        });
    };
    Trash.prototype._spawnSingleTrash = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var scene, result, loadedMesh, collisionBox_1, xRotation, yRotation, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scene = this.getScene();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BABYLON.SceneLoader.ImportMeshAsync("", "assets/Model/Bottle/", "plastic_bottle.glb", scene)];
                    case 2:
                        result = _a.sent();
                        loadedMesh = result.meshes[0];
                        collisionBox_1 = BABYLON.MeshBuilder.CreateBox("trash_".concat(index, "_box"), {
                            height: 1,
                            width: 0.5,
                            depth: 0.5
                        }, scene);
                        // Position the box
                        collisionBox_1.position = new BABYLON.Vector3((Math.random() - 0.5) * this._spawnRadius, 2.0, (Math.random() - 0.5) * this._spawnRadius);
                        // Apply scaling and rotation
                        collisionBox_1.scaling = new BABYLON.Vector3(1.3, 3, 1.3);
                        xRotation = BABYLON.Angle.FromDegrees(90).radians();
                        yRotation = BABYLON.Angle.FromDegrees(Math.random() * 360).radians();
                        collisionBox_1.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(xRotation, yRotation, 0);
                        // Configure the box
                        collisionBox_1.isVisible = false;
                        collisionBox_1.checkCollisions = true;
                        collisionBox_1.name = "trash_".concat(index);
                        // Apply physics
                        collisionBox_1.physicsImpostor = new BABYLON.PhysicsImpostor(collisionBox_1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.9, restitution: 0.0 }, scene);
                        collisionBox_1.physicsImpostor.registerBeforePhysicsStep(function () {
                            var angularVelocity = collisionBox_1.physicsImpostor.getAngularVelocity() || BABYLON.Vector3.Zero();
                            angularVelocity.x = 0;
                            angularVelocity.z = 0;
                            collisionBox_1.physicsImpostor.setAngularVelocity(angularVelocity);
                        });
                        // Parent the GLTF model to the box
                        loadedMesh.parent = collisionBox_1;
                        loadedMesh.position.set(0, -0.6, 0);
                        loadedMesh.scaling = new BABYLON.Vector3(50, 25, 50);
                        loadedMesh.rotationQuaternion = null;
                        loadedMesh.rotation.set(0, 0, 0);
                        // Apply shadows
                        result.meshes.forEach(function (mesh) {
                            if (mesh instanceof BABYLON.Mesh) {
                                mesh.isVisible = true;
                                mesh.alwaysSelectAsActiveMesh = true;
                                if (_this._playerNode) {
                                    _this._playerNode.shadowGenerator.addShadowCaster(mesh);
                                }
                                mesh.receiveShadows = true;
                                if (mesh.material instanceof BABYLON.PBRMaterial) {
                                    mesh.material.directIntensity = 10;
                                }
                            }
                        });
                        // Store the collision box
                        this._trashMeshes.push(collisionBox_1);
                        // Set up collision and pickup for just this new trash
                        this._setupCollisionDetection(collisionBox_1);
                        this._setupPickupLogic(collisionBox_1);
                        console.log("Spawned trash_".concat(index, " at position: ").concat(collisionBox_1.position.toString()));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Failed to spawn trash_".concat(index, ":"), error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // @onKeyboardEvent("e", KeyboardEventTypes.KEYDOWN)
    // private _handlePickup(): void {
    //     if (!this._playerNode) return;
    //     console.log("Checki1ng for trash pickup...");
    //     this._trashMeshes = this._trashMeshes.filter((trash) => {
    //         if (trash.metadata?.isCollectible) {
    //             const distance = BABYLON.Vector3.Distance(this._playerCollisionBox!.position, trash.position);
    //             if (distance < 5) {
    //                 this._trashCollected++;
    //                 console.log(`Trash collected! Total: ${this._trashCollected}`);
    //                 trash.dispose();
    //                 return false;
    //             }
    //         }
    //         return true;
    //     });
    //     if (this._trashMeshes.length === 0) {
    //         console.log("All trash collected! Respawning...");
    //         // this._spawnTrash();
    //         // this._setupCollisionDetection(); // Setup collisions for new trash
    //         // this._setupPickupLogic(); // Setup pickup logic for new trash
    //         this._spawnTrash().then(() => {
    //             this._setupCollisionDetection();
    //             this._setupPickupLogic();
    //         });
    //     }
    // }
    Trash.prototype._handlePickup = function () {
        var _this = this;
        if (!this._playerNode)
            return;
        console.log("Checking for trash pickup...");
        // Find the closest collectible trash
        var closestTrash = null;
        var minDistance = Infinity;
        this._trashMeshes.forEach(function (trash) {
            var _a;
            if ((_a = trash.metadata) === null || _a === void 0 ? void 0 : _a.isCollectible) {
                var distance = BABYLON.Vector3.Distance(_this._playerCollisionBox.position, trash.position);
                if (distance < 5 && distance < minDistance) {
                    closestTrash = trash;
                    minDistance = distance;
                }
            }
        });
        // If found a trash to collect
        if (closestTrash) {
            this._trashCollected++;
            console.log("Trash collected! Total: ".concat(this._trashCollected));
            // Remove the collected trash
            var index = this._trashMeshes.indexOf(closestTrash);
            if (index > -1) {
                this._trashMeshes.splice(index, 1);
            }
            closestTrash.dispose();
            // // Immediately spawn a new trash
            // this._spawnSingleTrash().then(() => {
            //     this._setupCollisionDetection();
            //     this._setupPickupLogic();
            // });
            this._spawnSingleTrash(this._trashMeshes.length + 1);
        }
    };
    // private _setupCollisionDetection(): void {
    //     if (!this._playerCollisionBox || !this._playerCollisionBox.physicsImpostor) return;
    //     console.log("Setting up collision detection for trash...");
    //     this._trashMeshes.forEach((trash) => {
    //         trash.physicsImpostor.registerOnPhysicsCollide(
    //             this._playerCollisionBox.physicsImpostor,
    //             (collider, collided) => {
    //                 trash.metadata = trash.metadata || {};
    //                 trash.metadata.isCollectible = true;
    //                 console.log(`Trash ${trash.name} is now collectible.`);
    //             }
    //         );
    //         trash.physicsImpostor.onCollideEvent = (collider, collided) => {
    //             // console.log("collided.object as BABYLON.Mesh).name:", (collided.object as BABYLON.Mesh).name);
    //             // console.log("collided.object:", collided.object);
    //             // console.log("collided.object.metadata:", (collided.object as BABYLON.Mesh).metadata);
    //             if ((collided.object as BABYLON.Mesh).name !== "PlayerCollisionBox") {
    //                 trash.metadata.isCollectible = false;
    //                 // console.log("Trash is not collectible anymore.");
    //             }
    //         };
    //     });
    // }
    // private _setupPickupLogic(): void {
    //     this._trashMeshes.forEach((trash) => {
    //         trash.metadata = trash.metadata || {};
    //         trash.metadata.isCollectible = false;
    //     });
    // }
    Trash.prototype._setupCollisionDetection = function (trashMesh) {
        var _this = this;
        if (!this._playerCollisionBox || !this._playerCollisionBox.physicsImpostor)
            return;
        // Handle single mesh or all meshes
        var meshesToProcess = trashMesh ? [trashMesh] : this._trashMeshes;
        meshesToProcess.forEach(function (trash) {
            if (!trash.physicsImpostor) {
                console.warn("Trash ".concat(trash.name, " has no physics impostor"));
                return;
            }
            // Clear any existing collision events to prevent duplicates
            // trash.physicsImpostor.unregisterOnPhysicsCollide(this._playerCollisionBox.physicsImpostor);
            // Register new collision events
            trash.physicsImpostor.registerOnPhysicsCollide(_this._playerCollisionBox.physicsImpostor, function (collider, collided) {
                trash.metadata = trash.metadata || {};
                trash.metadata.isCollectible = true;
                console.log("Trash ".concat(trash.name, " is now collectible."));
            });
            trash.physicsImpostor.onCollideEvent = function (collider, collided) {
                if (collided.object.name !== "PlayerCollisionBox") {
                    trash.metadata = trash.metadata || {};
                    trash.metadata.isCollectible = false;
                }
            };
        });
    };
    Trash.prototype._setupPickupLogic = function (trashMesh) {
        // Handle single mesh or all meshes
        var meshesToProcess = trashMesh ? [trashMesh] : this._trashMeshes;
        meshesToProcess.forEach(function (trash) {
            trash.metadata = trash.metadata || {};
            trash.metadata.isCollectible = false;
        });
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    Trash.prototype.onStop = function () {
        this._trashMeshes.forEach(function (trash) { return trash.dispose(); });
        this._trashMeshes = [];
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    Trash.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Spawn Count", 10)
    ], Trash.prototype, "_spawnCount", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "Spawn Radius", 50)
    ], Trash.prototype, "_spawnRadius", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("Node", "Player Node")
    ], Trash.prototype, "_playerNode", void 0);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("e", core_1.KeyboardEventTypes.KEYDOWN)
    ], Trash.prototype, "_handlePickup", null);
    return Trash;
}(BABYLON.TransformNode));
exports.default = Trash;
//# sourceMappingURL=Trash.js.map