import { Card, Typography } from '@mui/material';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useLocation, useNavigate, Link, Navigate, Redirect , Route } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react';
import {  signInWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth';
import {styles} from '../../styles/styles';
import { doc, getDoc, collection, getFirestore, where, query, getDocs } from "firebase/firestore";
import {SetUserDataContext, UserDataContext} from '../../App';
import Firebase from '../../components/firebase/Firebase';
import SelectTeams from "../../components/SelectTeams";


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
    const db = getFirestore(Firebase.app)
    let navigate = useNavigate();
    let location = useLocation();

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

    const getEmailByUsername = async (username) => {
        const usersRef = collection(db, "lookups/");
        
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("User not found")
            return null; // User not found
          }
        else {
            const userDoc = querySnapshot.docs[0];
            const email = userDoc.data().email;
            return email
        }

      };

    const onLogin = async (e) => {
        setError('')
        // const app = Firebase.app;
        const auth = getAuth();
        setLoading(true); 
        e.preventDefault();
        let email = creds.email;

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email);
        if (!isValidEmail) {
            const username = creds.email
            email = await getEmailByUsername(username);
            
        }
        await signInWithEmailAndPassword(auth, email, creds.password)
        .then(async (userCredential) => {



            //signed in
            const user = userCredential.user 
            console.log(user.emailVerified)
            //is user email verified
            setVerified(user.emailVerified)

            //has user selected teams
            const db = getFirestore(Firebase.app)
            const docRef = doc(db, "usersCollection", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const db_selectedTeams = docSnap.data().teamsSelected;
                setSelectedTeams(db_selectedTeams);
                // setUserData({...userData, selectedTeams:db_selectedTeams});
                console.log(db_selectedTeams)
            }
            // if user has verified email and selected teams
            
            setLoading(false); 
        })
        .catch((err) => {
            setLoading(false);

            if (err.code == "auth/wrong-password"|| err.code == "auth/user-not-found" || err.code == "auth/invalid-password" || err.response?.status === 400) {
                setError("Username or password incorrect.");
            } else if (err.code === "auth/too-many-requests") {
                setError("Too many requests, please wait a couple of minutes and try again.");
            } else {
                setError("An error has occurred. If this keeps occurring, please contact Matthew.");
            }
        });
    }

    useEffect(() => {if (verified && selectedTeams) {

        setSignedIn(true);
    }},[verified, selectedTeams])
    return(     
        <div>
            {loading && (
                <Card style = {styles.cardStyle} >
                    <Typography variant="h4">Log In.</Typography> 
                    <br /><br /><br />
                    <CircularProgress color="secondary" />
                </Card>
            )}
            {(signedIn && verified && selectedTeams && !loading) &&  (
                <Navigate to={{
                pathname: "/",
                state: { referrer: from }
                }}
                />
            )}        
            {(!signedIn && verified == false && !loading) && (
                <Card style = {styles.cardStyle}  >
                    <Typography variant="h4">Log In.</Typography> 
                    <br /><br /><br />
                    <p>You need to verify your email before you can sign in.</p>
                    <Button onClick={resendEmail} color='secondary' variant="contained">Resend Email?</Button><br /> <br />
                    <Link style={{"textDecoration": "none"}} to={{pathname:"/login", state: {referrer: from}}}><Button onClick={() => {setVerified(false)}} color='primary' variant='contained'>Verified?</Button></Link>
                </Card>
            )}    
            {(verified && selectedTeams == false && !loading) && (
                <div >
                    <br /><br /><br />
                    <SelectTeams setSelectedTeams={setSelectedTeams}/>
                </div>
            ) }
            {(!signedIn && selectedTeams == undefined && verified == undefined && !loading) && (
                <Card style = {styles.cardStyle} >
                <Typography variant="h4">Log In.</Typography> 
                <br /><br /><br />
                <TextField onChange={evt => onChange('email', evt.target.value)} name="email" type="email" label="Username or Email" color="secondary" /><br /> <br />
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
            </Card>
            )} 
        </div>
    );
}

export default Login
