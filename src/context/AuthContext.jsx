import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const BASE_URL = 'https://gearforge-server-production.up.railway.app/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('gearforge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    setUser(data);
    localStorage.setItem('gearforge_user', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    setUser(data);
    localStorage.setItem('gearforge_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gearforge_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);