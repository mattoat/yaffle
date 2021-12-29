import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import './styles/index.css';
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={themeOptions}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);