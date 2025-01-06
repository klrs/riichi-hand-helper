
import './App.css'
import { Tiles } from './components/Tiles'
import { useHand } from './hooks/useHand'
import { TileDrawer } from './components/TileDrawer';
import { useState } from 'react';
import { Tile } from './components/Tile';
import { Tile as TileType } from './types';

function App() {

  const {hand, shanten, tileAcceptance} = useHand();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTileKey, setSelectedTileKey] = useState<string | null>(null);

  const selectTile = (tileKey: string) => {
    setSelectedTileKey(tileKey);
    setDrawerOpen(true);
  }

  return (
    <>
      <TileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {hand.map((tile) => {
            const border = selectedTileKey === tile.key ? '3px solid red' : 'none';
            return (
                <Tile style={{ border, cursor: "pointer" }} tile={tile} key={tile.key} onClickTile={() => selectTile(tile.key)}/>
            );
          })}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", flexDirection: "column"}}>
        <h2>Shanten: {shanten}</h2>
        <div style={{ display: "flex" }}>
          <h2>Tile acceptance:</h2>
          <Tiles tiles={tileAcceptance} size='small'/>
        </div>
      </div>
    </>
  )
}

export default App
