'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, geometry, color, speed, distort }: {
  position: [number, number, number]
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'sphere'
  color: string
  speed: number
  distort: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 1)
      case 'torus': return new THREE.TorusGeometry(0.8, 0.3, 16, 32)
      case 'octahedron': return new THREE.OctahedronGeometry(1)
      case 'sphere': return new THREE.SphereGeometry(0.8, 32, 32)
    }
  }, [geometry])

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} geometry={geo}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={geometry === 'icosahedron' || geometry === 'octahedron'}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00e5cc" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#00e5cc" intensity={1} />
      <pointLight position={[-10, -5, -10]} color="#0088ff" intensity={0.5} />

      <ParticleField />

      <FloatingShape position={[-4, 2, -5]} geometry="icosahedron" color="#00e5cc" speed={0.8} distort={0.3} />
      <FloatingShape position={[4, -1, -4]} geometry="torus" color="#0088ff" speed={0.6} distort={0.4} />
      <FloatingShape position={[0, -3, -6]} geometry="octahedron" color="#00e5cc" speed={1.0} distort={0.2} />
      <FloatingShape position={[-3, -3, -3]} geometry="sphere" color="#004466" speed={0.5} distort={0.5} />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
