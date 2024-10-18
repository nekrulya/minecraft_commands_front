import React, { useState } from 'react';
import axios from 'axios';
import styles from './CommandForm.module.css';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createCommand = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        name: name,
        description: description,
      };
      const response = await axios({
        headers: headers,
        method: 'post',
        url: `${apiUrl}/command/create`,
        data: body,
      });
      console.log(response);
    } catch (error) {
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

export default AuthForm;
