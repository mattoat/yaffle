import Page from '../../components/Page';
import { Link, useLocation, Navigate} from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import {Auth} from 'aws-amplify'
import { UserDataContext, UsernameContext } from '../../App';

export default function Logout() { 
  let location = useLocation();


  const {userData, setUserData} = useContext(UserDataContext);
  const {username, setUsername} = useContext(UsernameContext);
  
  async function logout() {
    try {
      await Auth.signOut();
        setUserData(null);
        setUsername(null);
        console.log("Signed out")

        let from = location.state?.from?.pathname || "/";
        return <Navigate to="/" state={{ from: location }} replace />;

    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  useEffect(() => {
    logout()
  },[])
  

    return (
      <Page>
          <h1>Logged out.</h1>
          <p>You are now logged out. To access more of Yaffle's feature's you will need to <Link to="/login">log back in.</Link></p>
      </Page>
    );
}