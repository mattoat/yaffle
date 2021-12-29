import AppNavBar from './components/AppNavBar';
import { Box } from '@mui/system';
import AboutPage from './pages/AboutPage';
import LeaderPage from './pages/LeaderPage';
import LeaguePage from './pages/LeaguePage';
import HomePage from './pages/HomePage';
import { Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import { Paper } from '@mui/material';


export default function App() {
  return (
    <div className="App">
        <Box>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<HomePage />} />
              <Route path='about' element={<AboutPage/>} />
              <Route path='leaderboard' element={<LeaderPage/>} />
              <Route path='leagues' element={<LeaguePage/>} />
              <Route path='profile' element={<LeaguePage/>} />
              <Route path='account' element={<LeaguePage/>} />
              <Route path="*" element={<NoMatch/>} />
            </Route>
            
          </Routes>
        </BrowserRouter>
        </Box>
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

function NoMatch() {
  return (
    <div>
      <p>Doesn't exist.</p>
    </div>
  )
}