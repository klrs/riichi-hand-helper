import { assert, describe, expect, it } from "vitest";
import { Suit, Tile, TileFont } from "./types";
import { breakIntoMelds, breakIntoSteps, connectTiles, countShanten, doMoves, doMoves2, getShapeType, sortedHandToNodes } from "./utils";

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
            t("s1"), t("s1"), t("s1"), t("s2"), t("s3"), t("s5"), t("s5"), t("s6"), t("s6"), t("s9"), t("s9"), t("s9"), t("s9")
        ]

        const hands = doMoves2(sortedHandToNodes(tiles));
        const handsWithShanten = hands.map(hand => ({...hand, shanten: countShanten(hand)}));

        handsWithShanten.sort((a, b) => a.shanten - b.shanten).slice(0, 20).forEach((hand, i) => {
            console.log(hand.shapes.map(shape => shape.nodes.map(node => node?.tile.number)))
            console.log(countShanten(hand));
        })

    });
});