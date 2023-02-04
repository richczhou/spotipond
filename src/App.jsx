import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
// import reactLogo from './assets/react.svg'

import { useLocation, Switch, Route } from "wouter"

import './App.css'
import LoginPage from './scenes/LoginPage';
import MainPage from './scenes/MainPage';

function App() {
  const [location] = useLocation()

  return (
    <div className="App">
        <Switch location={location}>
          <Route path="/" component={LoginPage} />
          <Route path="/login" component={MainPage} />
        </Switch>
        {/* <GalleryLayout /> */}
    </div>
  )
}

export default App;
