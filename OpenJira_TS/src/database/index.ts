import mongoose from "mongoose";

const connect = async () => {
  await disconnect();

  console.log('Connecting DB');
  await mongoose.connect(process.env.LOCAL_MONGO_URL || '');
  console.log('DB Connected');
}

const disconnect = async () => {
  if (mongoose.connections.length > 0) {
    console.log('Closing connections');
    await Promise.allSettled(mongoose.connections.map(connection => connection.close()));
    await mongoose.disconnect();
    console.log('Connections closed');
  }
}

const db = {
  connect,
  disconnect
}

export default db
