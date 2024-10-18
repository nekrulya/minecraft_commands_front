import React from 'react';
import { FaClipboard } from 'react-icons/fa'; // Используем react-icons для иконки копирования

const CommandTable = ({ commands }) => {

  // Функция для копирования текста в буфер обмена
  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
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
    <table className='commands_table'>
        <thead>
          <tr className='table_headings'>
          <th className='table_heading'>Название</th>
          <th className='table_heading'>Команда</th>
          <th className='table_heading'>Пользователь</th>
        </tr>
        </thead>
        <tbody>
          {commands.map(command => (
            <tr className='table_cells' key={command.id}>
              <td className='table_cell'>{command.name}</td>
              <td className='table_cell'>
                {command.description}
                <FaClipboard 
                  className="copy_icon" 
                  onClick={() => handleCopy(command.description)} 
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </td>
              <td className='table_cell'>{command.created_by}</td>
              </tr>
            ))}
        </tbody>
      </table>
  );
};

export default CommandTable;