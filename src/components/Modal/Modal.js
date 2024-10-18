import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Не отображаем модал, если он закрыт

  const handleOutsideClick = (event) => {
    // Проверяем, если кликнули вне модального окна
    if (event.target.className === styles.overlay) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.content}>
        {children} {/* Контент модального окна */}
      </div>
    </div>
  );
};

export default Modal;
