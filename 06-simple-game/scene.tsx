import { Component, createElement } from "metaverse-api";
import { renderEntities, setupGame } from "./src/game";

export default class CrocsGame extends Component {
    async render() {
        return <a-scene>{renderEntities()}</a-scene>;
    }
}

{
    // kick off the game.
    setupGame();
}
