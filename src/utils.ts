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
    nextIndex: number | null;
}

export const nodeify = (hand: Tile[]): Node[] => {
    return hand.map(tile => ({tile, nextIndex: null}));
}

export const breakIntoShapes = (hand: Tile[]) => {
    const oneRow = hand.filter(tile => tile.number === hand[0].number);
    if (oneRow.length === 1) {
        return [[oneRow[0]]];
    }
    if (oneRow.length === 2) {
        return [[oneRow[0]], [oneRow[1]], [oneRow[0], oneRow[1]]];
    }
    if (oneRow.length === 3) {
        return [[oneRow[0]], [oneRow[1]], [oneRow[2]], [oneRow[0], oneRow[1]], [oneRow[1], oneRow[2]], [oneRow[0], oneRow[2]], oneRow];
    }
    if (oneRow.length === 4) {
        return [[oneRow[0]], [oneRow[1]], [oneRow[2]], [oneRow[3]], [oneRow[0], oneRow[1]], [oneRow[1], oneRow[2]], [oneRow[2], oneRow[3]], [oneRow[0], oneRow[2]], [oneRow[1], oneRow[3]], [oneRow[0], oneRow[3]], [oneRow[0], oneRow[1], oneRow[2]], [oneRow[1], oneRow[2], oneRow[3]], [oneRow[0], oneRow[2], oneRow[3]], [oneRow[0], oneRow[1], oneRow[3]], oneRow];
    }

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