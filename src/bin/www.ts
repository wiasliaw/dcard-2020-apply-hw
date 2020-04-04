import dotenv from 'dotenv';
dotenv.config();

import server from '../server';

(async (): Promise<void> => {
  server.listen(process.env.PORT);
})();
