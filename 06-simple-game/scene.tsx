import { Component, createElement, ISimplifiedNode } from "metaverse-api";
import { CrocDef } from "./src/CrocDef";

//import { renderEntities, setupGame } from "./src/game";

export default class CrocsGame extends Component {
    state = {
        gameEntities: Array() as ISimplifiedNode[]
    };

    componentDidMount() {
        let count = 10;

        while (count--) {
            let crocViz = <a-gltf-model src="models/croc.gltf" />;
            let aCroc = new CrocDef(crocViz);
            this.state.gameEntities.push(aCroc.getJsx());
        }

        this.setState({ gameEntities: this.state.gameEntities });
    }

    async render() {
        return <a-scene>{this.state.gameEntities}</a-scene>;
        //return (<a-scene></a-scene>);
    }
}

{
    // kick off the game.
    //setupGame(CrocsGame.setState);
}
