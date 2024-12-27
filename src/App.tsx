import './App.css'
import { Tiles } from './components/Tiles'
import { useHand } from './hooks/useHand'

function App() {

  const {hand, shanten} = useHand();

  return (
    <>
      <Tiles>{hand}</Tiles>
      <div>
        <h2>Shanten: {shanten}</h2>
      </div>
    </>
  )
}

export default App
