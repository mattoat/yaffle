import { Card } from '@mui/material';
import { Box } from '@mui/system';
import Page from '../../components/Page';
import {styles} from '../../styles/styles';

export default function RulesPage() {

    return(
          <Page>
            <h1>Rules</h1>
            <p>The rules are simple: Register, select your 8 clubs, and wait. If, in the January window, you realise you're 
              actually not as good as you thought you would be and you're clubs are doing poorly, then you can substitute out as 
              many of your teams as you'd like.
            </p>
            <Card style={styles.card}>
              <img style={styles.img} src="./assets/VARref.gif"></img>
            </Card>
            <h3>The 8 leagues you'll be selecting are:</h3>
            <Card className="wrapper" style={styles.card} width={"70%"}>
              <Box className="row"style={styles.row}>
                <Box className="column" style={styles.column}>
                  <ul>Scottish Premiership</ul>
                  <ul>English Championship </ul>
                  <ul>Ligue 1 </ul>
                  <ul>Bundesliga</ul>
                </Box>
                <Box className="column"style={styles.column}>
                  <ul>Premier League</ul>
                  <ul>Scottish Championship</ul>
                  <ul>Serie A</ul>
                  <ul>La Liga</ul>
                </Box>
              </Box>
            </Card>
            <h3>How do I select my teams?</h3>
            <p>Go to account, and select your teams from there. Once that is done, you will be able to view the Yaffle leaderboard.</p>
          </Page>
      );
}