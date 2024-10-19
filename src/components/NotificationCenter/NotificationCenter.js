import React from 'react';
import classNames from 'classnames';

import styles from './NotificationCenter.module.css';

const NotificationCenter = ({ notifications }) => {
  return (
    <div className={styles.list}>
      {notifications.map((notification) => (
        <p
          key={notification.id}
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
