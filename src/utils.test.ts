import { describe, expect, it } from "vitest";
import { Tile } from "./types";
import { countShanten, calculateAllConnections, sortedHandToNodes, sortTiles, t } from "./utils";

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

  it("should find shanten of a hand", () => {
        // all souzu
        // const tiles: Tile[] = [
        //     t("s1"), t("s1"), t("s1"), t("s2"), t("s3"), t("s5"), t("s5"), t("s6"), t("s6"), t("s9"), t("s9"), t("s9"), t("s9")
        // ]

        // different suits and honors
        const tiles: Tile[] = [
            t("m1"),
            t("m3"),
            t("m3"),
            t("m4"),
            t("m8"),
            t("p1"),
            t("p1"),
            t("p5"),
            t("s7"), // Pei
            t("h1"), // Ton
            t("h3"), // Shaa
            t("h5"), // Haku
            t("h6"), // Hatsu
        ]

        const hands = calculateAllConnections(sortedHandToNodes(sortTiles(tiles)));
        const handsWithShanten = hands.map(hand => ({...hand, shanten: countShanten(hand)}));

        handsWithShanten.sort((a, b) => a.shanten - b.shanten).slice(0, 20).forEach((hand, i) => {
            console.log(hand.shapes.map(shape => shape.nodes.map(node => node?.tile.number)))
            console.log(countShanten(hand));
        })

    });
});