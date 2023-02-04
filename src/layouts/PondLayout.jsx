import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"
import { useLocation } from "wouter";

import LandModel from "./pond/LandModel";
// import TreeModel from "./pond/TreeModel";
import WaterModel from "./pond/WaterModel";
import LeavesModel from "./pond/LeavesModel";
import GrassModel from "./pond/GrassModel";

function PondLayout() {
    const cubeRef = useRef();
    const [, setLocation] = useLocation()
    
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    useFrame((state, delta) => {
        // console.log(groupRef.current);
        // cubeRef.current.rotation.y = 0.54 * Math.sin(state.clock.elapsedTime * 0.6);
    });

    return (
        <group 
            position={[0, 0, 0]}> 

            {/* <mesh
                ref={cubeRef}
                onClick={(e) => {
                    // console.log('clicked')
                    e.stopPropagation();
                    setLocation('/login');
                }}
                material={material}
                geometry={geometry}>
            </mesh> */}
            <LandModel />
            {/* <TreeModel /> */}
            <WaterModel />
            <LeavesModel />
            <GrassModel />
            
        </group> 
    );
}

export default PondLayout;
