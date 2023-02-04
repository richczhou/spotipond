import { useRef } from "react";
import * as THREE from "three";

import hedge from '../../../geo/th_bush.json'
import { useTHHedgeMaterial } from "./../shaders/THHedgeShader";

function HedgeModel() {
    const hedgeRef = useRef();
    const hedgeMat = useTHHedgeMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={hedgeRef}
            material={hedgeMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(hedge.data.attributes.position.array)}
                    count={hedge.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(hedge.data.attributes.uv.array)}
                    count={hedge.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(hedge.data.attributes.uv2.array)}
                    count={hedge.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(hedge.data.attributes.normal.array)}
                    count={hedge.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(hedge.data.attributes.vdata.array)}
                    count={hedge.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(hedge.data.index.array)}
                    count={hedge.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default HedgeModel;
