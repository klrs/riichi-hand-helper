import { Tile } from "./types";


export type ShapeType = "run" | "set" | "pair" | "float";

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

export const sortedHandToNodes = (hand: Tile[]) => hand.map((tile, index) => ({index, tile} as Node));

export const doMoves2 = (nodes: Node[], shapes: Shape[] = []): ConnectedHand[] => {
    
    if (nodes.length === 0) {
        return [{shapes}];
    }

    const [ firstNode, ...rest ] = nodes;

    ////// possible shapes ///////
    const possibleShapes: Shape[] = [{type: "float", nodes: [firstNode]}];

    const setNodes = rest.filter(node => firstNode.tile.number === node.tile.number);
    if (setNodes.length > 2) {
        possibleShapes.push({type: "set", nodes: [firstNode, setNodes[0], setNodes[1]]});
    }

    if (setNodes.length === 1) {
        possibleShapes.push({type: "pair", nodes: [firstNode, setNodes[0]]});
    }

    const protoRunNode = rest.find(node => firstNode.tile.number + 1 === node.tile.number);
    const runNode = rest.find(node => firstNode.tile.number + 2 === node.tile.number);
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
            connectedHands.push(...doMoves2(rest, [...shapes, shape]));
        } else {
            connectedHands.push(...doMoves2(filterOutNodesInShape(rest, shape), [...shapes, shape]));
        }
    }

    return connectedHands;
}
