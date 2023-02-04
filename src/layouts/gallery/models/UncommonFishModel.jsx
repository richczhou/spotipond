import { useRef } from "react";
import * as THREE from "three";

import uncommonfish from '../../../geo/th_fish_dancing.json'
import { useUncommonFishMaterial } from "../shaders/UncommonFishShader";

function UncommonFishModel() {
    const uncommonfishRef = useRef();
    const uncommonfishMat = useUncommonFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={uncommonfishRef}
            material={uncommonfishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(uncommonfish.data.attributes.position.array)}
                    count={uncommonfish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(uncommonfish.data.attributes.uv.array)}
                    count={uncommonfish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(uncommonfish.data.attributes.normal.array)}
                    count={uncommonfish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(uncommonfish.data.attributes.vdata.array)}
                    count={uncommonfish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(uncommonfish.data.index.array)}
                    count={uncommonfish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default UncommonFishModel;
