import { describe, expect, it } from "vitest";
import { Suit, Tile, TileFont } from "./types";
import { breakIntoMelds, breakIntoSteps, connectTiles } from "./utils";

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
            t("s1"), t("s1"), t("s3"),
            t("s4"), t("s5"), t("s6"),
            t("s7")
        ]

        console.log(connectTiles(tiles));
    });
});