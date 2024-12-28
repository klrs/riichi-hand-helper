import { allTiles, Suit, Tile } from "./types";


export type ShapeType = "run" | "proto-run-open" | "proto-run-closed" | "set" | "pair" | "float";

export type Node = {
    index: number;
    tile: Tile;
}

export type Shape = {
    nodes: [Node, Node?, Node?];
    type: ShapeType;
}

export type ConnectedHand = {
    shapes: Shape[];
}

export type ConnectedHandEnriched = ConnectedHand & {
    shanten: number;
}

export const sortTiles = (tiles: Tile[]): Tile[] => {
    const suitOrder = { 'manzu': 1, 'pinzu': 2, 'souzu': 3, 'honor': 4 };

    return tiles.sort((a, b) => {
        if (a.suit === b.suit) {
            return a.number - b.number;
        }
        return suitOrder[a.suit] - suitOrder[b.suit];
    });
}

export const sortedHandToNodes = (hand: Tile[]) => hand.map((tile, index) => ({index, tile} as Node));

export const calculateAllConnections = (nodes: Node[], shapes: Shape[] = []): ConnectedHand[] => {
    
    if (nodes.length === 0) {
        return [{shapes}];
    }

    const [ firstNode, ...rest ] = nodes;

    ////// possible shapes ///////
    const possibleShapes: Shape[] = [
        {type: "float", nodes: [firstNode]}
    ];

    const setNodes = rest.filter(node => firstNode.tile.suit === node.tile.suit && firstNode.tile.number === node.tile.number);
    if (setNodes.length > 1) {
        possibleShapes.push({type: "set", nodes: [firstNode, setNodes[0], setNodes[1]]});
    }

    if (setNodes.length === 1) {
        possibleShapes.push({type: "pair", nodes: [firstNode, setNodes[0]]});
    }

    const protoRunNode = firstNode.tile.suit !== "honor" &&
        rest.find(node => firstNode.tile.suit === node.tile.suit && firstNode.tile.number + 1 === node.tile.number);
    const runNode = firstNode.tile.suit !== "honor" &&
        rest.find(node => firstNode.tile.suit === node.tile.suit && firstNode.tile.number + 2 === node.tile.number);

    if (protoRunNode) {
        possibleShapes.push({type: "proto-run-open", nodes: [firstNode, protoRunNode]});
    }

    if (runNode) {
        possibleShapes.push({type: "proto-run-closed", nodes: [firstNode, runNode]});
    }

    if (protoRunNode && runNode) {
        possibleShapes.push({type: "run", nodes: [firstNode, protoRunNode, runNode]});
    }
    ////////////////////////////

    const filterOutNodesInShape = (rest: Node[], shape: Shape) => (
        rest.filter(node => !shape.nodes.some(shapeNode => shapeNode?.index === node.index))
    );
    const connectedHands: ConnectedHand[] = [];
    for (const shape of possibleShapes) { 
        if (shape.type === "float") {
            connectedHands.push(...calculateAllConnections(rest, [...shapes, shape]));
        } else {
            connectedHands.push(...calculateAllConnections(filterOutNodesInShape(rest, shape), [...shapes, shape]));
        }
    }

    return connectedHands;
}

type ShantenAcc = {
    pairs: number;
    melds: number;
    protoMelds: number;
}

