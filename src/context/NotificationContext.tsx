import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export type NotificationType = {
  id: string;
  message: string;
  title?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  createdAt: Date;
  hasAction?: boolean;
  actionLabel?: string;
  actionCallback?: () => void;
  data?: Record<string, any>;
};

type NotificationContextType = {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, 'id' | 'createdAt'>) => string;
  updateNotification: (id: string, notification: Partial<Omit<NotificationType, 'id' | 'createdAt'>>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  position: NotificationPosition;
  setPosition: (position: NotificationPosition) => void;
  maxNotifications: number;
  setMaxNotifications: (max: number) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [position, setPosition] = useState<NotificationPosition>('top-right');
  const [maxNotifications, setMaxNotifications] = useState<number>(5);

  // Auto-remove notifications based on their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, notification.duration);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications]);

  // Ensure we don't exceed maxNotifications
  useEffect(() => {
    if (notifications.length > maxNotifications) {
      const notificationsToRemove = notifications.slice(0, notifications.length - maxNotifications);
      notificationsToRemove.forEach(notification => {
        removeNotification(notification.id);
      });
    }
  }, [notifications, maxNotifications]);

  const addNotification = (notification: Omit<NotificationType, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 11);
    const defaultDuration = 5000; // Default duration of 5 seconds

    const newNotification: NotificationType = {
      ...notification,
      id,
      createdAt: new Date(),
      duration: notification.duration || defaultDuration
    };

    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const updateNotification = (
    id: string,
    updatedFields: Partial<Omit<NotificationType, 'id' | 'createdAt'>>
  ) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, ...updatedFields }
          : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        updateNotification,
        removeNotification,
        clearAllNotifications,
        position,
        setPosition,
        maxNotifications,
        setMaxNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};