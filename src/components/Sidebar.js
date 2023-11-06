import {useContext, useState} from 'react'
import { UserDataContext } from '../App';
import { IconButton, ListItemButton, ListItemText, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = (props) => {
    const [drawer, setDrawer] = useState(false);


  const {userData, setUserData} = useContext(UserDataContext)

  const toggleDrawer = (b) => {
    setDrawer(b);
  };

  let matches = false;
  if (userData != null) {
    matches = true
    console.log(userData)
  }


  return (
      <div >
        { matches && (
            <div style={{gridColumnStart:'1'}}>
                <IconButton alignItems="center" color="inherit" aria-label="menu" onClick={() => {toggleDrawer(true)}}>
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
        )}
    </div>
  )
}

export default Sidebar