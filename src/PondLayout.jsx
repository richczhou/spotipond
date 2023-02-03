import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"

function PondLayout() {
    const groupRef = useRef();
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    useFrame((state, delta) => {
        // console.log(groupRef.current);
        groupRef.current.rotation.y = 0.54 * Math.sin(state.clock.elapsedTime * 0.6);
    });

    return (
        <group 
            position={[0, 0, 0]}
            ref={groupRef}> 

            <mesh
                material={material}
                geometry={geometry}>
            </mesh>
        </group> 
    );
}

export default PondLayout;
