import { Card } from '@mui/material';
import { TextField, Button, LinearProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, Navigate, Redirect , Route } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import {  signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import {styles} from '../../styles/styles';
import {SetUserDataContext, UserDataContext} from '../../App';
import Firebase from '../../components/firebase/Firebase';

function Login () {

    const initialCreds = {
        email: '',
        password: '',
        username: '',
        user: {}
    }

    const userData = useContext(UserDataContext);
    const setUserData = useContext(SetUserDataContext);
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState(initialCreds);
    const [signedIn, setSignedIn] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();

    // useEffect(() => {

    //     // let from = location.state?.from?.pathname || "/";
        
    //     if(userData.username != null){
    //         setSignedIn(true);
    //         setUsername(userData.username);
    //     }
        
    // }, []);

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

    const onLogin = (e) => {
        // const app = Firebase.app;
        const auth = getAuth();
        setLoading(true); 
        e.preventDefault();

        signInWithEmailAndPassword(auth, creds.email, creds.password)
        .then((userCredential) => {

            //signed in
            const user = userCredential.user  

            
            setSignedIn(true);
        })
        .catch((err) => {

            switch(err.code){
                case "auth/user-not-found":
                case "auth/invalid-password":

                    setError("Username or password incorrect.")
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.")
                default:
                    setError(err.message);
            }
        });
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
                <TextField onChange={evt => onChange('email', evt.target.value)} name="email" type="email" label="Email" color="secondary" /><br /> <br />
                <TextField 
                    name="password"
                    onChange={evt => onChange('password', evt.target.value)}
                    color="secondary"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    /><br /> <br />
                <Button onClick={onLogin} color='secondary' variant="contained">Log In</Button> <br /> <br />
                <Button onClick= {routeChange} color="secondary" variant="text">Forgot Password?</Button><br /><br />
                {loading && (<LinearProgress color="secondary" />)}
                {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}
            </Card>
        </div>
    );
}

export default Login
