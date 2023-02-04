import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"

import CommonFishModel from "./gallery/models/CommonFishModel";
import UncommonFishModel from "./gallery/models/UncommonFishModel";
import RareFishModel from "./gallery/models/RareFishModel";
import SphereModel from "./pond/models/SphereModel";
import FloorModel from "./gallery/models/FloorModel";

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
            onPointerOver={() => {material.color.set('red')}}
            onPointerOut={() => {material.color.set('green')}}
            position={[0, 0.05, 0]}
            ref={groupRef}> 

            <CommonFishModel />
            <UncommonFishModel />
            <RareFishModel />
            <SphereModel />
            <FloorModel />

        </group>
    );
}

export default GalleryLayout;
