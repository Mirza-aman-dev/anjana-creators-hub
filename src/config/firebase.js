import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, deleteDoc, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || ""
};

const isDummy = !firebaseConfig.apiKey;

let app, auth, googleProvider, db;

const mockAuthListeners = [];

if (!isDummy) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
} else {
  console.warn("Using Dummy Firebase Config - Mocking Auth and Firestore");
  
  app = {};
  auth = {
    onAuthStateChanged: (cb) => {
      mockAuthListeners.push(cb);
      const u = localStorage.getItem('mockUser');
      if (u) {
        cb(JSON.parse(u));
      } else {
        cb(null);
      }
      return () => {
        const idx = mockAuthListeners.indexOf(cb);
        if (idx > -1) mockAuthListeners.splice(idx, 1);
      };
    },
    currentUser: JSON.parse(localStorage.getItem('mockUser') || 'null'),
    _triggerAuthChange: (u) => {
      mockAuthListeners.forEach(cb => cb(u));
    }
  };
  googleProvider = {};
  db = {};
}

export { app, auth, googleProvider, db };

export const fbOnAuthStateChanged = (authInstance, cb) => {
  if (isDummy) {
    return authInstance.onAuthStateChanged(cb);
  }
  return onAuthStateChanged(authInstance, cb);
};

export const signInWithGoogle = async () => {
  if (isDummy) {
    const mockUser = { uid: 'mock_uid_123', email: 'test@example.com', displayName: 'Test User', photoURL: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80' };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    auth._triggerAuthChange(mockUser);
    return mockUser;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  if (isDummy) {
    localStorage.removeItem('mockUser');
    auth.currentUser = null;
    auth._triggerAuthChange(null);
    return;
  }
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

export const signUpWithEmail = async (email, password) => {
  if (isDummy) {
    const mockUser = { uid: `mock_uid_${Date.now()}`, email, displayName: email.split('@')[0], photoURL: null };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    auth._triggerAuthChange(mockUser);
    return mockUser;
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email", error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  if (isDummy) {
    const mockUser = { uid: `mock_uid_${Date.now()}`, email, displayName: email.split('@')[0], photoURL: null };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    auth.currentUser = mockUser;
    auth._triggerAuthChange(mockUser);
    return mockUser;
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error logging in with email", error);
    throw error;
  }
};

export const fbUpdatePassword = async (newPassword) => {
  if (isDummy) {
    console.log("Mock update password");
    return;
  }
  return updatePassword(auth.currentUser, newPassword);
};

export const fbDeleteUser = async () => {
  if (isDummy) {
    localStorage.removeItem('mockUser');
    auth.currentUser = null;
    auth._triggerAuthChange(null);
    return;
  }
  return deleteUser(auth.currentUser);
};

export const fbReauthenticate = async (currentPassword) => {
  if (isDummy) {
    console.log("Mock reauthenticate");
    return;
  }
  const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
  return reauthenticateWithCredential(auth.currentUser, credential);
};

// --- Firestore Mocks Wrapper ---
const getMockStorage = () => JSON.parse(localStorage.getItem('mockFirestore') || '{"users":{}, "courses":{}, "transactions":{}}');
const saveMockStorage = (data) => localStorage.setItem('mockFirestore', JSON.stringify(data));

export const fbDoc = (...args) => {
  if (!isDummy) return doc(...args);
  if (args.length === 3) {
    return { collectionName: args[1], docId: args[2] };
  } else {
    return { collectionName: args[0].collectionName, docId: args[1] };
  }
};

export const fbCollection = (...args) => {
  if (!isDummy) return collection(...args);
  if (args.length === 2) {
    return { collectionName: args[1] };
  } else {
    return { collectionName: args[0].collectionName + '/' + args[1] };
  }
};

export const fbGetDoc = async (...args) => {
  if (!isDummy) return getDoc(...args);
  const docRef = args[0];
  const storage = getMockStorage();
  const data = storage[docRef.collectionName]?.[docRef.docId];
  return {
    exists: () => !!data,
    data: () => data || null
  };
};

export const fbSetDoc = async (...args) => {
  if (!isDummy) return setDoc(...args);
  const docRef = args[0];
  const data = args[1];
  const storage = getMockStorage();
  if (!storage[docRef.collectionName]) storage[docRef.collectionName] = {};
  storage[docRef.collectionName][docRef.docId] = data;
  saveMockStorage(storage);
};

export const fbUpdateDoc = async (...args) => {
  if (!isDummy) return updateDoc(...args);
  const docRef = args[0];
  const data = args[1];
  const storage = getMockStorage();
  if (!storage[docRef.collectionName]) storage[docRef.collectionName] = {};
  storage[docRef.collectionName][docRef.docId] = {
    ...storage[docRef.collectionName][docRef.docId],
    ...data
  };
  saveMockStorage(storage);
};

export const fbGetDocs = async (...args) => {
  if (!isDummy) return getDocs(...args);
  const queryRef = args[0];
  const storage = getMockStorage();
  const collectionData = storage[queryRef.collectionName] || {};
  return {
    docs: Object.keys(collectionData).map(id => ({
      id,
      data: () => collectionData[id]
    }))
  };
};

export const fbQuery = (...args) => {
  if (!isDummy) return query(...args);
  return args[0];
};

export const fbOrderBy = (...args) => {
  if (!isDummy) return orderBy(...args);
  return { field: args[0], dir: args[1] };
};

export const fbDeleteDoc = async (...args) => {
  if (!isDummy) return deleteDoc(...args);
  const docRef = args[0];
  const storage = getMockStorage();
  if (storage[docRef.collectionName]) {
    delete storage[docRef.collectionName][docRef.docId];
    saveMockStorage(storage);
  }
};

export const fbAddDoc = async (...args) => {
  if (!isDummy) return addDoc(...args);
  const collectionRef = args[0];
  const data = args[1];
  const storage = getMockStorage();
  const newId = `mock_doc_${Date.now()}`;
  if (!storage[collectionRef.collectionName]) storage[collectionRef.collectionName] = {};
  storage[collectionRef.collectionName][newId] = data;
  saveMockStorage(storage);
  return { id: newId };
};
