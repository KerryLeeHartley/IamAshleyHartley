/*
 * ═══════════════════════════════════════════════════════════════
 * 3D BACKGROUND SCENE - SAMIYA WEB APP
 * ═══════════════════════════════════════════════════════════════
 * 
 * This component creates a 3D scene as a background element.
 * Now featuring your beautiful hearts model! 💕
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import Hearts from './Hearts'

// ═══════════════════════════════════════════════════════════════
// SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════
// This contains all the 3D elements: model, lights, camera

function Scene() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          LIGHTING - Optimized for hearts 💕
          ─────────────────────────────────────────────────────────
      */}
      
      {/* Soft pink ambient light */}
      <ambientLight intensity={0.6} color="#FFE4E9" />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#FFF0F5"
        castShadow
      />
      
      {/* Pink fill light */}
      <pointLight
        position={[-5, 0, -5]}
        intensity={0.5}
        color="#EC4899"
      />
      
      {/* Purple accent light */}
      <pointLight
        position={[0, -5, 0]}
        intensity={0.3}
        color="#A855F7"
      />
      
      {/* ─────────────────────────────────────────────────────────
          ENVIRONMENT - Sunset gives warm pink/purple vibes
          ─────────────────────────────────────────────────────────
      */}
      <Environment preset="sunset" />
      
      {/* ─────────────────────────────────────────────────────────
          YOUR HEARTS MODEL! 💕
          ─────────────────────────────────────────────────────────
      */}
      <Suspense fallback={null}>
        <Hearts 
          position={[0, 0, 0]}   // Center
          scale={1}              // Adjust if too big/small
          rotation={[0, 0, 0]}   // No extra rotation
        />
      </Suspense>
      
      {/* ─────────────────────────────────────────────────────────
          CONTROLS - Gentle rotation
          ─────────────────────────────────────────────────────────
      */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}  // Gentle for hearts
      />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT - 3D BACKGROUND
// ═══════════════════════════════════════════════════════════════

export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
        style={{
          background: 'transparent',
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={50}
        />
        
        <Scene />
      </Canvas>
    </div>
  )
}

/*
 * ═══════════════════════════════════════════════════════════════
 * CUSTOMIZATION TIPS:
 * ═══════════════════════════════════════════════════════════════
 * 
 * HEARTS TOO BIG/SMALL:
 * <Hearts scale={0.5} />  // Smaller
 * <Hearts scale={2} />    // Bigger
 * 
 * MOVE HEARTS:
 * <Hearts position={[0, -2, 0]} />  // Down
 * <Hearts position={[2, 0, 0]} />   // Right
 * 
 * ROTATION SPEED:
 * <OrbitControls autoRotateSpeed={0.1} />  // Slower
 * <OrbitControls autoRotateSpeed={1} />    // Faster
 * 
 * NO ROTATION:
 * <OrbitControls autoRotate={false} />
 * 
 * CAMERA FURTHER BACK:
 * <PerspectiveCamera position={[0, 0, 10]} />
 * 
 * ═══════════════════════════════════════════════════════════════
 */
