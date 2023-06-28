import React, { useEffect, useState, useContext } from 'react';
import Page from '../../components/Page';
import styled from '@emotion/styled';
import { styles } from '../../styles/styles'; //styles={styles.alignLeft}
import { Avatar , Card, TextField, Button, LinearProgress, Alert,Table,TableBody,TableContainer,Modal,TableRow,TableCell,Paper,TableHead, CircularProgress} from '@mui/material';
import imageCompression from 'browser-image-compression';
import { green } from '@mui/material/colors';

import {UserDataContext, AvatarContext} from '../../App';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {getFirestore, doc, getDoc} from 'firebase/firestore';

import Firebase from '../../components/firebase/Firebase.js';
import { setProfilePicture } from '../../components/firebase/ProfilePicture.js';



const league_info = require ( "../../Leagues")
const leagues = league_info.leagues



const Title = styled.h3`
    float:left;
`
const Line = styled.div`
    display: grid;
    text-align:left;
    padding: 10px;
`
const PictureFrame = styled.div`
    float: right;
    border: solid gray 1px;
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
    
    const [loading, setLoading] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const {userData, setUserData} = useContext(UserDataContext);
    const {avatar, setAvatar} = useContext(AvatarContext);


    const getUser = () => {

        setDisplayName(userData.displayName);
        setEmail(userData.email);
        setUserName(userData.username);
        // setAvatar(userData.photoURL);

        const db = getFirestore(Firebase.app);

        const reference = doc(db, 'usersCollection/' + userData.uid);

        getDoc(reference).then((docSnap) => {

            if (docSnap.exists()) {
                const extraData = docSnap.data();

                setUserName(extraData.username);
                setDisplayName(extraData.displayName);

            }
            else {
                console.log("No data")
            }
        })


        // The user object has basic properties such as display name, email, etc.
        
    }

    useEffect(() => {
        getUser();
    }, []);

    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
        fileInput.current.click();
    };

    const onProcessFile = async (e) => {
        e.preventDefault();

        let file = e.target.files[0];

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920
          }


          try {
            file = await imageCompression(file, options);
            console.log(file.size/1024/1024);
          } catch (error) {
            console.log(error);
          }

          setLoading(true);
          // UPLOAD PICTURE TO FIREBASE
          setProfilePicture(file, (url) => {
              
              console.log(url);
              setAvatar(url);
            });  
        setLoading(false);
        }


    return(
        <Page>
            <h1>Profile</h1>
            <Card style={styles.cardStyle}>
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
                    {/* <Avatar src={avatar} style={imgStyle} onClick={onOpenFileDialog}/> */}
                    <img width="max-content" height="max-content" onClick={onOpenFileDialog} src={avatar} width='100%'height='auto' />;

                </PictureFrame>
                <Line>
                    <Title >Full name: </Title> 
                    <TextField style={styles.rightFloat} name="name" label={displayName} color="secondary" /><br /> <br />
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
                {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}

            </Card>
            <h2>Selections</h2>
            <Card style={styles.cardStyle}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>League Name</TableCell>
                        <TableCell align="right">Club Name</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell align="right">Ranking</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.keys(leagues).map((league) => (
                        <TableRow key={leagues[league].name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {leagues[league].name}
                        </TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Card>
      </Page>
      );
}