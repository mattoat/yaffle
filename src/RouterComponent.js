import Amplify, {Auth, Storage} from 'aws-amplify';
import awsconfig from './aws-exports';

import React, {useState, useEffect, createContext, useContext} from 'react'

import RulesPage from './pages/nav/RulesPage';
import LeaderPage from './pages/nav/LeaderPage';
import LeaguePage from './pages/nav/LeaguePage';
import Layout from './pages/nav/Layout'
import HomePage from './pages/nav/HomePage';

import Logout from './pages/auth/Logout';
import ProfilePage from './pages/settings/ProfilePage';
import Authenticator from './pages/auth/Authenticator';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import ForgotPassword from './pages/auth/ForgotPassword';

export const BContext = createContext();
export const SetBContext = createContext();

export const AvatarContext = createContext();
export const SetAvatarContext = createContext();

Amplify.configure(awsconfig);

Storage.configure({track:true, level:'protected'});
  
export default function RouterComponent() {
  
  
  const [avatar, setAvatar] = useState(undefined);
  const [b, setB] = useState(BContext)

  // const b = useContext(BContext)
  // const setB = useContext(SetBContext)

    useEffect(() => {
      if(b){
        getProfilePicture()
      }
    }, [b]);


  function RequireAuth(props) {

    let location = useLocation();

    if(b) {
      return props.children;
    }
    else{
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  const getProfilePicture = async () => {
    const p = await Auth.currentUserInfo();
    console.log(b)
    if(p!== null){ 
      const {attributes} = p
      const user = (attributes.sub);
      console.log(user)
      await Storage.get(user + ".jpeg")
      .then(url => {
        var myRequest = new Request(url);
        fetch(myRequest).then(function(response) {
          if (response.status === 200) {
            setAvatar(url);
          }
        });
      })
      .catch(err => console.log("User has no profile picture."));
    }
  };


  // const onPageRendered = async () => {
    // signedIn()
  // };


  async function signedIn() {
    Auth.currentAuthenticatedUser()
    .then(user => {console.log("true: " + user); setB(true)})
    .catch(err => {console.log("false: " + err); setB(false)});
  }
  
  
  return(
    <BContext.Provider value ={b}>
      <SetBContext.Provider value ={setB}>
        <AvatarContext.Provider value ={avatar}>
          <SetAvatarContext.Provider value ={setAvatar}>
            <Routes>
              <Route path="/" element={<Layout />} >
                  <Route index element={<HomePage />} />
                  <Route path='login' element={<Authenticator />} />
                  <Route path="sign_up_/_log_in" element={<Navigate replace to="/login" />} />
                  <Route path="forgot_password" element={<ForgotPassword/>} />
                  <Route path='leaderboard'element={<RequireAuth b={b}> <LeaderPage /> </RequireAuth>} />
                  <Route path='leagues' element={<RequireAuth b={b}> <LeaguePage /> </RequireAuth>} />
                  <Route path='rules' element={<RequireAuth b={b}> <RulesPage />  </RequireAuth> } />
                  <Route path='profile' element={<RequireAuth b={b}> <ProfilePage /> </RequireAuth>} />   
                  <Route path='*'  element={<Navigate replace to="/" /> }/>
                  <Route path="log_out" element={<Navigate replace to="/logout" />} />
                  <Route path='logout' element={<Logout />} />
              </Route>
            </Routes>
          </SetAvatarContext.Provider>
        </AvatarContext.Provider>
      </SetBContext.Provider>
    </BContext.Provider>
  )}