import React, { useState, createContext, useEffect } from 'react'
import RouterComponent from './RouterComponent';
import {Auth} from 'aws-amplify'
import { BrowserRouter, useLocation } from 'react-router-dom';

export default function App() {

  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}

