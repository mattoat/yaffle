import { TextField, Button, Card, LinearProgress, Alert } from '@mui/material';
import {styles} from '../../styles/styles'
import { Auth } from 'aws-amplify'
import React, {useState, useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import { SetBContext } from '../../RouterComponent';

function Register (){
  const initialCreds = {
    name: '',
    username: '',
    password: '',
    email: '',
    authCode: '',
    showConfirmation: false
  }
  const [loading, setLoading] = useState(false)
  const [creds, setCreds] = useState(initialCreds)
  const [error, setError] = useState("")
  const setB = useContext(SetBContext)

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
      
    }

    let navigate = useNavigate();
    let location = useLocation();

    async function signUp () {
        setLoading(true); 
        const {name, username, password, email} = creds
        console.log(username + " " + password + " " + email)
        try{
            await Auth.signUp({
                username,
                password,
                attributes: {name, email}
            });
            setCreds({...creds, showConfirmation: true })
        }
        catch(err){
            setError(err + "")
            console.log('error signing up: ', err)
        }
        setLoading(false); 
    }
  
    async function confirmSignUp () {
        setLoading(true); 
        const {username, authCode} = creds
        console.log(username + " " + authCode)
        try {
            await Auth.confirmSignUp(username, authCode)
            let from = location.state?.from?.pathname || "/";
            setB(true)
            navigate(from, { replace: true });
        }
        catch(err){
            console.log('error confirming signing up: ', err)
            setError(err)
        }
        setLoading(false);  

    }

    async function resendConfirmationCode ()    {
        const {username} = creds
        await Auth.resendSignUp(username)
        .then(() => {setLoading(true); setCreds({...creds, showConfirmation: true });setLoading(false); })
            .catch(err => {console.log('error resending code: ', err); setError(err)})
    }

    const { showConfirmation } = creds

    return(
        <Card style = {styles.cardStyle}>
            {(!showConfirmation) && (
                    <div>
                        <h2>Register.</h2>
                        <TextField onInput={evt => onChange('name', evt.target.value)} name="name" label="Full Name" color="secondary" /><br /> <br />
                        <TextField onInput={evt => onChange('username', evt.target.value)}autoComplete='username' name="username" label="Username" color="secondary" /><br /> <br />
                        <TextField 
                            name="password"
                            onChange={evt => onChange('password', evt.target.value)}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            color="secondary"
                            autoComplete="current-password"
                        /><br /> <br />
                        <TextField onInput={evt => onChange('email', evt.target.value)} name="email" label="Email" color="secondary" /><br /> <br />
                        <Button onClick={signUp} color="secondary" variant="contained">Sign Up</Button> <br /><br />
                    </div>
            )}
            {showConfirmation && (
                    <div>
                    <h2>Confirm Email Address.</h2>
                        <TextField 
                        helperText="Please check your emails for your confirmation code." 
                        name="authCode" 
                        onInput={evt => onChange('authCode', evt.target.value)} 
                        label="Confirmation code" 
                        color="secondary" /><br /> <br />
                        <Button onClick={confirmSignUp} color="secondary" variant="contained">Confirm</Button><br /><br />
                        <Button onClick={resendConfirmationCode} color="secondary" variant="text">Resend email?</Button><br /><br />
                    </div>
            )}
            {loading && (<LinearProgress color="secondary" />)}
            {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}
        </Card>
      );
}

export default Register
