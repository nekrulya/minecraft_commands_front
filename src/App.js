import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CommandTable from './components/CommandTable';

function App() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    // Запрос к FastAPI
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(`${apiUrl}/command/`)
      .then(response => {
        setCommands(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the commands!', error);
      });
  }, []);

  return (
    <div className='App'>
      <h1 className='main_title'>List of Commands</h1>
      <CommandTable commands={commands} />
      
    </div>
  );
}

export default App;
