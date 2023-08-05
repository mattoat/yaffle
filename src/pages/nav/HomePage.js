import { Card, Typography } from '@mui/material';
import Page from '../../components/Page';
import {styles} from '../../styles/styles'
const brandSrc = "/assets/BirdFirstYaffle.svg";

export default function HomePage() {
    return(
        <Page>
            <Card elevation={1} style={styles.cardStyle}>
                <img style={styles.imgStyle} src={brandSrc} alt='Yaffle' />
            </Card>
            <br />
            <Typography variant='h4'>The Fantasy Football Web App.</Typography>
            <Typography variant='body1'>
                Yaffle is a simple game of football prediction. You're tested on your current knowledge of football by 
                predicting which club will win in 8 different leagues around Europe. For every point your selected teams earn 
                in their league, you also earn a point on the Yaffle leaderboard. Anyone can join the game at any point in the 
                football season, however, <strong> you only gain points from teams after your selection is made,</strong> so it's best to 
                join the game before the football season begins.
            </Typography>
            <Typography variant='body1'>
                The game is deliberately designed to be 'light touch'. Unlike Fantasy Football games, you can 
                sit back and watch yourself move up (or down) the leaderboard for the rest of the season. It is possible to win Yaffle if you chose this strategy, however if you want to try to improve 
                your performance, you will also have the ability to substitute your teams during the season's transfer window.</Typography>
            <Typography variant='h6'>Background.
            </Typography>
            <Typography variant='body1'>
                Des Oates created, and ran yaffle since (at least) 2009, but the last season ran was in 2016 (<a href="http://yaffle-2016.appspot.com/">The website is still partially running.</a>)
                His son, Matthew Oates has decided to pick it up and bring it back to life. 
            </Typography>
            <Typography variant='h6'>Winning.</Typography>
            <Typography variant='body1'>
                Once you have chosen your 8 teams, you will appear on the Yaffle leaderboard. Your total points score on the Yaffle 
                leaderboard is the sum of all your teams current points total in their respective leagues.
                The winner is the player with the most points at the end of the season when all leagues have been completed. 
                Play-offs are not counted for in Yaffle.
            </Typography>
            <Typography variant='h6'>Join.</Typography>
            <Typography variant='body1'>
                Register by clicking the top right button. You will be asked to register and select your eight teams, once you've done that, you're in.
            </Typography>
            <Typography variant='h6'>Tech Stack.</Typography>
            <Typography variant='body1'>
                The front end of the web app is developed using ReactJS, all of the code for it can be 
                found on my <a href="https://github.com/oates-matthew/yaffle">Github.</a> The backend is
                through Google Firebase. Yaffle also uses an API service to obtain all its football data. 
                Huge appreciation for <a href="https://www.api-football.com/">API-football</a>, which is an entirely free and great resource that Yaffle relies on.
                </Typography>
        </Page>
    )
}