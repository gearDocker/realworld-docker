import express from 'express';

import { connectDB } from './helpers/connect_db.js';
// TODO: to uppercase
import { port, auth_url } from './configurations/index.js';
import { BookModel } from './model/book.model.js';

const app = express();

app.get('', async (_, res) => {
  res.redirect('/test');
});

app.get('/test', async (_, res) => {
  res.send('Api server working');
});

app.get('/user', async (_, res) => {
  console.log('auth url :: ', `${auth_url}/current`);
  fetch(`${auth_url}/current`)
    .then((response) => response.json())
    .then((data) => {
      res.json({
        url: auth_url,
        user: data,
      });
    });
});

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Api server start on http://localhost:${port}`);
    const book = new BookModel({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      year: 1951,
    });
    await book.save();
    /** get all books form bd */
    const books = await BookModel.find({});
    // console.log(books);
  });
};

connectDB()
  .on('error', async (err) => {
    console.error(`connection error: ${err}`);
  })
  .on('disconnected', connectDB)
  .once('open', startServer);
