import { useRef } from "react";
import * as THREE from "three";

import leaves from '../../../geo/th_treeleaves.json'
import { useTHLeavesMaterial } from "./../shaders/THLeavesShader";

function LeavesModel() {
    const leavesRef = useRef();
    const leavesMat = useTHLeavesMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={leavesRef}
            material={leavesMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(leaves.data.attributes.position.array)}
                    count={leaves.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(leaves.data.attributes.uv.array)}
                    count={leaves.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(leaves.data.attributes.uv2.array)}
                    count={leaves.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(leaves.data.attributes.normal.array)}
                    count={leaves.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(leaves.data.attributes.vdata.array)}
                    count={leaves.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(leaves.data.index.array)}
                    count={leaves.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default LeavesModel;
