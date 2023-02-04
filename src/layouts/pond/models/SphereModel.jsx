import { useRef } from "react";
import * as THREE from "three";

import sphere from '../../../geo/th_backsphere.json'
import { useTHSphereMaterial } from "./../shaders/THSphereShader";

function SphereModel() {
    const sphereRef = useRef();
    const sphereMat = useTHSphereMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={sphereRef}
            material={sphereMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(sphere.data.attributes.position.array)}
                    count={sphere.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(sphere.data.attributes.uv.array)}
                    count={sphere.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(sphere.data.attributes.normal.array)}
                    count={sphere.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(sphere.data.index.array)}
                    count={sphere.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default SphereModel;
