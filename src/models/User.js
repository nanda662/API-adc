import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    tipo_user: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }

})

export default mongoose.model('User', userSchema);