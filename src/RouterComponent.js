import React, {useContext, useState, useEffect} from 'react'

import Layout from'./pages/nav/Layout';
import RulesPage from './pages/nav/RulesPage';
import LeaderPage from './pages/nav/LeaderPage';
import LeaguePage from './pages/nav/LeaguePage';
import HomePage from './pages/nav/HomePage';

import Logout from './pages/auth/Logout';
import ProfilePage from './pages/settings/ProfilePage';
import Authenticator from './pages/auth/Authenticator';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import ForgotPassword from './pages/auth/ForgotPassword';

import {UserDataContext, SetUserDataContext} from './App';

  
export default function RouterComponent() {

  const {userData} = useContext(UserDataContext);

  


  function RequireAuth(props) {

    let user = userData;


    if (user != null) {
      // User is signed in.
    return props.children;

    } else {
      // No user is signed in.
      return <Navigate push to="/login"/>;
    }
  }

  return(
      <div>
      {(
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<HomePage />} />
              <Route path='login' element={<Authenticator />} />
              <Route path="sign_up_/_log_in" element={<Navigate replace to="/login" />} />
              <Route path="forgot_password" element={<ForgotPassword/>} />
              <Route path='leaderboard'element={<RequireAuth> <LeaderPage /> </RequireAuth>} />
              <Route path='leagues' element={<RequireAuth> <LeaguePage /> </RequireAuth>} />
              <Route path='rules' element={<RequireAuth> <RulesPage />  </RequireAuth> } /> 
              <Route path='profile' element={<RequireAuth> <ProfilePage /> </RequireAuth>} /> 
              <Route path='*'  element={<Navigate replace to="/" /> }/>
              <Route path="log_out" element={<Navigate replace to="/logout" />} />
              <Route path='logout' element={<Logout />} />
            </Route>
          </Routes>
      )}
      </div>
    )}
