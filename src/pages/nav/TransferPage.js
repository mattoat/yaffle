import {useEffect, useState, useContext} from 'react';
import {Button, Alert, List, Toolbar, AppBar, Card,Slide, Dialog, 
  CircularProgress, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, Stepper, Step, StepLabel } from '@mui/material';
import Firebase from '../../components/firebase/Firebase.js';
import {getFirestore, setDoc, addDoc, updateDoc, collection, doc, getDoc, query, where, getDocs, orderBy, serverTimestamp} from 'firebase/firestore';
import { Box } from '@mui/system';
import Page from '../../components/Page';
import {styles} from '../../styles/styles';
import { UserDataContext } from '../../App';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Badge from './Leaderboard/Badge';
import { SyncAlt } from '@material-ui/icons';

const leagues = require ( "../../Leagues.json");
const LEAGUE_URL = "https://media.api-sports.io/football/leagues/";

export default function TransferPage() {
  let [loading, setLoading] = useState(false);
  const [extraData, setExtraData] = useState({});
  const [showModal, setShowModel] = useState(false);
  const {userData, setUserData} = useContext(UserDataContext);
  const [activeStep, setActiveStep] = useState(0);
  const [teamOut, setTeamOut] = useState(null);
  const [username, setUsername] = useState(null);
  const [teamIn, setTeamIn] = useState(null);
  const [numberOfTransfers, setNumberOfTransfers] = useState(0);
  const [leagueTransfer, setLeagueTransfer] = useState([]);
  const [userOffset, setUserOffset] = useState(0);
  
  const steps = ['Transfer Out', 'Transfer In', 'Confirm'];
  const leagueIDs = Object.keys(leagues)
  

  const handleConfirm = async () => {
    let newOffset = userOffset + teamOut.Points - teamIn.Points;
    let newClub = teamIn.ID;
    let leagueID = teamIn.League;
    const transferLog = {
      timestamp: serverTimestamp(),
      league: leagueID,
      teamIn: teamIn,
      teamOut: teamOut,
      uid: userData.uid
    }
    const db = getFirestore(Firebase.app);
    const logRef = await addDoc(collection(db, "transferlogs"), transferLog);

    console.log("Transfer logged: " + logRef.id);

    const userRef = doc(db, "usersCollection", userData.uid);

    await updateDoc(userRef, {
      offset: newOffset,
      [`${leagueID}`]: newClub,
      transfers: numberOfTransfers + 1
    })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getLeague = async(club) => {
    const db = getFirestore(Firebase.app);
    const q = query(collection(db, "clubs"), where("League", "==", club.League), orderBy("Rank", "asc"));
    const querySnapshot = await getDocs(q);
    let league = [];
    querySnapshot.forEach((doc) => {
        const team = doc.data();
        let teamData = {
            "Badge": team.Badge,
            "ID": team.id,
            "Name": team.Name,
            "Points": team.Points,
            "Position": team.Rank,
            "Played": team.Played,
            "League": club.League
        };
        league.push(teamData);
    });
    setLeagueTransfer(league);
    return league;
  }

  const getUser = async () => {
    const db = getFirestore(Firebase.app);
    const reference = doc(db, 'usersCollection/' + userData.uid);
    const docSnap = await getDoc(reference);

    if (docSnap.exists()) {
      const d = docSnap.data();
        let extraData = {};

        for (const id of Object.keys(leagues)) {
            const leagueCollection = "league" + id;
            const selectedTeam = d[id];
            const q = query(collection(db, "clubs"), where("id", "==", selectedTeam));
            const querySnapshot = await getDocs(q);

            extraData[id] = {};

            querySnapshot.forEach((doc) => {
                const team = doc.data();
                extraData[id] = {
                    "Badge": team.Badge,
                    "ID": team.id,
                    "Name": team.Name,
                    "Points": team.Points,
                    "Position": team.Rank,
                    "Played": team.Played
                };
            });
        }
        setUserOffset(d.offset);
        setUsername(d.username);
        if (d.transfers != undefined) {
          setNumberOfTransfers(d.transfers);
        }

        return extraData;
    }

    return null; // Return null or appropriate value if no data
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = {}; // your user data
      const leagues = {}; // your leagues data
      const data = await getUser(userData, leagues);
      if (data) {
          setExtraData(data);
        }
      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, []);
  
  const displayTransfers = () => {
    setShowModel(true);
  }
  const handleSelectIn = async (club) => {
    console.log()
  }
  const handleSelectOut = async (club) => {
    setLoading(true);

    let league = await getLeague(club);

    setLeagueTransfer(league);
    setLoading(false);
    
  }
  const handleClose = () => {
    setShowModel(false);
    handleReset()
  }
  const makeTransfer = async () => {
    setLoading(true);

    displayTransfers();

    setLoading(false);
  }

  const currentDate = new Date();
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-02-08');
  const isWithinDateRange = currentDate >= startDate && currentDate <= endDate;

    if (!showModal) {

      return(
        <Page>
                <br />
              <Card style={styles.card}>
              <Typography variant="h4">Transfers.</Typography>
              <br />
              <Typography variant='h6'>The transfer window is open</Typography>
              <Typography variant='body1'>Choose any of your teams that are letting 
              you down and instantly switch them out for a team you have more hope for!</Typography>
              <Card style={styles.card} >
                <br />
                <Typography variant='body1'>
                  <strong>Conditions of transfers:</strong>
                </Typography>
                <Typography variant='body1' style={{'width':"80%","display":"inline-block","textAlign":"left" }}>
                    <li>Players can only make two transfers.</li>
                    <li>The club you switch to must have played the same number of games (or more). </li>
                    <li>Points are only gained from transfers after they play games - you can't just inherit the points from top of the league clubs. In fact, you may be better off switching to a bottom of the league team if they earn more points for the rest of the season.</li>
                    <li>Players gain points from their new team immediately after making the transfer.</li>
                </Typography>
                <br />
                {!loading && isWithinDateRange && numberOfTransfers < 2 && (

                  <Button variant="contained" onClick={() => {makeTransfer()}}>Make Transfer</Button>
                )}
                {loading && (
                  <CircularProgress />
                )}
                {!isWithinDateRange && (
                  <Alert severity='error' >The deadline to make transfers has passed.</Alert>
                )}
                {numberOfTransfers >= 2 && (
                  <Alert severity='error' >You have made the maximum number of transfers.</Alert>
                )}
                <br />
                <br />
              </Card>
              </Card>
            </Page>
        );
      } 
      else {
        return (
          <Dialog
        fullScreen
        open={showModal}
        onClose={() => {}}
        TransitionComponent={Transition}
      >
                <AppBar sx={{ position: 'relative' }} >
                  <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                    <Typography variant='h6'>Transfer</Typography>
                  </Toolbar>

                </AppBar>
                  <Page >
                    <br />
                    <Typography variant='h6' >
                        Select the team you'd like to transfer out:
                      </Typography>
                      <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    {activeStep == 0 && (
                      <div >
                      <List component="nav" aria-label="main mailbox folders">
                        {leagueIDs.map((leagueID) => (
                          <ListItemButton onClick={() => {
                            let club = {...extraData[leagueID], League: leagueID};
                            console.log(club)
                            setTeamOut(club); 
                            handleSelectOut(club); 
                            handleNext()
                            }} key={leagueID}>
                            <ListItemIcon>
                              <Badge club={extraData[leagueID]}/>
                            </ListItemIcon>
                            <ListItemText primary={extraData[leagueID]['Name']} secondary={"Position: " + extraData[leagueID]["Position"] + " Points: " + extraData[leagueID]["Points"]}/>
                          </ListItemButton>
                        ))}
                        
                      </List>
                    </ div>
                    )}
                    {activeStep == 1 && (leagueTransfer.length > 0) && (
                      <div> 
                        <br />
                        <Typography variant='body'>
                          You have Selected {teamOut.Name}, who have played <strong>{teamOut.Played} matches</strong>, and are currently on <strong>{teamOut.Points} points</strong>. You can only select teams 
                          that have played the same number of games or more.
                        </Typography>
                        <List component="nav" aria-label="main mailbox folders">
                        {leagueTransfer.map((club) => {
                          if (teamOut.Played > club.played) return (
                          <ListItemButton disabled key={club["ID"]} onClick={() => {
                            setTeamIn(club); 
                            handleSelectIn(club); 
                            handleNext()
                            }}>
                            <ListItemIcon>
                              <Badge club={club}/>
                            </ListItemIcon>
                            <ListItemText primary={club["Name"]} secondary={"Position: " + club["Position"] + " Points: " + club["Points"]+ " Played: " + club["Played"]}/>
                          </ListItemButton>
                        );
                        else if (club.ID != teamOut.ID) return (
                          <ListItemButton key={club["ID"]} onClick={() => {
                            setTeamIn(club); 
                            handleSelectIn(club); 
                            handleNext()
                            }}>
                            <ListItemIcon>
                              <Badge club={club}/>
                            </ListItemIcon>
                            <ListItemText primary={club["Name"]} secondary={"Position: " + club["Position"] + " Points: " + club["Points"]+ " Played: " + club["Played"]}/>
                          </ListItemButton>
                        )})}
                        
                      </List>
                     </div>

                    )}
                    {activeStep == 2 && (
                      <div>
                        <br />
                        <Typography variant='h5' color={"#318013"}><strong>Confirm Transfer?</strong></Typography>
                        <br /> 
                        <br /> 
                        <br /> 
                        <Typography variant='body' >Remember, you can only transfer twice during this window.</Typography>
                        <br /> <br />

                        {/* <Typography variant='h6' >You are transferring {teamOut.Name} for {teamIn.Name}. If this is correct, press confirm choice.</Typography> */}
                        
                        <br />
                        <Alert severity="info">You are transferring {teamOut.Name} for {teamIn.Name}. If this is correct, press confirm choice.</Alert>
                        <br />
                        <Alert severity="warning">You will not be able to reverse this action.</Alert>
                        <br />
                        <div >
                          <Badge club={teamOut} />
                          <SyncAlt />
                          <Badge club={teamIn} />
                        </div>
                        <br />
                        <Button onClick={() => {handleConfirm()}} variant="contained">Confirm</Button>
                      </div>
                    )}
                    {activeStep > 0 && (
                      <Button onClick={handleBack}>
                        Back
                      </Button>
                    )}
                    
                  </Page>

      </Dialog>
        )
      }
}