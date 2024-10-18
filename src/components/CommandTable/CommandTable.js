import React from 'react';
import { FaClipboard } from 'react-icons/fa'; // Используем react-icons для иконки копирования
import styles from './CommandTable.module.css';

const CommandTable = ({ commands }) => {
  // Функция для копирования текста в буфер обмена
  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert('Copied to clipboard!');
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
        alert('Copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.heading}>
          <th className={styles.heading}>name</th>
          <th className={styles.heading}>command</th>
          <th className={styles.heading}>user</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
          <tr className={styles.cells} key={command.id}>
            <td className={styles.cell}>{command.name}</td>
            <td className={styles.cell}>
              {command.description}
              <FaClipboard
                className={styles.copy_icon}
                onClick={() => handleCopy(command.description)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </td>
            <td className={styles.cell}>{command.created_by}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommandTable;
