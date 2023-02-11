import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import './styles/index.css';
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './styles/theme';
import Amplify from "aws-amplify";
// import awsExports from "./aws-exports.js";

// Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);