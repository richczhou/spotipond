import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
// import reactLogo from './assets/react.svg'

import { useLocation, Switch, Route } from "wouter"

import './App.css'
import LoginPage from './scenes/LoginPage';
import Login from './Login';
import GalleryPage from './scenes/GalleryPage';
import MainPage from './scenes/MainPage';
import PondLayout from './layouts/PondLayout';

function App() {
  const [location] = useLocation()

  return (
    <div className="App">
        <Switch location={location}>
          <Route path="/" component={LoginPage} />
          <Route path="/callback" component={Login} />
          <Route path="/gallery" component={GalleryPage} />
          <Route path="/main" component={MainPage} />
        </Switch>

        {/* KIMBO COMMENT OUT EVERYTHING BELOW */}
        {/* <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
          <PondLayout />
        </Canvas> */}
    </div>
  )
}

export default App;
