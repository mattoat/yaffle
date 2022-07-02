import React, {useContext, useEffect, useState} from "react";
import AppNavBar from "../../components/AppNavBar";
import {Auth, Storage} from 'aws-amplify';
import {Outlet} from "react-router-dom"
import { BContext } from "../../RouterComponent";
import {AvatarContext, SetAvatarContext} from '../../RouterComponent';

export default function Layout() {
    
    const initSettings = ['Sign Up / Log In'];
    const initPages = [];

    
    const [pages, updatePages] = useState(initPages)
    const [settings, updateSettings] = useState(initSettings)
    
    const avatar = useContext(AvatarContext);
    const setAvatar = useContext(SetAvatarContext);
    const b = useContext(BContext);
  


  useEffect(() => {
    if(b) {
        updatePages(['rules', 'leaderboard', 'leagues'])
        updateSettings(['Profile', 'Log Out'])
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