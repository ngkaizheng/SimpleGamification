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
var GUI = require("@babylonjs/gui");
var decorators_1 = require("../decorators");
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function GameUI() {
        var _this = this;
        _this._trashNode = null;
        _this._gui = null;
        _this._trashText = null;
        _this._controlsText = null;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    GameUI.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the node has been fully initialized and is ready.
     */
    GameUI.prototype.onInitialized = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    GameUI.prototype.onStart = function () {
        if (!this._trashNode) {
            console.warn("Trash Node not assigned in GameUI script. Please set it in the Inspector.");
            return;
        }
        // Create fullscreen UI
        this._gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.getScene());
        // Trash count text (top-left)
        this._trashText = new GUI.TextBlock("trashCount");
        this._trashText.text = "Trash collected: 0/3";
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
    };
    /**
     * Called each frame.
     */
    GameUI.prototype.onUpdate = function () {
        var trashScript = this._trashNode;
        if (trashScript) {
            if (trashScript.areAllAnimationsUnlocked()) {
                this._trashText.text = "All anim unlocked";
                this._trashText.color = "yellow";
            }
            else {
                this._trashText.text = "Trash collected: ".concat(trashScript.getTrashCollected(), "/").concat(trashScript.getTargetTrashCount());
                this._trashText.color = "white";
            }
            var unlockedAnims = trashScript.getUnlockedAnimations();
            var controlsText_1 = "WASD: Move\nE: Pickup\nT: Toggle Weather";
            if (unlockedAnims.length > 0) {
                unlockedAnims.forEach(function (anim, index) {
                    controlsText_1 += "\n".concat(index + 1, ": ").concat(anim);
                });
                controlsText_1 += "\n";
            }
            this._controlsText.text = controlsText_1;
        }
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    GameUI.prototype.onStop = function () {
        if (this._gui) {
            this._gui.dispose();
            this._gui = null;
            this._trashText = null;
            this._controlsText = null;
        }
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    GameUI.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    __decorate([
        (0, decorators_1.visibleInInspector)("Node", "Trash Node")
    ], GameUI.prototype, "_trashNode", void 0);
    return GameUI;
}(BABYLON.TransformNode));
exports.default = GameUI;
//# sourceMappingURL=GameUI.js.map