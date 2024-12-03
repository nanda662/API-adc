import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ClienteSchema = new mongoose.Schema({
    id_cliente: { type: String, default: uuidv4 }, // Usar UUID como _id
    nome: String,
    email: String,
    telefone: String,
  });
const Cliente = mongoose.model("Cliente", ClienteSchema);

export default Cliente