import { Component, createElement, WebWorkerTransport } from "metaverse-api";
import { IEntity, setupGame } from "./src/game";

export class ClientBridge extends Component {
    state = {
        gameEntities: new Set<IEntity>()
    };

    public getEntities = () => {
        return this.state.gameEntities;
    };

    public addEntity = (entity: IEntity) => {
        this.state.gameEntities.add(entity);
        this.setState({ gameEntities: this.state.gameEntities });
    };

    private renderEntities() {
        return Array.from(this.state.gameEntities.values()).map($ => $.render());
    }

    async render() {
        return <a-scene>{this.renderEntities()}</a-scene>;
    }
}

{
    const theGameBridge = new ClientBridge(WebWorkerTransport(self as any));

    // kick off the game.
    setupGame(theGameBridge);
}
