import { FC } from "react";
import { Tile as TileType } from "../types";

type Props = {
    tile: TileType;
    size?: "small" | "medium";
    onClickTile?: (tile: TileType) => void;
    style?: React.CSSProperties;
}

export const Tile: FC<Props> = ({tile, size = "medium", onClickTile = () => {}, style }) => (
    <div 
        onClick={() => onClickTile(tile)}
        key={`${tile.suit}-${tile.number}`} 
        style={{ 
            position: 'relative',
            width: (size === 'medium' ? '5rem' : '3rem'),
            height: (size === 'medium' ? '7.5rem' : '4.5rem'),
            ...style
        }}
    >
        <img 
            src={`/src/assets/tiles/Front.svg`} 
            style={{ 
                position: 'absolute', 
                inset: 0,
                width: '100%', 
                height: '100%'
            }}
        />
        <img 
            src={`/src/assets/tiles/${tile.filename}`} 
            alt={`${tile.suit} ${tile.number}`} 
            style={{ 
                position: 'absolute', 
                inset: 0,
                width: '100%', 
                height: '100%' 
            }}
        />
    </div>
    );

