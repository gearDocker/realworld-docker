import mongoose from 'mongoose';

import { URL } from '../configurations/index.js';

export const connectDB = () => {
  try {
    mongoose.connect(URL);
  } catch (err) {
    process.exit(1);
  }

  return mongoose.connection;
};
