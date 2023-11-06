import * as React from 'react';
import {AppBar, Box, Toolbar,
  IconButton, Typography, Tooltip, Avatar,
   ListItemButton, ListItem, List,
   ListItemText, Drawer, useScrollTrigger,
    Slide, useMediaQuery} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import AppMenu from './AppMenu';
import { useState, useContext, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';
import Sidebar from './Sidebar';

const logo = "/assets/FullLogoWhite.svg";

const sticky = {
  position: 'sticky'
};


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const AppNavBar = (props) => {
  

  return (
    <HideOnScroll >
      <AppBar style={sticky}>
        <Toolbar style={{display:"inline-grid", paddingTop:'10px', gridTemplateColumns:"60px auto 60px"}} >
          {/* MENU */}
          <Sidebar pages={props.pages} />
          {/* LOGO */}
          <Typography style= {{gridColumnStart:'2', justifySelf:'center'}} variant="h6">
            <Link to="/">
              <img src={logo} width="100em" alt="Yaffle"/>
            </Link>
          </Typography>

          {/* AVATAR */}
          <ProfilePicture settings={props.settings} />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
};
export default AppNavBar;
