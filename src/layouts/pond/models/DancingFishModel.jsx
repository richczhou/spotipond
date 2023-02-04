import { useRef } from "react";
import * as THREE from "three";

import dancingfish from '../../../geo/th_fish_dancing.json'
import { useDancingFishMaterial } from "../shaders/DancingFishShader";

function DancingFishModel() {
    const dancingfishRef = useRef();
    const dancingfishMat = useDancingFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={dancingfishRef}
            material={dancingfishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(dancingfish.data.attributes.position.array)}
                    count={dancingfish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(dancingfish.data.attributes.uv.array)}
                    count={dancingfish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(dancingfish.data.attributes.normal.array)}
                    count={dancingfish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(dancingfish.data.attributes.vdata.array)}
                    count={dancingfish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(dancingfish.data.index.array)}
                    count={dancingfish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default DancingFishModel;
