import React, { useState, createContext, useMemo, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import {Auth, Storage} from 'aws-amplify'
import { BrowserRouter, useLocation } from 'react-router-dom';
import awsconfig from './aws-exports';

import * as AWS from 'aws-sdk'


export const UserDataContext = createContext();
export const UsernameContext = createContext();
export const AvatarContext = createContext();

export default function App() {

  const [avatar, setAvatar] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [renderAvatar, setRenderAvatar] = useState(0)
  const [authorised, setAuthorised] = useState(false)
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState();


AWS.config.update(awsconfig);

const user = useMemo(() => ({userData, setUserData}),[userData]);
const un = useMemo(() => ({username, setUsername}), [username]);
const av = useMemo(() => ({avatar, setAvatar}), [avatar]);

useEffect(() => {
  checkUser();

}, [username]);

async function checkUser() {
  try {
    const u = await Auth.currentAuthenticatedUser();
    setUsername(u.username);
    setUserData(u);
  }
  catch (err) {
    setUsername(null);
    setUserData(null);
  }
}


useEffect(() => {
  getProfilePicture();
}, [])

const getProfilePicture = async () => {
  if(username != null) {

    const u = await Auth.currentAuthenticatedUser();
    let string_url = u.attributes.sub + ".jpeg";
    Storage.get(string_url).then(url => {
      var r = new Request(url);
      fetch(r).then(function(response) {
        if (response.status === 200) {
          setAvatar(url);
        }
      });
    }); 
  } 
};

return (
    <AvatarContext.Provider value = {av}>
      <UsernameContext.Provider value = {un}>
        <UserDataContext.Provider value = {user}>
            <BrowserRouter>
                <RouterComponent />
            </BrowserRouter>
          </UserDataContext.Provider>
        </UsernameContext.Provider>
      </AvatarContext.Provider>
    );
}

