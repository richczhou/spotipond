import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
// import reactLogo from './assets/react.svg'

import './App.css'
import PondLayout from './PondLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
        <PondLayout />
      </Canvas>
    </div>
  )
}

export default App
