import { useState } from "react";
import { allTiles, Tile } from "../types";
import { calculateAllConnections, ConnectedHand, countShanten, Shape, sortedHandToNodes } from "../utils";

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

// todo: kinda slow
const sortHand = (hand: Tile[]) =>  hand.sort((a, b) => (a.suit + a.number).localeCompare(b.suit + b.number));

export const useHand = () => {
    const [wall, setWall] = useState<Tile[]>([]);
    const [hand, setHand] = useState<Tile[]>([]);

    const [shanten, setShanten] = useState<number>(NaN);
    const [shantenShapes, setShantenShapes] = useState<ConnectedHand[]>([]);

    if (hand.length !== 0) {
        return {hand, wall, shanten, shantenShapes};
    }

    const {_wall, _hand} = initialize();
    setWall(_wall);
    setHand(sortHand(_hand));

    const hands = calculateAllConnections(sortedHandToNodes(_hand));
    const handsWithShanten = hands.map(hand => ({...hand, shanten: countShanten(hand)})).sort((a, b) => a.shanten - b.shanten);
    const _lowestShantenHands = handsWithShanten.slice(0, handsWithShanten.findIndex(hand => hand.shanten !== handsWithShanten[0].shanten));
    setShanten(handsWithShanten[0].shanten);
    setShantenShapes(_lowestShantenHands);

    return {hand, wall, shanten, shantenShapes};
}