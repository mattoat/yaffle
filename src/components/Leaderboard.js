import {query, collection, where, getFirestore, getDocs, orderBy} from "firebase/firestore";
import Firebase from "./firebase/Firebase";
import { Typography, Paper, CircularProgress, Table, TableCell, TableRow, Grid,
    TableHead, TableContainer, TableBody, useMediaQuery} from '@mui/material';
import Page from "./Page";
import leagues from "../Leagues.json";
import LeaderboardRow from '../pages/nav/Leaderboard/LeaderboardRow';
import {useState, useEffect} from "react";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery('(max-width: 600px)'); 

    const db = getFirestore(Firebase.app);

    const getLeaderboard = async (callback) => {

        const leaderboardRef = collection(db, "leaderboard");

        const q = query(leaderboardRef, orderBy("points", "desc"), orderBy("gd", "desc"));
        
        const querySnapshot = await getDocs(q);
            
        const results = querySnapshot.docs.map((doc) => doc.data());
            
            // add total gd, games played and points to the userObj

        callback(results);
    }

    useEffect(() => {

        getLeaderboard((results) => {
            
            setLoading(false);
            setLeaderboard(results);
            // console.log(leaderboard)
        });
        
    }, []);

    return (
        <Page>
        <br />
        <Typography variant='h4'>Leaderboard.</Typography>
        <br />
        <div>
            {(!loading) && (
                <div>
                    {(isMobile) && (
                        <TableContainer component={Paper}>
                            <Table aria-label="leaderboard table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="left">Rank</TableCell>
                                        <TableCell align="left"></TableCell>
                                        {/* <TableCell align="left">User</TableCell> */}
                                        <TableCell align="center">Played</TableCell>
                                        <TableCell align="center">GD</TableCell>
                                        <TableCell align="center">Points</TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {(leaderboard.map((entry, index) => {
                                    return (
                                        <LeaderboardRow key={index} index={index + 1} isMobile={isMobile} entry={entry} />
                                )}))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                    {(!isMobile) && (

                                <TableContainer component={Paper}>
                                    <Table aria-label="leaderboard table">
                                        <TableHead >
                                            <TableRow>
                                                <TableCell align="left">Rank</TableCell>
                                                <TableCell align="left"></TableCell>
                                                <TableCell align="left">User</TableCell>
                                                <TableCell align="center">Games Played</TableCell>
                                                <TableCell align="center">Goal Difference</TableCell>
                                                <TableCell align="center">Points</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    <TableBody>
                                        {(leaderboard.map((entry, index) => (
                                            <LeaderboardRow key={index} index={index + 1} isMobile={isMobile} entry={entry}/>
                                        )))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                                )}
                </div>      
                            
            )}
            {(loading) && (
                <CircularProgress />
            )}
        </div>

    </Page>
    )

}

export default Leaderboard;
