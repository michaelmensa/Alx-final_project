const mongoose = require('mongoose');

const PORT = process.env.DB_PORT || 27017;
const HOST = process.env.DB_HOST || 'localhost';
const DBNAME = process.env.DB_NAME || 'clinic_base';

const uri = `mongodb://${HOST}:${PORT}/${DBNAME}`;

// connect to db with mongoose
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`Connected to ${connect.connection.host}`);
  } catch (err) {
    console.log('Failed to connect to DB', err);
    process.exit(1); // exit the process with a non-zero code
  }
};

module.exports = connectDB;
