import { Typography } from "@mui/material";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import {useState, useEffect} from "react"
import Firebase from "./firebase/Firebase";
import SelectTeams from "./SelectTeams";

const teams = [];
const league_info = require ( "../Leagues.json")
const leagues = league_info.leagues;
const badgeURL = "https://media.api-sports.io/football/leagues/";
const TTL = 86400000 // 24 hours



const LeagueSelection = (props) => {
    // console.log(league_info.leagues[index].name)
    const {index} = props;

    const name = league_info.leagues[index].name;
    const id = league_info.leagues[index].id;
    const teams = [];
    const [loading, setLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(true)
    const [loadingData, setLoadingData] = useState(true)
    const db = getFirestore();

    const handleLoadedImage = () => setLoadingImage(false);

    const getLeagueData = async () => {
        setLoadingData(true);
    
        const leagueReference = collection(db, "league" + id);
        const q = query(leagueReference, orderBy("Name", "asc"));
    
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((doc) => {
            const obj = {"name": doc.data().Name, "id": doc.data().id}
            console.log(obj)
            teams.push(obj)
        });

        setLoadingData(false);

      }

      useEffect(async () => {
          await getLeagueData()
      }, []);
      

      useEffect(() => {
          if(!loadingData && !loadingImage) {

              setLoading(false)
              console.log("HERE")
          }
      }, [loadingData, loadingImage])


    return (
        <div>


                {(!loading) && (
                    <div >
                    <Typography variant="h4">{name}</Typography>
                    <img key={id} src={badgeURL + id + ".png"} onLoad={handleLoadedImage} style={{ "height": "5em"}}/>
                    <p>f</p>
                    {/* {teams.map((team) => {
                        return <p key = {team.id}>{team.name}</p>
                    })} */}
                </div>
                )}
        </div>
        );
}


export default LeagueSelection