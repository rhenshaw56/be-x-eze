import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connect = async () => {
  const client = await mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true
    }
  );

  mongoose.connection.on('connected', () => {
    console.log('DB CONNECTED');
  });

  mongoose.connection.on('error', (err) => {
    console.error('ERROR CONNECTING TO DB', err);
  });

  return client;
};

export default {
  connect,
}
