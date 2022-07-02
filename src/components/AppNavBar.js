import * as React from 'react';
import {AppBar, Box, Toolbar,
  IconButton, Typography, Menu,
   Container, Avatar, Button,
   Tooltip, MenuItem, useScrollTrigger,
    Slide} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import AppMenu from './AppMenu';
import { Auth, Storage } from 'aws-amplify';
import { BContext, AvatarContext, SetAvatarContext} from '../RouterComponent'
import { useState, useContext, useEffect } from 'react';

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
  const [showBurger, setShowBurger] = useState(true)
  const location = useLocation()
  const [un, setUn] = useState("")
  const b = useContext(BContext)
  const avatar = useContext(AvatarContext)
  const setAvatar = useContext(SetAvatarContext)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

  const getUsername = async () => {
    if(b) {
      const {username} = await Auth.currentAuthenticatedUser();
      return username
    }
    else {
      setAvatar(undefined)
      return("");
    }
  }

  useEffect(() => {
    let isMounted = true;     
    getUsername().then((username) => {
      if(isMounted) setUn(username);
    })
    return () => { isMounted = false };
  })


  return (  
    <HideOnScroll {...props} >
    <AppBar style={sticky} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to="/">
              <img src={logo} alt="image" width="100em" alt="Yaffle"/>
            </Link>
          </Typography>

          {showBurger && (<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to= {'/' + page}>
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
              
            </Menu>
          </Box>)}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/">
              <img src={logo} float="center" alt="image" width="100em" alt="Yaffle"/>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page) => (
              <Button
                href={'/'+ page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box style={{paddingRight:'50px'}}>
            <h3>{un}</h3>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={avatar} alt="User settings" />
              </IconButton>
            </Tooltip>
            <AppMenu settings={props.settings} handleCloseNavMenu={handleCloseNavMenu} setAnchorElUser={setAnchorElUser} anchorElUser={anchorElUser} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </HideOnScroll>

  );
};
export default AppNavBar;
