import { useMediaQuery } from './hooks/useMediaQuery'
import './App.css'

function App() {

  const huge = useMediaQuery('(min-width: 980px)')
  const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)')
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 321px)')
  const small = useMediaQuery('(max-width: 321px)')

  const background = huge ? 'red' : big ? 'yellow' : medium ? 'green' : small ? 'blue' : null

  return <div style={{ fontSize: '60px', background, width: '100%' }}>Oi</div>

}

export default App
