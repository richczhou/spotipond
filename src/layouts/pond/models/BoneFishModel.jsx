import { useRef } from "react";
import * as THREE from "three";

import bonefish from '../../../geo/th_fish_dead.json'
import { useBoneFishMaterial } from "../shaders/BoneFishShader";

function BoneFishModel() {
    const bonefishRef = useRef();
    const bonefishMat = useBoneFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={bonefishRef}
            material={bonefishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(bonefish.data.attributes.position.array)}
                    count={bonefish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(bonefish.data.attributes.uv.array)}
                    count={bonefish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(bonefish.data.attributes.normal.array)}
                    count={bonefish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(bonefish.data.attributes.vdata.array)}
                    count={bonefish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(bonefish.data.index.array)}
                    count={bonefish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default BoneFishModel;
