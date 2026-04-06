import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.container}>
      {/* 1. Top Section - Unified Deep Dark Background */}
      <div style={styles.newsletter}>
        <h3 style={styles.ctaTitle}>Stay ahead with new workshops</h3>
        <p style={styles.ctaText}>Join our mailing list for the latest workshop announcements.</p>
        <button style={styles.actionBtn}>Browse Workshops</button>
      </div>

      {/* 2. Bottom Section - Matching Background */}
      <div style={styles.footerBody}>
        <div style={styles.grid}>
          {/* Brand/About */}
          <div style={styles.col}>
            <h4 style={styles.heading}>FOSSEE</h4>
            <p style={styles.description}>
              Empowering education through open-source software.
              An initiative supported by IIT Bombay.
            </p>
          </div>

          {/* Navigation */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Navigation</h4>
            <div style={styles.linkGroup}>
              <Link to="/" style={styles.link}>Dashboard</Link>
              <Link to="/statistics" style={styles.link}>Statistics</Link>
              <Link to="/login" style={styles.link}>Member Login</Link>
            </div>
          </div>

          {/* Support */}
          <div style={styles.col}>
            <h4 style={styles.heading}>Get in Touch</h4>
            <div style={styles.contactInfo}>
              <span>Email: support@fossee.in</span>
              <span>Mumbai, 400076</span>
            </div>
          </div>
        </div>

        {/* 3. Footer Credits */}
        <div style={styles.copyright}>
          <p>© 2026 FOSSEE, IIT Bombay. All Rights Reserved.</p>
          <small style={{ color: '#475569' }}>National Mission on Education through ICT</small>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  container: {
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    // This ensures no white lines appear between sections
    backgroundColor: '#020617',
  },
  newsletter: {
    // Applying your exact colors
    background: 'linear-gradient(135deg, #020617 0%, #020617 100%)',
    padding: '60px 20px',
    textAlign: 'center',
    borderTop: '1px solid #1e293b',
  },
  ctaTitle: { fontSize: '26px', color: '#fff', marginBottom: '10px', letterSpacing: '-0.5px' },
  ctaText: { color: '#94a3b8', fontSize: '15px', marginBottom: '24px' },
  actionBtn: {
    backgroundColor: '#2563eb', // Your new vibrant button color
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '50px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  footerBody: {
    backgroundColor: '#020617', // Matching the top section
    padding: '60px 8% 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '40px',
    marginBottom: '50px',
  },
  col: { display: 'flex', flexDirection: 'column', gap: '16px' },
  heading: { color: '#f8fafc', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' },
  description: { color: '#64748b', fontSize: '14px', lineHeight: '1.6' },
  linkGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  link: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px' },
  contactInfo: { color: '#64748b', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' },
  copyright: {
    borderTop: '1px solid #0f172a',
    paddingTop: '30px',
    textAlign: 'center',
    color: '#475569',
    fontSize: '13px',
  }
};