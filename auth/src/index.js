import express from 'express';

import { connectDB } from './helpers/connect_db.js';
// TODO: to uppercase
import { port } from './configurations/index.js';

const app = express();

app.get('', async (_, res) => {
  res.redirect('/test');
});

app.get('/test', async (_, res) => {
  res.send('Auth server working');
});

app.get('/current', async (_, res) => {
  res.json({
    id: 1,
    username: 'test',
  });
});

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Auth server start on http://localhost:${port}`);
  });
};

connectDB()
  .on('error', async (err) => {
    console.error(`connection error: ${err}`);
  })
  .on('disconnected', connectDB)
  .once('open', startServer);
