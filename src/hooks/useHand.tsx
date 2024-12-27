import { useState } from "react";
import { allTiles, Tile } from "../types";
import { calculateAllConnections, ConnectedHand, countShanten, Shape, sortedHandToNodes, sortTiles } from "../utils";

const shuffleArray = (array: Tile[]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const initialize = () => {
    const tempWall = [];
    for (let i = 0; i < 34; i++) {
        for (let j = 0; j < 4; j++) {
            tempWall.push(allTiles[i]);
        }
    }
    shuffleArray(tempWall);

    const tempHand = [];
    for (let i = 0; i < 13; i++) {
        const poppedTile = tempWall.pop();
        if (!poppedTile) {
            throw new Error("Tile popped from wall was undefined! Is the wall empty?");
        }
        tempHand.push(poppedTile);
    }

    return {
        _wall: tempWall,
        _hand: tempHand,
    }
}

export const useHand = () => {
    const [wall, setWall] = useState<Tile[]>([]);
    const [hand, setHand] = useState<Tile[]>([]);

    const [shanten, setShanten] = useState<number>(NaN);
    const [shantenConnectedHands, setShantenConnectedHands] = useState<ConnectedHand[]>([]);

    if (hand.length !== 0) {
        return {hand, wall, shanten, shantenConnectedHands};
    }

    const {_wall, _hand} = initialize();
    const sortedHand = sortTiles(_hand);

    const hands = calculateAllConnections(sortedHandToNodes(sortedHand));
    const handsWithShanten = hands.map(hand => ({...hand, shanten: countShanten(hand)})).sort((a, b) => a.shanten - b.shanten);
    const _lowestShantenHands = handsWithShanten.slice(0, handsWithShanten.findIndex(hand => hand.shanten !== handsWithShanten[0].shanten));
    
    setWall(_wall);
    setHand(sortedHand);
    setShanten(handsWithShanten[0].shanten);
    setShantenConnectedHands(_lowestShantenHands); 

    return {hand, wall, shanten, shantenConnectedHands};
}