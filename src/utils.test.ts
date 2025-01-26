import { describe, expect, it } from "vitest";
import { Tile } from "./types";
import { countShanten, calculateAllConnections, sortedHandToNodes, sortTiles, t, ConnectedHand, findAcceptableTiles } from "./utils";

const n = (props: string) => ({
    index: 0,
    tile: t(props),
});

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

  it.skip("should find shanten of a hand", () => {
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

        handsWithShanten.sort((a, b) => a.shanten - b.shanten).slice(0, 20).forEach((hand) => {
            console.log(hand.shapes.map(shape => shape.nodes.map(node => node?.tile.number)))
            console.log(countShanten(hand));
        })

    });

    it("should find accepted tiles of a hand", () => {
        const hand: ConnectedHand = {
            shapes: [
                {
                    type: "pair",
                    nodes: [n("haku"), n("haku")]
                },
                {
                    type: "proto-run-open",
                    nodes: [n("s3"), n("s4")]
                },
                {
                    type: "proto-run-closed",
                    nodes: [n("m3"), n("m5")]
                },
                {
                    type: "pair",
                    nodes: [n("m2"), n("m2")]
                },
                {
                    type: "proto-run-closed",
                    nodes: [n("s4"), n("s6")]
                },
                {
                    type: "proto-run-closed",
                    nodes: [n("m7"), n("m9")]
                },
                {
                    type: "float",
                    nodes: [n("p5")]
                }
            ]
        }
        const acceptedTiles = findAcceptableTiles(hand);
        acceptedTiles.forEach(tile => console.log(tile.number, tile.suit));
    });
});