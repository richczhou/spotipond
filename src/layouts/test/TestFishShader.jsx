import { ShaderMaterial, Uniform } from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useTestFishMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uColor: new Uniform(color),
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color]
  );

  useFrame(({ clock }) => {
    mat.uniforms.uColor.value = color;
  });

  return mat;
}

const vert = `
    // Automatically imported
    // attribute vec3 position;
    // attribute vec3 normal;
    // attribute vec2 uv;
       attribute vec2 uv2;
       attribute vec3 vdata;
    
    uniform vec3 uColor;

    varying vec2 vUv;
    varying vec2 vUv2;
    varying vec3 vPosition;
    varying vec3 vData;
    
    void main() {
        vPosition = position;
        vUv = uv;
        vUv2 = uv2;
        vData = vdata;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `

const frag = `
    uniform vec3 uColor;

    varying vec2 vUv;
    varying vec2 vUv2;
    varying vec3 vPosition;
    varying vec3 vData;

    void main() {
        gl_FragColor = vec4(vUv, 0., 1.0);
        // gl_FragColor = vec4(1., 0., 0., 1.0);
    }
    `