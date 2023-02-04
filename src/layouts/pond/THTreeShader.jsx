import { ShaderMaterial, Uniform } from 'three'
import * as THREE from "three"
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useTHTreeMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/th_tree.jpg" )),
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color]
  );

  useFrame(({ clock }) => {
  });

  return mat;
}

const vert = `
    uniform sampler2D tMap;

    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
        vec3 pos = position;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);

        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;

        vUv = uv;


    }
    `

const frag = `
    uniform sampler2D tMap;
    
    void main() {
      vec3 color = texture2D(tMap, vUv).rgb;
      gl_FragColor = vec4(color, 1.0);
    }
    `