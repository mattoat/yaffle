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
import {AvatarContext} from '../App';
import {getProfilePicture} from '../components/firebase/ProfilePicture'
import { UserDataContext } from '../App';
import { unstable_getScrollbarSize } from '@mui/utils';
import { styles } from '../styles/styles';

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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const {avatar, setAvatar} = useContext(AvatarContext);

  useEffect(() => {
    // Fetch the profile picture from local storage or Firebase
    setAvatar(getProfilePicture());    
  }, [avatar]);


  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // const {avatar, setAvatar} = useContext(AvatarContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
      setAnchorElNav(null);
  };

  const toggleDrawer = (b) => {
    setDrawer(b);
  };

  return (
    <HideOnScroll >
      <AppBar style={sticky} >
        <Toolbar >
          {/* MENU */}
            <div>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {toggleDrawer(true)}}>
                <MenuIcon />
              </IconButton>
              <Drawer
                style={{"color": "#d06100"}}
                anchor={'left'}
                open={drawer}
                onClose={ () => {toggleDrawer(false)}}
              >
                <List>
                  {props.pages.map((text, index) => (
                    <Link 
                        to={"/" + text}
                        style={{ textDecoration: 'strong', color: "#0c3914" }}
                        key={text}
                        >
                    <ListItem>
                      <ListItemButton onClick={() => {toggleDrawer(false)}}>
                          <ListItemText primary={text}/>
                      </ListItemButton>
                    </ListItem>
                        </Link>
                  ))}
                </List>
              </Drawer>
            </div>

          {/* LOGO */}
          <Typography variant="h6" sx={{ marginTop: "10px", flexGrow: 1, textAlign: 'center' }}>
            <div style={{display: "none"}} >
              Yaffle
            </div>
              <Link to="/">
                 <img src={logo} width="100em" alt="Yaffle"/>
               </Link>
          </Typography>

          {/* AVATAR */}
          <Box style={{paddingRight:'-30px'}}>
             <h3>{props.un}</h3>
           </Box>
           <Box sx={{ position: 'absolute',height:'60px', right: '15px' }}>
             <Tooltip title="Open settings">
               <IconButton onClick={handleOpenUserMenu} style={{"overflow":"hidden", "border":"1px solid #ff8d26"}} sx={{ p: 0 }}>
               <img src={avatar} style={{height:"60px", width:"60px"}}/>
             </IconButton>
             </Tooltip>
             <AppMenu settings={props.settings} handleCloseNavMenu={handleCloseNavMenu} setAnchorElUser={setAnchorElUser} anchorElUser={anchorElUser} />
           </Box>

        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
};
export default AppNavBar;
