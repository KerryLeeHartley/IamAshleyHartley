/*
 * ═══════════════════════════════════════════════════════════════
 * EXAMPLE MODEL COMPONENT
 * ═══════════════════════════════════════════════════════════════
 * 
 * This is what your file will look like AFTER running gltfjsx.
 * The actual file will be generated automatically.
 * 
 * YOUR ACTUAL MODEL WILL REPLACE THIS FILE!
 * 
 * ═══════════════════════════════════════════════════════════════
 */

'use client'

import { useGLTF } from '@react-three/drei'

export default function Model(props: any) {
  // This loads your GLB file
  const { scene } = useGLTF('/models/model.glb')
  
  return (
    <primitive 
      object={scene} 
      {...props}
      // Default props you can override:
      // position={[0, 0, 0]}
      // scale={1}
      // rotation={[0, 0, 0]}
    />
  )
}

// Preload the model for better performance
useGLTF.preload('/models/model.glb')

/*
 * ═══════════════════════════════════════════════════════════════
 * NOTE: THIS IS JUST AN EXAMPLE!
 * ═══════════════════════════════════════════════════════════════
 * 
 * When you run:
 * npx gltfjsx model.glb --transform
 * 
 * It will create a MUCH MORE DETAILED file that includes:
 * - All meshes from your model
 * - All materials and textures
 * - Proper TypeScript types
 * - Optimized loading
 * 
 * The generated file will be BETTER than this example.
 * 
 * ═══════════════════════════════════════════════════════════════
 */
