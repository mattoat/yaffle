import { Card } from '@mui/material';
import { TextField, Button, LinearProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { BContext, SetBContext } from '../../RouterComponent';
import {styles} from '../../styles/styles'



function Login () {
    const initialCreds = {
        username: '',
        password: '',
        user: {}
    }

    const b = useContext(BContext)

    const [error, setError] = useState("")
    const setB = useContext(SetBContext)
    const [loading, setLoading] = useState(false)
    const [creds, setCreds] = useState(initialCreds)

    let navigate = useNavigate();
    let location = useLocation();
        

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
            setB(true)
            let from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

        }
        catch(err) { 
            console.log('errror signing in...: ', err)
            setError(err + "")
        }
        setLoading(false); 
    }
    if(b) {
        console.log("user authenticated - rerendering")
        return <Navigate to="/" state={{ from: location }} replace />;
    }
        return(                 
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
    );
}

export default Login
