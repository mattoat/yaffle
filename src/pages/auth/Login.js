import { Card } from '@mui/material';
import { TextField, Button, LinearProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SetBContext } from '../../RouterComponent';
import {styles} from '../../styles/styles'

function Login () {
    const initialCreds = {
        username: '',
        password: '',
        user: {}
    }
    const setB = useContext(SetBContext)
    const [loading, setLoading] = useState(false)
    const [creds, setCreds] = useState(initialCreds)

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
    }

    let navigate = useNavigate();
    let location = useLocation();
        
    async function login () {
        setLoading(true); 
        await Auth.signIn(creds.username, creds.password)
        .then(userD => {
            setCreds({...creds, user: {userD}})
            setB(true)
            let from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

        })
        .catch(err => console.log('errror signing in...: ', err))
        setLoading(false); 
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
                {loading && (<LinearProgress color="secondary" />)}
            </Card>
    );
}

export default Login
