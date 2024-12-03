import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const AvaliacaoSchema = new mongoose.Schema({
  id_avaliacao: {
    type: String,
    default: uuidv4,
    auto: true,
  },
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia ao modelo Usuario
    required: true,
  },
  id_profissional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia ao modelo Usuario
    required: true,
  },
  id_consulta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consulta", // Referencia ao modelo Consulta
    required: true,
  },
  nota: {
    type: Number,
    required: true,
    min: 1, // Avaliação mínima
    max: 5, // Avaliação máxima
  },
  comentario: {
    type: String,
    maxlength: 500, // Limite de caracteres no comentário
  },
  data_avaliacao: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Avaliacao", AvaliacaoSchema);
