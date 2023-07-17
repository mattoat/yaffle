import { List, ListItem, Typography, Button, Table, TableRow, TableBody, TableHead, TableContainer, Paper, TableCell, CircularProgress } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../App";
import Firebase from "./firebase/Firebase";

const leagues = require( "../Leagues.json")
const badgeURL = "https://media.api-sports.io/football/";


const ReviewTeamsPage = (props) => {

    const {teamNames, teamIDs} = props
    const l = Object.keys(teamIDs).length
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0); // 0 for incomplete selection, 1 for complete selection, 2 for submitted 
    const [fullyComplete, setFullyComplete] = useState(false);
    const {userData, setUserData} = useContext(UserDataContext);
    let teamIDsArray = Object.entries(teamIDs)

    useEffect(() => {

        if (l == 8) {
            setStage(1)
        }
    }, [])


    const submitTeams = async () => {
        setLoading(true);

        const app = Firebase.app;
        const db = getFirestore(app);

        setUserData(getAuth(app).currentUser);

        const uid = userData.uid;

        const ref = doc(db, "usersCollection", uid);
        await updateDoc(ref, {
            ...teamIDs,
            timestamp: serverTimestamp(),
            teamsSelected: true
        });

        setLoading(false);
        setStage(2);

    }

    return (
        <div >
                {(loading) && (
                    <CircularProgress />
                )}
                {(!loading) && (
                    <div>
                        {(stage == 1) && (
                            <div>
                                <Typography variant="h4">Team Selection</Typography>
                                <br />
                                <Typography variant="body1">
                                    You have selected {teamIDs.length} teams. Review them here before, and then submit, whenever you're ready.
                                </Typography>
                                <Typography color="black" variant="overline">
                                    <b>
                                    Remember, once you click submit you will not be able to change your teams until the January transfer window.
                                    Make sure you are sure of your selection.
                                    </b>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell align="left">League</TableCell>
                                            <TableCell align="left">Team</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {teamIDsArray.map((team, index) => {

                                            let leagueName = Object.keys(leagues)[index];

                                        
                                            return (
                                                <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" component="th" scope="row">
                                                        {leagueName}
                                                    </TableCell>
                                                    <TableCell alight="right" component="th" scope="row">
                                                        {teamNames[team[1]]}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <img src={badgeURL +"teams/" + team[1] + ".png"} style={{ "height": "1.5em"}}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br /> <br />

                                <Button onClick={submitTeams} color="primary" variant="outlined">Submit Teams</Button><br /><br />

                            </div>
                        )}
                    </div>
                )}
                {(stage == 0) && (
                    <div>
                        <Typography variant="h4">Team Selection</Typography>
                        <Typography variant="body1">You haven't selected all teams yet, go back and select a team from each league to review your selection.</Typography>

                    </div>
                )}
                {(stage == 2) && (
                    <div>
                        <Typography variant="h4">Teams submitted!</Typography> <br />
                        <Typography variant="body1">Congratulations on submitting your teams.</Typography>
                        <br /><br /><br />
                        <Button color="primary" variant="outlined" onClick={() => {props.setSelectedTeams(true)}}>Complete Registration</Button>
                    </ div>
                )}
        </div>
    );
}

export default ReviewTeamsPage