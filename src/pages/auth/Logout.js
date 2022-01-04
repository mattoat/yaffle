import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import {Auth} from 'aws-amplify'
import { SetBContext } from '../../RouterComponent';
import { BContext } from '../../RouterComponent';

export default function Logout() { 

  const setB = useContext(SetBContext)
  const b = useContext(BContext)
  async function logout() {
    try {
        setB(false)
        Auth.signOut();
        console.log("Signed out")

    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  useEffect(() => {
    logout()
  }, [])
  
    return (
      <Page>
          <h1>Logged out.</h1>
          <p>You are now logged out. To access more of Yaffle's feature's you will need to <Link to="/login">log back in.</Link></p>
      </Page>
    );
}