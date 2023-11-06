import {AvatarContext} from '../App';
import {useContext, useState, useEffect} from 'react'
import { getProfilePicture } from './firebase/ProfilePicture';
import { Tooltip, IconButton, Box } from '@mui/material';
import AppMenu from './AppMenu';

const ProfilePicture = (props) => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const {avatar, setAvatar} = useContext(AvatarContext);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleCloseNavMenu = () => {
          setAnchorElNav(null);
      };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


  useEffect(() => {
    // Fetch the profile picture from local storage or Firebase
    setAvatar(getProfilePicture());    
  }, [avatar]);

    return (
        <Box style= {{gridColumnStart: '3'}} sx={{ position: 'absolute', height:'60px', right: '15px' }}>
             <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} style={{"overflow":"hidden", "border":"1px solid #ff8d26"}} sx={{ p: 0 }}>
                <img src={avatar} style={{height:"60px", width:"60px"}}/>
              </IconButton>
             </Tooltip>
             <AppMenu settings={props.settings} handleCloseNavMenu={handleCloseNavMenu} setAnchorElUser={setAnchorElUser} anchorElUser={anchorElUser} />
           </Box>
    )

}

export default ProfilePicture