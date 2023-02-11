import { Card } from '@mui/material';
import { TextField, Button, LinearProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, Navigate, Redirect , Route } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import { Auth, nav } from 'aws-amplify';
import {styles} from '../../styles/styles';
import {UserDataContext, UsernameContext} from '../../App';

function Login () {
    
    const initialCreds = {
        username: '',
        password: '',
        email: '',
        user: {}
    }

    const userData = useContext(UserDataContext);
    const {username, setUsername} = useContext(UsernameContext);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState(initialCreds);
    const [signedIn, setSignedIn] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();

    useEffect(async () => {

        // let from = location.state?.from?.pathname || "/";
        
        if(userData.username != null){
            setSignedIn(true);
            setUsername(userData.username);
        }
        
    }, []);
    const { from } = location.state || {
        from: {
          pathname: '/'
        }};
    const routeChange = () =>{ 
    let path = `/forgot_password`; 
    navigate(path, {replace: true});

  }

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
    }

    async function login () {
        setLoading(true); 
        try{
            let userD = await Auth.signIn(creds.username, creds.password)
            setCreds({...creds, user: {userD}})
            setUsername(userData.username);
            
            setSignedIn(true);
        }
        catch(err) { 
            console.log('errror signing in...: ', err)
            setError(err + "")
        }
        setLoading(false); 
    }
    
    
        return(     
            <div>
            {(signedIn) &&  (
                    <Navigate to={{
                    pathname: "/",
                    state: { referrer: from }
                    }}
                    />
                    )}            
                <Card style = {styles.cardStyle}>

                    <h2>Log In.</h2>
                    <TextField onChange={evt => onChange('username', evt.target.value)} name="username" type="username" label="Username" color="secondary" /><br /> <br />
                    <TextField 
                        name="password"
                        onChange={evt => onChange('password', evt.target.value)}
                        color="secondary"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        /><br /> <br />
                    <Button onClick={login} color='secondary' variant="contained">Log In</Button> <br /> <br />
                    <Button onClick= {routeChange} color="secondary" variant="text">Forgot Password?</Button><br /><br />
                    {loading && (<LinearProgress color="secondary" />)}
                    {(error !== '') && (<Alert severity="error">{error}</Alert>)}
                </Card>
            </div>
    );
}

export default Login
