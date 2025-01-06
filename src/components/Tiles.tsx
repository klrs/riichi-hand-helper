import { FC } from "react";
import { Tile as TileType } from "../types";
import { Tile } from "./Tile";

type Props = {
    tiles: TileType[];
    size?: "small" | "medium";
}


export const Tiles: FC<Props> = ({tiles, size = "medium"}) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tiles.map((tile, index) => (
                <Tile tile={tile} key={index} size={size}/>
            ))}
        </div>
    )
};
