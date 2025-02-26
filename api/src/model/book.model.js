import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});

export const BookModel = new mongoose.model('Book', bookSchema);
