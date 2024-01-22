import { Card, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Page from '../../components/Page';
import {styles} from '../../styles/styles';
import { orderBy, query, getDocs, collection, where, getFirestore } from 'firebase/firestore';
import Firebase from '../../components/firebase/Firebase';
import {useState, useEffect} from 'react';

export default function MessagePage() {

  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTransfers = async () => {
    const db = getFirestore(Firebase.app);
    const q = query(collection(db, 'transferlogs/'), orderBy("timestamp", "desc"));
    const docSnap = await getDocs(q);
    let logs = [];
    docSnap.forEach((doc) => {
      const d = doc.data();
      logs.push(d);


      return null; // Return null or appropriate value if no data
    });
    // console.log(logs);
  return logs;
}

  useEffect(() => {
    console.log(transfers)
  },[transfers]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransfers();
      // console.log(data)
      if (data) {
          setTransfers(data);
        }
      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, []);

    return(
      <Page>
              <br />
            <Card style={styles.card}>
            <Typography variant="h4">Message Board.</Typography>

            {transfers.length > 0 && (
              <List dense={true}>
                {transfers.map((log, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={JSON.stringify(log.timestamp) + ": " + log.teamOut.Name + " for " + log.teamIn.Name + " " + log.league + " user: " + log.uid}>
                    </ListItemText>
                  </ListItem>
                ))}

              </List>
            )}

            
            </Card>
          </Page>
      );
}