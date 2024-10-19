import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';

import styles from './NotificationCenter.module.css';

const notificationDuration = 3000;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [
        ...state.filter(
          (notification) =>
            Date.now() - notification.created_at < notificationDuration,
        ),
        action.payload,
      ];
    case 'REMOVE_OLD_NOTIFICATIONS':
      const currentTime = Date.now();
      return state.filter(
        (notification) =>
          currentTime - notification.created_at < notificationDuration, // Убираем уведомления старше 5 секунд
      );
    default:
      return state;
  }
};

const NotificationCenter = () => {
  const [notifications, dispatchNotification] = useReducer(
    notificationReducer,
    [],
  );
  useEffect(() => {
    const infoNotification = {
      type: 'info',
      message: 'hello!',
      created_at: Date.now(),
    };
    dispatchNotification({
      type: 'ADD_NOTIFICATION',
      payload: infoNotification,
    });
    const errorNotification = {
      type: 'error',
      message: 'error!',
      id: Date.now(),
    };
    dispatchNotification({
      type: 'ADD_NOTIFICATION',
      payload: errorNotification,
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatchNotification({ type: 'REMOVE_OLD_NOTIFICATIONS' });
    }, 1000); // Проверяем каждую секунду

    return () => clearInterval(timer); // Очищаем таймер при размонтировании компонента
  }, []);

  return (
    <div className={styles.list}>
      {notifications.map((notification) => (
        <p
          key={notification.created_at}
          className={classNames(
            styles.item,
            notification.type === 'info' && styles.info,
            notification.type === 'error' && styles.error,
          )}
        >
          {notification.message}
        </p>
      ))}
    </div>
  );
};

export default NotificationCenter;
