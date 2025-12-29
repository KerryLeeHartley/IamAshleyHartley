# 🎨 3D MODEL QUICK REFERENCE

## 🔧 COMMON ADJUSTMENTS

### **Model Too Big/Small**
```tsx
<Background scale={0.5} />  // Smaller
<Background scale={2} />    // Bigger
<Background scale={[2, 1, 1]} /> // Stretch X only
```

### **Model Position**
```tsx
<Background position={[0, 0, 0]} />   // Center
<Background position={[2, 0, 0]} />   // Right
<Background position={[-2, 0, 0]} />  // Left
<Background position={[0, 2, 0]} />   // Up
<Background position={[0, -2, 0]} />  // Down
<Background position={[0, 0, 2]} />   // Forward
<Background position={[0, 0, -2]} />  // Back
```

### **Model Rotation** (in radians)
```tsx
<Background rotation={[0, 0, 0]} />          // No rotation
<Background rotation={[0, Math.PI, 0]} />    // 180° Y-axis
<Background rotation={[0, Math.PI / 2, 0]} />// 90° Y-axis
<Background rotation={[Math.PI / 4, 0, 0]} />// 45° X-axis
```

### **Lighting**
```tsx
// Brighter
<ambientLight intensity={2} />
<directionalLight intensity={3} />

// Dimmer
<ambientLight intensity={0.3} />
<directionalLight intensity={0.5} />

// Colored
<ambientLight color="#EC4899" />  // Pink
<directionalLight color="#A855F7" /> // Purple
```

### **Camera**
```tsx
// Closer
<PerspectiveCamera position={[0, 0, 3]} />

// Further
<PerspectiveCamera position={[0, 0, 10]} />

// Angled view
<PerspectiveCamera position={[5, 5, 5]} />

// Zoom
<PerspectiveCamera fov={30} />  // Zoomed in
<PerspectiveCamera fov={75} />  // Zoomed out
```

### **Auto-Rotate**
```tsx
// Faster
<OrbitControls autoRotateSpeed={2} />

// Slower
<OrbitControls autoRotateSpeed={0.2} />

// Disable
<OrbitControls autoRotate={false} />

// Remove controls entirely
{/* <OrbitControls ... /> */}
```

---

## 🎯 RADIANS CHEAT SHEET

```
0°   = 0
45°  = Math.PI / 4
90°  = Math.PI / 2
180° = Math.PI
270° = Math.PI * 1.5
360° = Math.PI * 2
```

---

## 🚀 PERFORMANCE TIPS

### **If slow on mobile:**
```tsx
// 1. Lower pixel ratio
<Canvas dpr={[1, 1.5]} />

// 2. Disable shadows
<Canvas shadows={false} />

// 3. Remove environment
// <Environment preset="sunset" />

// 4. Reduce lights
<ambientLight intensity={0.5} />
// Remove extra lights
```

---

## 🎨 PINK/PURPLE THEME COLORS

```tsx
// Brand colors
color="#EC4899"  // Pink
color="#A855F7"  // Purple
color="#FFF5F7"  // Light pink

// Gradients (use in materials)
const gradient = new THREE.LinearGradient()
gradient.addColorStop(0, '#EC4899')
gradient.addColorStop(1, '#A855F7')
```

---

## 📏 COMMON SCALES

```
Tiny:   0.1 - 0.3
Small:  0.5 - 0.8
Normal: 1.0
Large:  2.0 - 3.0
Huge:   5.0+
```

---

## 🔍 DEBUG HELPERS

### **Show axis helper (see X,Y,Z)**
```tsx
<axesHelper args={[5]} />
```

### **Show grid**
```tsx
<gridHelper args={[10, 10]} />
```

### **Log model data**
```tsx
const { scene } = useGLTF('/models/model.glb')
console.log('Model data:', scene)
```

---

## 💡 ANIMATION EXAMPLES

### **Bounce**
```tsx
useFrame((state) => {
  modelRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime)) * 2
})
```

### **Spin**
```tsx
useFrame(() => {
  modelRef.current.rotation.y += 0.01
})
```

### **Float**
```tsx
useFrame((state) => {
  modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
})
```

### **Pulse**
```tsx
useFrame((state) => {
  const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
  modelRef.current.scale.setScalar(scale)
})
```

---

## ⚠️ COMMON MISTAKES

### ❌ **Wrong:**
```tsx
position=[0, 0, 0]  // Missing curly braces
```
### ✅ **Correct:**
```tsx
position={[0, 0, 0]}
```

---

### ❌ **Wrong:**
```tsx
<Canvas>
  <Background />  // Outside Suspense
</Canvas>
```
### ✅ **Correct:**
```tsx
<Canvas>
  <Suspense fallback={null}>
    <Background />
  </Suspense>
</Canvas>
```

---

### ❌ **Wrong:**
```tsx
useGLTF('./models/model.glb')  // Relative path
```
### ✅ **Correct:**
```tsx
useGLTF('/models/model.glb')  // Absolute path from public
```

---

## 📱 MOBILE OPTIMIZATION

```tsx
<Canvas
  dpr={[1, 1.5]}      // Lower pixel ratio
  shadows={false}      // Disable shadows
  gl={{
    antialias: false,  // Disable antialiasing
    powerPreference: "high-performance"
  }}
>
```

---

## 🎯 QUICK TEST

**Copy-paste this to test if 3D is working:**

```tsx
<mesh position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="#EC4899" />
</mesh>
```

If you see a pink box, 3D is working! 🎉
