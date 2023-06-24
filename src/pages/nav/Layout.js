import React, {useContext, useEffect, useState} from "react";
import AppNavBar from "../../components/AppNavBar";
import {Outlet} from "react-router-dom"
import { UserDataContext} from "../../App";
import {getAuth, onAuthStateChanged} from "firebase/auth";


export default function Layout(props) {
    
    const initSettings = ['Sign Up / Log In'];
    const initPages = [];

    const [pages, updatePages] = useState(initPages)
    const [settings, updateSettings] = useState(initSettings)

    const {userData, setUserData} = useContext(UserDataContext);

    const auth = getAuth();
    useEffect(() => {

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUserData(user)
          
        } 
        else {
          // User is signed out
          
          setUserData(null);
        }
      });

    } );

      
  useEffect(() => {
    
    if(userData != null) {
        updatePages(['rules', 'leaderboard', 'leagues'])
        updateSettings(['Profile', 'Log Out'])
    }
    else{
      console.log("Clearing navbar options: " + userData)
        updateSettings(initSettings)
        updatePages(initPages)
    }
  },[userData]);

    return (
        <div>
        <AppNavBar pages={pages} settings={settings} />
        {props.children}
        <Outlet />
      </div>
      );
      
}