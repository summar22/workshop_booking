import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div style={layoutStyles.wrapper}>
      <Navbar />

      {/* Main content remains white by default */}
      <main className="main-content" style={layoutStyles.mainContent}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

const layoutStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#ffffffff', // Ensures the overall background is white
    width: '100%',
  },
  mainContent: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff', // Keeps your center content white
  }
};