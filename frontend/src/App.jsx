
import './theme.css'
import './scroll.css'

import { MainProvider } from "./context/mainContext";
import Index from './pages/Index';

function App() {
  // const [count, setCount] = useState(0)


  return (
    <>
      <MainProvider>
        <Index />
      </MainProvider>
    </>
  )
}

export default App
