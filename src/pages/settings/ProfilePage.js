import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import React, { useEffect, useState, useContext } from 'react';
import Page from '../../components/Page';
import styled from '@emotion/styled';
import { styles } from '../../styles/styles'; //styles={styles.alignLeft}
import { Avatar , Card, TextField, Button, LinearProgress, Alert,Table,TableBody,TableContainer,TableRow,TableCell,Paper,TableHead} from '@mui/material';
import {AvatarContext, SetAvatarContext} from '../../RouterComponent';
import { LocationSearchingRounded } from '@mui/icons-material';
const leagues = require ( "../../Leagues")

Amplify.configure(awsconfig);

Storage.configure({track:true, level:'protected'});

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
    border: solid black 1px;
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
    const [name, setName] = useState()
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [error, setError] = useState("")

    const avatar = useContext(AvatarContext);
    
    async function getUser() {
        const {username, attributes} = await Auth.currentUserInfo();
        setEmail(attributes.email)
        setName(attributes.name)
        setUser(attributes.sub)
        setUsername(username);

    }

    useEffect(() => {
        getUser();
    }, [])
    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
        fileInput.current.click();
    };

    const onProcessFile = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        try {
          reader.readAsDataURL(file);
        } catch (err) {
            console.log(err);
        }
        reader.onloadend = () => {
        };
        Storage.put((user +".jpeg"), file, {
            level: "protected",
            contentType: "image/jpeg"
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };

    return(
        <Page>
            <h1>Profile</h1>
            <Card style={styles.cardStyle}>
                <PictureFrame >
                    <input
                        type="file"
                        onChange={onProcessFile}
                        ref={fileInput}
                        hidden={true}
                        />
                    <Avatar src={avatar} style={imgStyle} onClick={onOpenFileDialog}/>
                </PictureFrame>
                <Line>
                    <Title >Full name: </Title> 
                    <TextField style={styles.rightFloat} name="name" label={name} color="secondary" /><br /> <br />
                </Line>
                <Line>
                    <Title >Username:</Title>
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
                        <TableRow key={league.indexOf}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {leagues[league]}
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