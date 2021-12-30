import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import './styles/index.css';
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './styles/theme';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);


ReactDOM.render(
  <ThemeProvider theme={themeOptions}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);