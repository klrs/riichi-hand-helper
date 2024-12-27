import { FC } from "react";
import { Tile } from "../types";

type Props = {
    children: Tile[];
}


export const Tiles: FC<Props> = ({children}) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {children.map(tile => (
                <div 
                    key={`${tile.suit}-${tile.number}`} 
                    style={{ 
                        position: 'relative', 
                        width: '5rem', 
                        height: '7rem', 
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
                
            ))}
        </div>
    )
};

// export const Tiles: FC<Props> = ({children}) => {
//     return (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
//             {children.map(tile => (
//                 <img 
//                     key={`${tile.suit}-${tile.number}`} 
//                     src={`/src/assets/tiles/${tile.filename}`} 
//                     alt={`${tile.suit} ${tile.number}`} 
//                     style={{ width: '5rem', height: 'auto' }}
//                 />
//             ))}
//         </div>
//     )
// };

// export const Tiles: FC<Props> = ({children}) => {
    
    
//     return (
//         <p style={{fontFamily: "Tiles", fontSize: "5rem"}}>{children.map(tile => tile.tileSvg.toString())}</p>
//     )
// };