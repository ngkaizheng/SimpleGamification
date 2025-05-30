import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
export default class Player extends BABYLON.TransformNode {
    cameraNode: BABYLON.FreeCamera | null;
    private _speed;
    node: BABYLON.TransformNode;
    outerParent: BABYLON.TransformNode | null;
    character: BABYLON.Mesh | null;
    private _idleAnim;
    private _walkAnim;
    private _danceAnim;
    private _deathAnim;
    private _noAnim;
    private _yesAnim;
    private _punchAnim;
    private _sittingAnim;
    private _thumbsUpAnim;
    private _waveAnim;
    private _currentAnim;
    private _animationLocks;
    private _moveForward;
    private _moveBackward;
    private _moveLeft;
    private _moveRight;
    private _isDancing;
    private _isDead;
    private _isNo;
    private _isYes;
    private _isPunching;
    private _isSitting;
    private _isThumbsUp;
    private _isWaving;
    moveForwardDown(): void;
    moveForwardUp(): void;
    moveBackwardDown(): void;
    moveBackwardUp(): void;
    moveLeftDown(): void;
    moveLeftUp(): void;
    moveRightDown(): void;
    moveRightUp(): void;
    danceStart(): void;
    danceStop(): void;
    deathStart(): void;
    deathStop(): void;
    noStart(): void;
    noStop(): void;
    yesStart(): void;
    yesStop(): void;
    punchStart(): void;
    punchStop(): void;
    sittingStart(): void;
    sittingStop(): void;
    thumbsUpStart(): void;
    thumbsUpStop(): void;
    waveStart(): void;
    waveStop(): void;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    onStart(): void;
    private _loadCharacterAndAnimations;
    private _applyCharacterPhysics;
    unlockAnimation(animName: string): void;
    getUnlockedAnimations(): string[];
    onUpdate(): void;
    private _playAnimation;
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
