import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: '',
        title: 'Prof.', firstName: '', lastName: '', phoneNumber: '',
        institute: '', department: 'Computer Science', location: '',
        state: '', hearAboutUs: 'FOSSEE website'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.logoBadge}>F</div>
                    <h2 style={styles.title}>Coordinator Registration</h2>
                    <p style={styles.subtitle}>Join the FOSSEE Workshops Portal</p>
                </div>

                <form style={styles.form}>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Username</label>
                        <input type="text" name="username" placeholder="Enter username" onChange={handleChange} style={styles.input} />
                        <small style={styles.helpText}>Letters, digits, period and underscore only.</small>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input type="email" name="email" placeholder="email@example.com" onChange={handleChange} style={styles.input} />
                    </div>

                    <div style={styles.row}>
                        <div style={{ flex: 1 }}>
                            <label style={styles.label}>Password</label>
                            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={styles.label}>Confirm Password</label>
                            <input type="password" name="confirmPassword" placeholder="••••••••" onChange={handleChange} style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={{ flex: 0.3 }}>
                            <label style={styles.label}>Title</label>
                            <select name="title" onChange={handleChange} style={styles.input}>
                                <option>Prof.</option><option>Dr.</option><option>Mr.</option><option>Ms.</option>
                            </select>
                        </div>
                        <div style={{ flex: 0.7 }}>
                            <label style={styles.label}>First Name</label>
                            <input type="text" name="firstName" placeholder="summar" onChange={handleChange} style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Institute</label>
                        <input type="text" name="institute" placeholder="Full Institute Name" onChange={handleChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>Create Account</button>

                    <div style={styles.footerText}>
                        Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#0f172a', // Dark Navy from your background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
    },
    card: {
        backgroundColor: '#1e293b', // Darker blue card from your login UI
        width: '100%',
        maxWidth: '550px',
        borderRadius: '12px',
        padding: '40px',
        border: '1px solid #334155',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    },
    header: { textAlign: 'center', marginBottom: '30px' },
    logoBadge: {
        backgroundColor: '#2563eb',
        color: 'white',
        width: '45px',
        height: '45px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 15px',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    title: { color: '#f8fafc', fontSize: '24px', fontWeight: '600', margin: '0' },
    subtitle: { color: '#94a3b8', fontSize: '14px', marginTop: '8px' },
    form: { display: 'flex', flexDirection: 'column', gap: '18px' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    row: { display: 'flex', gap: '15px' },
    label: { fontSize: '14px', fontWeight: '500', color: '#cbd5e1' },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #334155',
        backgroundColor: '#0f172a', // Hollow dark look
        color: '#f8fafc',
        fontSize: '14px',
        outline: 'none',
    },
    helpText: { fontSize: '11px', color: '#64748b', marginTop: '2px' },
    button: {
        backgroundColor: '#2563eb', // Vibrant blue from your "Sign In" button
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background 0.2s',
    },
    footerText: { textAlign: 'center', marginTop: '20px', color: '#94a3b8', fontSize: '14px' },
    link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }
};

export default Register;