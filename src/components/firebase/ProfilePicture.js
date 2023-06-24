import React, { useState, useEffect, useContext } from 'react';
import {getAuth} from 'firebase/auth';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {Avatar} from '@mui/material';
import { UserDataContext } from '../../App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function ProfilePicture(props) {
  const [profilePic, setProfilePic] = useState('');

  const {userData, setUserData} = useContext(UserDataContext);

  let pic = null;

  // check if image is in local storage
  if (localStorage.getItem('profilePic')) {
    pic = localStorage.getItem('profilePic');
    console.log("Url = " + pic)
  } else {
    // if not in local storage, fetch from firebase

    if (userData.photoURL != null) {
        // if url is in user credentials
        const url = userData.photoURL;
        console.log(url)
        localStorage.setItem('profilePic', url)
    }
    else {
        // not in user credentials so return default
        return <AccountCircleIcon />
    }
    let pic = localStorage.getItem('profilePic');
    setProfilePic(pic);
}

  // return an img element with the profile picture as the source
  return <Avatar src={pic} alt="User settings" />;
}
