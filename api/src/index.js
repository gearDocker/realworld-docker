import express from 'express';

import { connectDB } from './helpers/connect_db.js';
import { PORT, AUTH_URL } from './configurations/index.js';
import { BookModel } from './model/book.model.js';

const app = express();

app.get('', async (_, res) => {
  res.redirect('/test');
});

/** Test api */
app.get('/test', async (_, res) => {
  res.send('Api server working');
});

/** Send data to auth service */
app.get('/api/data', async (_, res) => {
  res.json({
    id: 1,
    data: {
      data: new Date(),
      message: 'message',
    },
  });
});

/** Get user from auth service */
app.get('/api/user', async (_, res) => {
  fetch(`${AUTH_URL}/current`)
    .then((response) => response.json())
    .then((data) => {
      res.json({
        url: AUTH_URL,
        user: data,
      });
    });
});

const startServer = () => {
  app.listen(PORT, async () => {
    console.log(`Api server start on http://localhost:${PORT}`);
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
