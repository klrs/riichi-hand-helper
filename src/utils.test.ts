import { describe, expect, it } from "vitest";
import { Suit, Tile } from "./types";
import { countShanten, calculateAllConnections, sortedHandToNodes, sortTiles } from "./utils";

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

    return {filename: "", suit, number: parseInt(number)};
}

describe("tile utils", () => {

    it("should sort tiles by suit and number in ascending order", () => {
        const tiles: Tile[] = [
            t("h1"), // Shaa
            t("s9"),
            t("s9"),
            t("p2"),
            t("m1"),
            t("p1"),
            t("s1"),
            t("m2"),
            t("h2"), // Pei
        ];

        const sortedTiles = sortTiles(tiles);

        expect(sortedTiles).toEqual([
            t("m1"),
            t("m2"),
            t("p1"),
            t("p2"),
            t("s1"),
            t("s9"),
            t("s9"),
            t("h1"), // Shaa
            t("h2"), // Pei
        ]);
    });

  it("should break into steps", () => {
        // all souzu
        // const tiles: Tile[] = [
        //     t("s1"), t("s1"), t("s1"), t("s2"), t("s3"), t("s5"), t("s5"), t("s6"), t("s6"), t("s9"), t("s9"), t("s9"), t("s9")
        // ]

        // different suits and honors
        const tiles: Tile[] = [
            t("h1"), // Shaa
            t("s9"),
            t("s9"),
            t("p2"),
            t("m1"),
            t("p1"),
            t("s1"),
            t("m2"),
            t("h2"), // Pei
            t("m3"),
            t("m3"),
            t("m3"),
            t("m4"),
        ]

        const hands = calculateAllConnections(sortedHandToNodes(sortTiles(tiles)));
        const handsWithShanten = hands.map(hand => ({...hand, shanten: countShanten(hand)}));

        handsWithShanten.sort((a, b) => a.shanten - b.shanten).slice(0, 20).forEach((hand, i) => {
            console.log(hand.shapes.map(shape => shape.nodes.map(node => node?.tile.number)))
            console.log(countShanten(hand));
        })

    });
});