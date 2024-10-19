import React, { useState } from 'react';
import axios from 'axios';
import styles from './AuthForm.module.css';

const AuthForm = ({
  username,
  setUsername,
  setIsLoggedIn,
  addNotification,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
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

      // JWT токен в локальном хранилище
      localStorage.setItem('token', response.data.access_token);
      setIsLoggedIn(true);
    } catch (error) {
      addNotification('error', error.response.data.detail);
      console.error(
        'Login failed:',
        error.response ? error.response.data.detail : error.message,
      );
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const body = {
        username: username,
        password: password,
      };

      await axios({
        headers: headers,
        method: 'post',
        url: `${apiUrl}/user/register`,
        data: body,
      });
      handleSignIn(e);
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <form className={styles.form}>
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
      <div className={styles.btns}>
        <button
          className={styles.login_btn}
          type="submit"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button
          className={styles.login_btn}
          type="submit"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
