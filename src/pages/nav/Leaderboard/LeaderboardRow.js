import { Typography, Paper, CircularProgress, Table, TableCell, TableRow, Accordion, AccordionSummary, AccordionDetails, TableHead, TableContainer, TableBody } from '@mui/material';
import {useState} from 'react';
const LeaderboardRow = (props) => {
    const username = props.name;
    const isMobile = props.isMobile;
    const entry = props.entry;
    return (
            <>
            {(isMobile) && (
                <TableRow>
                    <TableCell align="center">
                    </TableCell>
                    <TableCell align="center">{entry.played}</TableCell>
                    <TableCell align="center">{entry.gd}</TableCell>
                    <TableCell align="center">{entry.points}</TableCell>
                </TableRow>
            )}
            {(!isMobile) && (
                <TableRow>
                    <TableCell align="left" component="th" scope="row">
                    {username}
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{entry.played}</TableCell>
                    <TableCell align="center">{entry.gd}</TableCell>
                    <TableCell align="center">{entry.points- entry.offset}</TableCell>
                    
                </TableRow>
            )}
            
        </>
    )
}

export default LeaderboardRow;