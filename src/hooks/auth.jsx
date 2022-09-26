import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';

export const AuthContext = createContext({ useAuth });

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/session', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      localStorage.setItem('@rocketnotes:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possivel fazer o login');
      };
    };
  };

  function signOut() {
    try {
      localStorage.removeItem('@rocketnotes:token');
      localStorage.removeItem('@rocketnotes:user');
      setData({});
    } catch (error) {
      console.log(error);
    };
  };

  async function profileUpdate({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar

      }


      await api.put('/users', user);

      
      let updatedUser = Object.assign({}, user)
      delete updatedUser.password
      delete updatedUser.old_password

      localStorage.setItem('@rocketnotes:user', JSON.stringify(updatedUser));

      setData({ user, token: data.token });
      alert('Perfil atualizado');

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Não foi possivel fazer o atualizar os dados.');
      };
    };

  };

  useEffect(() => {
    const user = localStorage.getItem('@rocketnotes:user');
    const token = localStorage.getItem('@rocketnotes:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, profileUpdate, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
