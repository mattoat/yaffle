import Page from '../../components/Page';
import {Accordion, Card, AccordionDetails, Icon} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import LeagueAccordion from "../../components/LeagueAccordion";
import { styles } from '../../styles/styles';

const league_info = require ( "../../Leagues")
const leagues = league_info.leagues;

export default function LeaguePage() {



  return(
      <Page>
          <Card style={styles.cardStyle} >
            <br />
            <Typography variant="h4">Leagues.</Typography>
            <br/>
            {Object.keys(leagues).map((league) => (
              <div key = {league}>
                {LeagueAccordion(leagues[league])}
              </div>
            ))}
          </Card>
      </Page>
    );
};