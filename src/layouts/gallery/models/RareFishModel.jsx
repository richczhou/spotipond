import { useRef } from "react";
import * as THREE from "three";

import rarefish from '../../../geo/th_fish_rare.json'
import { useRareFishMaterial } from "../shaders/RareFishShader";

function RareFishModel() {
    const rarefishRef = useRef();
    const rarefishMat = useRareFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={rarefishRef}
            material={rarefishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(rarefish.data.attributes.position.array)}
                    count={rarefish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(rarefish.data.attributes.uv.array)}
                    count={rarefish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(rarefish.data.attributes.normal.array)}
                    count={rarefish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(rarefish.data.attributes.vdata.array)}
                    count={rarefish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(rarefish.data.index.array)}
                    count={rarefish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default RareFishModel;
