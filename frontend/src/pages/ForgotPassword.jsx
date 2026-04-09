import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import the same images as Login page
import imgPrimary from '../assets/workshop-1.png';
import imgHover from '../assets/workshop-2.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('summarponwal22@gmail.com');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      // TODO: Add API call to send password reset email
      toast.success('Password reset link has been sent to your email');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to send reset link';
      setErrors({ form: msg });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Forgot Password Form - Dark Theme Card */}
        <div style={styles.cardBase}>
          <div style={styles.forgotPasswordContent}>
            <div style={styles.formHeader}>
              <div style={styles.logoBadge}>F</div>
              <h2 style={styles.title}>Forgot Password?</h2>
              <p style={styles.subtitle}>Enter your registered email address to reset your password</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {errors.form && (
                <div style={styles.errorMessage}>{errors.form}</div>
              )}
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div style={styles.fieldError}>{errors.email}</div>
                )}
              </div>

              <div style={styles.buttonGroup}>
                <button 
                  type="submit" 
                  style={styles.requestButton} 
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Request"}
                </button>
                
                <button 
                  type="button" 
                  style={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>

            <div style={styles.footerLinks}>
              <Link to="/login" style={styles.link}>
                <span style={{ color: '#2dd4bf' }}>Back to Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: INTERACTIVE IMAGE CARD - Same as Login */}
        <div
          style={{
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
            <h2 style={styles.cardCta}>Reset your password.</h2>
            <p style={styles.cardDescription}>
              Get back to accessing your workshop learning materials.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f7ff', 
    padding: '20px'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '1000px',
    gap: '30px',
    alignItems: 'stretch', 
  },
  cardBase: {
    flex: 1,
    height: '580px', 
    backgroundColor: '#0f172a',
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease'
  },
  forgotPasswordContent: {
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  logoBadge: {
    width: '50px', 
    height: '50px', 
    backgroundColor: '#2563eb',
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center', 
    color: 'white', 
    fontSize: '22px',
    fontWeight: 'bold', 
    margin: '0 auto 20px'
  },
  formHeader: { 
    textAlign: 'center', 
    marginBottom: '30px' 
  },
  title: { 
    color: 'white', 
    fontSize: '26px', 
    margin: '0 0 8px 0' 
  },
  subtitle: { 
    color: '#94a3b8', 
    fontSize: '14px', 
    margin: 0 
  },
  inputGroup: { 
    marginBottom: '20px' 
  },
  label: { 
    display: 'block', 
    color: '#cbd5e1', 
    fontSize: '13px', 
    marginBottom: '8px' 
  },
  input: {
    width: '100%', 
    padding: '12px', 
    backgroundColor: '#1e293b',
    border: '1px solid #334155', 
    borderRadius: '10px', 
    color: 'white', 
    outline: 'none'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px'
  },
  requestButton: {
    flex: 1,
    padding: '14px', 
    backgroundColor: '#10b981',
    color: 'white', 
    border: 'none', 
    borderRadius: '10px',
    fontWeight: 'bold', 
    cursor: 'pointer'
  },
  cancelButton: {
    flex: 1,
    padding: '14px', 
    backgroundColor: '#2563eb',
    color: 'white', 
    border: 'none', 
    borderRadius: '10px',
    fontWeight: 'bold', 
    cursor: 'pointer'
  },
  footerLinks: { 
    marginTop: 'auto', 
    textAlign: 'center' 
  },
  link: { 
    color: '#94a3b8', 
    textDecoration: 'none', 
    fontSize: '14px' 
  },
  errorMessage: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  fieldError: {
    color: '#f87171',
    fontSize: '12px',
    marginTop: '4px'
  },

  // Image Card Specifics - Same as Login
  imageCard: { 
    flex: 1,
    height: '580px',
    backgroundColor: '#0f172a',
    borderRadius: '28px',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s ease'
  },
  imageWrapper: { 
    width: '100%', 
    height: '100%', 
    position: 'relative' 
  },
  img: {
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    position: 'absolute'
  },
  overlay: {
    position: 'absolute', 
    inset: 0,
    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent 60%)',
    zIndex: 1
  },
  cardTextContent: {
    position: 'absolute', 
    bottom: '40px', 
    left: '30px',
    right: '30px', 
    zIndex: 2
  },
  pill: {
    backgroundColor: '#2563eb', 
    color: 'white', 
    padding: '5px 12px',
    borderRadius: '6px', 
    fontSize: '11px', 
    fontWeight: 'bold',
    display: 'inline-block', 
    marginBottom: '15px'
  },
  cardCta: { 
    color: 'white', 
    fontSize: '30px', 
    margin: '0 0 10px 0', 
    lineHeight: '1.2' 
  },
  cardDescription: { 
    color: '#cbd5e1', 
    fontSize: '15px', 
    lineHeight: '1.5', 
    margin: 0 
  }
};
