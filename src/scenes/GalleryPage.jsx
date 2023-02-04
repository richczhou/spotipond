// import { useState } from "react"
import { Canvas } from "@react-three/fiber";

import GalleryLayout from "../layouts/GalleryLayout";
import GalleryOverlay from "../ui/GalleryOverlay";

function GalleryPage() {
    return <>
        <Canvas className="main-canvas" camera={{fov: 50, position:[0, 0.25, .55]}} >
            <GalleryLayout />
        </Canvas>

        <GalleryOverlay/>
    </>
}

export default GalleryPage;
