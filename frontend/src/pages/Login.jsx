import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!username.trim()) {
      setErrors(prev => ({ ...prev, username: 'Username is required' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(username, password);
      loginSuccess(data);
      toast.success(`Welcome back, ${data.user.first_name || data.user.username}!`);
      navigate('/statistics');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      setErrors({ form: msg });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Removed decorative neon orbs */}
      <div className="login-card glass-card">
        <div className="card-header">
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-lg)',
            background: 'var(--accent-teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 800, color: '#ffffff',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-2)'
          }}>F</div>
          <h2>Welcome Back</h2>
          <p>Sign in to FOSSEE Workshops Portal</p>
        </div>

        <div className="card-body">
          {errors.form && (
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(244,63,94,0.1)',
              border: '1px solid rgba(244,63,94,0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-rose)',
              fontSize: 'var(--font-size-sm)',
              marginBottom: 'var(--space-5)',
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)'
            }}>
              <span className="material-icons-round" style={{ fontSize: 18 }}>error_outline</span>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} id="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
              {errors.username && <p className="form-error">{errors.username}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              id="login-submit"
              style={{ width: '100%', marginTop: 'var(--space-2)' }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                    display: 'inline-block'
                  }} />
                  Signing in...
                </>
              ) : (
                <>
                  <span className="material-icons-round" style={{ fontSize: 20 }}>login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-divider" />

          <div className="login-links">
            <Link to="/register">
              <span style={{ color: 'var(--text-muted)' }}>New around here? </span>
              <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>Sign up</span>
            </Link>
            <Link to="/reset-password">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
