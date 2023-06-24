import { TextField, Button, Card, LinearProgress, Alert } from '@mui/material';
import {styles} from '../../styles/styles'
import React, {useState, useContext} from 'react';
import {useNavigate, useLocation, Navigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from "firebase/auth";
import Firebase from '../../components/firebase/Firebase';


function Register (){


    const auth = Firebase.auth;

    const initialCreds = {
        name: '',
        username: '',
        password: '',
        email: '',
        authCode: '',
    }
    const [loading, setLoading] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [creds, setCreds] = useState(initialCreds)
    const [error, setError] = useState("")

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
      
    }

    let navigate = useNavigate();
    let location = useLocation();
    const { from } = location.state || {
        from: {
          pathname: '/'
        }};

    async function signUp () {
        setLoading(true); 
        const {name, username, password, email} = creds
        console.log(username + " " + password + " " + email)
            createUserWithEmailAndPassword(auth, email, password).then((user) => {

                console.log(user);
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
            console.log(error);
        });
        
        setLoading(false); 
    }

    return(
        <Card style = {styles.cardStyle}>
            {(signedIn) &&  (
                    <Navigate to={{
                    pathname: "/",
                    state: { referrer: from }
                    }}
                    />
                )}  
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
            {loading && (<LinearProgress color="secondary" />)}
            {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}
        </Card>
      );
}

export default Register
