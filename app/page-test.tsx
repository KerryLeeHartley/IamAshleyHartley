/*
 * SIMPLE TEST PAGE
 * If you see this, Next.js is working!
 */

export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom right, #FFF5F7, white)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        ✅ Next.js is Working!
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>
        Samiya Web App - Test Mode
      </p>
      <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <p style={{ marginBottom: '1rem' }}>If you see this, your setup is working!</p>
        <p style={{ fontSize: '0.9rem', color: '#999' }}>Next step: Fix the component imports</p>
      </div>
    </div>
  )
}
