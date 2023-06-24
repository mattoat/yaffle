import React, { useState, createContext, useMemo, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import { BrowserRouter, useLocation } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'


export const UserDataContext = createContext();
export const AvatarContext = createContext();

export default function App() {
  const [avatar, setAvatar] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [renderAvatar, setRenderAvatar] = useState(0)
  const [authorised, setAuthorised] = useState(false)
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState({});

  const user = useMemo(() => ({userData, setUserData}),[userData]);
  const un = useMemo(() => ({username, setUsername}), [username]);
  const av = useMemo(() => ({avatar, setAvatar}), [avatar]);


  const auth = getAuth();

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAuthorised(true);
        setUserData(user)
        setAvatar(user.photoURL);
        // ...
      } 
      else {
        // User is signed out

        setUsername(null);
        setUserData(null);  
      }
    });
});

// let listener = Firebase.onAuthUserListener(() => {
//   const uid = user.uid;
//     const profilePic = user.photoURL;


// },
// () => {console.log('User logged out')});

 

  return (
    <AvatarContext.Provider value = {av}>
        <UserDataContext.Provider value = {user}>
            <BrowserRouter>
                <RouterComponent />
            </BrowserRouter>
          </UserDataContext.Provider>
      </AvatarContext.Provider>
  );
}

