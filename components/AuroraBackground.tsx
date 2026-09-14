'use client';

import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function getCSSVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.body).getPropertyValue(name).trim() || fallback;
}

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec3 uBg;
  uniform vec3 uAccent;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float t = uTime * 0.15;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x) + dist * 1.5 - t * 0.5;
    vec2 rotatedUv = vec2(cos(angle), sin(angle)) * dist;
    uv = mix(uv, rotatedUv, 0.3);

    float mouseDist = length(vUv - uMouse);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist);
    uv += (vUv - uMouse) * mouseInfluence * 0.8;

    for(float i = 1.0; i < 4.0; i++) {
        uv.x += 0.6 / i * cos(i * 2.5 * uv.y + t);
        uv.y += 0.6 / i * cos(i * 1.5 * uv.x + t);
    }
    
    float r = cos(uv.x + uv.y + 1.0) * 0.5 + 0.5;
    float b = sin(uv.x + uv.y + 1.0) * 0.5 + 0.5;
    float glow = r * b * 0.45;
    float wave = sin(vUv.x * 10.0 + uTime) * 0.02;
    float portalDepth = smoothstep(0.0, 1.2, dist);
    
    float finalIntensity = glow + wave + (mouseInfluence * 0.15);
    vec3 finalColor = mix(uBg, uAccent, finalIntensity * portalDepth);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function AuroraMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uBg: { value: new THREE.Color('#020403') }, 
    uAccent: { value: new THREE.Color(getCSSVar('--accent', '#C8E832')) }
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [uniforms]);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function AuroraBackground({ opacity = 1 }: { opacity?: number }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      opacity,
      pointerEvents: 'none'
    }}>
      <Canvas gl={{ alpha: false, antialias: false }}>
         <AuroraMesh />
      </Canvas>
    </div>
  );
}
