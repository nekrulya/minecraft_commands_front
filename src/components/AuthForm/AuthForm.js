import React, { useState } from 'react';
import axios from 'axios';
import styles from './AuthForm.module.css';

const AuthForm = ({ username, setUsername }) => {
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const body = {
        username: username,
        password: password,
      };
      const response = await axios({
        headers: headers,
        method: 'post',
        url: `${apiUrl}/user/login`,
        data: body,
      });

      // Сохраните JWT токен в локальном хранилище
      localStorage.setItem('token', response.data.access_token);
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <input
        type="text"
        className={styles.username}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className={styles.password}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.login_btn} type="submit">
        Sign in
      </button>
    </form>
  );
};

export default AuthForm;
