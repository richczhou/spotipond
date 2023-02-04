import { ShaderMaterial, Uniform } from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useTHLandMaterial = ( color ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          tMap: new Uniform(new THREE.TextureLoader().load( "tex/th_land.jpg" )),
          tOp: new Uniform(new THREE.TextureLoader().load( "tex/circlemask_thres.png" )),
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
    uniform sampler2D tOp;
    uniform float uTime;
    uniform vec3 uFresnelColor;

    varying vec3 vData;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 vViewDir;

    void main() {
        vec3 pos = position;
        vNormal = normalize(normalMatrix * normal);

        vData = vdata;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);

        vec4 modelViewPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * modelViewPos;
        vPos = pos;

        vUv = uv;
        vViewDir = -vec3(modelViewMatrix * vec4(pos, 1.0));

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

    vec3 saturation(vec3 rgb, float adjustment) {
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      vec3 intensity = vec3(dot(rgb, W));
      return mix(intensity, rgb, adjustment);
    }

    vec3 hue(vec3 color, float hue) {
      const vec3 k = vec3(0.57735, 0.57735, 0.57735);
      float cosAngle = cos(hue);
      return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
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
      float posterizeTime = floor(uTime * 2.4) / 2.4;

      vec2 spinuv = rotateUV(vUv, posterizeTime, vec2(0.5, 0.5));
      float op = texture2D(tOp, spinuv).r;

      op = crange(op, 0.1, 1.0, 0.0, 1.0);
      vec3 color = texture2D(tMap, vUv).rgb;
      float fresnel = getFresnel(vNormal, vViewDir, 0.5);
      fresnel = smoothstep(0.0, 1.0, fresnel);
      
      color.rgb = mix(color.rgb, uFresnelColor, fresnel * 0.5);

      gl_FragColor = vec4(color, op);
    }
    `