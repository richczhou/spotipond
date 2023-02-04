import { useRef } from "react";
import { useLocation } from "wouter";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

import commonfish from '../../../geo/th_fish_basic1.json'
import { useCommonFishMaterial } from "../shaders/CommonFishShader";
import { useState } from "react";

function CommonFishModel() {
    const commonfishRef = useRef();
    const commonfishMat = useCommonFishMaterial(new THREE.Color('#FF0000'));
    const [active, setActive] = useState(true);

    function onOver() {
        setActive(!active);
    }

    function onOut() {
        setActive(!active);
    }

    function onClick() {
        setLocation('/main');
    }

    const { scale } = useSpring({ scale: active ? 0.06 : 0.09 });

    const [, setLocation] = useLocation();

    return (
        <animated.mesh
            ref={commonfishRef}
            onPointerOver={onOver}
            onPointerOut={onOut}
            onClick={onClick}
            material={commonfishMat}
            scale={scale}
            position={[-0.2, 0, 0]}>
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
        </animated.mesh>
    )
}

export default CommonFishModel;
