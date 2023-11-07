
import {query, collection, where, getFirestore, getDocs, orderBy} from "firebase/firestore";
import {useState, useEffect} from 'react';
import Leaderboard from '../../../components/Leaderboard';

import { Typography, Paper, CircularProgress, Table, TableCell, TableRow, Grid,
    TableHead, TableContainer, TableBody, useMediaQuery} from '@mui/material';

export default function LeaderPage() {
    const [got, setGot] = useState(false);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery('(max-width: 600px)'); 

    const TTL = 720000 // 2 hours


    // useEffect(() => {
    //     setLoading(true);
    //     if (!got) {
    //         // leaderboard data received
    //         getLeaderboard(async (result) => {
    //                 /**
    //                  * received an object with leaderboard data in this form:
    //                  * 
    //                  * {
    //                  *   "username1" : {
    //                  *      "clubID1" : {},
    //                  *      "clubID2" : {},
    //                  *      "clubID3" : {},
    //                  *      "clubID4" : {},
    //                  *      "clubID5" : {},
    //                  *      "clubID6" : {},
    //                  *      "clubID7" : {},
    //                  *      "clubID8" : {},
    //                  *   }
    //                  *   "username2" : {
    //                  *      "clubID1" : {},
    //                  *      "clubID2" : {},
    //                  *      "clubID3" : {},
    //                  *      "clubID4" : {},
    //                  *      "clubID5" : {},
    //                  *      "clubID6" : {},
    //                  *      "clubID7" : {},
    //                  *      "clubID8" : {},
    //                  *   }
    //                  * }
    //                  * 
    //                  * Aim of this callback function is to iterate through each of these empty club objects and fill them with necessary data 
    //                 */ 

    //                 // console.log(result);

    //                 const rows = Object.entries(result);
    //                 const promises = rows.map(async (row) => {
    //                 // rows is now an array of tuples
    //                 /**
    //                  * [
    //                  * {"username1", {"club1": {}, "club2": {}, "club3": {}, "club4": {}, "club5": {}, "club6": {}, "club7": {}, "club8": {} }},
    //                  * {"username2", {"club1": {}, "club2": {}, "club3": {}, "club4": {}, "club5": {}, "club6": {}, "club7": {}, "club8": {} }},
    //                  * ...
    //                  * ]
    //                  */

    //                     var gamesPlayed = 0;
    //                     var points = 0;
    //                     var gd = 0;

    //                     let username = row[0];
    //                     //iterate through each user, and get each club id
    //                     let clubData = {};
    //                     const clubIDs = Object.keys(row[1]);
    //                     for (const clubID of clubIDs) {
    //                         if (!(clubID > 0)) {
    //                             continue;
    //                         }
    //                         // for each club id get the relevant club data and store to clubData variable
                            
    //                         const parsedClubID = Number.parseInt(clubID);
    //                         if (localStorage.getItem("club" + parsedClubID)) {
    //                             // add applicable data to result
    //                             // console.log("Found in local storage");
    //                             let cachedData = JSON.parse(localStorage.getItem("club" + parsedClubID));
    //                             const d = new Date();
    //                             const time = d.getTime();

    //                             if (cachedData.timestamp + TTL > time) {
    //                                 clubData = result.payload;
    //                             }
    //                         }

    //                         // if the clubData hasn't been cached, get from db
    //                         const clubQuery = query(collection(db, "clubs"), where("id", "==", parsedClubID));
    //                         const querySnapshot = await getDocs(clubQuery);

    //                         querySnapshot.forEach((doc) => {
                                
    //                             clubData = doc.data();
    //                             if (clubData !== undefined) {
    //                                 // cache data found in db
    //                                 localStorage.setItem("club" + parsedClubID, JSON.stringify(clubData));
    //                             };
    //                         });
    //                         gamesPlayed += clubData.Played;
    //                         points += clubData.Points;
    //                         gd += clubData.GD;

    //                         // here add the clubData to rows
    //                         result[username][`${parsedClubID}`] = clubData
    //                     };

    //                     result[username]["played"] = gamesPlayed;
    //                     result[username]["points"] = points - result[username]["offset"];
    //                     result[username]["gd"] = gd;
    //                     // console.log(result[username]["points"]);
    //                 });
    //                 await Promise.all(promises);
    //                 setLeaderboard(Object.entries(result).sort(sortComparator));
    //                 setLoading(false);
    //         });
    //     }
        
    //     return () => {
    //         setLoading(false);
    //         setGot(true);
    //     }
    // }, []);
    // useEffect(() => {
    //     if (Object.keys(leaderboard).length > 0) {
    //         setLoading(false);
    //         // console.log(leaderboard[0])
    //     }
    // }, [leaderboard])
    
    const sortComparator = (a, b) => {
        if (b[1].points == a[1].points) {
            if (b[1].gd == a[1].gd) {
                return b[1].played - a[1].played;
            }
            return b[1].gd - a[1].gd;
        }
        // Sort by points in descending order
        return b[1].points - a[1].points;
      };
      
    if (!loading) {
        // console.log(leaderboard)
    }
    return (
               <Leaderboard />
      );
}