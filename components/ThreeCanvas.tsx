'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  rotationSpeed: [number, number, number]
  floatSpeed: number
  floatAmplitude: number
  opacity: number
  scale: number
  geometryType: 'torusKnot' | 'icosahedron' | 'octahedron' | 'box' | 'torus'
}

function FloatingShape({
  position,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  opacity,
  scale,
  geometryType,
}: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const baseY = position[1]

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed[0]
    meshRef.current.rotation.y += rotationSpeed[1]
    meshRef.current.rotation.z += rotationSpeed[2]
    meshRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
  })

  const renderGeometry = () => {
    switch (geometryType) {
      case 'torusKnot':
        return <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[0.8, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.8, 0]} />
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'torus':
        return <torusGeometry args={[0.7, 0.25, 16, 40]} />
      default:
        return <icosahedronGeometry args={[0.8, 0]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {renderGeometry()}
      <meshBasicMaterial
        color="#00e5cc"
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

const shapes: ShapeProps[] = [
  {
    position: [-4.5, 2, -3],
    rotationSpeed: [0.003, 0.005, 0.001],
    floatSpeed: 0.5,
    floatAmplitude: 0.3,
    opacity: 0.25,
    scale: 1.2,
    geometryType: 'torusKnot',
  },
  {
    position: [4, 3, -4],
    rotationSpeed: [0.002, 0.003, 0.004],
    floatSpeed: 0.4,
    floatAmplitude: 0.4,
    opacity: 0.2,
    scale: 1.0,
    geometryType: 'icosahedron',
  },
  {
    position: [-3, -2, -2],
    rotationSpeed: [0.004, 0.002, 0.003],
    floatSpeed: 0.6,
    floatAmplitude: 0.25,
    opacity: 0.18,
    scale: 0.9,
    geometryType: 'octahedron',
  },
  {
    position: [3.5, -3, -3.5],
    rotationSpeed: [0.003, 0.004, 0.002],
    floatSpeed: 0.35,
    floatAmplitude: 0.35,
    opacity: 0.22,
    scale: 1.1,
    geometryType: 'box',
  },
  {
    position: [0, 4, -5],
    rotationSpeed: [0.002, 0.005, 0.003],
    floatSpeed: 0.45,
    floatAmplitude: 0.3,
    opacity: 0.15,
    scale: 1.3,
    geometryType: 'torus',
  },
  {
    position: [-5.5, 0, -4],
    rotationSpeed: [0.005, 0.002, 0.004],
    floatSpeed: 0.55,
    floatAmplitude: 0.28,
    opacity: 0.2,
    scale: 0.8,
    geometryType: 'icosahedron',
  },
  {
    position: [5.5, 1, -5],
    rotationSpeed: [0.003, 0.003, 0.005],
    floatSpeed: 0.5,
    floatAmplitude: 0.32,
    opacity: 0.17,
    scale: 1.0,
    geometryType: 'torusKnot',
  },
  {
    position: [1.5, -4, -3],
    rotationSpeed: [0.002, 0.004, 0.003],
    floatSpeed: 0.38,
    floatAmplitude: 0.27,
    opacity: 0.22,
    scale: 0.85,
    geometryType: 'octahedron',
  },
  {
    position: [-2, 3.5, -4.5],
    rotationSpeed: [0.004, 0.003, 0.002],
    floatSpeed: 0.42,
    floatAmplitude: 0.35,
    opacity: 0.16,
    scale: 1.15,
    geometryType: 'box',
  },
  {
    position: [6, -1, -3],
    rotationSpeed: [0.003, 0.005, 0.001],
    floatSpeed: 0.52,
    floatAmplitude: 0.22,
    opacity: 0.19,
    scale: 0.75,
    geometryType: 'torus',
  },
]

function Scene() {
  return (
    <>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </>
  )
}

export default function ThreeCanvas() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
