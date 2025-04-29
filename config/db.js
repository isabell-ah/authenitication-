const mongoose = require('mongoose');
uri = process.env.MONGO_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDb connected successfully');
  } catch (err) {
    console.log('MongoDb connection failed', err.message);
    process.exit(1);
  }
};
module.exports = connectDb;
