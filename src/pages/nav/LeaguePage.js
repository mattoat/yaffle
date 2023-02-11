import Page from '../../components/Page';
import {Accordion, AccordionSummary, AccordionDetails, Icon} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { DynamoDBClient, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
// import request from "request";

// import fetch from 'node-fetch';
import {onCreateLeague0,
  onCreateLeague1, 
  onCreateLeague2, 
  onCreateLeague3, 
  onCreateLeague4, 
  onCreateLeague5, 
  onCreateLeague6, 
  onCreateLeague7} from '../../graphql/subscriptions';
const league_info = require ( "../../Leagues")
const leagues = league_info.leagues



export default function LeaguePage() {

  const getLeagueData = async (index) => {

    // const table_name = leagues[index].table

    // callAPI(179)
    return;
    };
    



const LEAGUE_IDS = [179, 39, 180, 40, 135, 61, 78, 140]
const SEASON = 2021

const URL = "https://v3.football.api-sports.io/standings?"

const callAPI = async function(league){ 

    const rest_url = URL + "league=" + league + "&season=" + SEASON
    const payload = {}
    const headers = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'be7b2d3d04cf9933b43300492745c67b'
        }
    
        var options = {
            method: 'GET',
            url: URL,
            qs: {league: league, season: SEASON},
            headers: headers
          };
          
          // request(options, function (error, response, body) {
          //       if (error) throw new Error(error);
          
          //       parse_text(body);
          // });
}
const parse_text = function(body){

    const league = JSON.parse(body).response[0].league.standings

    let ids = []
    let ranks = []
    let names = []
    let badges = []
    let playeds = []
    let gds = []
    let gfs = []
    let gas = []
    let forms = []

    let points = []

    let standings = []

    for (const l of league[0]) {

        ids = ids.concat(l.team.id)
        names = names.concat(l.team.name)
        badges = badges.concat(l.team.logo)
        playeds = playeds.concat(l.all.played)
        gds = gds.concat(l.goalsDiff)
        gfs = gfs.concat(l.all.goals.for)
        gas = gas.concat(l.all.goals.against)
        forms = forms.concat(l.form)
        points = points.concat(l.points)

    }
    
    if (league.length === 3) {
        
        for (const l of league[1]) {

            ids = ids.concat(l.team.id)
            names = names.concat(l.team.name)
            badges = badges.concat(l.team.logo)
            playeds = playeds.concat(l.all.played)
            gds = gds.concat(l.goalsDiff)
            gfs = gfs.concat(l.all.goals.for)
            gas = gas.concat(l.all.goals.against)
            forms = forms.concat(l.form)
            points = points.concat(l.points)
    
        }
    }

    for(let i = 0; i < names.length; i++) {

        const obj = {
            "id": ids[i],
            "rank": i + 1,
            "name": names[i],
            "badge": badges[i],
            "played": playeds[i],
            "gds": gds[i],
            "gfs": gfs[i],
            "gas": gas[i],
            "forms": forms[i],
            "points": points[i]
        }
        standings = standings.concat(obj)
    }

    console.log(standings)

}

for(const id of LEAGUE_IDS) {
    console.log(id)
}


    getLeagueData(0);
    return(
        <Page>
          <h1>Leagues</h1>
          {Object.keys(leagues).map((league) => (
          <Accordion key={leagues[league].name}>
            <AccordionSummary  
              expandIcon={<ExpandMoreIcon />}
              id={leagues[league].name}
              >
              <Typography>
                {leagues[league].name}
              </Typography>
              <img style={{"paddingLeft": "20px"}} height= "30px"  src= {"https://media.api-sports.io/football/leagues/"+ leagues[league].id + ".png"} />

            </AccordionSummary>
            <AccordionDetails>
              {
                
              }
            </AccordionDetails>
          </Accordion>
                    ))}
        </Page>
      );
}

/* {Object.keys(league_names).map((league) => (
  <TableRow key={league}
  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
  <TableCell component="th" scope="row">
      {league_names[league]}
  </TableCell>
  <TableCell align="right">{}</TableCell>
  <TableCell align="right">{}</TableCell>
  <TableCell align="right">{}</TableCell>
  <TableCell align="right">{}</TableCell>
  </TableRow>
))} */