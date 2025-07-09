const mongoose = require('mongoose');

const DB_connection = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB connection success on : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = { DB_connection };