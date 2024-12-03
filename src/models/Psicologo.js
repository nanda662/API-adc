import mongoose from "mongoose";

const psicologoSchema = new mongoose.Schema({
    id_psicologo: { type: Number, ref: "User", required: true },
    consultorio: { type: String },
    CRP: { type: String, required: true },
    especializacao: { type: [String] },
    disponibilidade: { type: [String] },
    modalidade: { type: String, enum: ["online", "presencial", "ambos"] },
    });

export default mongoose.model('Psicologo', psicologoSchema);