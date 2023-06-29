import React, { useState, useEffect } from 'react';
import { Accordion,Paper, AccordionSummary, AccordionDetails, useMediaQuery, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { collection, query, where, doc, getDocs, getFirestore, orderBy } from "firebase/firestore";  
import { styled } from '@mui/material/styles';
import 'firebase/firestore';
import { tableCellClasses } from '@mui/material/TableCell';
import { themeOptions } from '../styles/theme';

const LeagueAccordion = ( data ) => {
  const [expanded, setExpanded] = useState(false);
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(true)

  const db = getFirestore();
  const BADGEURL = "https://media.api-sports.io/football/";
  const docs = [];
  const TTL = 86400000 // 24 hours

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: themeOptions.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const getLeagueData = async () => {

    const leagueReference = collection(db, "league" + data.id);
    const q = query(leagueReference, orderBy("Rank", "asc"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        docs[doc.data().Rank - 1] = doc.data();
    });
    // docs = Object.values(docs);
    const timestamp = new Date()
    const utc_timestamp = timestamp.getTime();
    const obj = {"timestamp": utc_timestamp, "content": docs};
    localStorage.setItem("league" + data.id, JSON.stringify(obj));
    setLeagueData(docs);
  }
  
  
  const handleChange = async (event, isExpanded) => {
    setExpanded(isExpanded);  
    // setLoading(true);  
    console.log(loading);
    if(!expanded) {

        const now = new Date().getTime();
        if (localStorage.getItem("league" + data.id)) {
            if (localStorage.getItem("league" + data.id).timestamp >= now - TTL) {
                const cachedLeagueData = localStorage.getItem("league" + data.id).content;
                setLeagueData(cachedLeagueData);
            }
            else {
                localStorage.removeItem("league" + data.id);
            }
        }
        else {
            console.log("Fetching from db")
            getLeagueData();
        }
    }
    setLoading(false);
  }
  // if on mobile will return true
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{data.name}</Typography>
        <img style={{"paddingLeft": "20px"}} height= "30px"  src= {BADGEURL + "leagues/" + data.id + ".png"} />
      </AccordionSummary>
      <AccordionDetails>
        {loading ? 
          (<CircularProgress></CircularProgress>)
         : 
        //  ( <p>{JSON.stringify(leagueData)}</p>)
        (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align='center'>Rank</StyledTableCell>
                    <StyledTableCell align='center'>Club</StyledTableCell>
                    {matches ? null : <>
                    {/* Other columns for larger screens */}
                    <StyledTableCell align='center'>Form</StyledTableCell>
                    <StyledTableCell align='center'>Goals For</StyledTableCell>
                    <StyledTableCell align='center'>Goals Against</StyledTableCell>
                    <StyledTableCell align='center'>Goal Difference</StyledTableCell>
                </>}
                    <StyledTableCell align='center'>Points</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {leagueData.map((row) => (
                    <StyledTableRow
                    key={row.Rank}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <StyledTableCell component="th" scope="row">
                        {row.Rank}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{row.Name}</StyledTableCell>
                    {matches ? null : <>
                  {/* Other cells for larger screens */}
                  <StyledTableCell align='center'>{row.Form}</StyledTableCell>
                  <StyledTableCell align='center'>{row.GF}</StyledTableCell>
                  <StyledTableCell align='center'>{row.GA}</StyledTableCell>
                  <StyledTableCell align='center'>{row.GD}</StyledTableCell>
                </>}
                    <StyledTableCell align='center'>{row.Points}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default LeagueAccordion;
