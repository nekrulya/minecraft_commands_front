import React, { useState } from 'react';
import axios from 'axios';
import styles from './CommandForm.module.css';

const CommandForm = ({ onCreate, addNotification }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createCommand = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const body = {
        name: name,
        description: description,
      };
      const response = await axios({
        headers: headers,
        method: 'post',
        url: `${apiUrl}/command`,
        data: body,
      });
      addNotification('info', response.data);
      onCreate();
    } catch (error) {
      addNotification('error', error.response.data.detail);
      console.error(
        'Create command failed:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={createCommand}>
      <input
        type="text"
        className={styles.name}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        className={styles.description}
        placeholder="command"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className={styles.create_btn} type="submit">
        create
      </button>
    </form>
  );
};

export default CommandForm;
