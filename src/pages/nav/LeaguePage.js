import Page from '../../components/Page';
import {Accordion, Card, AccordionDetails, Icon} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import LeagueAccordion from "../../components/LeagueAccordion";
import { styles } from '../../styles/styles';

const leagues = require ( "../../Leagues")

export default function LeaguePage() {
  return(
      <Page style={{"margin": "-2.5px"}}>
            <br />
            <Typography variant="h4">Leagues.</Typography>
            <br/>
            {Object.entries(leagues).map((league, index) => (
              <div key = {index}>
                {LeagueAccordion(league)}
              </div>
            ))}
      </Page>
    );
};