import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Importe o modelo de Usuario

const TransacaoSchema = new mongoose.Schema({
  id_transacao: {
    type: String,
    default: uuidv4,
    auto: true,
  },
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Nome correto do modelo que será referenciado
    required: true,
  },
  id_profissional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Nome correto do modelo que será referenciado
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  data_transacao: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pendente", "concluída", "cancelada"],
    default: "pendente",
  },
  descricao: String,
});

export default mongoose.model("Transacao", TransacaoSchema);
