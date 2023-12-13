import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Page from '../../components/Page';
import {styles} from '../../styles/styles';

export default function MessagePage() {

    return(
      <Page>
              <br />
            <Card style={styles.card}>
            <Typography variant="h4">Message Board.</Typography>
            
            </Card>
          </Page>
      );
}