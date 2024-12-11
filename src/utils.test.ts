import { assert, describe, expect, it } from "vitest";
import { Suit, Tile, TileFont } from "./types";
import { breakIntoMelds, breakIntoSteps, connectTiles, doMoves, getShapeType } from "./utils";

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

it("should determine shape type", () => {
    expect(getShapeType([1,2,3])).toBe("run");
    expect(getShapeType([1,2])).toBe("run");
    expect(getShapeType([1])).toBe("float");
    expect(getShapeType([2,2,2])).toBe("set");
    expect(getShapeType([2,2])).toBe("set");
})

  it("should break into steps", () => {
        const tiles: Tile[] = [
            t("s1"), t("s1"), t("s2"), t("s3"), t("s5")
        ]

        const hands = doMoves(tiles);
        hands.forEach((hand, i) => {
            console.log(i)
            console.log(hand.shapes.map(shape => shape.map(index => tiles[index].number)))
        })
    });
});