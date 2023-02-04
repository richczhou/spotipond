import { useRef } from "react";
import * as THREE from "three";

import fish from '../../geo/th_fish_dancing.json'
import { useTestFishMaterial } from "./TestFishShader";

function TestFishModel() {
    const fishRef = useRef();
    const fishMat = useTestFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={fishRef}
            material={fishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(fish.data.attributes.position.array)}
                    count={fish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(fish.data.attributes.uv.array)}
                    count={fish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(fish.data.attributes.uv2.array)}
                    count={fish.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(fish.data.attributes.normal.array)}
                    count={fish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(fish.data.attributes.vdata.array)}
                    count={fish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(fish.data.index.array)}
                    count={fish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default TestFishModel;
