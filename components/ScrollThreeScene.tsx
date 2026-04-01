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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Scene + Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300)
    camera.position.set(0, 0, 12)

    // ── Build a particle layer ─────────────────────────────────────────────
    // tunnelMix: fraction of particles distributed in a Z-axis tunnel (0 = pure sphere)
    const buildLayer = (
      count: number,
      size: number,
      opacity: number,
      palette: number[],
      tunnelMix: number
    ): { pts: THREE.Points; mat: THREE.PointsMaterial } => {
      const pos = new Float32Array(count * 3)
      const col = new Float32Array(count * 3)
      const paletteColors = palette.map((hex) => new THREE.Color(hex))

      for (let i = 0; i < count; i++) {
        let x: number, y: number, z: number

        if (i / count < tunnelMix) {
          // Cylindrical tunnel along Z — creates the "flying through" sensation
          const angle = Math.random() * Math.PI * 2
          const radius = 1.5 + Math.random() * 7
          x = Math.cos(angle) * radius
          y = Math.sin(angle) * radius
          z = (Math.random() - 0.5) * 44
        } else {
          // Spherical nebula cloud
          const r = 5 + Math.random() * 20
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          x = r * Math.sin(phi) * Math.cos(theta)
          y = r * Math.sin(phi) * Math.sin(theta)
          z = r * Math.cos(phi)
        }

        pos[i * 3] = x
        pos[i * 3 + 1] = y
        pos[i * 3 + 2] = z

        const c = paletteColors[Math.floor(Math.random() * paletteColors.length)]
        col[i * 3] = c.r
        col[i * 3 + 1] = c.g
        col[i * 3 + 2] = c.b
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

      const mat = new THREE.PointsMaterial({
        size,
        vertexColors: true,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      return { pts, mat }
    }

    // ── Layer 1: Stars — tiny white/blue background stars ─────────────────
    const { pts: stars } = buildLayer(
      1600,
      0.04,
      0.9,
      [0xe2e8f0, 0x93c5fd, 0xc4b5fd, 0xfbcfe8],
      0
    )

    // ── Layer 2: Nebula — medium colored particles with tunnel distribution ─
    const { pts: nebula, mat: nebulaMat } = buildLayer(
      750,
      0.10,
      0.75,
      [0x7c3aed, 0xa855f7, 0xec4899, 0x3b82f6, 0x06b6d4, 0xf0abfc],
      0.45
    )

    // ── Layer 3: Dust glow — large translucent colored clouds ─────────────
    const { pts: dust, mat: dustMat } = buildLayer(
      230,
      0.55,
      0.17,
      [0x7c3aed, 0xec4899, 0x3b82f6],
      0.2
    )

    // ── Scroll-driven camera state ─────────────────────────────────────────
    // Camera travels FORWARD into the nebula (z decreases) then PULLS BACK
    // to reveal the full particle universe at the contact section.
    const s = { x: 0, y: 0, z: 12, lx: 0, ly: 0, ry: 0, op: 0.75 }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      })
      // Hero → About: first dive into the nebula
      .to(s, { z: 7,  x:  0.8, y: -0.5, lx:  0.20, ly: -0.10, ry: 0.4, duration: 1, ease: 'none' })
      // About → Skills: deeper, tilting
      .to(s, { z: 3,  x: -0.6, y:  0.8, lx: -0.15, ly:  0.20, ry: 0.9, duration: 1, ease: 'none' })
      // Skills → Projects: deepest point — camera is inside the nebula
      .to(s, { z: 1,  x:  0.9, y: -0.3, lx:  0.25, ly: -0.15, ry: 1.5, duration: 1, ease: 'none' })
      // Projects → Blog: easing back out
      .to(s, { z: 5,  x:  0,   y:  0.5, lx:  0,    ly:  0.10, ry: 2.2, duration: 1, ease: 'none' })
      // Blog → Contact: dramatic pullback — the full particle universe is revealed
      .to(s, { z: 22, x:  0,   y:  0,   lx:  0,    ly:  0,    ry: 2.9, op: 0.52, duration: 1, ease: 'none' })

    // ── Render loop ────────────────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()
    const camPos  = new THREE.Vector3()
    const lookTgt = new THREE.Vector3()
    const curLook = new THREE.Vector3()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Each layer rotates at a different speed for organic depth
      stars.rotation.y  = t * 0.006 + s.ry * 0.35
      stars.rotation.x  = t * 0.004
      nebula.rotation.y = t * 0.014 + s.ry
      nebula.rotation.x = t * 0.007
      dust.rotation.y   = t * 0.009 + s.ry * 0.65
      dust.rotation.x   = -t * 0.005

      // Smooth camera movement
      camPos.set(s.x, s.y, s.z)
      camera.position.lerp(camPos, 0.05)

      // Smooth look-at (always gazing toward origin)
      lookTgt.set(s.lx, s.ly, 0)
      curLook.lerp(lookTgt, 0.05)
      camera.lookAt(curLook)

      // Opacity fade on contact pullback
      nebulaMat.opacity = THREE.MathUtils.lerp(nebulaMat.opacity, s.op, 0.03)
      dustMat.opacity   = THREE.MathUtils.lerp(dustMat.opacity, s.op * 0.23, 0.03)

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize handler ─────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((st) => st.kill())
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
