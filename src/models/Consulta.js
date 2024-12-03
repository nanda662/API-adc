import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ConsultaSchema = new mongoose.Schema({
  id_consulta: {
    type: String,
    default: uuidv4,
    auto: true,
  },
  id_cliente: {
    type: String, // Alterado para String
    required: true,
  },
  id_profissional: {
    type: String, // Alterado para String
    required: true,
  },
  tipo_profissional: {
    type: String,
    required: true,
  },
  dt_consulta: {
    type: Date,
    default: Date.now,
  },
  tarifa: Number,
  status_consulta: String, // Exemplo: "pendente", "concluída", "cancelada"
  tipo_consulta: String, // Exemplo: "presencial", "online"
});

export default mongoose.model("Consulta", ConsultaSchema);
