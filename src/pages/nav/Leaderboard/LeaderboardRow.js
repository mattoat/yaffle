import { Typography, Box, Collapse, Table, TableCell, TableRow, Accordion, AccordionSummary, AccordionDetails, TableHead, TableContainer, TableBody, Hidden } from '@mui/material';
import {useState} from 'react';
import LeaderboardAvatar from './LeaderboardAvatar';
import Badge from './Badge';


const LeaderboardRow = (props) => {
    const username = props.name;
    const isMobile = props.isMobile;
    const index = props.index;
    const entry = props.entry;
    const badgeURLs = Object.values(entry)
    .filter((value) => typeof value === "object" && value !== null) // Filter out primitive values
    .map((badge) => badge.Badge);
  
    // console.log(badgeURLs);

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
            <>
            {(isMobile) && (
                <>
                    <TableRow onClick={() => toggleOpen()}>
                        <TableCell align="center">{index}</TableCell>
                        <TableCell align="center"><LeaderboardAvatar uid={entry.uid} /></TableCell>
                        <TableCell align="center">{entry.played}</TableCell>
                        <TableCell align="center">{entry.gd}</TableCell>
                        <TableCell align="center">{entry.points}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{overflow:Hidden, paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box >
                                    <Typography variant="h6" fontSize={"12px"} gutterBottom component="div">
                                        {username}
                                    </Typography>
                                    {badgeURLs.map((badgeURL, index) => (
                                        
                                        <Badge key={index} url={badgeURL} />
                                        ))}
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )}
            {(!isMobile) && (
                <>
                <TableRow onClick={() => toggleOpen()}>
                    <TableCell align="center">{index}</TableCell>
                    <TableCell align="left"><LeaderboardAvatar uid={entry.uid} /></TableCell>
                    <TableCell align="left" component="th" scope="row">
                    {username}
                    </TableCell>
                    <TableCell align="center">{entry.played}</TableCell>
                    <TableCell align="center">{entry.gd}</TableCell>
                    <TableCell align="center">{entry.points- entry.offset}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{overflow:Hidden, paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box style={{"marginTop":"10px"}}>
                            {/* <Typography variant="h6" fontSize={"12px"} gutterBottom component="div">
                                {username}
                            </Typography> */}
                            {badgeURLs.map((badgeURL, index) => (

                            <Badge key={index} url={badgeURL} />
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            </>
            )}
            
        </>
    )
}

export default LeaderboardRow;