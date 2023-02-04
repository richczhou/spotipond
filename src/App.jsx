import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
// import reactLogo from './assets/react.svg'

import { useLocation, Switch, Route } from "wouter"

import './App.css'
import PondLayout from './PondLayout'
import LoginPage from './LoginPage'
import GalleryLayout from './GalleryLayout'

function App() {
  const [location] = useLocation()

  return (
    <div className="App">
      <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
        <Switch location={location}>
          <Route path="/" component={PondLayout} />
          <Route path="/login" component={GalleryLayout} />
        </Switch>
        {/* <GalleryLayout /> */}
      </Canvas>
    </div>
  )
}

export default App;
