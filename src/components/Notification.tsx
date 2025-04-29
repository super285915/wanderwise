import React, { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { NotificationType, NotificationPosition } from '../context/NotificationContext';

const getNotificationStyles = (type: NotificationType['type']) => {
  const baseStyles = 'p-4 rounded-lg shadow-lg flex items-start justify-between max-w-md w-full transition-all duration-300';

  switch (type) {
    case 'success':
      return `${baseStyles} bg-green-100 text-green-800 border-l-4 border-green-500`;
    case 'error':
      return `${baseStyles} bg-red-100 text-red-800 border-l-4 border-red-500`;
    case 'warning':
      return `${baseStyles} bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500`;
    case 'info':
      return `${baseStyles} bg-blue-100 text-blue-800 border-l-4 border-blue-500`;
    default:
      return `${baseStyles} bg-gray-100 text-gray-800 border-l-4 border-gray-500`;
  }
};

const getPositionStyles = (position: NotificationPosition) => {
  switch (position) {
    case 'top-right':
      return 'fixed top-20 right-4 z-[100] space-y-2 flex flex-col items-end';
    case 'top-left':
      return 'fixed top-20 left-4 z-[100] space-y-2 flex flex-col items-start';
    case 'bottom-right':
      return 'fixed bottom-4 right-4 z-[100] space-y-2 flex flex-col-reverse items-end';
    case 'bottom-left':
      return 'fixed bottom-4 left-4 z-[100] space-y-2 flex flex-col-reverse items-start';
    case 'top-center':
      return 'fixed top-20 left-1/2 -translate-x-1/2 z-[100] space-y-2 flex flex-col items-center';
    case 'bottom-center':
      return 'fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] space-y-2 flex flex-col-reverse items-center';
    default:
      return 'fixed top-20 right-4 z-[100] space-y-2 flex flex-col items-end';
  }
};

const getIcon = (type: NotificationType['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />;
    case 'error':
      return <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />;
    case 'warning':
      return <AlertTriangle className="text-yellow-500 mr-3 flex-shrink-0" size={20} />;
    case 'info':
      return <Info className="text-blue-500 mr-3 flex-shrink-0" size={20} />;
    default:
      return <Info className="text-gray-500 mr-3 flex-shrink-0" size={20} />;
  }
};

const NotificationItem: React.FC<{
  notification: NotificationType;
  onRemove: (id: string) => void;
}> = ({ notification, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = notification.duration || 5000;

  useEffect(() => {
    if (duration) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  return (
    <div
      className={`${getNotificationStyles(notification.type)} ${
        isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
      role="alert"
    >
      <div className="flex items-start flex-1 mr-2">
        {getIcon(notification.type)}
        <div className="flex-1">
          {notification.title && (
            <h4 className="font-semibold mb-1">{notification.title}</h4>
          )}
          <p className="text-sm">{notification.message}</p>
          {notification.hasAction && notification.actionLabel && (
            <button
              onClick={() => {
                notification.actionCallback?.();
                handleRemove();
              }}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              {notification.actionLabel}
            </button>
          )}
          {notification.duration && (
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="p-1 rounded-full hover:bg-white/50 transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const Notification: React.FC = () => {
  const {
    notifications,
    removeNotification,
    position = 'top-right',
    maxNotifications = 5
  } = useNotification();

  if (notifications.length === 0) return null;

  // Only show the most recent notifications up to maxNotifications
  const visibleNotifications = notifications.slice(-maxNotifications);

  return (
    <div className={getPositionStyles(position)}>
      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};