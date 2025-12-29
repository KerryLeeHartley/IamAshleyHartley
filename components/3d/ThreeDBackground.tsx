/*
 * ═══════════════════════════════════════════════════════════════
 * 3D BACKGROUND SCENE - SAMIYA WEB APP
 * ═══════════════════════════════════════════════════════════════
 * 
 * This component creates a 3D scene as a background element.
 * 
 * HOW IT WORKS:
 * - Uses React-Three-Fiber (R3F) to render 3D in React
 * - Loads your GLB model
 * - Adds lighting, camera, and controls
 * - Renders as a fixed background layer
 * 
 * WHAT YOU CAN CUSTOMIZE:
 * - Model position, scale, rotation
 * - Lighting color and intensity
 * - Camera angle and zoom
 * - Animation (rotate, float, etc.)
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'

// ═══════════════════════════════════════════════════════════════
// YOUR 3D MODEL IMPORT
// ═══════════════════════════════════════════════════════════════
// TODO: Replace 'Model' with your actual component name
// If gltfjsx created 'Hearts.tsx', change to: import Hearts from './Hearts'
import Model from './Model'

// OPTIONAL: Keep this placeholder for testing
// (Comment out or delete after your model works)

function PlaceholderModel() {
  return (
    <mesh>
      {/* This is a placeholder - replace with your actual model */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#EC4899" />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════════════
// SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════
// This contains all the 3D elements: model, lights, camera

function Scene() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          LIGHTING
          ─────────────────────────────────────────────────────────
          Three types of lights for a soft, appealing look
      */}
      
      {/* Ambient light - soft overall illumination */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light - like the sun */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      
      {/* Fill light - softens shadows */}
      <pointLight
        position={[-5, 0, -5]}
        intensity={0.3}
        color="#EC4899" // Pink tint
      />
      
      {/* ─────────────────────────────────────────────────────────
          ENVIRONMENT
          ─────────────────────────────────────────────────────────
          Pre-made HDR environment for realistic reflections
      */}
      <Environment preset="sunset" />
      
      {/* ─────────────────────────────────────────────────────────
          YOUR 3D MODEL
          ─────────────────────────────────────────────────────────
          Your model is now loaded! Adjust position/scale as needed.
      */}
      <Suspense fallback={null}>
        {/* YOUR ACTUAL MODEL - Adjust these values to position it perfectly */}
        <Model 
          position={[0, 0, 0]}   // [left/right, up/down, forward/back]
          scale={1}              // Adjust if too big/small (try 0.5, 2, 5)
          rotation={[0, 0, 0]}   // [x, y, z] rotation in radians
        />
        
        {/* 
          TROUBLESHOOTING:
          - Model too big? Try scale={0.5} or scale={0.1}
          - Model too small? Try scale={2} or scale={5}
          - Model in wrong position? Adjust position={[x, y, z]}
          - Can't see model? Try position={[0, 0, -3]} (move closer)
        */}
      </Suspense>
      
      {/* ─────────────────────────────────────────────────────────
          CONTROLS (OPTIONAL)
          ─────────────────────────────────────────────────────────
          Allows users to orbit/zoom the camera
          Remove this line if you want a static view
      */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
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
      {/* 
        Canvas is the container for the 3D scene
        It's like a <canvas> HTML element but React-friendly
      */}
      <Canvas
        shadows
        dpr={[1, 2]} // Device pixel ratio (retina support)
        gl={{ 
          antialias: true, // Smooth edges
          alpha: true, // Transparent background
        }}
        style={{
          background: 'transparent', // Let page background show through
        }}
      >
        {/* Camera setup */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]} // [x, y, z] - how far back camera is
          fov={50} // Field of view (like zoom level)
        />
        
        {/* The actual 3D scene */}
        <Scene />
      </Canvas>
    </div>
  )
}

/*
 * ═══════════════════════════════════════════════════════════════
 * HOW TO USE THIS COMPONENT:
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. In your page.tsx, import this component:
 *    import ThreeDBackground from '@/components/3d/ThreeDBackground'
 * 
 * 2. Add it at the top of your page (before other content):
 *    <ThreeDBackground />
 * 
 * 3. Your page content will appear ON TOP of the 3D background
 *    because this uses fixed positioning with -z-10
 * 
 * ═══════════════════════════════════════════════════════════════
 * 
 * CUSTOMIZATION OPTIONS:
 * ═══════════════════════════════════════════════════════════════
 * 
 * MODEL POSITION:
 * <Model position={[x, y, z]} />
 * - x: left (-) / right (+)
 * - y: down (-) / up (+)
 * - z: far (-) / close (+)
 * 
 * MODEL SCALE:
 * <Model scale={2} />        // 2x bigger
 * <Model scale={[2, 1, 1]} /> // Stretch on X axis only
 * 
 * MODEL ROTATION:
 * <Model rotation={[0, Math.PI, 0]} /> // Rotate 180° on Y axis
 * 
 * CAMERA POSITION:
 * <PerspectiveCamera position={[0, 0, 10]} /> // Further back
 * <PerspectiveCamera position={[5, 2, 5]} />   // Angled view
 * 
 * AUTO-ROTATE SPEED:
 * <OrbitControls autoRotateSpeed={2} /> // Faster
 * <OrbitControls autoRotateSpeed={0.2} /> // Slower
 * 
 * DISABLE AUTO-ROTATE:
 * <OrbitControls autoRotate={false} />
 * 
 * LIGHTING COLOR:
 * <ambientLight intensity={0.5} color="#A855F7" /> // Purple tint
 * 
 * ═══════════════════════════════════════════════════════════════
 * 
 * PERFORMANCE TIPS:
 * ═══════════════════════════════════════════════════════════════
 * 
 * If the 3D scene is slow on mobile:
 * 
 * 1. Reduce device pixel ratio:
 *    dpr={[1, 1.5]} instead of dpr={[1, 2]}
 * 
 * 2. Disable shadows:
 *    <Canvas shadows={false}>
 * 
 * 3. Simplify environment:
 *    Remove <Environment preset="sunset" />
 *    Or use: <Environment preset="warehouse" />
 * 
 * 4. Reduce model detail (in Blender):
 *    - Use fewer polygons
 *    - Smaller textures
 *    - Enable Draco compression
 * 
 * ═══════════════════════════════════════════════════════════════
 */
