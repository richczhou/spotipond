import { useRef } from "react";
import * as THREE from "three";

import edmfish from '../../../geo/th_fish_edm.json'
import { useEDMFishMaterial } from "../shaders/EDMFishShader";

function EDMFishModel() {
    const edmfishRef = useRef();
    const edmfishMat = useEDMFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={edmfishRef}
            material={edmfishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(edmfish.data.attributes.position.array)}
                    count={edmfish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(edmfish.data.attributes.uv.array)}
                    count={edmfish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(edmfish.data.attributes.normal.array)}
                    count={edmfish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(edmfish.data.attributes.vdata.array)}
                    count={edmfish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(edmfish.data.index.array)}
                    count={edmfish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default EDMFishModel;
