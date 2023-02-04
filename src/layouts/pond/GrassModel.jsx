import { useRef } from "react";
import * as THREE from "three";

import grass from '../../geo/th_land_grss.json'
import { useTHBushMaterial } from "./THBushShader";

function GrassModel() {
    const grassRef = useRef();
    const grassMat = useTHBushMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={grassRef}
            material={grassMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(grass.data.attributes.position.array)}
                    count={grass.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(grass.data.attributes.uv.array)}
                    count={grass.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(grass.data.attributes.uv2.array)}
                    count={grass.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(grass.data.attributes.normal.array)}
                    count={grass.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(grass.data.attributes.vdata.array)}
                    count={grass.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(grass.data.index.array)}
                    count={grass.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default GrassModel;
