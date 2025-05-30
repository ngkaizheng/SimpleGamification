import { Node } from "@babylonjs/core/node";
import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { visibleInInspector } from "../decorators";
import Trash from "./Trash";

export default class GameUI extends BABYLON.TransformNode {
    @visibleInInspector("Node", "Trash Node")
    private _trashNode: BABYLON.TransformNode | null = null;

    private _gui: GUI.AdvancedDynamicTexture | null = null;
    private _trashText: GUI.TextBlock | null = null;
    private _controlsText: GUI.TextBlock | null = null;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        if (!this._trashNode) {
            console.warn("Trash Node not assigned in GameUI script. Please set it in the Inspector.");
            return;
        }

        // Create fullscreen UI
        this._gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.getScene());

        // Trash count text (top-left)
        this._trashText = new GUI.TextBlock("trashCount");
        this._trashText.text = `Trash collected: 0/3`;
        this._trashText.color = "white";
        this._trashText.fontSize = 24;
        this._trashText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._trashText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._trashText.paddingLeft = "20px";
        this._trashText.paddingTop = "20px";
        this._gui.addControl(this._trashText);

        // Control guidance text (bottom-right)
        this._controlsText = new GUI.TextBlock("controls");
        this._controlsText.text = "WASD: Move\nE: Pickup\nB: Dance\n";
        this._controlsText.color = "white";
        this._controlsText.fontSize = 20;
        this._controlsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this._controlsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this._controlsText.paddingRight = "10px";
        this._controlsText.paddingBottom = "40px";
        this._controlsText.textWrapping = true;
        this._controlsText.lineSpacing = "5px";
        this._controlsText.clipChildren = false; // Allow text to overflow
        this._controlsText.clipContent = false; // Prevent text clipping
        this._gui.addControl(this._controlsText);
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        const trashScript = this._trashNode as Trash;
        if (trashScript) {
            if (trashScript.areAllAnimationsUnlocked()) {
                this._trashText.text = "All anim unlocked";
                this._trashText.color = "yellow";
            } else {
                this._trashText.text = `Trash collected: ${trashScript.getTrashCollected()}/${trashScript.getTargetTrashCount()}`;
                this._trashText.color = "white";
            }

            const unlockedAnims = trashScript.getUnlockedAnimations();
            let controlsText = "WASD: Move\nE: Pickup\nT: Toggle Weather";
            if (unlockedAnims.length > 0) {
                unlockedAnims.forEach((anim, index) => {
                    controlsText += `\n${index + 1}: ${anim}`;
                });
                controlsText += `\n`;
            }
            this._controlsText.text = controlsText;
        }
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        if (this._gui) {
            this._gui.dispose();
            this._gui = null;
            this._trashText = null;
            this._controlsText = null;
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
