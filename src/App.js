import React, { useState, createContext, useMemo, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import { BrowserRouter, useLocation } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getProfilePicture } from './components/firebase/ProfilePicture';

export const UserDataContext = createContext();
export const SetUserDataContext = createContext();
export const AvatarContext = createContext();

export default function App() {
  const [avatar, setAvatar] = useState(getProfilePicture())

  const [userData, setUserData] = useState({});

  const ud = useMemo(() => ({userData, setUserData}), [userData]);


  const auth = getAuth();

useEffect(() => {
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

// let listener = Firebase.onAuthUserListener(() => {
//   const uid = user.uid;
//     const profilePic = user.photoURL;


// },
// () => {console.log('User logged out')});

 

  return (
    <AvatarContext.Provider value = {{avatar, setAvatar}}>
        <UserDataContext.Provider value = {ud}>
          <SetUserDataContext.Provider value = {setUserData}>
              <BrowserRouter>
                  <RouterComponent />
              </BrowserRouter>
            </SetUserDataContext.Provider>
          </UserDataContext.Provider>
      </AvatarContext.Provider>
  );
}

