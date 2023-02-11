import React, {useContext, useEffect, useState} from "react";
import AppNavBar from "../../components/AppNavBar";
import {Outlet} from "react-router-dom"
import { UserDataContext, UsernameContext } from "../../App";


export default function Layout(props) {
    
    const initSettings = ['Sign Up / Log In'];
    const initPages = [];

    const [pages, updatePages] = useState(initPages)
    const [settings, updateSettings] = useState(initSettings)

    const {username, setUsername} = useContext(UsernameContext);

  useEffect(() => {
    
    if(username != null) {
        updatePages(['rules', 'leaderboard', 'leagues'])
        updateSettings(['Profile', 'Log Out'])
    }
    else{
      console.log("Clearing navbar options")
        updateSettings(initSettings)
        updatePages(initPages)
    }
  },[username]);

    return (
        <div>
        <AppNavBar pages={pages} settings={settings} />
        {props.children}
        <Outlet />
      </div>
      );
      
}