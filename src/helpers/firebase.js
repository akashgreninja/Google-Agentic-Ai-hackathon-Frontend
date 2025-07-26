import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBv9KQlXK1j9npTbwDLTWwWuWFf-KLyJ4A',
  authDomain: 'sankalpa-b7b13.firebaseapp.com',
  projectId: 'sankalpa-b7b13',
  storageBucket: 'sankalpa-b7b13.appspot.com',
  messagingSenderId: '248021982260',
  appId: '1:248021982260:web:85043a5580a4f5b1cd3e61',
  measurementId: 'G-777FHJ9472',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getFCMToken = async () => {
  try {
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      // urlBase64ToUint8Array: urlBase64ToUint8Array("BH3tePCgNH5wyNXIUbeJzlJc2U701OF2BayU-zRGmcUj-Pp2lGeprM_RqqcNJNikWJ61tjKiQma_lf9dV3H9xm8"),
      vapidKey:
        'BO1XJM0LHM2TcoNJF8UQfekOfjooXvzwf573DwsCMjye07vU1WWTaYFgRBMOngkvNwu3-yhT4o5bHPK5HMYE_5o', // Replace with your VAPID key
    });
    console.log(token);
    if (token) {
      return token;
    } else {
      console.warn('No FCM token available. Request permission to generate one.');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    throw error;
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export default storage;
export { app };
