import Amplify, { Auth, Storage } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import React, { useEffect, useState, useContext } from 'react';
import Page from '../../components/Page';
import styled from '@emotion/styled';
import { styles } from '../../styles/styles'; //styles={styles.alignLeft}
import { Avatar , Card} from '@mui/material';
import {AvatarContext, SetAvatarContext} from '../../RouterComponent';
import EditIcon from '@mui/icons-material/Edit';

Amplify.configure(awsconfig);

Storage.configure({track:true, level:'protected'});

const Title = styled.h3`
    float: left;
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

    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const avatar = useContext(AvatarContext);
    const setAvatar = useContext(SetAvatarContext);


    async function getUser() {
        const {username, attributes} = await Auth.currentUserInfo();
        setEmail(attributes.email)
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
            // setAvatar(reader.result);
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
                <Title >Username: {username}</Title> <br/><br/>
                <Title >Email: {email}</Title>

                <Title >Scottish Premiership:</Title>
                <Title >Premier League:</Title>
                <Title >Scottish Championship:</Title>
                <Title >English Championship:</Title>

                <Title >Bundesliga:</Title>
                <Title >La Liga:</Title>
                <Title >Serie A</Title>
                <Title >Ligue 1:</Title>

            </Card>
      </Page>
      );
}