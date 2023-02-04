import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
// import reactLogo from './assets/react.svg'

import { useLocation, Switch, Route } from "wouter"

import './App.css'
import LoginPage from './scenes/LoginPage';
import MainPage from './scenes/MainPage';
import TestLayout from './layouts/test/TestLayout';

function App() {
  const [location] = useLocation()

  return (
    <div className="App">
        {/* <Switch location={location}>
          <Route path="/" component={LoginPage} />
          <Route path="/login" component={MainPage} />
        </Switch> */}

        {/* KIMBO COMMENT OUT EVERYTHING BELOW */}
        <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
          <TestLayout />
        </Canvas>
    </div>
  )
}

export default App;
