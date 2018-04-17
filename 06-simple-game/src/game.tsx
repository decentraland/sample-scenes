import { createElement, ISimplifiedNode } from "metaverse-api";
import { CrocDef } from "./CrocDef";

export interface IEntity {
    update(deltaTime: number): void;
    render(): ISimplifiedNode;
}

export const gameEntities = new Set<IEntity>();

export function renderEntities() {
    return Array.from(gameEntities.values()).map($ => $.render());
}

/*
export function tick() {
    let frameTime = performance.now();
    gameEntities.forEach($ => $.update(frameTime));
}
//*/

export function setupGame() {
    let count = 10;

    while (count--) {
        const crocViz = <a-gltf-model src="models/croc.gltf" />;
        const aCroc = new CrocDef(crocViz);
        gameEntities.add(aCroc);
    }

    //tick();
}
