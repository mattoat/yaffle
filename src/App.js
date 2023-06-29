import React, { useState, createContext, useMemo, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import { BrowserRouter, useLocation } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getProfilePicture } from './components/firebase/ProfilePicture';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';
import { config } from './components/firebase/Firebase';

export const UserDataContext = createContext();
export const SetUserDataContext = createContext();
export const AvatarContext = createContext();

export default function App() {
  const [avatar, setAvatar] = useState(getProfilePicture())
  const [userData, setUserData] = useState({});
  const ud = useMemo(() => ({userData, setUserData}), [userData]);

  useEffect(() => {
    let auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUserData(user)
          setAvatar(getProfilePicture());
          // setAvatar(user.photoURL);
          // ...
        } 
        else {
          // User is signed out


          // setUserData(null);  
        }
      });
  }, []);

  return (
    <FirebaseAppProvider firebaseConfig={config} >
        <AvatarContext.Provider value = {{avatar, setAvatar}}>
            <UserDataContext.Provider value = {ud}>
              <SetUserDataContext.Provider value = {setUserData}>
                  <BrowserRouter>
                      <RouterComponent />
                  </BrowserRouter>
                </SetUserDataContext.Provider>
              </UserDataContext.Provider>
          </AvatarContext.Provider>
        </FirebaseAppProvider>
  );
}

