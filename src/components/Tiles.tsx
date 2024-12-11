import { FC } from "react";
import { Tile } from "../types";

type Props = {
    children: Tile[];
}

export const Tiles: FC<Props> = ({children}) => {
    
    
    return (
        <p style={{fontFamily: "Tiles", fontSize: "5rem"}}>{children.map(tile => tile.tileSvg.toString())}</p>
    )
};