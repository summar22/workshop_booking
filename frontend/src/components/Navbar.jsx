import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/auth';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, isInstructor, logoutSuccess } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logoutSuccess();
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Error logging out');
    }
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">F</div>
        FOSSEE Workshops
      </Link>

      <ul className="navbar-nav">
        <li>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={`nav-link ${isActive('/statistics')}`}>
            Workshop Statistics
          </Link>
        </li>
      </ul>

      <div className="navbar-right">
        {user ? (
          <div className="navbar-user" ref={dropdownRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="avatar">
              {user.first_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="user-name">
              {user.first_name} {user.last_name}
            </span>
            <span className="material-icons-round" style={{ fontSize: 18, color: 'var(--text-muted)' }}>
              expand_more
            </span>

            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/profile" className="dropdown-item"
                onClick={() => setDropdownOpen(false)}>
                <span className="material-icons-round" style={{ fontSize: 18 }}>person</span>
                Profile
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                <span className="material-icons-round" style={{ fontSize: 18 }}>logout</span>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
