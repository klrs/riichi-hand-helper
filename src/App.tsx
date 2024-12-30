import './App.css'
import { Tiles } from './components/Tiles'
import { useHand } from './hooks/useHand'

function App() {

  const {hand, shanten, tileAcceptance} = useHand();

  return (
    <>
      <Tiles tiles={hand}/>
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
