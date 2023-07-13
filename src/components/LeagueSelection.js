import { ListItem, ListItemIcon, List, Typography, CircularProgress } from "@mui/material";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs,doc,  setDoc, query, orderBy } from "firebase/firestore";
import {useState, useEffect} from "react"
import Firebase from "./firebase/Firebase";
import SelectTeams from "./SelectTeams";

const teams = [];
const league_info = require ( "../Leagues.json")
const leagues = league_info.leagues;
const badgeURL = "https://media.api-sports.io/football/";
const TTL = 86400000 // 24 hours



const LeagueSelection = (props) => {

    
    const league_info = require ( "../Leagues.json")
    const leagues = league_info.leagues;
    // console.log(league_info.leagues[index].name)
    const {index, teamIDs, teamNames, setTeamNames, setTeamIDs} = props;

    const name = league_info.leagues[index].name;
    const id = league_info.leagues[index].id;
    const [teams, setTeams] = useState([]);
    const [loadingData, setLoadingData] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const db = getFirestore();

    const handleListItemClick = async (event, teamID, teamName) => {
        setSelectedIndex(teamID);

        setTeamIDs({...teamIDs, [`${id}`]: teamID})
        setTeamNames({...teamNames, [`${teamID}`]: teamName})
    }

    const getLeagueData = async () => {

        if (localStorage.getItem(id)) {
            setTeams(JSON.parse(localStorage.getItem(id)))
        }
        else {

            const leagueReference = collection(db, "league" + id);
            const q = query(leagueReference, orderBy("Name", "asc"));
            
            const querySnapshot = await getDocs(q);
            
            const newTeams = querySnapshot.docs.map((doc) => ({
                name: doc.data().Name,
                id: doc.data().id,
            }));
            
            setTeams(newTeams);
            localStorage.setItem(id, JSON.stringify(newTeams))
        }
        setLoadingData(false);
      }

      useEffect(() => {
        const fetchData = async () => {
          setLoadingData(true);
          setTeams([]);
          await getLeagueData();
        };
        if (teamIDs[`${id}`] != undefined) {
            setSelectedIndex(teamIDs[`${id}`])
            }   
        
        fetchData();
      }, [index]);
      
    return (
        <div>
            <Typography variant="h4">{name}</Typography>
                {(!loadingData && teams.length > 0) && (
                    <div >
                    <img key={id} src={badgeURL +"leagues/" + id + ".png"} style={{ "height": "5em"}}/>
                    {teams.map((team) => {
                        return (
                            <div key={team.id}>
                                <List >
                                    <ListItem
                                    dense
                                    selected={selectedIndex === team.id}
                                    onClick={(event) => handleListItemClick(event, team.id, team.name)}>
                                        <ListItemIcon style={{"float":"right"}}>
                                            <img style={{"height":"1.5em"}} src={badgeURL + "teams/" + team.id + ".png"} />
                                        </ListItemIcon>
                                        {team.name}
                                    </ListItem>
                                </List>
                            </div>
                        )
                    })}
                </div>
                )}
                {loadingData && (
                    <CircularProgress /> 
                )}
        </div>
        );
}


export default LeagueSelection