// import { useState } from "react"
import { Canvas } from "@react-three/fiber";

import PondLayout from "../layouts/PondLayout";
import MainOverlay from "../ui/MainOverlay";

function MainPage() {
    return <>
        <MainOverlay/>
        
        <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
            <PondLayout />
        </Canvas>
    </>
}

export default MainPage;
