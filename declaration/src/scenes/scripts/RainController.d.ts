import * as BABYLON from "@babylonjs/core";
export default class RainController extends BABYLON.TransformNode {
    private _rainParticleTexture;
    private _isRainy;
    private _rainSystem;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    onStart(): void;
    private _setupClearWeather;
    private _setupRainyWeather;
    private _toggleWeather;
    onStop(): void;
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
