import React, { useState, createContext, useMemo, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import { BrowserRouter, useLocation } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getProfilePicture } from './components/firebase/ProfilePicture';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';

export const UserDataContext = createContext();
export const SetUserDataContext = createContext();
export const AvatarContext = createContext();

export default function App() {
  const [avatar, setAvatar] = useState(getProfilePicture())
  const [userData, setUserData] = useState({});
  const ud = useMemo(() => ({userData, setUserData}), [userData]);

  const firebaseConfig = {
    apiKey: "AIzaSyAOmL5cu9pWw_PwqEMfCqKlnZ0xYhT4Jns",
    authDomain: "yaffle-d76fe.firebaseapp.com",
    databaseURL: "https://yaffle-d76fe-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "yaffle-d76fe",
    storageBucket: "yaffle-d76fe.appspot.com",
    messagingSenderId: "1040602701618",
    appId: "1:1040602701618:web:d313a148f534e4c3d3412b",
    measurementId: "G-L48BQHY8B6"
  };

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
    <FirebaseAppProvider firebaseConfig={firebaseConfig} >
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

