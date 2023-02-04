import { ShaderMaterial, Uniform } from 'three'
import * as THREE from "three"
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useFloorMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/fishpattern-studio.png" )),
          uDance: new Uniform(0.0),
          uEDM: new Uniform(0.0),
          uColor: new Uniform(new THREE.Color("#4A94A6")),
          uFresnelColor: new Uniform(new THREE.Color("#4A94A6")),
          uTime: new Uniform(0)
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color]
  );

  mat.transparent = true;

  useFrame(({ clock }) => {
    mat.uniforms.uFresnelColor.value = color;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    //mat.uniforms.uDance
  });

  return mat;
}

const vert = `
    attribute vec3 vdata;
    
    uniform sampler2D tMap;
    uniform float uDance;
    uniform float uEDM;
    uniform vec3 uColor;
    uniform vec3 uFresnelColor;
    uniform float uTime;

    varying vec3 vColor;
    varying vec3 vData;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 vViewDir;


    float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
        return sub.x * sub.y / sub.z + newMin;
    }

    vec2 range(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {
        vec2 oldRange = oldMax - oldMin;
        vec2 newRange = newMax - newMin;
        vec2 val = oldValue - oldMin;
        return val * newRange / oldRange + newMin;
    }

    vec3 range(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {
        vec3 oldRange = oldMax - oldMin;
        vec3 newRange = newMax - newMin;
        vec3 val = oldValue - oldMin;
        return val * newRange / oldRange + newMin;
    }

    float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    vec2 crange(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    vec3 crange(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;

        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }


    mat2 rotationMatrix(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    mat4 rotationX( in float angle ) {
      return mat4(	1.0,		0,			0,			0,
              0, 	cos(angle),	-sin(angle),		0,
              0, 	sin(angle),	 cos(angle),		0,
              0, 			0,			  0, 		1);
    }

    mat4 rotationY( in float angle ) {
      return mat4(	cos(angle),		0,		sin(angle),	0,
                  0,		1.0,			 0,	0,
              -sin(angle),	0,		cos(angle),	0,
                  0, 		0,				0,	1);
    }

    mat4 rotationZ( in float angle ) {
      return mat4(	cos(angle),		-sin(angle),	0,	0,
              sin(angle),		cos(angle),		0,	0,
                  0,				0,		1,	0,
                  0,				0,		0,	1);
    }

    void main() {
        vec3 pos = position;
        vNormal = normalize(normalMatrix * normal);

        vData = vdata;


        pos -= vec3(0.0, 0.2, 0.0);
        float dist = crange(abs(pos.z), 0.0, 1.6, 1.0, 0.0);
        dist *= crange(abs(pos.x), 0.0, 1.6, 1.0, 0.0);
        dist = crange(sin(dist*8.0 + uTime*3.1) * dist, -1.0, 1.0, 0.0, 1.0);
        dist *= crange(uv.y, 0.5, 0.0, 1.0, 0.0);
        pos.y += dist * 0.1;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);

        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;

        vColor = vdata;
        vUv = uv;
        vViewDir = -vec3(modelViewMatrix * vec4(pos, 1.0));

    }
    `

const frag = `
    uniform sampler2D tMap;
    uniform float uDance;
    uniform vec3 uColor;
    uniform vec3 uFresnelColor;
    uniform float uTime;

    varying vec3 vColor;
    varying vec3 vData;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 vViewDir;
    
    float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
        return sub.x * sub.y / sub.z + newMin;
    }

    vec2 range(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {
        vec2 oldRange = oldMax - oldMin;
        vec2 newRange = newMax - newMin;
        vec2 val = oldValue - oldMin;
        return val * newRange / oldRange + newMin;
    }

    vec3 range(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {
        vec3 oldRange = oldMax - oldMin;
        vec3 newRange = newMax - newMin;
        vec3 val = oldValue - oldMin;
        return val * newRange / oldRange + newMin;
    }

    float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    vec2 crange(vec2 oldValue, vec2 oldMin, vec2 oldMax, vec2 newMin, vec2 newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    vec3 crange(vec3 oldValue, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {
        return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
    }

    float getFresnel(vec3 normal, vec3 viewDir, float power) {
        float d = dot(normalize(normal), normalize(viewDir));
        return 1.0 - pow(abs(d), power);
    }

    float getFresnel(float inIOR, float outIOR, vec3 normal, vec3 viewDir) {
        float ro = (inIOR - outIOR) / (inIOR + outIOR);
        float d = dot(normalize(normal), normalize(viewDir));
        return ro + (1. - ro) * pow((1. - d), 5.);
    }


    void main() {
        float dist = crange(abs(vPos.z), 0.0, 1.6, 1.0, 0.0);
        dist *= crange(abs(vPos.x), 0.0, 1.6, 1.0, 0.0);
        dist = crange(sin(dist*11.0 + uTime*3.1) * dist, -1.0, 1.0, 0.0, 1.0);
        dist *= crange(vUv.y, 0.5, 0.0, 1.0, 0.0);

        vec3 color = vec3(0.2, 0.6, 0.8);

        gl_FragColor = vec4(color, dist * 0.7);
    }
    `