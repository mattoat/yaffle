import {Auth} from 'aws-amplify';
import React, {useState, useEffect, createContext, useContext} from 'react'

import RulesPage from './pages/nav/RulesPage';
import LeaderPage from './pages/nav/LeaderPage';
import LeaguePage from './pages/nav/LeaguePage';
import Layout from './pages/nav/Layout'
import HomePage from './pages/nav/HomePage';

import Logout from './pages/auth/Logout';
import ProfilePage from './pages/settings/ProfilePage';
import AccountPage from './pages/settings/AccountPage';
import Authenticator from './pages/auth/Authenticator';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import ForgotPassword from './pages/auth/ForgotPassword';

export const BContext = createContext();
export const SetBContext = createContext();


function RequireAuth(props) {


  const b = useContext(BContext)
  let location = useLocation();
  console.log("b: " + b)

  if(b) {
    return props.children;
  }
  else{
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
  
export default function RouterComponent() {
  
  
  let location = useLocation();
  const [b, setB] = useState(BContext)

  useEffect(() => {
    signedIn()
  }, [b]);

  async function signedIn() {
    Auth.currentAuthenticatedUser()
    .then(user => {console.log("true: " + user); setB(true)})
    .catch(err => {console.log("false: " + err); setB(false)});
  }
  
  return(
    <BContext.Provider value ={b}>
    <SetBContext.Provider value ={setB}>
      <Routes>
        <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path='login' element={<Authenticator />} />
            <Route path="sign_up_/_log_in" element={<Navigate replace to="/login" />} />
            <Route path="forgot_password" element={<ForgotPassword/>} />
            <Route path='leaderboard'element={<RequireAuth b={b}> <LeaderPage /> </RequireAuth>} />
            <Route path='leagues' element={<RequireAuth b={b}> <LeaguePage /> </RequireAuth>} />
            <Route path='rules' element={<RequireAuth b={b}> <RulesPage />  </RequireAuth> } />
            <Route path='account' element={<RequireAuth b={b}> <AccountPage /> </RequireAuth>} />
            <Route path='profile' element={<RequireAuth b={b}> <ProfilePage /> </RequireAuth>} />   
            <Route path='*'  element={<Navigate replace to="/" /> }/>
            <Route path='log_out' element={<Logout />} />
        </Route>
      </Routes>
    </SetBContext.Provider>
    </BContext.Provider>
  )}