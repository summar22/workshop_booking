import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
      setIsInstructor(data.is_instructor);
    } catch (err) {
      setUser(null);
      setIsInstructor(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loginSuccess = (data) => {
    setUser(data.user);
    setIsInstructor(data.is_instructor);
  };

  const logoutSuccess = () => {
    setUser(null);
    setIsInstructor(false);
  };

  return (
    <AuthContext.Provider value={{
      user, isInstructor, loading,
      loginSuccess, logoutSuccess, fetchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
