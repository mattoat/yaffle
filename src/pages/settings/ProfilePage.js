import React, { useEffect, useState, useContext } from 'react';
import Page from '../../components/Page';
import styled from '@emotion/styled';
import { styles } from '../../styles/styles'; //styles={styles.alignLeft}
import { useMediaQuery , Card, TextField, Button, LinearProgress, Alert,Table,TableBody,TableContainer,Modal,TableRow,TableCell,Paper,TableHead, CircularProgress, Typography} from '@mui/material';
import imageCompression from 'browser-image-compression';
import { green } from '@mui/material/colors';
import {UserDataContext, AvatarContext} from '../../App';
import {getFirestore, collection, doc, getDoc, query, where, getDocs} from 'firebase/firestore';

import Firebase from '../../components/firebase/Firebase.js';
import { setProfilePicture } from '../../components/firebase/ProfilePicture.js';
import { getAuth } from 'firebase/auth';



const leagues = require ( "../../Leagues.json")


const Title = styled.h3`
    float:left;
`
const Line = styled.div`
    display: grid;
    text-align:left;
    padding: 10px;
`
const PictureFrame = styled.div`
    float: center;
    border: 3px solid #ff8d26;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin: 20px;
    display: inline-block;
    overflow: hidden;
    position: relative;
    opacity: 1;
    &:hover {
        opacity: 40%; 
        cursor: pointer;
      }
      
`

const imgStyle = {
    objectFit:'contain',
    width:'200px',
    height: '200px',
}

export default function ProfilePage() {
    
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [extraData, setExtraData] = useState({});
    
    const {userData, setUserData} = useContext(UserDataContext);
    const {avatar, setAvatar} = useContext(AvatarContext);
    
    const getUser = async () => {
        setLoading(true);
        const db = getFirestore(Firebase.app);

        setDisplayName(userData.displayName);
        setEmail(userData.email);
        setUserName(userData.username);

        const reference = doc(db, 'usersCollection/' + userData.uid);

        await getDoc(reference).then((docSnap) => {

            if (docSnap.exists()) {
                const d = docSnap.data();
                setUserName(d.username);
                
                Object.keys(leagues).forEach(async (id) => {

                    const leagueCollection = "league" + id;
                    const selectedTeam = d[id];
                    
                    const q = query(collection(db, "clubs"), where("id", "==", selectedTeam));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        
                        setExtraData((prevExtraData) => {
                            const updatedData = { ...prevExtraData, [`${id}`]: {} };
                            querySnapshot.forEach((doc) => {
                              const team = doc.data();
                              updatedData[`${id}`][team.Name] = {
                                "Name": team.Name,
                                "Points": team.Points,
                                "Position": team.Rank
                              };
                            });
                            return updatedData;
                          });
                    });
                });
                setLoading(false);
            }
        })
        // The user object has basic properties such as display name, email, etc.
    }
      
    useEffect(async () => {

        await getUser();
    }, []);

    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
        fileInput.current.click();
    };

    const onProcessFile = async (e) => {
        setImageLoading(true);
        e.preventDefault();

        let file = e.target.files[0];

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920
          }


          try {
            file = await imageCompression(file, options);
            // console.log(file.size/1024/1024);
          } catch (error) {
            console.log(error);
          }
          // UPLOAD PICTURE TO FIREBASE
          await setProfilePicture(file, (url) => {
              
              console.log(url);
              setAvatar(url);
              setImageLoading(false);
            });  
            setImageLoading(false);
        }

    const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));


    return(
        <Page>
            <br />
            <Typography textAlign={'center'} variant={'h4'}>Profile</Typography>
                        <PictureFrame >
                        {(loading) && (
                            <Modal
                            open={true}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                                <CircularProgress
                                size={24}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            </Modal>
                            )}
                            <input
                                type="file"
                                accept="image/*" 
                                onChange={onProcessFile}
                                ref={fileInput}
                                hidden={true}
                                />
                        <img width="max-content" height="max-content" onClick={onOpenFileDialog} src={avatar} width='100%' height='auto' />
                        </PictureFrame>
                        
                <Line>
                    <Title >Full name: </Title> 
                    <TextField disabled style={styles.rightFloat} name="name" label={displayName} color="secondary" /><br /> <br />
                </Line>
                <Line>
                    <Title >Username:</Title>
                    {/* <TextField disabled style={styles.rightFloat} name="username" label={userdata.username} color="secondary" /><br /> <br /> */}
                    <TextField disabled style={styles.rightFloat} name="username" label={username} color="secondary" /><br /> <br />
                </Line>
                <Line>
                    <Title >Email:</Title>
                    <TextField style={styles.rightFloat} disabled name="email" label={email} color="secondary" /><br /> <br />

                </Line>
                {loading && (<LinearProgress color="secondary" />)}
                {imageLoading && (<LinearProgress color="primary" />)}
                {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}

            {!loading && (

                <div>

                    <Card style={styles.cardStyle, {"width": "100%"}}>

                    <Typography variant='h6'>Selections</Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                <TableRow>
                                    {(!matches) && (
                                        <TableCell>League Name</TableCell>
                                    )}
                                    <TableCell align="left">Club Name</TableCell>
                                    <TableCell align="left">Position</TableCell>
                                    <TableCell>Points</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.keys(leagues).map((leagueID, index) => {
                                    const leagueName = leagues[leagueID];
                                    if (extraData[leagueID.toString()]) {
                                        return (
                                            <TableRow key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {(!matches) && (
                                                <TableCell align="left">{leagueName}</TableCell>
                                                )}
                                                <TableCell align="left">{Object.values(extraData[leagueID.toString()])[0].Name.toString().replace(",", " ")}</TableCell>
                                                <TableCell align="left">{Object.values(extraData[leagueID.toString()])[0].Position}</TableCell>
                                                <TableCell align="left">{Object.values(extraData[leagueID.toString()])[0].Points}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    })
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>
            )}
      </Page>
      );
}