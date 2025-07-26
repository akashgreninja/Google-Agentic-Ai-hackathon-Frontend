import './App.css';
import React, { useEffect, useState } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from './helpers/firebase';
import { Navbar } from './components/navbar'; // Assuming you have a Navbar component
import { GlobalProviders } from './providers';
import { RenderRoutes } from './renderRoutes';
import { Modal } from './components/modal';
import { notification } from 'antd';
const App = () => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({ title, type, description, placement = 'top' }) => {
    api[type]({
      message: title.charAt(0).toUpperCase() + title.slice(1),
      description,
      placement,
      duration: 5,
    });
  };
  useEffect(() => {
    const messaging = getMessaging(app);

    // Foreground notification listener
    onMessage(messaging, (payload) => {
      console.log('📲 Foreground message received:', payload);

      const { title, body } = payload.data;
      showNotification({ type: 'info', title, description: body, placement: 'right' });
    });
  }, []);

  return (
    <GlobalProviders>
      <div className="min-h-screen w-full bg-[radial-gradient(#3b82f633_1px,transparent_1px)] [background-size:20px_20px]">
        {/* <TestRegisterButton /> */}
        {contextHolder}
        {/* <Navbar /> */}
        <RenderRoutes />
      </div>
    </GlobalProviders>
  );
};

export default App;
