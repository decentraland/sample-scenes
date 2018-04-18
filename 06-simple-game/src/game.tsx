import { createElement, ISimplifiedNode } from "metaverse-api";
import { CrocDef } from "./CrocDef";
import { ClientBridge } from "../scene";

export interface IEntity {
    update(deltaTime: number): void;
    render(): ISimplifiedNode;
}

export function setupGame(theGameBridge: ClientBridge) {
    let count = 10;

    while (count--) {
        const crocViz = <gltf-model src="models/croc.gltf" />;
        const aCroc = new CrocDef(crocViz);
        theGameBridge.addEntity(aCroc);
    }

    setInterval(() => tick(theGameBridge), 3000);
}

function tick(theGameBridge: ClientBridge) {
    const frameTime = performance.now();
    for (let croc of theGameBridge.getEntities()) {
        croc.update(frameTime);
    }
}
