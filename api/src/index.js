import express from 'express';

import { connectDB } from './helpers/connect_db.js';
import { port } from './configurations/index.js';

const app = express();

app.get('', (_, res) => {
  res.redirect('/test');
});

app.get('/test', (_, res) => {
  res.send('Hello from Express!');
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server start on http://localhost:${port}`);
  });
};

connectDB()
  .on('error', (err) => {
    console.error(`connection error: ${err}`);
  })
  .on('disconnected', connectDB)
  .once('open', startServer);
