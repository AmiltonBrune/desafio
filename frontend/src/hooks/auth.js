import React, { createContext, useState, useContext } from 'react';
import { login, logout, getUserData, confirmMail, register } from '../server';
import { useModal } from './modal';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem('@sistema-item:logged');

    return !!isLogged;
  });
  const [user, setUser] = useState({});
  const [isVerify, setIsVerify] = useState(false);
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

  const signup = async (email, password) => {
    if (email && password) {
      try {
        await register({ email, password });
      } catch (error) {
        alert('Erro ao cadastrar usuário/usuário já cadastrado');
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

  const confirmationRegisterUser = async ({ code }) => {
    try {
      await confirmMail({ code });
      setIsVerify(true);
    } catch (error) {
      setIsVerify(false);
      alert('Erro ao verificar usuário');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        signIn,
        signOut,
        getUser,
        user,
        confirmationRegisterUser,
        isVerify,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
