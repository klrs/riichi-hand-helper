import './App.css'
import { Tiles } from './components/Tiles'
import { useHand } from './hooks/useHand'
import { TileFont } from './types';

function App() {

  const {hand} = useHand();
  console.log(hand.map(e => e.tileSvg.toString()).join());

  return (
    <>
      <Tiles>{hand.map(e => e.tileSvg.toString()).join("")}</Tiles>
    </>
  )
}

export default App
