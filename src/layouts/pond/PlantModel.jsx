import { useRef } from "react";
import * as THREE from "three";

import plant from '../../geo/th_plants.json'
import { useTHPlantMaterial } from "./THPlantShader";

function PlantModel() {
    const plantRef = useRef();
    const plantMat = useTHPlantMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={plantRef}
            material={plantMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(plant.data.attributes.position.array)}
                    count={plant.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(plant.data.attributes.uv.array)}
                    count={plant.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(plant.data.attributes.uv2.array)}
                    count={plant.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(plant.data.attributes.normal.array)}
                    count={plant.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(plant.data.attributes.vdata.array)}
                    count={plant.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(plant.data.index.array)}
                    count={plant.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default PlantModel;
