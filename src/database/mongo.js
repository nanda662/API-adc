import mongoose from 'mongoose';
const connectDatabase = async () => {
    const mongoUri = process.env.MONGO_URI; 
    console.log("String de conexão:", mongoUri); // Log para verificar
    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB conectado!");
    } catch (err) {
      console.error("Erro ao conectar:", err.message); // Log do erro
    }
  };
  

export default connectDatabase
