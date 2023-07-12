import { Typography, Card } from '@mui/material';
import Page from '../../components/Page';
import { styles } from '../../styles/styles';


export default function AboutPage() {

    return(
                <Page>

                    <Card style={styles.card}>
                    <Typography variant='h4'>Leaderboard.</Typography>
                    <Typography variant="body1">There should be a Leaderboard here.</Typography>
                    </ Card>
                </Page>
      );
}