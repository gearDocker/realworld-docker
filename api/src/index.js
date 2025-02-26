import express from 'express';

import { connectDB } from './helpers/connect_db.js';
import { port } from './configurations/index.js';
import { BookModel } from './model/book.model.js';

const app = express();

app.get('', async (_, res) => {
  res.redirect('/test');
});

app.get('/test', async (_, res) => {
  res.send('Hello from Express!');
});

const startServer = () => {
  app.listen(port, async () => {
    console.log(`Server start on http://localhost:${port}`);
    const book = new BookModel({
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      year: 1951,
    });
    await book.save();
    /** get all books form bd */
    const books = await BookModel.find({});
    console.log(books);
  });
};

connectDB()
  .on('error', async (err) => {
    console.error(`connection error: ${err}`);
  })
  .on('disconnected', connectDB)
  .once('open', startServer);
