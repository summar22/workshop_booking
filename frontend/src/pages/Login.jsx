import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import { toast } from 'react-toastify';

// Import your images from assets
import imgPrimary from '../assets/workshop-1.png';
import imgHover from '../assets/workshop-2.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!username.trim() || !password) {
      setErrors({ form: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(username, password);
      loginSuccess(data);
      toast.success(`Welcome back!`);
      navigate('/statistics');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setErrors({ form: msg });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>

        {/* LEFT SIDE: LOGIN FORM */}
        <div style={styles.cardBase}>
          <div style={styles.loginContent}>
            <div style={styles.formHeader}>
              <div style={styles.logoBadge}>F</div>
              <h2 style={styles.title}>Welcome Back</h2>
              <p style={styles.subtitle}>Sign in to FOSSEE Workshops Portal</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  style={styles.input}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <div style={styles.footerLinks}>
              <Link to="/register" style={styles.link}>
                New here? <span style={{ color: '#2dd4bf' }}>Sign up</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: INTERACTIVE IMAGE CARD */}
        <div
          style={{
            ...styles.cardBase,
            ...styles.imageCard,
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.imageWrapper}>
            <img src={imgHover} style={styles.img} alt="reveal" />
            <img
              src={imgPrimary}
              style={{ ...styles.img, opacity: isHovered ? 0 : 1 }}
              alt="primary"
            />
            <div style={styles.overlay} />
          </div>

          <div style={styles.cardTextContent}>
            <div style={styles.pill}>FOSSEE WORKSHOPS</div>
            <h2 style={styles.cardCta}>Accelerate your learning.</h2>
            <p style={styles.cardDescription}>
              Gain hands-on experience with workshops.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ALL STYLING DEFINED HERE - NO CSS FILE NEEDED
const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f7ff', // Subtle background
    padding: '20px'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '1000px',
    gap: '30px',
    alignItems: 'stretch', // Forces both cards to be same height
  },
  cardBase: {
    flex: 1,
    height: '580px', // Uniform Height
    backgroundColor: '#0f172a',
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease'
  },
  loginContent: {
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  logoBadge: {
    width: '50px', height: '50px', backgroundColor: '#2563eb',
    borderRadius: '12px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: 'white', fontSize: '22px',
    fontWeight: 'bold', margin: '0 auto 20px'
  },
  formHeader: { textAlign: 'center', marginBottom: '30px' },
  title: { color: 'white', fontSize: '26px', margin: '0 0 8px 0' },
  subtitle: { color: '#94a3b8', fontSize: '14px', margin: 0 },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px' },
  input: {
    width: '100%', padding: '12px', backgroundColor: '#1e293b',
    border: '1px solid #334155', borderRadius: '10px', color: 'white', outline: 'none'
  },
  button: {
    width: '100%', padding: '14px', backgroundColor: '#2563eb',
    color: 'white', border: 'none', borderRadius: '10px',
    fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
  },
  footerLinks: { marginTop: 'auto', textAlign: 'center' },
  link: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px' },

  // Image Card Specifics
  imageCard: { position: 'relative', cursor: 'pointer' },
  imageWrapper: { width: '100%', height: '100%', position: 'relative' },
  img: {
    width: '100%', height: '100%', objectFit: 'cover',
    position: 'absolute', transition: 'opacity 0.6s ease'
  },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent 60%)',
    zIndex: 1
  },
  cardTextContent: {
    position: 'absolute', bottom: '40px', left: '30px',
    right: '30px', zIndex: 2
  },
  pill: {
    backgroundColor: '#2563eb', color: 'white', padding: '5px 12px',
    borderRadius: '6px', fontSize: '11px', fontWeight: 'bold',
    display: 'inline-block', marginBottom: '15px'
  },
  cardCta: { color: 'white', fontSize: '30px', margin: '0 0 10px 0', lineHeight: '1.2' },
  cardDescription: { color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5', margin: 0 }
};