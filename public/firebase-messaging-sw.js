importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyABq-QVRBjmdh2ZoEjskWg5n-ddBQSqzeo',
  authDomain: 'healthy-wares-340911.firebaseapp.com',
  projectId: 'healthy-wares-340911',
  storageBucket: 'healthy-wares-340911.firebasestorage.app',
  messagingSenderId: '718852823294',
  appId: '1:718852823294:web:f6844683c6d1b040562daf',
  measurementId: 'G-VJJL640F6H',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
