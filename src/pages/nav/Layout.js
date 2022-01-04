import React, {useContext, useEffect, useState} from "react";
import AppNavBar from "../../components/AppNavBar"
import {Outlet} from "react-router-dom"
import { BContext } from "../../RouterComponent";

export default function Layout() {
    
    const initSettings = ['Sign Up / Log In'];
    const initPages = [];

    
    const [pages, updatePages] = useState(initPages)
    const [settings, updateSettings] = useState(initSettings)
    
    const b = useContext(BContext);
    

  useEffect(() => {
    if(b) {
        console.log("navbar authenticated")
        updatePages(['rules', 'leaderboard', 'leagues'])
        updateSettings(['Profile', 'Account', 'Log Out'])
    }
    if(!b){
        updateSettings(initSettings)
        updatePages(initPages)
    }
},[b]);
    return (
        <div>
          {
            (b) && (
                <AppNavBar pages={pages} settings={settings}></AppNavBar>)
          }
          {
            (!b) && (
                <AppNavBar pages={pages} settings={settings} />
            )
          }
        
        <Outlet />
      </div>
      );
      
}