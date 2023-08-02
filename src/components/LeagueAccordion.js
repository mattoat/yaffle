import React, { useState, useEffect } from 'react';
import { Accordion,Paper, AccordionSummary, AccordionDetails, useMediaQuery, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { collection, query, where, doc, getDocs, getFirestore, orderBy } from "firebase/firestore";  
import { styled } from '@mui/material/styles';
import 'firebase/firestore';
import { tableCellClasses } from '@mui/material/TableCell';
import { themeOptions } from '../styles/theme';

const LeagueAccordion = ( league ) => {
// console.log(league)
  const id = league[0]
  const name = league[1]
  const [expanded, setExpanded] = useState(false);
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(false)

  const db = getFirestore();
  const BADGEURL = "https://media.api-sports.io/football/";
  const docs = [];
  const TTL = 86400000 // 24 hours

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: themeOptions.palette.primary.main,
      color: theme.palette.common.white,
      paddingLeft: 5,
      paddingRight: 5,
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
    setLoading(true);

    const leagueReference = collection(db, "clubs");
    const q = query(leagueReference, where("League", "==", id), orderBy("Rank", "asc"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        docs[doc.data().Rank - 1] = doc.data();
    });
    // docs = Object.values(docs);
    const timestamp = new Date()
    const utc_timestamp = timestamp.getTime();
    const obj = {"timestamp": utc_timestamp, "content": docs};
    localStorage.setItem("league" + id, JSON.stringify(obj));
    setLeagueData(docs);
    setLoading(false);
    console.log(loading);
  }
  
  
  const handleChange = async (event, isExpanded) => {
    setExpanded(isExpanded);  
    setLoading(true);  
    if(!expanded) {
        if (localStorage.getItem("league" + id) != null) {

            const now = new Date().getTime();
            const then = parseInt(JSON.parse(localStorage.getItem("league" + id)).timestamp);

            // If then is greater than now - TTL then the data is not stale, and can be used
            if (then > now - TTL) {
                const cachedLeagueData = JSON.parse(localStorage.getItem("league" + id)).content;
                setLeagueData(cachedLeagueData);
            }
            else { // else the league data is stale and should be removed and fetched again
                localStorage.removeItem("league" + id);
                await getLeagueData();
            }
        }
        else { // if there is no data in the localStorage fetch
            await getLeagueData();
        }
        setLoading(false);
    }
  }
  // if on mobile will return true
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{name}</Typography>
        <img style={{"paddingLeft": "20px"}} height= "30px"  src= {BADGEURL + "leagues/" + id + ".png"} />
      </AccordionSummary>
      <AccordionDetails>
        {loading && 
          (<CircularProgress></CircularProgress>)
        }
        { !loading &&
        (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align='left'>Rank</StyledTableCell>
                    <StyledTableCell align='left'>Club</StyledTableCell>
                    {matches ? null : <>
                    {/* Other columns for larger screens */}
                    <StyledTableCell align='left'>Form</StyledTableCell>
                    <StyledTableCell align='left'>Goals For</StyledTableCell>
                    <StyledTableCell align='left'>Goals Against</StyledTableCell>
                    <StyledTableCell align='left'>Goal Difference</StyledTableCell>
                </>}
                    <StyledTableCell align='left'>Played</StyledTableCell>
                    <StyledTableCell align='left'>Points</StyledTableCell>
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
                    <StyledTableCell align='left'><strong>{row.Name}</strong></StyledTableCell>
                    {matches ? null : <>
                  {/* Other cells for larger screens */}
                  <StyledTableCell align='left'><strong>{row.Form}</strong></StyledTableCell>
                  <StyledTableCell align='left'>{row.GF}</StyledTableCell>
                  <StyledTableCell align='left'>{row.GA}</StyledTableCell>
                  <StyledTableCell align='left'>{row.GD}</StyledTableCell>
                </>}
                    <StyledTableCell align='left'>{row.Played}</StyledTableCell>
                    <StyledTableCell align='left'><strong>{row.Points}</strong></StyledTableCell>
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
