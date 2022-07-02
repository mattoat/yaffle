import * as React from 'react';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';



export default function AppMenu (props) {


    const handleCloseUserMenu = () => {
        props.setAnchorElUser(null);
      };


    return(
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={props.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(props.anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {props.settings.map((setting) => (
                <Link key={setting} to={'/' + setting.replace(new RegExp(' ', 'g'), '_')}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
    )}