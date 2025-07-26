import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABq-QVRBjmdh2ZoEjskWg5n-ddBQSqzeo',
  authDomain: 'healthy-wares-340911.firebaseapp.com',
  projectId: 'healthy-wares-340911',
  storageBucket: 'healthy-wares-340911.firebasestorage.app',
  messagingSenderId: '718852823294',
  appId: '1:718852823294:web:f6844683c6d1b040562daf',
  measurementId: 'G-VJJL640F6H',
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
