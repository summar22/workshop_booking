import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkshopStatistics from './pages/WorkshopStatistics';
import { HelmetProvider } from 'react-helmet-async';


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }}>
        <div style={{
          width: 48, height: 48,
          border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--accent-teal)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Loading FOSSEE Workshops...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <HelmetProvider>

      <Layout>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/statistics" replace /> : <Login />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/statistics" replace /> : <Register />
          } />
          <Route path="/statistics" element={<WorkshopStatistics />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Catch-all: redirect to statistics */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}

export default App;
