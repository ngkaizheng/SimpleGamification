import * as BABYLON from "@babylonjs/core";
import { onKeyboardEvent, visibleInInspector } from "../decorators";
import { KeyboardEventTypes } from "@babylonjs/core";

export default class RainController extends BABYLON.TransformNode {
    // @visibleInInspector("string", "Rain Particle Texture", "/assets/Textures/raindrop.png")
    private _rainParticleTexture: string = "/assets/materials/flare.png";

    private _isRainy: boolean = false;
    private _rainSystem: BABYLON.ParticleSystem | null = null;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    public onStart(): void {
        // Initialize clear weather (no rain)
        this._setupClearWeather();
    }

    private _setupClearWeather(): void {
        // Stop and dispose rain if active
        if (this._rainSystem) {
            this._rainSystem.stop();
            this._rainSystem.dispose();
            this._rainSystem = null;
        }
        console.log("Switched to clear weather.");
    }

    private _setupRainyWeather(): void {
        const scene = this.getScene();

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
    }

    @onKeyboardEvent("t", KeyboardEventTypes.KEYDOWN)
    private _toggleWeather(): void {
        this._isRainy = !this._isRainy;
        if (this._isRainy) {
            this._setupRainyWeather();
        } else {
            this._setupClearWeather();
        }
        console.log(`Weather toggled: ${this._isRainy ? "Rainy" : "Clear"}`);
    }

    public onStop(): void {
        if (this._rainSystem) {
            this._rainSystem.dispose();
            this._rainSystem = null;
        }
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