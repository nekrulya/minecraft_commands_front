import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import classes from './Header.module.css';
import AuthForm from '../AuthForm/AuthForm';

const Header = ({ addNotification, openModal }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    setUsername(decoded.username);
    return decoded.exp < currentTime;
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Получите токен из локального хранилища или где он хранится
    if (!isTokenExpired(token)) {
      setIsLoggedIn(true);
    }
  }, [apiUrl]);

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>List of Commands</h1>
      {isLoggedIn ? (
        <div className={classes.username}>
          <span>{username}</span>
          <button className={classes.btn} onClick={openModal}>
            Add command
          </button>
          <button className={classes.btn} onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        <AuthForm
          username={username}
          setUsername={setUsername}
          setIsLoggedIn={setIsLoggedIn}
          addNotification={addNotification}
        />
      )}
    </header>
  );
};

export default Header;
