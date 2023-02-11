import request from "request";
import * as subscriptions from './graphql/subscriptions.js';
import * as mutations from './graphql/mutations.js';
import * as queries from './graphql/queries.js'
import { Amplify, API } from 'aws-amplify'

const LEAGUE_IDS = [179, 39, 180, 40, 135, 61, 78, 140]
const SEASON = 2022


//   const configuration: ConfigurationOptions = {
//     region: 'us-east-1',
//     secretAccessKey: 'AKIASVGKFLHNDIOBGIQE',
//     accessKeyId: 'luI54QrWY2S/ehRODiO3zaweXIV47OpLRdeEkk+Q'
// }
const appConfig = {

    'aws_appsync_graphqlEndpoint': 'https://4sr3ibm675hz3jzjercyjute7m.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'da2-tcwxzfh7vbcupjgs25aavobpey',
    'aws_appsync_apiKey': 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
}

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
          
          await request(options, function (error, response, body) {
                if (error) throw new Error(error);
          
                return parse_text(body);
          });
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
            id: ids[i],
            Rank: i + 1,
            Played: playeds[i],
            Badge: badges[i],
            Name: names[i],
            GF: gfs[i],
            GA: gas[i],
            GD: gds[i],
            Points: points[i],
            Form: forms[i],
        }
        standings = standings.concat(obj)
    }
    
    // console.log(standings)
    uploadData(standings, 179)
}

const uploadData = async (standings, id) => {

  
    const update = await API.graphql({query: mutations.updateLeague0, variables: {input: standings}})
  
}

const l0 = callAPI(179)