import { TextField, Button, LinearProgress, Card, Alert} from '@mui/material';
import Page from '../../components/Page'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SetBContext } from '../../RouterComponent';
import {styles} from '../../styles/styles'


export default function ForgotPassword() {
    const [username, setUsername] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [error, setError] = useState("")
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState(1) // 1 for username, 2 for confirmation code, 3 for not matching passwords

    let navigate = useNavigate();
    let location = useLocation();
        
    async function forgotPassword() {
        setLoading(true)
        try{
            await Auth.forgotPassword(username)
            setStage(2)
        }
        catch(err) {
            setError(err + "")
            console.log('error giving username: ', err)
        }
        setLoading(false)
    }


    async function newPassword() {
        setLoading(true)
        if(newPassword1 === newPassword2 !== '') {
            try{
                await Auth.forgotPasswordSubmit(username, authCode, newPassword2)

                let from = location.state?.from?.pathname || "/login";
                navigate(from, { replace: true });
            }
            catch(err) {
                console.log('error submitting new password: ', err)
                setError(err + "")

            }
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
                    onChange={evt => setUsername(evt.target.value)} 
                    helperText="Please enter your username for your account." 
                    name="username" 
                    type="username" 
                    label="Username" 
                    color="secondary" 
                    /><br /> <br />
                    <Button onClick={forgotPassword} color='secondary' variant="contained">Forgot Password</Button> <br /> <br />
                </div>
            )}
            {(stage == 2) && (
                <div>
                    <h2>Forgot Password.</h2>
                    <form >
                        <TextField 
                        onChange={evt => setAuthCode(evt.target.value)} 
                        // helperText="Please enter the confirmation code sent in your email." 
                        name="authCode" 
                        autoComplete="randomstring"
                        label="authCode" 
                        color="secondary" 
                        /><br /> <br />
                        <TextField  
                        onChange={evt => setNewPassword1(evt.target.value)} 
                        // helperText="Please enter your new password for your account." 
                        name="password" 
                        type="password" 
                        label="Password" 
                        color="secondary" 
                        /><br /> <br />
                        <TextField 
                        onChange={evt => setNewPassword2(evt.target.value)} 
                        // helperText="Please confirm your new password for your account." 
                        name="password" 
                        type="password" 
                        label="Password" 
                        color="secondary" 
                        /><br /> <br />
                        <Button onClick={newPassword} color='secondary' variant="contained">Submit New Password</Button> <br /> <br />
                    </form>
                </div>
            )}{(stage == 3) && (
                <div>
                    <h2>Forgot Password.</h2>
                    <TextField 
                    onChange={evt => setAuthCode(evt.target.value)} 
                    helperText="Please enter the confirmation code sent in your email." 
                    name="authCode" 
                    type="authCode" 
                    label="authCode" 
                    color="secondary" 
                    /><br /> <br />
                    <TextField  
                    onChange={evt => setNewPassword1(evt.target.value)} 
                    error
                    helperText="Please ensure your new password matches." 
                    name="password" 
                    type="password" 
                    label="Password" 
                    color="secondary" 
                    /><br /> <br />
                    <TextField 
                    onChange={evt => setNewPassword2(evt.target.value)} 
                    error
                    helperText="Please ensure your new password matches." 
                    name="password" 
                    type="password" 
                    label="Password" 
                    color="secondary" 
                    /><br /> <br />
                    <Button onClick={newPassword} color='secondary' variant="contained">Submit New Password</Button> <br /> <br />
                </div>
            )}
            {loading && (<LinearProgress color="secondary" />)}
            {error !== '' && (<p>{error}</p>)}
            {(error !== '') && (<Alert severity="error">{error}</Alert>)}
        </Card>
        </Page>
);
}
