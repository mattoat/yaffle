import { TextField, Button, LinearProgress, Card, Alert} from '@mui/material';
import Page from '../../components/Page'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import Firebase from "../../components/firebase/Firebase"
import {sendPasswordResetEmail, getAuth} from 'firebase/auth';

import {styles} from '../../styles/styles'


export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [error, setError] = useState("")
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState(1) // 1 for username, 2 for sent
    let navigate = useNavigate();
    let location = useLocation();
    const auth = getAuth();
        
    async function routeChange() {
        let path = `/login`; 
        navigate(path, {replace: true});
    }

    async function forgotPassword() {
        setLoading(true)
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            setStage(2);
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        setLoading(false)
    }


    const newPassword = (e) => {

        e.preventDefault();

        if(newPassword1 === newPassword2 !== '') {
            setLoading(true)
            
            //reset password
            setLoading(false)
        }
        else {setStage(3)}
    }

    return(                 
        <Page>
        <Card style = {styles.cardStyle}>
            {(stage == 1) && (
                <div>
                    <h2>Forgot Password.</h2>
                    <TextField 
                    onChange={evt => setEmail(evt.target.value)} 
                    helperText="Please enter the email associated with your account." 
                    name="email" 
                    type="email" 
                    label="Email" 
                    color="secondary" 
                    /><br /> <br />
                    <Button onClick={forgotPassword} color='secondary' variant="contained">Forgot Password</Button> <br /> <br />
                </div>
            )}
            {(stage == 2) && (
                <div>
                    <h2>Forgot Password.</h2>
                    <br />
                    <p>We have sent a recovery email to the address <strong>{email}</strong>.</p>
                    <p>It should arrive in your inbox in the next couple minutes. </p>
                    <Button onClick={forgotPassword} color='secondary' variant='contained'>Resend Email?</Button>
                    <br /><br />
                    <Button onClick= {routeChange} color="secondary" variant="text">Back to login.</Button>
                    
                </div>
            )}
            {loading && (<LinearProgress color="secondary" />)}
            {error !== '' && (<p>{error}</p>)}
            {(error !== '') && (<Alert severity="error">{error}</Alert>)}
        </Card>
        </Page>
);
}
