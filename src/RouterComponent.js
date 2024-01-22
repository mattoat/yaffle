import React, {useContext, useState, useEffect} from 'react'

import Layout from'./pages/nav/Layout';
import RulesPage from './pages/nav/RulesPage';
import LeaderPage from './pages/nav/Leaderboard/LeaderPage';
import LeaguePage from './pages/nav/Leagues/LeaguePage';
import HomePage from './pages/nav/HomePage';
import TransferPage from './pages/nav/TransferPage';
import MessagePage from './pages/nav/MessagePage';

import Logout from './pages/auth/Logout';
import ProfilePage from './pages/settings/ProfilePage';
import Authenticator from './pages/auth/Authenticator';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import ForgotPassword from './pages/auth/ForgotPassword';

import {UserDataContext, SetUserDataContext} from './App';
import SelectTeams from './components/SelectTeams';

  
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
              <Route path='leaderboard'element={ <LeaderPage /> } />
              <Route path='leagues' element={ <LeaguePage />} />
              <Route path='select_teams' element={<RequireAuth> <SelectTeams /> </RequireAuth>} />
              <Route path='transfers' element={<RequireAuth> <TransferPage /> </RequireAuth>} />
              <Route path='message' element={<RequireAuth> <MessagePage /> </RequireAuth>} />
              <Route path='rules' element={<RulesPage /> } /> 
              <Route path='profile' element={<RequireAuth> <ProfilePage /> </RequireAuth>} /> 
              <Route path='*'  element={<Navigate replace to="/" />}/>
              <Route path="log_out" element={<Navigate replace to="/logout" />} />
              <Route path='logout' element={<Logout />} />
            </Route>
          </Routes>
      )}
      </div>
    )}
