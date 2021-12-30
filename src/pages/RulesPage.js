
import { Card } from '@mui/material';
import { Box } from '@mui/system';
import Page from '../components/Page';

const stylesObj = {
  card: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: '1'
    
  }
}

export default function RulesPage() {
    return(
        <Page>
          <h1>Rules</h1>
          <p>The rules are simple: Join, select your 8 clubs, and wait. If, in the January window, you realise you're 
            actually not as good as you thought you would be and you're clubs are doing shit, then you can substitute out as 
            many of your teams as you'd like.

          </p>
          <Card style={stylesObj.card}>
            <img src="./assets/VARref.gif"></img>
          </Card>
          <h3>The 8 leagues you'll be selecting are:</h3>
          <Card className="wrapper" style={stylesObj.card} width={"70%"}>
            <Box className="row"style={stylesObj.row}>
              <Box className="column" style={stylesObj.column}>
                <ul>Scottish Premiership</ul>
                <ul>English Championship </ul>
                <ul>Ligue 1 </ul>
                <ul>Bundesliga</ul>
              </Box>
              <Box className="column"style={stylesObj.column}>
                <ul>Scottish Championship</ul>
                <ul>Serie A</ul>
                <ul>La Liga</ul>
                <ul>Primeira Liga</ul>
              </Box>
            </Box>
          </Card>

        </Page>
      );
}