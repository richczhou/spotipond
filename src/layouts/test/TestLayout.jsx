import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import TestFishModel from "./TestFishModel";

function TestLayout() {
    const groupRef = useRef();
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    // useFrame((state, delta) => {
        // console.log(groupRef.current);
        // groupRef.current.rotation.y = 0.54 * Math.sin(state.clock.elapsedTime * 0.6);
        // fishRef.current.needsUpdate = true;
        // console.log(fishRef.current)
    // });

    return (
        <group 
            position={[0, 0, 0]}
            ref={groupRef}> 

            <TestFishModel />

            {/* GREEN DEBUG CUBE */}
            {/* <mesh
                material={material}
                geometry={geometry}>
            </mesh> */}
        </group>
    );
}

export default TestLayout;
