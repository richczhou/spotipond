import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"
import { useLocation } from "wouter";

import LandModel from "./pond/models/LandModel";
import TreeModel from "./pond/models/TreeModel";
import WaterModel from "./pond/models/WaterModel";
import LeavesModel from "./pond/models/LeavesModel";
import GrassModel from "./pond/models/GrassModel";
import RockModel from "./pond/models/RockModel";
import SphereModel from "./pond/models/SphereModel";
import { OrbitControls } from "@react-three/drei";

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
        <>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
            <TreeModel />
            <WaterModel />
            <LeavesModel />
            <GrassModel />
            <RockModel />
            <SphereModel />
            
        </group> 
        </>
    );
}

export default PondLayout;
