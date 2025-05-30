import * as BABYLON from "@babylonjs/core";
export default class Trash extends BABYLON.TransformNode {
    private _spawnCount;
    private _spawnRadius;
    private _playerNode;
    private _trashMeshes;
    private _trashCollected;
    private _isInitialized;
    private _playerCollisionBox;
    private _targetTrashCount;
    private _unlockedAnimations;
    private readonly _animationOrder;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    setPlayer(player: BABYLON.TransformNode): void;
    getTrashCollected(): number;
    getTargetTrashCount(): number;
    areAllAnimationsUnlocked(): boolean;
    getUnlockedAnimations(): string[];
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    onUpdate(): void;
    private _spawnTrash;
    private _setupCollisionDetection;
    private _handlePickup;
    private _setupPickupLogic;
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    onStop(): void;
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
