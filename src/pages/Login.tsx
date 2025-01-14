import React, { useState } from 'react';
import useAuth, { userinfo } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helper/axios';

const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const { setuserData } = userinfo();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = { username, password, expiresInMins: 30 };

    try {
      const userData = await loginUser(credentials);

      if (userData.accessToken) {
        // Store user data in localStorage
        localStorage.setItem('userdata', JSON.stringify(userData));
        localStorage.setItem('authToken', userData.accessToken);

        setAuth(userData);
        setuserData(userData); // Update user data in the hook
        navigate('/todolist');
      } else {
        setError('Login failed!');
      }
    } catch (err) {
      setError('Error logging in.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
