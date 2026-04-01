---
title: "Getting Started with React Three Fiber"
date: "2024-09-10"
excerpt: "A practical guide to building 3D web experiences with React Three Fiber — from your first rotating cube to shader materials and post-processing effects."
tags: ["Three.js", "React", "3D", "WebGL"]
readingTime: "9 min read"
---

## Why React Three Fiber?

Three.js is the gold standard for 3D on the web. But raw Three.js requires a lot of imperative code: create a scene, create a renderer, create a camera, add event listeners, animate in `requestAnimationFrame`. It's powerful but verbose.

React Three Fiber (R3F) wraps Three.js in a React renderer. Instead of writing imperative code, you write JSX. Your 3D objects become React components. The declarative model makes complex scenes dramatically easier to manage.

```tsx
// Imperative Three.js
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 'orange' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// React Three Fiber
<mesh>
  <boxGeometry />
  <meshStandardMaterial color="orange" />
</mesh>
```

Same result. Very different experience.

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```

`@react-three/drei` is a helpers library from the R3F team. It ships dozens of useful abstractions: `OrbitControls`, `Text`, `Environment`, `Stars`, and much more.

## Your First Scene

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.8
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00e5cc" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <RotatingBox />
      <OrbitControls />
    </Canvas>
  )
}
```

That's a complete, interactive 3D scene in under 40 lines.

## useFrame — The Animation Loop

`useFrame` is R3F's hook for the animation loop. It runs every frame (targeting 60fps) and receives the R3F state object plus the time delta since the last frame.

```tsx
useFrame((state, delta) => {
  // state.clock.elapsedTime — total seconds since start
  // delta — seconds since last frame (~0.016 at 60fps)

  // Float animation
  if (meshRef.current) {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
  }
})
```

Always use `delta` for rotation and position changes rather than a hardcoded increment. This makes animations frame-rate independent.

## Geometries

R3F exposes all Three.js geometries as JSX elements. The naming convention is camelCase + the word "Geometry":

```tsx
<boxGeometry args={[width, height, depth]} />
<sphereGeometry args={[radius, widthSegments, heightSegments]} />
<torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments]} />
<icosahedronGeometry args={[radius, detail]} />
<planeGeometry args={[width, height, widthSegments, heightSegments]} />
```

The `args` prop maps to the constructor arguments of the Three.js class.

## Materials

```tsx
{/* Flat shading, no lighting required */}
<meshBasicMaterial color="#00e5cc" wireframe />

{/* Reacts to lighting, physically-based */}
<meshStandardMaterial
  color="#00e5cc"
  roughness={0.3}
  metalness={0.8}
/>

{/* Shiny, specular highlights */}
<meshPhongMaterial color="#00e5cc" shininess={100} />

{/* Normal map visualization */}
<meshNormalMaterial />
```

## Environment Lighting with Drei

Manual lighting is fine, but `Environment` from Drei gives you HDRI-based image-based lighting with one line:

```tsx
import { Environment } from '@react-three/drei'

// In your Canvas:
<Environment preset="city" />
// Options: sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby
```

## Post-Processing

For cinematic effects like bloom, depth of field, and chromatic aberration, use `@react-three/postprocessing`:

```bash
npm install @react-three/postprocessing
```

```tsx
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'

// Inside Canvas:
<EffectComposer>
  <Bloom luminanceThreshold={0.2} intensity={0.8} />
  <ChromaticAberration offset={[0.002, 0.002]} />
</EffectComposer>
```

Bloom on emissive materials creates that gorgeous neon glow effect.

## Shader Materials

For fully custom rendering, write GLSL shaders:

```tsx
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const WaveMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color('#00e5cc') },
  // Vertex shader
  `
    varying vec2 vUv;
    uniform float time;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 5.0 + time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    uniform vec3 color;
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ WaveMaterial })
```

## Performance Tips

**frameloop="demand"** — Only render when something changes. Great for mostly-static scenes.

```tsx
<Canvas frameloop="demand">
```

**Instancing** — For many copies of the same geometry, use `InstancedMesh` instead of individual meshes. 1000 instanced objects renders faster than 100 separate meshes.

**LOD (Level of Detail)** — Use simpler geometry when objects are far from the camera.

**Dispose on unmount** — R3F handles this automatically for most cases, but be careful with custom geometries and textures created outside of JSX.

## Integrating with GSAP

For scroll-driven animations, GSAP ScrollTrigger pairs beautifully with R3F:

```tsx
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.create({
    trigger: '#scene-container',
    start: 'top center',
    end: 'bottom center',
    onUpdate: (self) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = self.progress * Math.PI * 2
      }
    },
  })
}, [])
```

## Conclusion

React Three Fiber removes the accidental complexity of Three.js while preserving all its power. If you're already comfortable with React, R3F will feel surprisingly natural.

The ecosystem around it — Drei, Postprocessing, Rapier physics — is mature and actively maintained. There's never been a better time to add 3D to your web projects.

Start simple. A rotating icosahedron with wireframe material and a slow float animation can be surprisingly striking. Build from there.
