import { useRef } from "react";
import * as THREE from "three";

import floor from '../../../geo/floor.json'
import { useFloorMaterial } from "../shaders/FloorShader";

function FloorModel() {
    const floorRef = useRef();
    const floorMat = useFloorMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={floorRef}
            material={floorMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(floor.data.attributes.position.array)}
                    count={floor.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(floor.data.attributes.uv.array)}
                    count={floor.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(floor.data.attributes.normal.array)}
                    count={floor.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(floor.data.attributes.vdata.array)}
                    count={floor.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(floor.data.index.array)}
                    count={floor.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default FloorModel;
