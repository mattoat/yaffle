const admin = require("firebase-admin");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
admin.initializeApp();
const db = admin.firestore();

const LEAGUEIDS = [179, 39, 180, 40, 135, 61, 78, 140];

const getUsers = async () => {
  const querySnapshot = await db
      .collection("usersCollection")
      .where("teamsSelected", "==", true)
      .get();

  const users = querySnapshot.docs.map((doc) => {
      let result = doc.data();
      result = {...result, uid: doc.id}
      return result;
    });
    logger.info(users);
  return users;
};


const getClub = async (clubID) => {
  const querySnapshot = await db
      .collection("clubs")
      .where("id", "==", clubID)
      .get();

  const clubData = querySnapshot.docs.map((doc) => doc.data());

  return clubData[0];
};

exports.update_leaderboard = functions.https.onRequest(async (req, res) => {
// exports.update_leaderboard = functions.pubsub.schedule("15 11-23 * * *")
//     .timeZone("Europe/London").onRun(async (req, res) => {
      const clubs = {};
      const collectionRef = db.collection("leaderboard");
      const batch = db.batch();

      try {
        const users = await getUsers();

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
        //   logger.info(user)
          let points = 0;
          let played = 0;
          let gd = 0;
          const offset = user["offset"];

          const entry = {};

          for (let j = 0; j < LEAGUEIDS.length; j++) {
            let club = null;
            const leagueID = LEAGUEIDS[j];

            const clubID = user[leagueID];

            if (Object.prototype.hasOwnProperty.call(clubs, clubID)) {
              club = clubs[clubID];
            } else {
              club = user[leagueID];
              clubs[clubID] = Number.parseInt(club);
            }
            const clubData = await getClub(club);
            entry[leagueID] = clubData;

            points += clubData["Points"];
            gd += clubData["GD"];
            played += clubData["Played"];
          }
          const usrObj = {
            "username": user["username"],
            "points": points - offset,
            "uid": user["uid"],
            "gd": gd,
            "played": played,
            "entry": entry,
          };
          const docRef = collectionRef.doc(usrObj.username);
          batch.set(docRef, usrObj);
        }
        batch
            .commit()
            .then(() => {
              logger.info("Batch update completed.");
              return;
            })
            .catch((error) => {
              logger.error("Error updating documents:", error);
            });

        res.status(200).send("Success");
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
