import { ShaderMaterial, Uniform } from 'three'
import * as THREE from "three"
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useTHBushMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/th_land.jpg" )),
          tOp: new Uniform(new THREE.TextureLoader().load( "tex/th_grass2.png" )),
          uTime: new Uniform(0)
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color]
  );

  useFrame(({ clock }) => {
    //mat.uniforms.uColor.value = color;
    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return mat;
}

const vert = `
    attribute vec3 vdata;
    attribute vec2 uv2;

    uniform sampler2D tMap;
    uniform sampler2D tOp;
    uniform float uTime;

    varying vec3 vData;
    varying vec2 vUv;
    varying vec2 vUv2;
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
    
    
        float rotation = radians((360.0) + crange(sin(uTime + pos.x*5.3+ vdata.r* 0.5), -1.0, 1.0, - 0.6 * 10.0, 0.6 * 10.0));
        mat4 rotMatrix = rotationMatrix(vec3(sin(uTime*2.0+pos.x*20.0)*0.1,1.0,sin(uTime*2.0+pos.z)), rotation);
        pos = mix(pos, vec3(rotMatrix * vec4(pos, 1.0)), vdata);
    
    
    
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    
        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;
    
        vData = vdata;
        vUv = uv;
        vUv2 = uv2;
        vViewDir = -vec3(modelViewMatrix * vec4(pos, 1.0));
    
    }
    `

const frag = `
  uniform float uTime;
  uniform sampler2D tMap;
  uniform sampler2D tOp;

  varying vec3 vData;
  varying vec2 vUv;
  varying vec2 vUv2;
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


    void main() { 
      vec3 op = texture2D(tOp, vUv).rgb;
      if (op.r < 0.1) discard;

      vec3 color = texture2D(tMap, vUv2).rgb;

      float avgColor = (color.r + color.g + color.b) /3.0;
      if (avgColor < 0.2) discard;

      gl_FragColor = vec4(color, 1.0);
    }

    `