export const countShanten = (hand: ConnectedHand) => {
    const shantenAcc = hand.shapes.reduce<ShantenAcc>((acc, shape) => {
        switch(shape.type) {
            case "pair":
                return {
                    pairs: acc.pairs + 1,
                    melds: acc.melds,
                    protoMelds: acc.protoMelds,
                }
            case "run":
                return {
                    pairs: acc.pairs,
                    melds: acc.melds + 1,
                    protoMelds: acc.protoMelds,
                }
            case "set":
                return {
                    pairs: acc.pairs,
                    melds: acc.melds + 1,
                    protoMelds: acc.protoMelds,
                }
            case "proto-run-closed":
            case "proto-run-open":
                return {
                    pairs: acc.pairs,
                    melds: acc.melds,
                    protoMelds: acc.protoMelds + 1,
                }
            default: // float
                return {
                    pairs: acc.pairs,
                    melds: acc.melds,
                    protoMelds: acc.protoMelds,
                }
        }
    }, {pairs: 0, melds: 0, protoMelds: 0});

    if (shantenAcc.melds === 4 && shantenAcc.pairs === 1) {
        return -1; // full hand
    }

    if (shantenAcc.melds === 4 && shantenAcc.pairs === 0) {
        return 0;
    }

    const hasPair = shantenAcc.pairs > 0;

    // let's consider "redundant pairs" as proto melds
    const protoMelds = shantenAcc.protoMelds + (hasPair ? shantenAcc.pairs - 1 : 0);

    const shanten = hasPair ? 0 : 1;
    
    if (shantenAcc.melds === 3) {
        return protoMelds > 0 ? shanten : shanten + 1;
    }
    if (shantenAcc.melds === 2) {
        if (protoMelds >= 2) {
            return shanten + 1;
        }
        if (protoMelds === 1) {
            return shanten + 2;
        }
        return shanten + 3;
    }
    if (shantenAcc.melds === 1) {
        if (protoMelds >= 3) {
            return shanten + 2;
        }
        if (protoMelds === 2) {
            return shanten + 3;
        }
        if (protoMelds === 1) {
            return shanten + 4;
        }
        return shanten + 5;
    }
    
    if (shantenAcc.melds === 0) {
        if (protoMelds >= 4) {
            return shanten + 3;
        }
        if (protoMelds === 3) {
            return shanten + 4;
        }
        if (protoMelds === 2) {
            return shanten + 5;
        }
        if (protoMelds === 1) {
            return shanten + 6;
        }
    }

    return shanten + 7;
}

export const findAcceptableTiles = (connectedHand: ConnectedHand): Tile[] => {
    return connectedHand.shapes.flatMap(shape => {
        if (shape.type === "proto-run-closed") {
            return [t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number + 1})];
        }
        else if (shape.type === "proto-run-open") {
            if (shape.nodes[0].tile.number === 1) {
                return [t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number + 2})];
            }
            else if (shape.nodes[0].tile.number === 8) {
                return [t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number - 1})];
            }
            else {
                return [
                    t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number - 1}),
                    t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number + 2})
                ];
            }
        }
        else if (shape.type === "proto-set") {
            return [t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number})];
        }
        else if (shape.type === "float") {
            const countOfMeldsOrProtoMelds = connectedHand.shapes.filter(shape =>
                shape.type === "run" ||
                shape.type === "set" ||
                shape.type === "proto-run-closed" ||
                shape.type === "proto-run-open" ||
                shape.type === "proto-set").length;

            if (countOfMeldsOrProtoMelds >= 4) {
                return [
                    t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number}),
                ];
            }
            else {
                return [
                    t({suit: shape.nodes[0].tile.suit, number: shape.nodes[0].tile.number}),
                    t({suit: shape.nodes[0].tile.suit, number: Math.max(9, shape.nodes[0].tile.number + 1)}),
                    t({suit: shape.nodes[0].tile.suit, number: Math.max(9, shape.nodes[0].tile.number + 2)}),
                    t({suit: shape.nodes[0].tile.suit, number: Math.min(1, shape.nodes[0].tile.number -1 )}),
                    t({suit: shape.nodes[0].tile.suit, number: Math.min(1, shape.nodes[0].tile.number - 2)}),
                ];
            }
        }
        else {
            return [];
        }
    });
}

export const t = (props: string | {suit: Suit, number: number}): Tile => {
    if (typeof props === "string") {
        const [suitLetter, numberStr] = props.split("");
        let suit: Suit;
        const number = parseInt(numberStr);
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
        return {filename: getFilename(suit, number), suit, number};
    }
    else {
        return {filename: getFilename(props.suit, props.number), suit: props.suit, number: props.number};
    }
}

const getFilename = (suit: Suit, number: number): string => {
    const filename = allTiles.find(tile => tile.suit === suit && tile.number === number)?.filename
    if (!filename) {
        throw new Error(`Filename not found for suit: ${suit} and number: ${number}`);
    }
    return filename;
}
