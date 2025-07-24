import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './screens/Dashboard';
import { Upload } from './screens/Upload';
import TestRegisterButton from './components/TestRegisterButton';
import React, { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from './helpers/firebase';
import { Navbar } from './components/navbar'; // Assuming you have a Navbar component
const App = () => {
  useEffect(() => {
    const messaging = getMessaging(app);

    // Foreground notification listener
    onMessage(messaging, (payload) => {
      console.log('📲 Foreground message received:', payload);

      const { title, body } = payload.data;
      alert(`${title}\n${body}`);
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-full bg-[radial-gradient(#3b82f633_1px,transparent_1px)] [background-size:20px_20px]">
        {/* <TestRegisterButton /> */}

        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
