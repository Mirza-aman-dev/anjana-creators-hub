import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, signInWithGoogle, logOut, fbOnAuthStateChanged as onAuthStateChanged, fbDoc as doc, fbGetDoc as getDoc, fbSetDoc as setDoc, signUpWithEmail as fbSignUp, loginWithEmail as fbLogin } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...currentUser, ...userData });
            setRole(userData.role || 'user');
            setSubscription(userData.subscription || null);
            
            // Evaluate lock status
            const isManuallyLocked = userData.isManuallyLocked || false;
            let isExpired = false;
            
            if (userData.subscription && userData.subscription.expiresAt) {
               isExpired = new Date() > new Date(userData.subscription.expiresAt);
            } else {
               isExpired = true; // No subscription means expired/locked
            }
            
            // Admin override
            if (userData.role === 'admin') {
              setIsLocked(false);
            } else {
              setIsLocked(isManuallyLocked || isExpired || (userData.subscription?.status !== 'active'));
            }

          } else {
            // It's a new user, they need onboarding
            setUser(currentUser);
            setRole('user');
            setIsLocked(true); // Locked until subscription
          }
        } catch (error) {
          console.error("Firestore error while fetching user (Offline or DB not created):", error);
          // Fallback gracefully so the app doesn't crash on a white screen
          const localMock = localStorage.getItem(`mock_user_${currentUser.uid}`);
          if (localMock) {
            const userData = JSON.parse(localMock);
            setUser({ ...currentUser, ...userData });
            setRole(userData.role || 'user');
            setSubscription(userData.subscription || null);
            
            const isManuallyLocked = userData.isManuallyLocked || false;
            let isExpired = false;
            if (userData.subscription && userData.subscription.expiresAt) {
               isExpired = new Date() > new Date(userData.subscription.expiresAt);
            } else {
               isExpired = true;
            }
            if (userData.role === 'admin') {
              setIsLocked(false);
            } else {
              setIsLocked(isManuallyLocked || isExpired || (userData.subscription?.status !== 'active'));
            }
          } else {
            setUser(currentUser);
            setRole('user');
            setIsLocked(true); // Treat as locked/new user if we can't reach DB
          }
        }
      } else {
        const adminMock = localStorage.getItem('mock_user_admin_mock_uid');
        if (adminMock) {
           const adminData = JSON.parse(adminMock);
           setUser(adminData);
           setRole('admin');
           setSubscription(adminData.subscription || { status: 'active', expiresAt: '2099-12-31T23:59:59.000Z' });
           setIsLocked(false);
           setLoading(false);
           return;
        }

        setUser(null);
        setRole(null);
        setSubscription(null);
        setIsLocked(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    return signInWithGoogle();
  };

  const completeOnboarding = async (uid, fullName, email, photoURL) => {
    const userData = {
      uid,
      fullName,
      email,
      photoURL,
      role: 'user',
      isManuallyLocked: false,
      subscription: {
        status: 'none'
      },
      progress: {},
      createdAt: new Date().toISOString()
    };

    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, userData);
      
      // Refresh user state
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
         setUser({ ...auth.currentUser, ...userDoc.data() });
      }
    } catch (error) {
      console.error("Firestore write failed (offline or permission denied). Falling back to local state:", error);
      // Fallback: Update React state immediately so they aren't blocked
      setUser({ ...auth.currentUser, ...userData });
      setIsLocked(true);
      setRole('user');
      // Optionally store in localStorage so it persists across refreshes while DB is broken
      localStorage.setItem(`mock_user_${uid}`, JSON.stringify(userData));
    }
  };

  const signupWithEmail = async (email, password, fullName) => {
    const user = await fbSignUp(email, password);
    await completeOnboarding(user.uid, fullName, email, null);
    return user;
  };

  const loginWithEmail = async (email, password) => {
    return fbLogin(email, password);
  };

  // Dedicated admin login mock wrapper
  const adminLogin = async (email, password) => {
    // In a real app, use signInWithEmailAndPassword. 
    if (email === 'admin@gmail.com' && password === 'admin@4343') {
       await logOut(); // Sign out any existing Firebase student users
       const adminUser = {
         uid: 'admin_mock_uid',
         email: 'admin@gmail.com',
         fullName: 'Admin User',
         role: 'admin',
         subscription: { status: 'active', expiresAt: '2099-12-31T23:59:59.000Z' }
       };
       setUser(adminUser);
       setRole('admin');
       setSubscription(adminUser.subscription);
       setIsLocked(false);
       setLoading(false);
       localStorage.setItem('mock_user_admin_mock_uid', JSON.stringify(adminUser));
       return adminUser;
    } else {
       throw new Error('Invalid Admin Credentials');
    }
  };

  const logout = async () => {
    localStorage.removeItem('mock_user_admin_mock_uid');
    return logOut();
  };

  const value = {
    user,
    role,
    subscription,
    isLocked,
    loading,
    loginWithGoogle,
    signupWithEmail,
    loginWithEmail,
    logout,
    completeOnboarding,
    adminLogin,
    setIsLocked,
    setSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
