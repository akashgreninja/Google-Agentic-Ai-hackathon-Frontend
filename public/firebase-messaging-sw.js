importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyBv9KQlXK1j9npTbwDLTWwWuWFf-KLyJ4A",
  authDomain: "sankalpa-b7b13.firebaseapp.com",
  projectId: "sankalpa-b7b13",
  storageBucket: "sankalpa-b7b13.appspot.com",
  messagingSenderId: "248021982260",
  appId: "1:248021982260:web:85043a5580a4f5b1cd3e61",
  measurementId: "G-777FHJ9472",
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
