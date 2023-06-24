import Page from '../../components/Page';
import { Link, useLocation, Navigate} from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { UserDataContext} from '../../App';
import {getAuth} from 'firebase/auth';

import { CircularProgress } from '@mui/material';


export default function Logout() { 
  
  const [signedOut, setSignedOut] = useState(0) // 0 for loading, 1 for signed out, 2 for error
  
  
  async function logoutUser() {

    console.log("signed out " + signedOut)
    if (signedOut == 0) {
      let auth = getAuth();
      auth.signOut();
      setSignedOut(1);
    }
    else {
      setSignedOut(2);
    }
  }
  useEffect(() => {
    logoutUser();
  },[])

    return (
      <Page>
        {(signedOut == 1) && (
            <div>
              <h1>Logged out.</h1>
              <p>You are now logged out. To access more of Yaffle's features you will need to <Link to="/login">log back in.</Link></p>
            </div>
          )}
          {signedOut == 0 && (
            <div>
              <CircularProgress />
            </div>
          )}
      </Page>
    );
}