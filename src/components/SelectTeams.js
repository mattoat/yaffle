import { Modal, Button, MobileStepper, Typography, Paper, Icon, Card } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState, useEffect } from "react";
import Page from "./Page";
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import LeagueSelection from './LeagueSelection';
import ReviewTeamsPage from "./ReviewTeamsPage";

const league_info = require( "../Leagues.json")
const leagues = league_info.leagues;
const badgeURL = "https://media.api-sports.io/football/leagues/";

const SelectTeams = () => {

    const [teamIDs, setTeamIDs] = useState({});
    const [teamNames, setTeamNames] = useState({});
    const [activeStep, setActiveStep] = useState(0);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // useEffect(() => {console.log(teamIDs)}, [teamIDs])
    return (
        <Page >
            <br/>

            {(activeStep === 0) && (<PageOne />)}
            {(activeStep > 0 && activeStep < 9) && (<LeagueSelection index={activeStep - 1} teamIDs={teamIDs} teamNames={teamNames} setTeamNames={setTeamNames} setTeamIDs={setTeamIDs} />)}
            {(activeStep === 9) && (<ReviewTeamsPage teamNames={teamNames} teamIDs={teamIDs}/>)}
            
            <div style={{paddingTop:"10%", position: 'relative', bottom: -30, left: '10%', width: '80%' }}>
                <MobileStepper
                    variant="progress"
                    style={{"backgroundColor":"inherit", "maxWidth": "inherit", "bottom": "0px", "paddingBottom": "-25px"}}
                    steps={10}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
                        {activeStep < 8  && (<Typography variant="h6">{activeStep + 1}</Typography>)}
                        {activeStep === 8 && (<ContentPasteTwoToneIcon/>)}
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <KeyboardArrowLeft />
                            {activeStep >= 2 && (<Typography variant="h6">{activeStep - 1}</Typography>)}
                            {activeStep === 1 && (<ErrorTwoToneIcon />)}
                        </Button>
                    }
                 />
            </div>
        </Page>
    )
}

const PageOne = () => {
    return (
        <div>
            <Typography variant="h4">Team Selection</Typography>
            <br/>
            <br/>
            <Typography variant="body">Remember, this selection of teams will determine your success in the first half of the season.
            You won't be able to make any changes to your team until the January transfer window. </Typography>
            <Typography variant="body">Do your research, find out who the bookies have as favourites.</Typography>
            <Typography variant="body">When you're ready, choose the team from each league,  you'll get the chance at the end to review your selections.</Typography>
        </div>
    )
}



export default SelectTeams;