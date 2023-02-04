import { ShaderMaterial, Uniform } from 'three'
import * as THREE from "three"
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useRareFishMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/fishpattern-studio.png" )),
          tMatcap: new Uniform(new THREE.TextureLoader().load( "tex/matcaptinted.png" )),
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
    uniform sampler2D tMatcap;
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
    varying vec2 vMuv;

    vec2 reflectMatcap(vec3 position, mat4 modelViewMatrix, vec3 normal) {
        vec4 p = vec4(position, 1.0);
        
        vec3 e = normalize(vec3(modelViewMatrix * p));
        vec3 n = normalize(normal);
        vec3 r = reflect(e, n);
        float m = 2.0 * sqrt(
                            pow(r.x, 2.0) +
                            pow(r.y, 2.0) +
                            pow(r.z + 1.0, 2.0)
                            );
        
        vec2 uv = r.xy / m + .5;
        
        return uv;
    }

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
        // pos *= 0.22;
        vNormal = normalize(normalMatrix * normal);

        vData = vdata;

        float rotationX = sin(uTime*3.2+vdata.x*4.0)*0.3;
        float rotationZ = 1.0 * sin(-uTime*2.2+vdata.x*2.6)*0.3;
        
        mat4 rotMatrixX = rotationMatrix(vec3(1.0, 0.0, 0.0), rotationX);
        mat4 rotMatrixZ = rotationMatrix(vec3(0.0, 1.0, 0.0), rotationZ);

        pos = vec3(rotMatrixX * vec4(pos, 1.0));
        pos = vec3(rotMatrixZ * vec4(pos, 1.0));

        mat4 spin = rotationMatrix(vec3(0.0, 1.0, 0.0), 0.8);
        pos = vec3(spin * vec4(pos, 1.0));

        pos += vec3(0.2, 0.0, 0.0);

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);

        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;

        vColor = vdata;
        vUv = uv;
        vViewDir = -vec3(modelViewMatrix * vec4(pos, 1.0));
        vMuv = reflectMatcap(pos, modelViewMatrix, normalize(normalMatrix * normal));

    }
    `

const frag = `
    uniform sampler2D tMap;
    uniform sampler2D tMatcap;
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
    varying vec2 vMuv;
    
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
    vec2 rotateUV(vec2 uv, float r, vec2 origin) {
        float c = cos(r);
        float s = sin(r);
        mat2 m = mat2(c, -s, 
                      s, c);
        vec2 st = uv - origin;
        st = m * st;
        return st + origin;
    }
    vec3 hue(vec3 color, float hue) {
        const vec3 k = vec3(0.57735, 0.57735, 0.57735);
        float cosAngle = cos(hue);
        return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
    }


    void main() {
        vec3 color = vec3(0.1, 0.2, 0.2);

        vec2 st = vMuv * vec2(7.3);
        st = rotateUV(st, uTime * 2.2, vec2(0.0,0.0));

        vec4 matCap = texture2D(tMatcap, st);
        matCap.rgb = pow(matCap.rgb, vec3(1.8));
        color.rgb = matCap.rgb;
        //color = hue(color, -uTime * 7.0 + vData.r * 2.0);

        float fresnel = getFresnel(vNormal, vViewDir, 1.9);
        fresnel = smoothstep(0.0, 1.0, fresnel);

        color.rgb = mix(color.rgb, vec3(0.8, 0.9, 1.0), fresnel);
        color *= 1.1;

        gl_FragColor = vec4(color, 1.0);
    }
    `