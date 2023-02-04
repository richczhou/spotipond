import { useRef } from "react";
import * as THREE from "three";

import commonfish from '../../../geo/th_fish_basic1.json'
import { useCommonFishMaterial } from "../shaders/CommonFishShader";

function CommonFishModel() {
    const commonfishRef = useRef();
    const commonfishMat = useCommonFishMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={commonfishRef}
            material={commonfishMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(commonfish.data.attributes.position.array)}
                    count={commonfish.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(commonfish.data.attributes.uv.array)}
                    count={commonfish.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(commonfish.data.attributes.normal.array)}
                    count={commonfish.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(commonfish.data.attributes.vdata.array)}
                    count={commonfish.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(commonfish.data.index.array)}
                    count={commonfish.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default CommonFishModel;
