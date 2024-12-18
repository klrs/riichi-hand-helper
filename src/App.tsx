import './App.css'
import { Tiles } from './components/Tiles'
import { useHand } from './hooks/useHand'

function App() {

  const {hand} = useHand();

  return (
    <>
      <Tiles>{hand}</Tiles>
    </>
  )
}

export default App
