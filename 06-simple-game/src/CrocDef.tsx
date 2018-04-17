import { createElement, ISimplifiedNode } from "metaverse-api";
import { IEntity } from "./game";

export class CrocDef implements IEntity {
    position = {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10
    };

    lastTime = performance.now();

    wrappedViz: ISimplifiedNode;

    constructor(wrappedViz: ISimplifiedNode) {
        this.wrappedViz = wrappedViz;
    }

    update(frameTime: number): void {
        this.lastTime = frameTime;
        //this.position.y++;
    }

    render(): ISimplifiedNode {
        return (
            <a-entity position={this.position} transition={{ position: { duration: 5000, timing: "linear" } }}>
                {this.wrappedViz}
            </a-entity>
        );
    }
}
