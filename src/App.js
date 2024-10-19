import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.css';
import CommandTable from './components/CommandTable/CommandTable';
import AuthForm from './components/AuthForm/AuthForm';
import Modal from './components/Modal/Modal';
import CommandForm from './components/CommandForm/CommandForm';
import NotificationCenter from './components/NotificationCenter/NotificationCenter';

import { jwtDecode } from 'jwt-decode';

function App() {
  const [commands, setCommands] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, action.payload];
      default:
        return state;
    }
  };
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    setUsername(decoded.username);
    return decoded.exp < currentTime;
  };

  useEffect(() => {
    // Запрос к FastAPI
    axios
      .get(`${apiUrl}/command`)
      .then((response) => {
        setCommands(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the commands!', error);
      });
  }, [apiUrl, isModalOpen]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Получите токен из локального хранилища или где он хранится
    if (!isTokenExpired(token)) {
      setIsLoggedIn(true);
    }
  }, [apiUrl]);

  useEffect(() => {
    const infoNotification = {
      type: 'info',
      message: 'hello!',
      id: Date.now(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: infoNotification });
    const errorNotification = {
      type: 'error',
      message: 'error!',
      id: Date.now(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: errorNotification });
  }, [apiUrl]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogOut = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="main_title">List of Commands</h1>
        {isLoggedIn ? (
          <div className="header_username">
            <span>{username}</span>
            <button className="add_command_btn" onClick={openModal}>
              Add command
            </button>
            <button className="add_command_btn" onClick={handleLogOut}>
              Log Out
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <CommandForm onCreate={closeModal} />
            </Modal>
          </div>
        ) : (
          <AuthForm
            username={username}
            setUsername={setUsername}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </header>
      <CommandTable commands={commands} setCommands={setCommands} />
      <NotificationCenter notifications={notifications} />
    </div>
  );
}

export default App;
