import express from 'express';

import { connectDB } from './helpers/connect_db.js';
import { PORT, API_URL } from './configurations/index.js';

const app = express();

app.get('', async (_, res) => {
  res.redirect('/test');
});

/** Test api */
app.get('/auth/test', async (_, res) => {
  res.send('Auth server working');
});

/** Send data to api service */
app.get('/auth/current', async (_, res) => {
  res.json({
    id: 1,
    username: 'test',
  });
});

/** Get data from api service */
app.get('/auth/some_data', async (_, res) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((data) =>
      res.json({
        fromApi: data,
      }),
    );
});

const startServer = () => {
  app.listen(PORT, async () => {
    console.log(`Auth server start on http://localhost:${PORT}`);
  });
};

connectDB()
  .on('error', async (err) => {
    console.error(`connection error: ${err}`);
  })
  .on('disconnected', connectDB)
  .once('open', startServer);
