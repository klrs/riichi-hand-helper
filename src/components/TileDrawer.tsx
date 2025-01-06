import { FC } from "react";
import { allTiles, Tile as TileType } from "../types";
import { Tile } from "./Tile";


type Props = {
    open: boolean;
    onClickTile: (tile: TileType) => void;
    onClose: () => void;
}

export const TileDrawer: FC<Props> = ({open, onClose, onClickTile}) => {

    if (!open) {
        return null;
    }

    return (
        <div style={{ backgroundColor: "gray", position: "relative"}}>
            <h2 style={{ position: "absolute", right: "0", cursor: "pointer", margin: "0.5rem" }} onClick={onClose}>✖</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: "1rem" }}>
                {allTiles.map((tile, index) => (
                    <Tile style={{cursor: "pointer"}} tile={tile} key={index} size={"small"} onClickTile={onClickTile}/>
                ))}
            </div>
        </div>
    );
}