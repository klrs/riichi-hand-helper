import { useState } from "react";
import { allTiles, Tile } from "../types";

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

    if (hand.length !== 0) {
        return {hand, wall};
    }

    const {_wall, _hand} = initialize();
    setWall(_wall);
    setHand(_hand);

    return {hand, wall};
}