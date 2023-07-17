/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const axios = require("axios");
admin.initializeApp();
const logger = functions.logger;
const db = admin.firestore();

const LEAGUEIDS = [179, 39, 180, 40, 135, 61, 78, 140];
const SEASON = 2022;


const capitalizeName = (str) => {

  let words = str.split(" ");
  const exceptions = ["AC", "VFB", "VFL", "VSV", "SC", "RB", "AS", "QPR","FC","PSG"];

  const capitalizedWords = words.map((word) => {
    const modifiedWord = word.replace(/\b\w+\b/g, (match) => {
      if (exceptions.includes(match.toUpperCase())) {
          // console.log(match);
        return match.toLowerCase();
      } else {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
      }
    });
    
    return modifiedWord;
  });
  return capitalizedWords.join(" ");
};

const callAPI = async (leagueIndex) => {
  const URL = "https://v3.football.api-sports.io/standings?league=" + LEAGUEIDS[leagueIndex] + "&season=" + SEASON;

  const headers = {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "be7b2d3d04cf9933b43300492745c67b",
  };
  try {
    const response = await axios.get(URL, {headers: headers});

    const standings = await parseText(response.data, leagueIndex);
    return await Promise.all(standings.map((standing) => {
      return uploadData(standing, leagueIndex);
    }));
  } catch (error) {
    logger.error("Error in callAPI: (League " + leagueIndex + ") ", error);
  }
};

const parseText = async (body, leagueIndex) => {
  // logger.info(body)
  const league = body.response[0].league.standings;
    
  let ids = [];
  let names = [];
  let badges = [];
  let playeds = [];
  let gds = [];
  let gfs = [];
  let gas = [];
  let forms = [];
  let points = [];
  let standings = [];
    
    
  if (league.length > 1) {
    for (const l of league[1]) {
      ids = ids.concat(l.team.id);
      names = names.concat(l.team.name);
      badges = badges.concat(l.team.logo);
      playeds = playeds.concat(l.all.played);
      gds = gds.concat(l.goalsDiff);
      gfs = gfs.concat(l.all.goals.for);
      gas = gas.concat(l.all.goals.against);
      forms = forms.concat(l.form);
      points = points.concat(l.points);
    }
  }
  else {
    for (const l of league[0]) {
        ids = ids.concat(l.team.id);
        names = names.concat(l.team.name);
        badges = badges.concat(l.team.logo);
        playeds = playeds.concat(l.all.played);
        gds = gds.concat(l.goalsDiff);
        gfs = gfs.concat(l.all.goals.for);
        gas = gas.concat(l.all.goals.against);
        forms = forms.concat(l.form);
        points = points.concat(l.points);
      }
  }
    
  for (let i = 0; i < names.length; i++) {
    const obj = {
      id: ids[i],
      Rank: i + 1,
      Played: playeds[i],
      Badge: badges[i],
      Name: capitalizeName(names[i]),
      GF: gfs[i],
      GA: gas[i],
      GD: gds[i],
      Points: points[i],
      Form: forms[i],
    };
    standings = standings.concat(obj);

    await uploadData(obj, leagueIndex);
  }
  return standings;
};

const uploadData = async (object, leagueIndex) => {
  logger.log("Data uploading: " + JSON.stringify(object));
  const collectionName = String("league" + LEAGUEIDS[leagueIndex]);
  const recordName = String(object.id);
  
  const reference = db.collection(collectionName).doc(recordName)
  await reference.set(object, {merge: true});
};
// const main = (async() => {

exports.syncLeagues = functions.https.onRequest(async (req, res) => {
  for (let i = 0; i < LEAGUEIDS.length; i++) {
    // for (let i = 0; i < ; i++) {
    try {
      await callAPI(i);
    } catch (error) {
      logger.error(`Error in loop for league ID ${LEAGUEIDS[i]}: `, error);
    }
  }
  res.json({"Status": "Success"});
});

