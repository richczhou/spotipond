import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"

function GalleryLayout() {
    const groupRef = useRef();
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    useFrame((state, delta) => {
        // console.log(groupRef.current);
        // groupRef.current.rotation.y = 0.54 * Math.sin(state.clock.elapsedTime * 0.6);
    });

    return (
        <group 
            position={[0, 0.05, 0]}
            ref={groupRef}> 

            <mesh
                material={material}
                geometry={geometry}
                position={[0, 0, 0]}>
            </mesh>
            <mesh
                material={material}
                geometry={geometry}
                position={[0.2, 0, 0]}>
            </mesh>
            <mesh
                material={material}
                geometry={geometry}
                position={[-0.2, 0, 0]}>
            </mesh>
        </group>
    );
}

export default GalleryLayout;
