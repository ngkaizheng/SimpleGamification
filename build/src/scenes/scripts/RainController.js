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
var BABYLON = require("@babylonjs/core");
var decorators_1 = require("../decorators");
var core_1 = require("@babylonjs/core");
var RainController = /** @class */ (function (_super) {
    __extends(RainController, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function RainController() {
        var _this = this;
        // @visibleInInspector("string", "Rain Particle Texture", "/assets/Textures/raindrop.png")
        _this._rainParticleTexture = "assets/materials/flare.png";
        _this._isRainy = false;
        _this._rainSystem = null;
        return _this;
    }
    RainController.prototype.onStart = function () {
        // Initialize clear weather (no rain)
        this._setupClearWeather();
    };
    RainController.prototype._setupClearWeather = function () {
        // Stop and dispose rain if active
        if (this._rainSystem) {
            this._rainSystem.stop();
            this._rainSystem.dispose();
            this._rainSystem = null;
        }
        console.log("Switched to clear weather.");
    };
    RainController.prototype._setupRainyWeather = function () {
        var scene = this.getScene();
        // Create rain particle system
        this._rainSystem = new BABYLON.ParticleSystem("rain", 2000, scene);
        this._rainSystem.particleTexture = new BABYLON.Texture(this._rainParticleTexture, scene);
        this._rainSystem.emitter = new BABYLON.Vector3(0, 20, 0); // High above scene
        this._rainSystem.minEmitBox = new BABYLON.Vector3(-50, 0, -50); // Wide area
        this._rainSystem.maxEmitBox = new BABYLON.Vector3(50, 0, 50);
        this._rainSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0); // Light blue
        this._rainSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        this._rainSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0); // Fade out
        this._rainSystem.minSize = 0.4;
        this._rainSystem.maxSize = 0.6;
        this._rainSystem.minLifeTime = 2.0;
        this._rainSystem.maxLifeTime = 3.5;
        this._rainSystem.emitRate = 1000; // Particles per second
        this._rainSystem.direction1 = new BABYLON.Vector3(-1, -10, -1); // Downward with slight angle
        this._rainSystem.direction2 = new BABYLON.Vector3(1, -10, 1);
        this._rainSystem.minAngularSpeed = 0; //Rotation
        this._rainSystem.maxAngularSpeed = 0;
        this._rainSystem.minEmitPower = 9.0; // Speed of particles
        this._rainSystem.maxEmitPower = 10.0;
        this._rainSystem.minScaleX = 0.1;
        this._rainSystem.maxScaleX = 0.5;
        this._rainSystem.minScaleY = 1.0;
        this._rainSystem.maxScaleY = 1.0;
        this._rainSystem.start();
        console.log("Switched to rainy weather.");
    };
    RainController.prototype._toggleWeather = function () {
        this._isRainy = !this._isRainy;
        if (this._isRainy) {
            this._setupRainyWeather();
        }
        else {
            this._setupClearWeather();
        }
        console.log("Weather toggled: ".concat(this._isRainy ? "Rainy" : "Clear"));
    };
    RainController.prototype.onStop = function () {
        if (this._rainSystem) {
            this._rainSystem.dispose();
            this._rainSystem = null;
        }
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    RainController.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.onKeyboardEvent)("t", core_1.KeyboardEventTypes.KEYDOWN)
    ], RainController.prototype, "_toggleWeather", null);
    return RainController;
}(BABYLON.TransformNode));
exports.default = RainController;
//# sourceMappingURL=RainController.js.map