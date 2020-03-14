import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

export async function connect() {
  return mongoServer.getUri().then(mongoUri => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', e => {
      if (e.message.code === 'ETIMEDOUT') {
        mongoose.connect(mongoUri, mongooseOpts);
      }
    });

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  });
}

export async function disconnect() {
  await mongoose.disconnect();
  mongoServer.stop();
}
