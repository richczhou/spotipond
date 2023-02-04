import { useRef } from "react";
import * as THREE from "three";

import rock from '../../../geo/th_rock.json'
import { useTHRockMaterial } from "./../shaders/THRockShader";

function RockModel() {
    const rockRef = useRef();
    const rockMat = useTHRockMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={rockRef}
            material={rockMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(rock.data.attributes.position.array)}
                    count={rock.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(rock.data.attributes.uv.array)}
                    count={rock.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(rock.data.attributes.normal.array)}
                    count={rock.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(rock.data.index.array)}
                    count={rock.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default RockModel;
