import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/scripts/FollowCamera copy.ts": ScriptMap;
	"src/scenes/scripts/FollowCamera.ts": ScriptMap;
	"src/scenes/scripts/GameController.ts": ScriptMap;
	"src/scenes/scripts/GameUI.ts": ScriptMap;
	"src/scenes/scripts/Ground.ts": ScriptMap;
	"src/scenes/scripts/Player copy 2.ts": ScriptMap;
	"src/scenes/scripts/Player copy.ts": ScriptMap;
	"src/scenes/scripts/Player.ts": ScriptMap;
	"src/scenes/scripts/RainController.ts": ScriptMap;
	"src/scenes/scripts/Sky copy.ts": ScriptMap;
	"src/scenes/scripts/Sky.ts": ScriptMap;
	"src/scenes/scripts/Trash copy.ts": ScriptMap;
	"src/scenes/scripts/Trash.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scripts/FollowCamera copy.ts": require("./scripts/FollowCamera copy"),
	"src/scenes/scripts/FollowCamera.ts": require("./scripts/FollowCamera"),
	"src/scenes/scripts/GameController.ts": require("./scripts/GameController"),
	"src/scenes/scripts/GameUI.ts": require("./scripts/GameUI"),
	"src/scenes/scripts/Ground.ts": require("./scripts/Ground"),
	"src/scenes/scripts/Player copy 2.ts": require("./scripts/Player copy 2"),
	"src/scenes/scripts/Player copy.ts": require("./scripts/Player copy"),
	"src/scenes/scripts/Player.ts": require("./scripts/Player"),
	"src/scenes/scripts/RainController.ts": require("./scripts/RainController"),
	"src/scenes/scripts/Sky copy.ts": require("./scripts/Sky copy"),
	"src/scenes/scripts/Sky.ts": require("./scripts/Sky"),
	"src/scenes/scripts/Trash copy.ts": require("./scripts/Trash copy"),
	"src/scenes/scripts/Trash.ts": require("./scripts/Trash"),
}
