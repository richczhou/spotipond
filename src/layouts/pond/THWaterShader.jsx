import { ShaderMaterial, Uniform } from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useTHWaterMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/th_land.jpg" )),
          tMatcap: new Uniform(new THREE.TextureLoader().load( "tex/th_land.jpg" )),
          uColor1: new Uniform(color),
          uColor2: new Uniform(color),
          uFresnelColor: new Uniform(color),
          uTime: new Uniform(0)
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [color]
  );

  useFrame(({ clock }) => {
    mat.uniforms.uColor.value = color;
    mat.uniforms.UTime.value = clock.getElapsedTime();
  });

  return mat;
}

const vert = `
    attribute vec3 vdata;
    attribute vec4 random;

    uniform sampler2D tMap;
    uniform sampler2D tMatcap;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uFresnelColor;
    uniform float uTime;


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
    float sinf(float x) {
        x*=0.159155;
        x-=floor(x);
        float xx=x*x;
        float y=-6.87897;
        y=y*xx+33.7755;
        y=y*xx-72.5257;
        y=y*xx+80.5874;
        y=y*xx-41.2408;
        y=y*xx+6.28077;
        return x*y;
    }
    float cnoise(vec3 v) {
        float t = v.z * 0.3;
        v.y *= 0.8;
        float noise = 0.0;
        float s = 0.5;
        noise += (sinf(v.x * 0.9 / s + t * 10.0) + sinf(v.x * 2.4 / s + t * 15.0) + sinf(v.x * -3.5 / s + t * 4.0) + sinf(v.x * -2.5 / s + t * 7.1)) * 0.3;
        noise += (sinf(v.y * -0.3 / s + t * 18.0) + sinf(v.y * 1.6 / s + t * 18.0) + sinf(v.y * 2.6 / s + t * 8.0) + sinf(v.y * -2.6 / s + t * 4.5)) * 0.3;
        return noise;
    }

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

    vec3 orthogonal(vec3 v) {
        return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
        : vec3(0.0, -v.z, v.y));
    }

    void main() {
        vec3 pos = position;

        float noise = cnoise(pos.xyz * 0.3 + uTime * 0.05);
        float noise2 = cnoise(pos.xyz * 1.7 + uTime * 1.1);

        pos += noise * vec3(0.05,0.1,0.05);
        pos += noise2 * 0.01;

        
        vec3 tangent1 = orthogonal(normal);
        vec3 tangent2 = normalize(cross(normal, tangent1));
        vec3 nearby1 = pos + tangent1 * 0.3;
        vec3 nearby2 = pos + tangent2 * 0.3;
        vec3 distorted1 = nearby1 + noise *  vec3(0.05,0.1,0.05) + noise2 * 0.01;
        vec3 distorted2 = nearby2 + noise *  vec3(0.05,0.1,0.05) + noise2 * 0.01;
        vNormal = normalize(cross(distorted1 - pos, distorted2 - pos)) * normalize(normalMatrix * normal);;
        //vNormal = normalize(normalMatrix * normal);
        vData = vdata;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);

        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;

        vUv = uv;
        vViewDir = -vec3(modelViewMatrix * vec4(pos, 1.0));
        vMuv = reflectMatcap(pos, modelViewMatrix, normalize(normalMatrix * normal));

    }
    `

const frag = `
    uniform float uTime;
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

    vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
    return reflected.xy / m + 0.5;
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

    void main() {
      vec2 st = vMuv * 2.0;
      st = rotateUV(st, uTime * 0.02, vec2(0.0,0.0));

      vec4 matCap = texture2D(tMatcap, st);
      matCap.rgb = pow(matCap.rgb, vec3(1.2));
      matCap.r = crange(matCap.r, 0.1, 1.0, 0.0, 1.1);
      
      vec3 color = mix(uColor1, uColor2, vData.r);

      color.rgb += vec3(matCap.r) * 1.0;

      float fresnel = getFresnel(vNormal, vViewDir, 0.5);
      fresnel = smoothstep(0.0, 1.0, fresnel);
      color.rgb += fresnel * uFresnelColor * 0.4;

      float op = crange(vData.r, 0.0, 0.8, 0.0, 0.8);

      if (op < 0.25) discard;

      gl_FragColor = vec4(color, op);
    }

    `