var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createElement } from "dcl-sdk/JSX";
import { EventSubscriber, Script, inject } from "dcl-sdk";
import { updateAll } from "./ConnectedClients";
const winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
let board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
let currentSymbol = null;
export class RemoteScene extends Script {
    constructor() {
        super(...arguments);
        this.audio = null;
        this.entityController = null;
        this.eventSubscriber = null;
    }
    getWinner() {
        return ["x", "o"].find($ => winingCombinations.some(combination => combination.every(position => board[position] === $)));
    }
    selectMySymbol(symbol) {
        currentSymbol = symbol;
    }
    setAt(position, symbol) {
        board[position] = symbol;
    }
    async systemDidEnable() {
        this.eventSubscriber = new EventSubscriber(this.entityController);
        this.eventSubscriber.on(`reset_click`, async (evt) => {
            board = board.map(() => null);
            updateAll();
            await this.audio.playSound("sounds/sound.ogg");
        });
        this.selectMySymbol("x");
        board.map(($, $$) => this.eventSubscriber.on(`position-${$$}_click`, async (evt) => {
            this.setAt($$, currentSymbol);
            updateAll();
            this.selectMySymbol(currentSymbol === "x" ? "o" : "x");
            if (this.getWinner()) {
                await this.audio.playSound("sounds/Nyan_cat.ogg");
            }
            await this.audio.playSound("sounds/sound.ogg");
        }));
        await this.render();
    }
    async render() {
        const game = (createElement("a-scene", null,
            createElement("a-cube", { position: "5 5 5", color: "red", id: "reset" }),
            board.map(($, ix) => (createElement("a-cube", { id: `position-${ix}`, color: $ === null ? "black" : $ === "x" ? "red" : "green", position: `${ix % 3} 0.2 ${Math.floor(ix / 3)}`, scale: "0.8 0.1 0.8" })))));
        await this.entityController.render(game);
    }
    update() {
        this.render();
    }
}
__decorate([
    inject("experimentalSoundController"),
    __metadata("design:type", Object)
], RemoteScene.prototype, "audio", void 0);
__decorate([
    inject("EntityController"),
    __metadata("design:type", Object)
], RemoteScene.prototype, "entityController", void 0);
//# sourceMappingURL=RemoteScene.js.map