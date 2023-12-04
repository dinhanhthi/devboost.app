import { initializeApp } from 'firebase/app'
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase: https://firebase.google.com/docs/firestore/quickstart#web-modular-api
const app = initializeApp(firebaseConfig)
// Offline persistence: https://firebase.google.com/docs/firestore/manage-data/enable-offline
const db = initializeFirestore(app, {
  // localCache: memoryLocalCache(),
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
})
// const analytics = getAnalytics(app)

export { db }
