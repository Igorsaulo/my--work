import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = (coockie) =>{
    const decodedToken = jwt_decode(coockie);
    setUser(decodedToken);
  }
  const login = (token) => {
    Cookies.set('NextCookie', token, { expires: 1 });
    const decodedToken = jwt_decode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    Cookies.remove('NextCookie');
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

