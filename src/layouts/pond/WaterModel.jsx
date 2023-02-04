import { useRef } from "react";
import * as THREE from "three";

import water from '../../geo/th_water.json'
import { useTHWaterMaterial } from "./THWaterShader";

function WaterModel() {
    const waterRef = useRef();
    const waterMat = useTHWaterMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={waterRef}
            material={waterMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(water.data.attributes.position.array)}
                    count={water.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(water.data.attributes.uv.array)}
                    count={water.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(water.data.attributes.normal.array)}
                    count={water.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(water.data.attributes.vdata.array)}
                    count={water.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(water.data.index.array)}
                    count={water.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default WaterModel;
