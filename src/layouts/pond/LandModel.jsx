import { useRef } from "react";
import * as THREE from "three";

import land from '../../geo/th_land.json'
import { useTHLandMaterial } from "./THLandShader";

function LandModel() {
    const landRef = useRef();
    const landMat = useTHLandMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={landRef}
            material={landMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(land.data.attributes.position.array)}
                    count={land.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(land.data.attributes.uv.array)}
                    count={land.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(land.data.attributes.uv2.array)}
                    count={land.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(land.data.attributes.normal.array)}
                    count={land.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(land.data.attributes.vdata.array)}
                    count={land.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(land.data.index.array)}
                    count={land.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default LandModel;
