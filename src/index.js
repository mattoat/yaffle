import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import './styles/index.css';
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './styles/theme';
import {initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import FirebaseContext from './components/firebase/Context';
import Firebase from './components/firebase/Firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAOmL5cu9pWw_PwqEMfCqKlnZ0xYhT4Jns",
  authDomain: "yaffle-d76fe.firebaseapp.com",
  databaseURL: "https://yaffle-d76fe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yaffle-d76fe",
  storageBucket: "yaffle-d76fe.appspot.com",
  messagingSenderId: "1040602701618",
  appId: "1:1040602701618:web:d313a148f534e4c3d3412b",
  measurementId: "G-L48BQHY8B6"
};

// import awsExports from "./aws-exports.js";

// Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>,
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
