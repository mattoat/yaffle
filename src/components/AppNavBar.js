import * as React from 'react';
import {AppBar, Toolbar, Typography, useScrollTrigger,
    Slide} from '@mui/material/';
import { Link } from 'react-router-dom';
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
