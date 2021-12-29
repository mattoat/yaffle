import AppNavBar from './components/AppNavBar';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@emotion/styled'


export default function App() {
  return (
    <div className="App">
        <header className="App-header">
        </header>
        <AppNavBar></AppNavBar>
        <Box>

          <Paper elevation={1}>
            <h1>About</h1>
            <p>Yaffle Football is a fantasy football web app.</p>
          </Paper>
        </Box>

    </div>
  );
}
