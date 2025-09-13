import React, { useState, useEffect } from 'react';
import { apiRequest } from '../config/api';
import './LiveNotifications.css';

const LiveNotifications = ({ customerId = 'guest' }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    
    // Set up polling for live notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [customerId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`/api/v2/live-notifications/${customerId}`);
      
      if (response.success) {
        setNotifications(response.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissNotification = async (notificationId) => {
    try {
      const response = await apiRequest(`/api/v2/dismiss-notification/${notificationId}`, {
        method: 'POST'
      });
      
      if (response.success) {
        setNotifications(prev => prev.filter(n => n.notification_id !== notificationId));
      }
    } catch (error) {
      console.error('Error dismissing notification:', error);
    }
  };

  const handleActionClick = (action, url) => {
    if (action === 'view_subscription' && url) {
      window.location.href = url;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'urgent';
      case 'high':
        return 'high';
      case 'low':
        return 'low';
      case 'normal':
      default:
        return 'normal';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="live-notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.notification_id}
          className={`live-notification ${notification.notification_type} ${getPriorityClass(notification.priority)}`}
        >
          <div className="notification-content">
            <div className="notification-header">
              <span className="notification-icon">
                {getNotificationIcon(notification.notification_type)}
              </span>
              <h4 className="notification-title">{notification.title}</h4>
              <button
                className="dismiss-btn"
                onClick={() => dismissNotification(notification.notification_id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
            
            <p className="notification-message">{notification.message}</p>
            
            {notification.action_buttons && notification.action_buttons.length > 0 && (
              <div className="notification-actions">
                {notification.action_buttons.map((button, index) => (
                  <button
                    key={index}
                    className="action-btn"
                    onClick={() => handleActionClick(button.action, button.url)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {notification.auto_dismiss && (
            <div 
              className="auto-dismiss-timer"
              style={{
                animationDuration: `${notification.dismiss_after_seconds}s`
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LiveNotifications;

