import { TextField, Button, Card, LinearProgress, Alert } from '@mui/material';
import {styles} from '../../styles/styles'
import React, {useState, useContext, useEffect} from 'react';
import {useNavigate, useLocation, Navigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import Firebase from '../../components/firebase/Firebase';
import {getAuth} from 'firebase/auth';
import {UserDataContext} from '../../App';
import { doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp } from "firebase/firestore"; 

function Register (){

    const auth = getAuth();
    const {userData, setUserData} = useContext(UserDataContext);
    const db = getFirestore(Firebase.app);

    const initialCreds = {
        name: '',
        username: '',
        password: '',
        email: '',
    }
    const [loading, setLoading] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [creds, setCreds] = useState(initialCreds)
    const [error, setError] = useState("");
    const [stage, setStage] = useState(0); // 0 for unregistered, 1 for unverified, 2 for verified

    async function onChange(key, value) {
        setCreds({...creds, [key]: value})
      
    }

    const setUserdataToDB = async (uid, username, email) => {


        await setDoc(doc(db, "usersCollection", uid), {
            "accountCreated": serverTimestamp(),
            "username": `${username}`,
            "teamsSelected": false
        });

        await setDoc(doc(db, "lookups", uid), {
            "username": username,
            "email": email
        });

    }

    let location = useLocation();
    useEffect(() => {

        if(userData != null) {
            const { from } = location.state || {
                from: {
                    pathname: '/'
                }
            }
        }
    }, []);

    const { from } = location.state || {
        from: {
          pathname: '/'
        }};

    async function signUp () {
        setLoading(true); 
        const {name, username, password, email} = creds
        const reference = doc(db, 'lookups', username);

        await getDoc(reference).then((docSnap) => {

            if (docSnap.exists()) {
                if (docSnap.data()[`${username}`]) {
                    const errMsg = "Username '" + username + "' is already taken, try another one.";
                    console.log(errMsg)
                    setError(errMsg);
                    setLoading(false);
                    return;
                }
            }
            else {
                createUserWithEmailAndPassword(auth, email, password).then((user) => {
                    updateProfile(auth.currentUser, {displayName : name});
                    sendEmailVerification(auth.currentUser);
                    
                    setUserdataToDB(user.user.uid, username, email)
                    
                    setStage(1);
        
                }).catch((error) => {
                    const errorCode = error.code;
                    switch (errorCode){
                        case "auth/email-already-in-use":
                            setError("There is already an account with that email address, please sign in with that account, or register with a different email address.");
                        break;
                        default:
                            setError(error);
                    }
                });
                
            }
        })

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
                    {(stage == 0 ) && (
                        <div>
                            <h2>Register.</h2>
                            
                            <TextField onInput={evt => onChange('name', evt.target.value)} name="name" label="Full Name" color="secondary" /><br /> <br />
                            <TextField onInput={evt => onChange('username', evt.target.value)} autoComplete='username' name="username" label="Username" color="secondary" /><br /> <br />
                            <TextField onInput={evt => onChange('email', evt.target.value)} name="email" label="Email" color="secondary" /><br /> <br />
                            <TextField 
                                name="password"
                                onChange={evt => onChange('password', evt.target.value)}
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                color="secondary"
                                autoComplete="current-password"
                            /><br /> <br />
                            <Button onClick={signUp} color="secondary" variant="contained">Sign Up</Button> <br /><br />
                        </div>
                    )
                    }
                    {(stage == 1 ) && (
                        <div>
                            <h2>Verify your email before signing in.</h2>
                            <br></br>
                            <p>We have sent you an email to confirm your email address. Please click the link in the email to complete registration. It should arrive in your inbox within the next couple minutes.</p>
                        </div>
                    )
                    }
                            
                </div>
            {loading && (<LinearProgress color="secondary" />)}
            {(error !== '') && (<Alert onClick={() => setError("")} severity="error">{error}</Alert>)}
        </Card>
      );
}

export default Register
