'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    // ── Scene + Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 0, 8)

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a0a2e, 0.8))

    const lightViolet = new THREE.PointLight(0x6366f1, 4, 30)
    lightViolet.position.set(-3, 3, 3)
    scene.add(lightViolet)

    const lightPink = new THREE.PointLight(0xec4899, 2.5, 25)
    lightPink.position.set(3, -2, 2)
    scene.add(lightPink)

    const lightAmber = new THREE.PointLight(0xf59e0b, 1.5, 20)
    lightAmber.position.set(0, -5, 1)
    scene.add(lightAmber)

    // ── Hero group (central sculpture) ────────────────────────────────────
    const heroGroup = new THREE.Group()
    scene.add(heroGroup)

    // Outer wireframe icosahedron
    const outerMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 1),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.28 })
    )
    heroGroup.add(outerMesh)

    // Inner solid octahedron (phong shaded)
    const innerMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1, 2),
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x2d1b69,
        specular: 0xec4899,
        shininess: 120,
        transparent: true,
        opacity: 0.75,
      })
    )
    heroGroup.add(innerMesh)

    // Orbital ring 1 (pink)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.022, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.5 })
    )
    ring1.rotation.x = Math.PI * 0.3
    heroGroup.add(ring1)

    // Orbital ring 2 (purple)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.016, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 })
    )
    ring2.rotation.x = Math.PI * 0.55
    ring2.rotation.y = Math.PI * 0.25
    heroGroup.add(ring2)

    // ── Particle field ──────────────────────────────────────────────────────
    const PARTICLE_COUNT = 700
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const palette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xec4899),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0x8b5cf6),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 6 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.065, vertexColors: true, transparent: true, opacity: 0.6, sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Secondary floating satellites ──────────────────────────────────────
    const satelliteData: Array<{ geo: THREE.BufferGeometry; pos: [number,number,number]; color: number; spd: number }> = [
      { geo: new THREE.OctahedronGeometry(0.45, 0),   pos: [-5.5,  3,   -3], color: 0xa855f7, spd: 0.007 },
      { geo: new THREE.IcosahedronGeometry(0.35, 0),  pos: [ 5.5, -2,   -4], color: 0x6366f1, spd: 0.005 },
      { geo: new THREE.TetrahedronGeometry(0.5),      pos: [-4,   -4.5, -2], color: 0xec4899, spd: 0.009 },
      { geo: new THREE.OctahedronGeometry(0.3, 0),    pos: [ 4.5,  4.5, -5], color: 0xf59e0b, spd: 0.006 },
      { geo: new THREE.IcosahedronGeometry(0.4, 0),   pos: [-7.5,  0,   -4], color: 0x8b5cf6, spd: 0.008 },
      { geo: new THREE.OctahedronGeometry(0.32, 0),   pos: [ 6.5,  1.5, -3], color: 0xa855f7, spd: 0.007 },
    ]

    const satellites = satelliteData.map(({ geo, pos, color }) => {
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 })
      )
      mesh.position.set(...pos)
      scene.add(mesh)
      return mesh
    })

    // ── Scroll-driven state (mutated by GSAP, read in render loop) ──────────
    const st = {
      camX: 0, camY: 0, camZ: 8,
      lookX: 0, lookY: 0,
      heroScale: 1,
      particleOpacity: 0.6,
      particleRotY: 0,
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    })

    // About section
    tl.to(st, { camX: -2.5, camY: 1.5, camZ: 7.5, lookX:  0.5, lookY:  0,    duration: 1, ease: 'none' })
    // Skills section
    .to(st,   { camX:  2,   camY: -1,  camZ: 7,   lookX: -0.3, lookY:  0.2, heroScale: 0.75, duration: 1, ease: 'none' })
    // Projects section
    .to(st,   { camX: -1,   camY:  2.5, camZ: 7.5, lookX:  0,  lookY: -0.5, heroScale: 0.62, particleRotY: 0.7, duration: 1, ease: 'none' })
    // Contact section
    .to(st,   { camX:  0,   camY:  0,  camZ: 11,  lookX:  0,  lookY:  0,   heroScale: 0.8,  particleOpacity: 0.4, duration: 1, ease: 'none' })

    // ── Animation loop ──────────────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()
    const camTarget   = new THREE.Vector3()
    const lookTarget  = new THREE.Vector3()
    const currentLook = new THREE.Vector3()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Continuous rotations
      heroGroup.rotation.y += 0.003
      outerMesh.rotation.x  = Math.sin(t * 0.2) * 0.15
      outerMesh.rotation.z  = t * 0.1
      innerMesh.rotation.x  = t * 0.15
      innerMesh.rotation.z  = -t * 0.12
      ring1.rotation.z     += 0.004
      ring2.rotation.y     += 0.005

      satellites.forEach((s, i) => {
        s.rotation.x += satelliteData[i].spd
        s.rotation.y += satelliteData[i].spd * 1.3
      })

      particles.rotation.y  = t * 0.02 + st.particleRotY
      particles.rotation.x  = t * 0.01
      particleMat.opacity   = THREE.MathUtils.lerp(particleMat.opacity, st.particleOpacity, 0.04)

      // Animated lights
      lightViolet.position.x = Math.sin(t * 0.3) * 5
      lightViolet.position.y = Math.cos(t * 0.25) * 4
      lightPink.position.x   = Math.cos(t * 0.28) * 4
      lightPink.position.z   = Math.sin(t * 0.22) * 3

      // Scroll-driven camera
      camTarget.set(st.camX, st.camY, st.camZ)
      camera.position.lerp(camTarget, 0.06)

      // Hero scale
      const ts = st.heroScale
      heroGroup.scale.lerp(new THREE.Vector3(ts, ts, ts), 0.05)

      // Look-at
      lookTarget.set(st.lookX, st.lookY, 0)
      currentLook.lerp(lookTarget, 0.05)
      camera.lookAt(currentLook)

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach(t => t.kill())
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
