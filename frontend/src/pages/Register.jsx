import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: '',
        title: 'Prof.', firstName: '', lastName: '', phoneNumber: '',
        institute: '', department: 'Computer Science', location: '',
        state: '', hearAboutUs: 'FOSSEE website'
    });
    const [focusedField, setFocusedField] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeField, setActiveField] = useState('');

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
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        setCardTilt({ x: rotateX, y: rotateY });
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
        
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                newErrors.email = 'Please enter a valid email';
            } else {
                delete newErrors.email;
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
        setActiveField(value ? name : '');
    };

    const handleFieldFocus = (field) => {
        setFocusedField(field);
        setActiveField(field);
    };

    const handleFieldBlur = (field) => {
        setFocusedField(null);
        if (!formData.username && !formData.email && !formData.password) setActiveField('');
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <div 
                    style={{
                        ...styles.card,
                        transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) scale(${isLoaded ? 1 : 0.9})`,
                        opacity: isLoaded ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                >
                    <div style={{
                        ...styles.header,
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
                        }}>Coordinator Registration</h2>
                        <p style={{
                            ...styles.subtitle,
                            transform: `translateY(${isLoaded ? '0px' : '15px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 0.5s'
                        }}>Join the FOSSEE Workshops Portal</p>
                    </div>

                    <form style={styles.form}>
                        <div style={{
                            ...styles.fieldGroup,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 0.6s'
                        }}>
                            <div style={styles.floatingLabelGroup}>
                                <input
                                    type="text"
                                    name="username"
                                    style={{
                                        ...styles.input,
                                        ...(focusedField === 'username' ? styles.inputFocused : {}),
                                        ...(validationErrors.username ? styles.inputError : {}),
                                        ...(formData.username && !validationErrors.username ? styles.inputSuccess : {}),
                                        ...(activeField === 'username' || formData.username ? styles.inputHasValue : {})
                                    }}
                                    placeholder=" "
                                    value={formData.username}
                                    onChange={handleChange}
                                    onFocus={() => handleFieldFocus('username')}
                                    onBlur={() => handleFieldBlur('username')}
                                />
                                <label style={{
                                    ...styles.floatingLabel,
                                    ...(activeField === 'username' || formData.username ? styles.labelFloat : {})
                                }}>Username</label>
                                {formData.username && !validationErrors.username && (
                                    <span style={styles.validationIcon}>â</span>
                                )}
                                {validationErrors.username && (
                                    <span style={styles.validationIconError}>â</span>
                                )}
                            </div>
                            <small style={styles.helpText}>Letters, digits, period and underscore only.</small>
                            {validationErrors.username && (
                                <div style={styles.fieldError}>{validationErrors.username}</div>
                            )}
                        </div>

                        <div style={{
                            ...styles.fieldGroup,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 0.7s'
                        }}>
                            <div style={styles.floatingLabelGroup}>
                                <input
                                    type="email"
                                    name="email"
                                    style={{
                                        ...styles.input,
                                        ...(focusedField === 'email' ? styles.inputFocused : {}),
                                        ...(validationErrors.email ? styles.inputError : {}),
                                        ...(formData.email && !validationErrors.email ? styles.inputSuccess : {}),
                                        ...(activeField === 'email' || formData.email ? styles.inputHasValue : {})
                                    }}
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFieldFocus('email')}
                                    onBlur={() => handleFieldBlur('email')}
                                />
                                <label style={{
                                    ...styles.floatingLabel,
                                    ...(activeField === 'email' || formData.email ? styles.labelFloat : {})
                                }}>Email Address</label>
                                {formData.email && !validationErrors.email && (
                                    <span style={styles.validationIcon}>â</span>
                                )}
                                {validationErrors.email && (
                                    <span style={styles.validationIconError}>â</span>
                                )}
                            </div>
                            {validationErrors.email && (
                                <div style={styles.fieldError}>{validationErrors.email}</div>
                            )}
                        </div>

                        <div style={{
                            ...styles.row,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 0.8s'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={styles.floatingLabelGroup}>
                                    <input
                                        type="password"
                                        name="password"
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'password' ? styles.inputFocused : {}),
                                            ...(validationErrors.password ? styles.inputError : {}),
                                            ...(formData.password && !validationErrors.password ? styles.inputSuccess : {}),
                                            ...(activeField === 'password' || formData.password ? styles.inputHasValue : {})
                                        }}
                                        placeholder=" "
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => handleFieldFocus('password')}
                                        onBlur={() => handleFieldBlur('password')}
                                    />
                                    <label style={{
                                        ...styles.floatingLabel,
                                        ...(activeField === 'password' || formData.password ? styles.labelFloat : {})
                                    }}>Password</label>
                                    {formData.password && !validationErrors.password && (
                                        <span style={styles.validationIcon}>â</span>
                                    )}
                                    {validationErrors.password && (
                                        <span style={styles.validationIconError}>â</span>
                                    )}
                                </div>
                                {validationErrors.password && (
                                    <div style={styles.fieldError}>{validationErrors.password}</div>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={styles.floatingLabelGroup}>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'confirmPassword' ? styles.inputFocused : {}),
                                            ...(activeField === 'confirmPassword' || formData.confirmPassword ? styles.inputHasValue : {})
                                        }}
                                        placeholder=" "
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onFocus={() => handleFieldFocus('confirmPassword')}
                                        onBlur={() => handleFieldBlur('confirmPassword')}
                                    />
                                    <label style={{
                                        ...styles.floatingLabel,
                                        ...(activeField === 'confirmPassword' || formData.confirmPassword ? styles.labelFloat : {})
                                    }}>Confirm Password</label>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            ...styles.row,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 0.9s'
                        }}>
                            <div style={{ flex: 0.3 }}>
                                <div style={styles.floatingLabelGroup}>
                                    <select
                                        name="title"
                                        style={{
                                            ...styles.input,
                                            ...(activeField === 'title' || formData.title ? styles.inputHasValue : {})
                                        }}
                                        value={formData.title}
                                        onChange={handleChange}
                                        onFocus={() => handleFieldFocus('title')}
                                        onBlur={() => handleFieldBlur('title')}
                                    >
                                        <option value="">Select</option>
                                        <option>Prof.</option><option>Dr.</option><option>Mr.</option><option>Ms.</option>
                                    </select>
                                    <label style={{
                                        ...styles.floatingLabel,
                                        ...(activeField === 'title' || formData.title ? styles.labelFloat : {})
                                    }}>Title</label>
                                </div>
                            </div>
                            <div style={{ flex: 0.7 }}>
                                <div style={styles.floatingLabelGroup}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'firstName' ? styles.inputFocused : {}),
                                            ...(activeField === 'firstName' || formData.firstName ? styles.inputHasValue : {})
                                        }}
                                        placeholder=" "
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onFocus={() => handleFieldFocus('firstName')}
                                        onBlur={() => handleFieldBlur('firstName')}
                                    />
                                    <label style={{
                                        ...styles.floatingLabel,
                                        ...(activeField === 'firstName' || formData.firstName ? styles.labelFloat : {})
                                    }}>First Name</label>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            ...styles.fieldGroup,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 1.0s'
                        }}>
                            <div style={styles.floatingLabelGroup}>
                                <input
                                    type="text"
                                    name="institute"
                                    style={{
                                        ...styles.input,
                                        ...(focusedField === 'institute' ? styles.inputFocused : {}),
                                        ...(activeField === 'institute' || formData.institute ? styles.inputHasValue : {})
                                    }}
                                    placeholder=" "
                                    value={formData.institute}
                                    onChange={handleChange}
                                    onFocus={() => handleFieldFocus('institute')}
                                    onBlur={() => handleFieldBlur('institute')}
                                />
                                <label style={{
                                    ...styles.floatingLabel,
                                    ...(activeField === 'institute' || formData.institute ? styles.labelFloat : {})
                                }}>Institute</label>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            style={{
                                ...styles.button,
                                transform: `translateY(${isLoaded ? '0px' : '20px'}) scale(${isLoaded ? 1 : 0.95})`,
                                opacity: isLoaded ? 1 : 0,
                                transition: 'all 0.6s ease 1.1s'
                            }}
                            onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                            }}
                        >
                            Create Account
                        </button>

                        <div style={{
                            ...styles.footerText,
                            transform: `translateY(${isLoaded ? '0px' : '20px'})`,
                            opacity: isLoaded ? 1 : 0,
                            transition: 'all 0.6s ease 1.2s'
                        }}>
                            Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f7ff', 
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1000px',
        gap: '30px',
        alignItems: 'stretch', 
    },
    card: {
        flex: 1,
        height: 'auto', 
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
        position: 'relative',
        padding: '50px 40px'
    },
    header: { textAlign: 'center', marginBottom: '30px' },
    logoBadge: {
        backgroundColor: '#2563eb',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontWeight: 'bold',
        fontSize: '22px'
    },
    title: { color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 8px 0' },
    subtitle: { color: '#94a3b8', fontSize: '14px', margin: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '18px' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    row: { display: 'flex', gap: '15px' },
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
    helpText: { fontSize: '11px', color: '#64748b', marginTop: '2px' },
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
    footerText: { textAlign: 'center', marginTop: '20px', color: '#94a3b8', fontSize: '14px' },
    link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
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
if (!document.head.querySelector('style[data-register-animations]')) {
    styleSheet.setAttribute('data-register-animations', 'true');
    document.head.appendChild(styleSheet);
}

export default Register;