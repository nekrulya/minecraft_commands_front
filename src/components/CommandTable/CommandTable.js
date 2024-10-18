import React from 'react';
import { FaClipboard, FaTrash } from 'react-icons/fa'; // Используем react-icons для иконки копирования
import styles from './CommandTable.module.css';
import axios from 'axios';

const CommandTable = ({ commands, setCommands }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  // Функция для копирования текста в буфер обмена
  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      // Фолбэк для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        console.log('Copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const fetchCommands = async () => {
    await axios
      .get(`${apiUrl}/command`)
      .then((response) => {
        setCommands(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the commands!', error);
      });
  };

  const deleteCommand = async (command_id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios({
        headers: headers,
        method: 'delete',
        url: `${apiUrl}/command/${command_id}`,
      });
      fetchCommands();
    } catch (error) {
      console.error(
        'Delete command failed:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.heading}>
          <th className={styles.heading}>name</th>
          <th className={styles.heading}>command</th>
          <th className={styles.heading}>user</th>
          <th className={styles.heading}>delete</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
          <tr className={styles.cells} key={command.id}>
            <td className={styles.cell}>{command.name}</td>
            <td className={styles.cell} style={{ paddingRight: '35px' }}>
              {command.description}
              <FaClipboard
                className={styles.copy_icon}
                onClick={() => handleCopy(command.description)}
                style={{ cursor: 'pointer' }}
              />
            </td>
            <td className={styles.cell}>{command.created_by}</td>
            <td className={styles.cell}>
              <FaTrash
                className={styles.delete_icon}
                onClick={() => deleteCommand(command.id)}
                style={{ cursor: 'pointer' }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommandTable;
