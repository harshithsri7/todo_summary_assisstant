import React, { useEffect } from 'react';

function Notification({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <span className="message">{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

export default Notification;