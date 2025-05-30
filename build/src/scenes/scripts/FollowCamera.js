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
var FollowCamera = /** @class */ (function (_super) {
    __extends(FollowCamera, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function FollowCamera() {
        var _this = this;
        _this.cameraNode = null;
        _this.playerNode = null;
        _this._yaw = 0;
        _this._pitch = 20; // Starting vertical angle in degrees
        _this._radius = 12;
        _this._offset = 3;
        _this._sensitivity = 0.2;
        _this._minPitch = -30;
        _this._maxPitch = 70;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    FollowCamera.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the node has been fully initialized and is ready.
     */
    FollowCamera.prototype.onInitialized = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    FollowCamera.prototype.onStart = function () {
        var _this = this;
        if (this.cameraNode) {
            var camera = this.cameraNode;
            camera.inputs.clear(); // Remove all default controls
        }
        var scene = this.getScene();
        scene.onPointerObservable.add(function (pointerInfo) {
            switch (pointerInfo.type) {
                case core_1.PointerEventTypes.POINTERDOWN:
                    if (!scene.getEngine().isPointerLock) {
                        scene.getEngine().enterPointerlock();
                    }
                    break;
                    ;
                case core_1.PointerEventTypes.POINTERMOVE:
                    var dx = pointerInfo.event.movementX;
                    var dy = pointerInfo.event.movementY;
                    _this._yaw += dx * _this._sensitivity;
                    _this._pitch -= dy * _this._sensitivity;
                    // Clamp vertical angle
                    _this._pitch = Math.max(_this._minPitch, Math.min(_this._maxPitch, _this._pitch));
                    break;
            }
        });
    };
    /**
     * Called each frame.
     */
    FollowCamera.prototype.onUpdate = function () {
        if (!this.cameraNode || !this.playerNode)
            return;
        var playerPosition = this.playerNode.getAbsolutePosition();
        var offsetVector = new BABYLON.Vector3(0, this._offset, 0);
        playerPosition = playerPosition.add(offsetVector);
        // Convert yaw/pitch to radians
        var yawRad = BABYLON.Angle.FromDegrees(this._yaw).radians();
        var pitchRad = BABYLON.Angle.FromDegrees(this._pitch).radians();
        // Spherical to Cartesian conversion
        var x = this._radius * Math.cos(pitchRad) * Math.sin(yawRad);
        var y = this._radius * Math.sin(pitchRad);
        var z = this._radius * Math.cos(pitchRad) * Math.cos(yawRad);
        var desiredCameraPosition = playerPosition.add(new BABYLON.Vector3(x, y, z));
        // Smooth movement
        var currentPosition = this.cameraNode.position;
        var newPosition = BABYLON.Vector3.Lerp(currentPosition, desiredCameraPosition, 0.1);
        this.cameraNode.position.copyFrom(newPosition);
        this.cameraNode.setTarget(playerPosition);
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    FollowCamera.prototype.onStop = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    FollowCamera.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("Node", "Camera Node")
    ], FollowCamera.prototype, "cameraNode", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("Node", "Player Node")
    ], FollowCamera.prototype, "playerNode", void 0);
    return FollowCamera;
}(BABYLON.TransformNode));
exports.default = FollowCamera;
//# sourceMappingURL=FollowCamera.js.map