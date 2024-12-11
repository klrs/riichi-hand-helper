import { Tile } from "./types";

// todo make work for diff suits
export const breakIntoSteps = (hand: Tile[]): number[] => {
    const acc = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 9 steps
    for (const tile of hand) {
        acc[tile.number - 1]++;
    }
    return acc;
}

type Node = {
    tile: Tile;
    setIndexes: number[];
    runIndexes: number[];
}

export const nodeify = (hand: Tile[]): Node[] => {
    return hand.map(tile => ({tile, setIndexes: [], runIndexes: []}));
}

type ConnectedHand = {
    shapes: number[][];
}

const isIndexPartOfCompleteShape = (index: number, shapes: number[][]) => {
    return shapes.some(shape => shape.some(i => i === index) && shape.length === 3);
}

const getShapeIndexIsPartOf = (index: number, shapes: number[][]) => {
    const s = shapes.filter(shape => shape.some(i => i === index));
    if (s.length > 1) {
        console.error("Index part of more than one shape!!");
    }
    if (s.length === 0) {
        return [];
    }
    return s[0];
}

const getShapeIndexIndexIsPartOf = (index: number, shapes: number[][]) => {
    return shapes.findIndex(shape => shape.some(i => i === index));
}

export const getShapeType = (shape: number[]) => {
    if (shape.length === 1) {
        return "float";
    }
    const [first, ...rest] = shape;
    const isRun = rest.reduce((_acc, e, currentIndex) => first + currentIndex + 1 === e, true)
    return isRun ? "run" : "set";
}

export const doMoves = (hand: Tile[], shapes: number[][] = [], iteration: number = 0): ConnectedHand[] => {

    if (hand.length === 0) {
        return [{shapes}];
    }

    const [firstNode, ...rest] = hand;
    const shapeIndexIsPartOf = getShapeIndexIsPartOf(iteration, shapes);
    const checkMoves = () => {

        if (shapeIndexIsPartOf.length === 3) {
            return [];
        }

        const shapeTypeIndexIsPartOf = getShapeType(shapeIndexIsPartOf);
        const moves: {type: "stay" | "set" | "run", i: number}[] = [{type: "stay", i: NaN}];

        const set = rest.length !== 0 && rest[0].number === firstNode.number;
        if (set) {
            moves.push({
                type: "set",
                i: 1
            })
        }
        const run = rest.findIndex(tile => tile.number === firstNode.number + 1);
        if (run !== -1) {
            moves.push({
                type: "run",
                i: run + 1
            })
        }
        return moves;
    }

    const moves = checkMoves();

    const connectedHands: ConnectedHand[] = [];
    if (moves.length === 0) {
        connectedHands.push(...doMoves(rest, shapes, iteration + 1));
    }
    else {
        for(let i = 0; i < moves.length; i++) {
            const move = moves[i];
    
            if (move.type === "set") {
                connectedHands.push(...doMoves(rest, [...shapes, [iteration, move.i + iteration]], iteration + 1));
            }
            else if (move.type === "run") {
                if (shapeIndexIsPartOf.length !== 0) {
                    const shapeIndex = getShapeIndexIndexIsPartOf(i, shapes);
                    connectedHands.push(...doMoves(
                        rest, [...shapes.slice(0, shapeIndex), [...shapeIndexIsPartOf, move.i + iteration]], iteration + 1
                    ));
                }
                else {
                    connectedHands.push(...doMoves(rest, [...shapes, [iteration, move.i + iteration]], iteration + 1));
                }
            }
            else {
                if (shapeIndexIsPartOf.length !== 0) {
                    connectedHands.push(...doMoves(rest, shapes, iteration + 1));
                }
                else {
                    connectedHands.push(...doMoves(rest, [...shapes, [iteration]], iteration + 1));
                }
            }
        }
    }
    return connectedHands;

}


export const connectTiles = (hand: Tile[]) => {

    // connectedLevel means how many shapes have been tried to connect based on this file
    // 0: not connected yet, 1: connected for pairs, 2: connected for pons,
    // 3: connected for proto-chis, 4: connected for chis
    const connectees = hand.map(tile => ({tile, connectedLevel: 0}))
    const shapesPerTileInHand: Map<number, Tile[][]> = new Map();
    // const shapeCombinations: Tile[][] = [];
    
    for (let connecteeIndex = 0; connecteeIndex < connectees.length - 1; connecteeIndex++) {
        const unprocessed = hand.map(tile => tile);
        const shapes: Tile[][] = [];

        while (unprocessed.length > 0) {
                const hasPair = unprocessed[0].number === unprocessed[0 + 1]?.number;
                if (hasPair) {
                    // processed.push(unprocessed[processorIndex]);
                    // processed.push(unprocessed[processorIndex + 1]);
                    shapes.push([unprocessed[connecteeIndex], unprocessed[connecteeIndex + 1]]);
                    unprocessed.splice(0, 2);
                    connectees[connecteeIndex].connectedLevel = 1;
                    continue;
                    // todo now thinks two pairs can be of same kan
                }
                
                // const hasPon = unprocessed[j].number === unprocessed[j + 2]?.number;
                // if (hasPon && connectees[i].connectedLevel >= 1) {
                //     processed.push(unprocessed[j]);
                //     processed.push(unprocessed[j + 1]);
                //     processed.push(unprocessed[j + 2]);
                //     unprocessed.splice(j, 3);
                //     shapes.push([hand[i], hand[i + 1], hand[i + 2]]);
                //     connectees[i].connectedLevel = 2;
                //     continue;
                // }

                // const protoChiIndex = hand.findIndex(tile => tile.number === hand[i].number + 1);
                // if (protoChiIndex && connectees[i].connectedLevel >= 2) {
                //     processed.push(unprocessed[i]);
                //     processed.push(unprocessed[protoChiIndex]);
                //     unprocessed.splice(i, 1);
                //     unprocessed.splice(protoChiIndex, 1);
                //     shapes.push([hand[i], hand[protoChiIndex]]);
                //     connectees[i].connectedLevel = 3;
                //     continue;
                // } 

                // const chiIndex = hand.findIndex(tile => tile.number === hand[i].number + 2);
                // if (chiIndex && connectees[i].connectedLevel >= 3) {
                //     processed.push(unprocessed[i]);
                //     processed.push(unprocessed[protoChiIndex]);
                //     processed.push(unprocessed[chiIndex]);
                //     unprocessed.splice(i, 1);
                //     unprocessed.splice(protoChiIndex, 1);
                //     unprocessed.splice(chiIndex, 1);
                //     shapes.push([hand[i], hand[protoChiIndex], hand[chiIndex]]);
                //     connectees[i].connectedLevel = 4;
                //     continue;
                // }

                shapes.push([unprocessed[0]]);
                unprocessed.splice(0, 1);
            }
        shapesPerTileInHand.set(connecteeIndex, shapes);
    }

    return shapesPerTileInHand;
}