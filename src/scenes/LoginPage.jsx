// import { useState } from "react"
import { Canvas } from "@react-three/fiber";

import PondLayout from "../layouts/PondLayout";
import LoginOverlay from "../ui/LoginOverlay";

function LoginPage() {
    return <>
        <Canvas className="main-canvas" camera={{fov: 50, position:[-0.5, 1.5, 1.5]}} >
            <PondLayout />
        </Canvas>

        <LoginOverlay/>
    </>
}

export default LoginPage;
