import { useState, useEffect } from 'react';
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
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateError, setAnimateError] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeField, setActiveField] = useState('');

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // 3D card tilt effect
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setCardTilt({ x: rotateX, y: rotateY });
    setMousePosition({ x, y });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Real-time validation
  const validateField = (field, value) => {
    const newErrors = { ...validationErrors };
    
    if (field === 'username') {
      if (value.trim() && value.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else {
        delete newErrors.username;
      }
    }
    
    if (field === 'password') {
      if (value && value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }
    
    setValidationErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    validateField(field, value);
    setActiveField(value ? field : '');
  };

  const handleFieldFocus = (field) => {
    setFocusedField(field);
    setActiveField(field);
  };

  const handleFieldBlur = (field) => {
    setFocusedField(null);
    if (!username && !password) setActiveField('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setShowSuccess(false);
    
    // Validate all fields
    const validationErrors = {};
    if (!username.trim()) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAnimateError(true);
      setTimeout(() => setAnimateError(false), 500);
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(username, password);
      loginSuccess(data);
      setShowSuccess(true);
      toast.success(`Welcome back!`);
      setTimeout(() => navigate('/statistics'), 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setErrors({ form: msg });
      setAnimateError(true);
      setTimeout(() => setAnimateError(false), 500);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>

        {/* LEFT SIDE: LOGIN FORM */}
        <div 
          style={{
            ...styles.cardBase,
            transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) scale(${isLoaded ? 1 : 0.9})`,
            opacity: isLoaded ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div style={styles.loginContent}>
            <div style={{
              ...styles.formHeader,
              transform: `translateY(${isLoaded ? '0px' : '30px'})`,
              opacity: isLoaded ? 1 : 0,
              transition: 'all 0.8s ease 0.2s'
            }}>
              <div style={{
                ...styles.logoBadge,
                transform: `scale(${isLoaded ? 1 : 0.8}) rotate(${isLoaded ? '0deg' : '180deg'})`,
                transition: 'all 0.6s ease 0.3s',
                boxShadow: isLoaded ? '0 0 30px rgba(37, 99, 235, 0.5)' : 'none'
              }}>F</div>
              <h2 style={{
                ...styles.title,
                transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                opacity: isLoaded ? 1 : 0,
                transition: 'all 0.6s ease 0.4s',
                textShadow: isLoaded ? '0 0 20px rgba(37, 99, 235, 0.3)' : 'none'
              }}>Welcome Back</h2>
              <p style={{
                ...styles.subtitle,
                transform: `translateY(${isLoaded ? '0px' : '15px'})`,
                opacity: isLoaded ? 1 : 0,
                transition: 'all 0.6s ease 0.5s'
              }}>Sign in to FOSSEE Workshops Portal</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={{
                ...styles.inputGroup,
                transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                opacity: isLoaded ? 1 : 0,
                transition: 'all 0.6s ease 0.6s',
                ...(animateError && errors.username ? styles.shakeAnimation : {})
              }}>
                <div style={styles.floatingLabelGroup}>
                  <input
                    type="text"
                    style={{
                      ...styles.input,
                      ...(focusedField === 'username' ? styles.inputFocused : {}),
                      ...(validationErrors.username ? styles.inputError : {}),
                      ...(username && !validationErrors.username ? styles.inputSuccess : {}),
                      ...(activeField === 'username' || username ? styles.inputHasValue : {})
                    }}
                    placeholder=" "
                    value={username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    onFocus={() => handleFieldFocus('username')}
                    onBlur={() => handleFieldBlur('username')}
                  />
                  <label style={{
                    ...styles.floatingLabel,
                    ...(activeField === 'username' || username ? styles.labelFloat : {})
                  }}>Username</label>
                  {username && !validationErrors.username && (
                    <span style={styles.validationIcon}>✓</span>
                  )}
                  {validationErrors.username && (
                    <span style={styles.validationIconError}>✗</span>
                  )}
                </div>
                {validationErrors.username && (
                  <div style={styles.fieldError}>{validationErrors.username}</div>
                )}
              </div>

              <div style={{
                ...styles.inputGroup,
                transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                opacity: isLoaded ? 1 : 0,
                transition: 'all 0.6s ease 0.7s',
                ...(animateError && errors.password ? styles.shakeAnimation : {})
              }}>
                <div style={styles.floatingLabelGroup}>
                  <input
                    type="password"
                    style={{
                      ...styles.input,
                      ...(focusedField === 'password' ? styles.inputFocused : {}),
                      ...(validationErrors.password ? styles.inputError : {}),
                      ...(password && !validationErrors.password ? styles.inputSuccess : {}),
                      ...(activeField === 'password' || password ? styles.inputHasValue : {})
                    }}
                    placeholder=" "
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => handleFieldFocus('password')}
                    onBlur={() => handleFieldBlur('password')}
                  />
                  <label style={{
                    ...styles.floatingLabel,
                    ...(activeField === 'password' || password ? styles.labelFloat : {})
                  }}>Password</label>
                  {password && !validationErrors.password && (
                    <span style={styles.validationIcon}>✓</span>
                  )}
                  {validationErrors.password && (
                    <span style={styles.validationIconError}>✗</span>
                  )}
                </div>
                {validationErrors.password && (
                  <div style={styles.fieldError}>{validationErrors.password}</div>
                )}
              </div>

              {errors.form && (
                <div style={{
                  ...styles.errorMessage,
                  ...(animateError ? styles.shakeAnimation : {})
                }}>
                  {errors.form}
                </div>
              )}

              {showSuccess && (
                <div style={styles.successMessage}>
                  <span style={styles.successIcon}>✓</span> Login successful! Redirecting...
                </div>
              )}

              <button 
                type="submit" 
                style={{
                  ...styles.button,
                  transform: `translateY(${isLoaded ? '0px' : '20px'}) scale(${isLoaded ? 1 : 0.95})`,
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 0.6s ease 0.8s',
                  ...(loading ? styles.buttonLoading : {}),
                  ...(showSuccess ? styles.buttonSuccess : {})
                }} 
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }
                }}
              >
                {loading ? (
                  <span style={styles.loadingSpinner}>
                    <span style={styles.spinner}></span>
                    Authenticating...
                  </span>
                ) : showSuccess ? (
                  <span style={styles.successText}>
                    <span style={styles.successIcon}>✓</span> Success!
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div style={styles.footerLinks}>
              <Link to="/register" style={styles.link}>
                New here? <span style={{ color: '#2dd4bf' }}>Sign up</span>
              </Link>
              <br />
              <Link to="/forgot-password" style={styles.link}>
                <span style={{ color: '#2dd4bf' }}>Forgot Password?</span>
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
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(20px)',
    border: '2px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    backgroundImage: `
      linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)),
      linear-gradient(45deg, #2563eb, #10b981, #2563eb, #3b82f6, #2563eb)
    `,
    backgroundSize: '100% 100%, 300% 300%',
    backgroundPosition: 'center, 0% 50%',
    animation: 'gradientShift 4s ease infinite',
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(37, 99, 235, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s ease',
    position: 'relative'
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
    width: '100%', 
    padding: '20px 40px 20px 12px', 
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #334155', 
    borderRadius: '10px', 
    color: 'white', 
    outline: 'none',
    transition: 'all 0.3s ease',
    fontSize: '16px'
  },
  inputHasValue: {
    paddingTop: '28px',
    paddingBottom: '12px'
  },
  floatingLabelGroup: {
    position: 'relative'
  },
  floatingLabel: {
    position: 'absolute',
    left: '12px',
    top: '20px',
    color: '#94a3b8',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    backgroundColor: 'transparent'
  },
  labelFloat: {
    top: '8px',
    fontSize: '12px',
    color: '#2563eb',
    fontWeight: '500'
  },
  inputFocused: {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2), 0 0 30px rgba(37, 99, 235, 0.4), inset 0 0 20px rgba(37, 99, 235, 0.1)',
    backgroundColor: 'rgba(30, 41, 59, 0.95)'
  },
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1), 0 0 20px rgba(239, 68, 68, 0.2)'
  },
  inputSuccess: {
    borderColor: '#10b981',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.2)'
  },
  inputWrapper: {
    position: 'relative'
  },
  validationIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#10b981',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  validationIconError: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#ef4444',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  fieldError: {
    color: '#f87171',
    fontSize: '12px',
    marginTop: '4px',
    animation: 'fadeIn 0.3s ease'
  },
  errorMessage: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'center'
  },
  successMessage: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    textAlign: 'center',
    animation: 'slideInUp 0.5s ease'
  },
  successIcon: {
    marginRight: '8px',
    fontSize: '16px'
  },
  shakeAnimation: {
    animation: 'shake 0.5s ease'
  },
  buttonLoading: {
    backgroundColor: '#1e40af',
    cursor: 'not-allowed'
  },
  buttonSuccess: {
    backgroundColor: '#10b981',
    animation: 'successPulse 0.6s ease'
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  successText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  button: {
    width: '100%', 
    padding: '16px', 
    backgroundColor: '#2563eb',
    color: 'white', 
    border: 'none', 
    borderRadius: '12px',
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginTop: '10px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
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

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
if (!document.head.querySelector('style[data-login-animations]')) {
  styleSheet.setAttribute('data-login-animations', 'true');
  document.head.appendChild(styleSheet);
}

// Add particle background
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  .pageWrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(2px 2px at 20% 30%, white, transparent),
      radial-gradient(2px 2px at 60% 70%, white, transparent),
      radial-gradient(1px 1px at 50% 50%, white, transparent),
      radial-gradient(1px 1px at 80% 10%, white, transparent);
    background-size: 200px 200px, 150px 150px, 100px 100px, 250px 250px;
    background-position: 0% 0%, 30% 60%, 70% 40%, 90% 90%;
    animation: float 20s infinite linear;
    opacity: 0.3;
    pointer-events: none;
  }
  
  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
  }
  
  .button::before {
    content: '';
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  .button:hover::before {
    width: 300px;
    height: 300px;
  }
  
  .button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5), 0 0 30px rgba(37, 99, 235, 0.3);
  }
`;
if (!document.head.querySelector('style[data-particle-effects]')) {
  particleStyle.setAttribute('data-particle-effects', 'true');
  document.head.appendChild(particleStyle);
}