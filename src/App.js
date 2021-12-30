import AppNavBar from './components/AppNavBar';
import RulesPage from './pages/RulesPage';
import LeaderPage from './pages/LeaderPage';
import LeaguePage from './pages/LeaguePage';
import HomePage from './pages/HomePage';
import UnkownPage from './pages/UnkownPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import { Route, Routes, BrowserRouter, Outlet, Navigate} from 'react-router-dom';
import { Paper } from '@mui/material';
import styled from '@emotion/styled'


export default function App() {
  return (
    <div className="App">
        <div>
        <BrowserRouter >
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='rules' element={<RulesPage/>} />
              <Route path='leaderboard' element={<LeaderPage/>} />
              <Route path='leagues' element={<LeaguePage/>} />
              <Route path='profile' element={<ProfilePage/>} />
              <Route path='account' element={<AccountPage/>} />
              <Route path="404" element={<UnkownPage/>} />
              <Route path="*"  element={<Navigate replace to="404" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </div>
    </div>
  );
}
function Layout() {
  return (
    <div>
      <header className="App-header">
      </header>
      <AppNavBar></AppNavBar>
      <Outlet />
    </div>
    );
}
