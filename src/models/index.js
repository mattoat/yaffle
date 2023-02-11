// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Leaderboard, League0, League1, League2, League3, League4, League5, League6, League7 } = initSchema(schema);

export {
  Leaderboard,
  League0,
  League1,
  League2,
  League3,
  League4,
  League5,
  League6,
  League7
};