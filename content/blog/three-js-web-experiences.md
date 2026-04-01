---
title: "Creating Immersive 3D Web Experiences with Three.js and React"
date: "2025-01-10"
excerpt: "Learn how to build stunning 3D web experiences using Three.js, @react-three/fiber, and @react-three/drei — from basic scenes to scroll-responsive animations."
readTime: 12
tags: ["Three.js", "WebGL", "React", "Animation"]
---

# Creating Immersive 3D Web Experiences with Three.js and React

WebGL has been around for over a decade, but it's never been more accessible. With @react-three/fiber, you can write Three.js using familiar React patterns. Let me show you how I build the 3D elements you see on this portfolio.

## Why @react-three/fiber?

Writing raw Three.js is verbose and doesn't play well with React's component model. `@react-three/fiber` (R3F) gives you:

- **Declarative scene graphs** — describe your 3D scene as JSX
- **Automatic cleanup** — Three.js objects are disposed when components unmount
- **React ecosystem** — use hooks, context, and state management normally
- **Performance** — R3F runs in a React concurrent mode-friendly loop

## Your First Scene

```tsx
import { Canvas } from '@react-three/fiber'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}
```

## Animating with useFrame

The `useFrame` hook runs every frame:

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="#00e5cc" />
    </mesh>
  )
}
```

## Scroll-Responsive 3D

Connecting scroll position to 3D animations creates that "wow" factor:

```tsx
function ScrollMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const scrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const progress = scrollY.current / document.body.scrollHeight
    meshRef.current.rotation.y = progress * Math.PI * 2
    meshRef.current.position.y = -progress * 5
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial wireframe color="#00e5cc" />
    </mesh>
  )
}
```

## @react-three/drei: The Essential Toolkit

Drei gives you pre-built abstractions for common patterns:

```tsx
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'

// Floating animation
<Float speed={2} rotationIntensity={1} floatIntensity={2}>
  <mesh>...</mesh>
</Float>

// Distorted material (great for organic shapes)
<MeshDistortMaterial color="#00e5cc" distort={0.4} speed={2} />

// Star field background
<Stars radius={100} depth={50} count={5000} factor={4} />
```

## Performance Tips

3D can tank your performance if you're not careful:

1. **Use `instancedMesh`** for many identical objects
2. **Avoid creating objects in `useFrame`** — pre-allocate everything
3. **LOD (Level of Detail)** — lower polygon counts for distant objects
4. **Cap pixel ratio**: `gl.setPixelRatio(Math.min(2, devicePixelRatio))`

The web is moving towards immersive experiences. Start building them today.
