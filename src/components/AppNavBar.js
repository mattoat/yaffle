import * as React from 'react';
import {AppBar, Box, Toolbar,
  IconButton, Typography, Menu,
   Container, Avatar, Button,
   Tooltip, MenuItem, useScrollTrigger,
    Slide} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import AppMenu from './AppMenu';
import { useState, useContext, useEffect } from 'react';
import {AvatarContext} from '../App';

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

  const {avatar, setAvatar} = useContext(AvatarContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

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
              <img src={logo} width="100em" alt="Yaffle"/>
            </Link>
          </Typography>

          {(<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                <Link key={page} to= {'/' + page}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.charAt(0).toUpperCase() + page.slice(1)}</Typography>
                  </MenuItem>
                </Link>
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
          <Box style={{paddingRight:'30px'}}>
            <h3>{props.un}</h3>
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
