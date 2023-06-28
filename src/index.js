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



// import awsExports from "./aws-exports.js";

// Amplify.configure(awsExports);

ReactDOM.render(
    <ThemeProvider theme={themeOptions}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>,
    </ThemeProvider>,
  document.getElementById('root')
);
