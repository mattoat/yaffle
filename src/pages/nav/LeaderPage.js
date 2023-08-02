import { Typography, Card, CircularProgress } from '@mui/material';
import Page from '../../components/Page';
import {query, collection, where, getFirestore, getDocs} from "firebase/firestore";
import {useState, useEffect} from 'react';
import Firebase from '../../components/firebase/Firebase';
import leagues from "../../Leagues.json";
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { KeyboardReturnOutlined } from '@material-ui/icons';


export default function LeaderPage() {
    const [leaderboard, setLeaderboard] = useState({});
    const [got, setGot] = useState(false);
    const [loading, setLoading] = useState(true);

    const db = getFirestore(Firebase.app);
    const TTL = 720000 // 2 hours

    const getClub = async (clubID) => {
        
        let result = {};

        // if its in localStorage
        if (localStorage.getItem("club" + clubID)) {
            // add applicable data to result
            // console.log("Found in local storage");
            result = JSON.parse(localStorage.getItem("club" + clubID));
            const d = new Date();
            const time = d.getTime();

            if (result.timestamp + TTL < time) {
                localStorage.removeItem("club" + clubID);
                return await getClub(clubID);
            }
        }
        else {
            //else get from db
            // console.log("Getting from database");

            const clubQuery = query(collection(db, "clubs"), where("id", "==", clubID));
            const querySnapshot = await getDocs(clubQuery);
            result = querySnapshot[0].data();
            localStorage.setItem("club" + clubID, JSON.stringify(result));
            
            if (result == {}) {
                console.log("****" + clubID);
            }
        }
        // console.log("Result " + JSON.stringify(result))
        return result;
    }


    const getLeaderboard = async (callback) => {
        let result = {}


        //get array of active users
        const activeUserQuery = query(collection(db, "usersCollection"), where("teamsSelected", "==", true));

        const querySnapshot = await getDocs(activeUserQuery);
        querySnapshot.forEach(async (doc) => {
            let userObj = {};

            const user = doc.data();
            
            //get array of their teams
            const leagueIDs = Object.keys(leagues);
            leagueIDs.forEach(async (league) => {

                let clubID = user[`${league}`];
                userObj[clubID] = {};
                
            })
            userObj['offset'] = user["offset"];
            result[`${user.username}`] = userObj;
        });

            // add total gd, games played and points to the userObj
            
            //  add userObj to result
        // console.log("callback " + JSON.stringify(result));
        callback(result);
    }


    useEffect(() => {
        setLoading(true);
        // console.log("Mounted")
        let mounted = true;
        if (!got) {
            // leaderboard data received
            getLeaderboard(async (result) => {

                if(mounted) {
                    /**
                     * received an object with leaderboard data in this form:
                     * 
                     * {
                     *   "username1" : {
                     *      "clubID1" : {},
                     *      "clubID2" : {},
                     *      "clubID3" : {},
                     *      "clubID4" : {},
                     *      "clubID5" : {},
                     *      "clubID6" : {},
                     *      "clubID7" : {},
                     *      "clubID8" : {},
                     *   }
                     *   "username2" : {
                     *      "clubID1" : {},
                     *      "clubID2" : {},
                     *      "clubID3" : {},
                     *      "clubID4" : {},
                     *      "clubID5" : {},
                     *      "clubID6" : {},
                     *      "clubID7" : {},
                     *      "clubID8" : {},
                     *   }
                     * }
                     * 
                     * Aim of this callback function is to iterate through each of these empty club objects and fill them with necessary data 
                    */ 

                    // console.log(result);

                    const rows = Object.entries(result);
                    // rows is now an array of tuples
                    /**
                     * [
                     * {"username1", {"club1": {}, "club2": {}, "club3": {}, "club4": {}, "club5": {}, "club6": {}, "club7": {}, "club8": {} }},
                     * {"username2", {"club1": {}, "club2": {}, "club3": {}, "club4": {}, "club5": {}, "club6": {}, "club7": {}, "club8": {} }},
                     * ...
                     * ]
                     */
                    let count = 0;
                    // count is the ith user in rows
                    await rows.forEach(async (row) => {
                        let gamesPlayed = 0;
                        let points = 0;
                        let gd = 0;

                        let username = row[0];
                        //iterate through each user, and get each club id
                        let clubData = {};
                        const clubIDs = Object.keys(row[1]);
                        await clubIDs.forEach(async (clubID) => {
                            if (!(clubID > 0)) {
                                return;
                            }
                            // for each club id get the relevant club data and store to clubData variable
                            
                            clubID = Number.parseInt(clubID);
                            if (localStorage.getItem("club" + clubID)) {
                                // add applicable data to result
                                // console.log("Found in local storage");
                                let cachedData = JSON.parse(localStorage.getItem("club" + clubID));
                                const d = new Date();
                                const time = d.getTime();

                                if (cachedData.timestamp + TTL > time) {
                                    clubData = result.payload;
                                }
                            }

                            // if the clubData hasn't been cached, get from db
                            const clubQuery = query(collection(db, "clubs"), where("id", "==", clubID));
                            const querySnapshot = await getDocs(clubQuery);
                            await querySnapshot.forEach((doc) => {
                                
                                clubData = doc.data();
                                if (clubData !== undefined) {
                                    // cache data found in db
                                    localStorage.setItem("club" + clubID, JSON.stringify(result));

                                    // console.log("rows[" + JSON.stringify(rows[0]) + "][" + JSON.stringify(clubIDs) + "]: " + JSON.stringify(clubData))
                                    // rows[`${rows[0]}`][clubIDs] = clubData;
                                };
                            });
                            gamesPlayed += clubData.Played;
                            points += clubData.Points;
                            gd += clubData.GD;
                            // here add the clubData to rows
                            // console.log("set rows[" + username + "][" + clubID + "] to " + JSON.stringify(clubData))
                            result[username][`${clubID}`] = clubData
                        });
                        result[username]["played"] = gamesPlayed;
                        result[username]["points"] = points;
                        result[username]["gd"] = gd;
                        
                        count++;
                    });
                    
                    // console.log(result)
                    setLeaderboard(result);
                    return;
                }
            });
        }

        return () => {
            setLoading(false);
            mounted = false;
            setGot(true);
        }
    }, []);
    useEffect(() => {
        if (Object.keys(leaderboard).length > 0) {
            setLoading(false);
        }
    }, [leaderboard])
    
    console.log(leaderboard);

    return (
                <Page>
                    <br />
                    <Typography variant='h4'>Leaderboard.</Typography>
                    <br />
                    <div>
                        {(!loading) && (
                            
                            <div>
                                
                                {JSON.stringify(Object.entries(leaderboard).map((row, index) => (

                                    index
                                )))}
                            </div>
                        )}
                        {(loading) && (
                            <CircularProgress />
                        )}
                    </div>

                </Page>
      );
}