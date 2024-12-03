import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  id_user: { type: String, default: uuidv4},
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String },
  dataNasc: { type: Date },
  tipo_user: { type: String, enum: ["cliente", "psicologo", "advogado"], required: true },
  senha: { type: String, required: true },
  });

export default mongoose.model('User', userSchema);