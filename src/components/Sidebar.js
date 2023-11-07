import {useContext, useState} from 'react'
import { UserDataContext } from '../App';
import { IconButton, ListItemButton, ListItemText, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = (props) => {
    const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (b) => {
    setDrawer(b);
  };


  console.log(props.pages)
  return (

    <div style={{gridColumnStart:'1'}}>
            <IconButton alignitems="center" color="inherit" aria-label="menu" onClick={() => {toggleDrawer(true)}}>
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
                    <div key = {index}>

                        <ListItem>
                            {text != "Messageboard" && text != "Transfers" && (
                                <Link 
                                to={"/" + text}
                                style={{ textDecoration: 'strong', color: "#0c3914" }}
                                key={text}
                                >
                                
                                <ListItemButton onClick={() => {toggleDrawer(false)}}>
                                <ListItemText primary={text}/>
                                </ListItemButton>
                        </Link>

                            )}
                            {(text == "Messageboard" || text == "Transfers") && (
                                <ListItemButton disabled onClick={() => {toggleDrawer(false)}}>
                                <ListItemText primary={text}/>
                                </ListItemButton>

                            )}
                            </ListItem>
                    </ div>
                ))}
            </List>
        </Drawer>
        </div>
  );
}

export default Sidebar