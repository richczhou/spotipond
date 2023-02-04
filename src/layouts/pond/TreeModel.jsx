import { useRef } from "react";
import * as THREE from "three";

import tree from '../../geo/th_tree.json'
import { useTHTreeMaterial } from "./THTreeShader";

function TreeModel() {
    const treeRef = useRef();
    const treeMat = useTHTreeMaterial(new THREE.Color('#FF0000'));

    return (
        <mesh
            ref={treeRef}
            material={treeMat}
            position={[0, 0, 0]}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach='attributes-position'
                    array={new Float32Array(tree.data.attributes.position.array)}
                    count={tree.data.attributes.position.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-uv'
                    array={new Float32Array(tree.data.attributes.uv.array)}
                    count={tree.data.attributes.uv.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-uv2'
                    array={new Float32Array(tree.data.attributes.uv2.array)}
                    count={tree.data.attributes.uv2.array.length / 3}
                    itemSize={2}
                />
                <bufferAttribute
                    attach='attributes-normal'
                    array={new Float32Array(tree.data.attributes.normal.array)}
                    count={tree.data.attributes.normal.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach='attributes-vdata'
                    array={new Float32Array(tree.data.attributes.vdata.array)}
                    count={tree.data.attributes.vdata.array.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={new Uint16Array(tree.data.index.array)}
                    count={tree.data.index.array.length}
                    itemSize={1}
                />
            </bufferGeometry>
        </mesh>
    )
}

export default TreeModel;
