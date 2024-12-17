import { assert, describe, expect, it } from "vitest";
import { Suit, Tile, TileFont } from "./types";
import { breakIntoMelds, breakIntoSteps, ConnectedHand, connectTiles, doMoves, doMoves2, getShapeType, ShapeType, sortedHandToNodes } from "./utils";

const t = (tile: string): Tile => {
    const [suitLetter, number] = tile.split("");
    let suit: Suit;
    switch (suitLetter) {
        case "m":
            suit = Suit.MANZU
            break;
        case "p":
            suit = Suit.PINZU;
            break;
        case "s":
            suit = Suit.SOUZU;
            break;
        default:
            suit = Suit.HONOR;
    }

    return {tileSvg: TileFont.CHUN, suit, number: parseInt(number)};
}


describe("tile utils", () => {


  it("should break into steps", () => {
        const tiles: Tile[] = [
            t("s1"), t("s1"), t("s2"), t("s3")
        ]

        const hands = doMoves2(sortedHandToNodes(tiles));
        expect(hands).toHaveLength(4);
    });
});