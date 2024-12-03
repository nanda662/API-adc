import mongoose from "mongoose";

const advogadoSchema = new mongoose.Schema({
    id_advogado: { type: Number, ref: "User", required: true },
    consultorio: { type: String },
    OAB: { type: String, required: true },
    especializacao: { type: [String] },
    disponibilidade: { type: [String] },
    modalidade: { type: String, enum: ["online", "presencial", "ambos"] },
});

const Advogado = mongoose.model("Advogado", advogadoSchema);

export default Advogado