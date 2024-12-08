import mongoose from 'mongoose';
const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI; 
  await mongoose.connect(mongoUri);
  console.log("MongoDB conectado!");
};

export default connectDatabase
