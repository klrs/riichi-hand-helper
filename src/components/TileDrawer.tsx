import { FC } from "react";
import { Tile as TileType } from "../types";
import { Tile } from "./Tile";
import { useHand } from "../hooks/useHand";


type Props = {
    open: boolean;
    onClickTile: (tile: TileType) => void;
    onClose: () => void;
}

export const TileDrawer: FC<Props> = ({open, onClose, onClickTile}) => {

    const {wall} = useHand();

    const uniqueTiles = wall.reduce<TileType[]>((acc, tile) => {
        if (!acc.some(uniqueTile => uniqueTile.suit === tile.suit && uniqueTile.number === tile.number)) {
            return [...acc, tile];
        }
        return acc;
    }, []);

    if (!open) {
        return null;
    }

    return (
        <div style={{ backgroundColor: "gray", position: "relative"}}>
            <h2 style={{ position: "absolute", right: "0", cursor: "pointer", margin: "0.5rem" }} onClick={onClose}>✖</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: "1rem" }}>
                {uniqueTiles.filter(tile => tile).map((tile, index) => (
                    <Tile style={{cursor: "pointer"}} tile={tile} key={index} size={"small"} onClickTile={onClickTile}/>
                ))}
            </div>
        </div>
    );
}