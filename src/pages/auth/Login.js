import { Card } from '@mui/material';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, Link, Navigate, Redirect , Route } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import {  signInWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth';
import {styles} from '../../styles/styles';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {SetUserDataContext, UserDataContext} from '../../App';
import Firebase from '../../components/firebase/Firebase';
import { CatchingPokemonSharp } from '@mui/icons-material';


function Login () {

    const initialCreds = {
        email: '',
        password: '',
        username: '',
        user: {}
    }

    const {userData, setUserData} = useContext(UserDataContext);

    
    const [error, setError] = useState("");
    const [selectedTeams, setSelectedTeams] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(undefined);
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
    
    const resendEmail = async () => {

        const auth = getAuth();

        await sendEmailVerification(auth.currentUser).then(() => {
            console.log("Success");
        })
    }

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
    }
    const goToSelectteams = () => {

    }

    const onLogin = async (e) => {
        // const app = Firebase.app;
        const auth = getAuth();
        setLoading(true); 
        e.preventDefault();
        setUserData({...userData, selectedTeams:false});
        // console.log(userData);

        await signInWithEmailAndPassword(auth, creds.email, creds.password)
        .then(async (userCredential) => {

            //signed in
            const user = userCredential.user 
            //is user email verified
            setVerified(user.emailVerified)

            //has user selected teams
            const db = getFirestore(Firebase.app)
            const docRef = doc(db, "usersCollection", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const db_selectedTeams = docSnap.data().teamsSelected;
                setSelectedTeams(db_selectedTeams);
                setUserData({...userData, selectedTeams:db_selectedTeams});
            }
            // if user has verified email and selected teams
            if (verified && selectedTeams) {

                setSignedIn(true);
            }
        })
        .catch((err) => {

            switch(err.code){
                case "auth/user-not-found":
                case "auth/wrong-password":
                case "auth/invalid-password":

                    setError("Username or password incorrect.")
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.")
                default:
                    setError(err.message);
            }
        });
        console.table([{"signedIn": signedIn}, {"verified": verified}, {"teamsSelected": selectedTeams}]);
        setLoading(false); 
    }
    

    return(     
        <Card style = {styles.cardStyle} >
            <h2>Log In.</h2> 
            {loading && (<CircularProgress color="secondary" />)}
            {(signedIn && verified && selectedTeams && !loading) &&  (
                <Navigate to={{
                pathname: "/",
                state: { referrer: from }
                }}
                />
            )}        
            {(!signedIn && verified == false && !loading) && (
                <div style = {styles.cardStyle} >
                    <p>You need to verify your email before you can sign in.</p>
                    <Button onClick={resendEmail} color='secondary' variant="contained">Resend Email?</Button><br /> <br />
                    <Link style={{"textDecoration": "none"}} to={{pathname:"/login", state: {referrer: from}}}><Button color='primary' variant='contained'>Verified?</Button></Link>
                </div>
            )}    
            {(verified && selectedTeams == false && !loading) && (
                <Navigate to={{
                    pathname: "/select_teams",
                    state: {referrer: from}
                }} />
            ) }
            {(!signedIn && selectedTeams == undefined && verified == undefined && !loading) && (
                <div>

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
                {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}
            </div>
            )} 
        </Card>
    );
}

export default Login
