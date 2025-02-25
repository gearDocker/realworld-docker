import mongoose from 'mongoose';

import { url } from '../configurations/index.js';

export const connectDB = () => {
  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  return mongoose.connection;
};
