import React, { createContext, useState, useContext } from 'react';
import { login, logout, getUserData } from '../server';
import { useModal } from './modal';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@sistema-item:logged');

    return !!isLogged;
  });
  const [user, setUser] = useState({});
  const { setIsShowinLoading } = useModal();

  const signIn = async (email, password, rememberMe) => {
    if (email && password) {
      try {
        const result = await login({ email, password });

        localStorage.setItem('@sistema-item:token', result.data.data.token);
        localStorage.setItem('@sistema-item:logged', 'true');

        if (rememberMe) {
          localStorage.setItem('@sistema-item:remember', 'true');
        }

        setLogged(true);
        await getUser();
      } catch (error) {
        setIsShowinLoading(false);
        setLogged(false);
        alert('Senha ou email inválido!');
      }
    }
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem('@sistema-item:token');
      await logout({ token });
      localStorage.removeItem('@sistema-item:logged');
      localStorage.removeItem('@sistema-item:token');
      window.location.href = '/';
      setLogged(false);
    } catch (error) {
      setLogged(false);
      localStorage.removeItem('@sistema-item:logged');
      localStorage.removeItem('@sistema-item:token');
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem('@sistema-item:token');
      const data = await getUserData({ token });

      setUser(data.data.data.user);
    } catch (error) {
      setUser({});
    }
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
