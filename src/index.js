import express from "express";

import Avaliacao from "./models/Avaliacao.js";
import Transacao from "./models/Transacao.js";
import Consulta from "./models/Consulta.js";
import User from "./models/User.js";
import connectDatabase from "./database/mongo.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/users", async (req, res) => {
    const { nome, email, telefone, dataNasc, tipo_user, senha, consultorio, especializacao, CRP, OAB } = req.body;

    try {
        if (!["cliente", "psicologo", "advogado"].includes(tipo_user)) {
            return res.status(400).json({ message: "Tipo de usuário inválido!" });
        }

        // Criando 
        const novoUsuario = {
            nome,
            email,
            telefone,
            dataNasc,
            tipo_user,
            senha,
        };

        // Atributos adicionais para profissionais
        if (tipo_user === "psicologo") {
            novoUsuario.consultorio = consultorio;
            novoUsuario.especializacao = especializacao;
            novoUsuario.CRP = CRP;
        } else if (tipo_user === "advogado") {
            novoUsuario.consultorio = consultorio;
            novoUsuario.especializacao = especializacao;
            novoUsuario.OAB = OAB;
        }

        // Criar o user no banco
        const user = await User.create(novoUsuario);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }
        res.status(200).json({ message: "Usuário deletado com sucesso!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Consulta
app.post("/consultas", async (req, res) => {
    try {
        const { id_cliente, id_profissional, tipo_profissional, dt_consulta, tarifa, status_consulta, tipo_consulta } = req.body;

        // Validação 
        if (!id_cliente || !id_profissional || !tipo_profissional) {
            return res.status(400).json({ error: "Os campos id_cliente, id_profissional e tipo_profissional são obrigatórios!" });
        }

        // nova consulta
        const novaConsulta = new Consulta({
            id_cliente,
            id_profissional,
            tipo_profissional,
            dt_consulta,
            tarifa,
            status_consulta,
            tipo_consulta,
        });

        // Salvando no banco de dados
        const consultaSalva = await novaConsulta.save();

        // slc
        res.status(201).json({
            message: "Consulta criada com sucesso!",
            consulta: consultaSalva,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/consultas", async (req, res) => {
    try {
        const consultas = await Consulta.find()
            .populate("id_cliente", "nome email") // faz bagulho la
            .populate("id_profissional", "nome email tipo_user"); // o mesmo bagulho
        res.status(200).json(consultas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/consultas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const consulta = await Consulta.findOne({ id_consulta: id })
        .populate("id_cliente", "nome email")
        .populate("id_profissional", "nome email tipo_user");
  
      if (!consulta) {
        return res.status(404).json({ message: "Consulta não encontrada!" });
      }
  
      res.status(200).json(consulta);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

//Transacao
app.post("/transacoes", async (req, res) => {
    try {
      const { id_cliente, id_profissional, metodo, valor, status, descricao } = req.body;
  
      const novaTransacao = await Transacao.create({
        id_cliente,
        id_profissional,
        valor,
        descricao,
        status,
        metodo,
      });
  
      res.status(201).json(novaTransacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  app.get("/transacoes", async (req, res) => {
    try {
      const transacoes = await Transacao.find()
        .populate("id_cliente", "nome email")
        .populate("id_profissional", "nome email tipo_user");
  
      res.status(200).json(transacoes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  app.get("/transacoes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const transacao = await Transacao.findOne({ id_transacao: id })
        .populate("id_cliente", "nome email")
        .populate("id_profissional", "nome email tipo_user");
  
      if (!transacao) {
        return res.status(404).json({ message: "Transação não encontrada!" });
      }
  
      res.status(200).json(transacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/transacoes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const transacaoDeletada = await Transacao.findOneAndDelete({ id_transacao: id });
  
      if (!transacaoDeletada) {
        return res.status(404).json({ message: "Transação não encontrada!" });
      }
  
      res.status(200).json({
        message: "Transação deletada com sucesso!",
        transacao: transacaoDeletada,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


//Avaliacao

app.post("/avaliacoes", async (req, res) => {
    try {
      const { id_cliente, id_profissional, id_consulta, nota, comentario } = req.body;
  
      // Criação da Avaliação
      const novaAvaliacao = await Avaliacao.create({
        id_cliente,
        id_profissional,
        id_consulta,
        nota,
        comentario,
      });
  
      res.status(201).json(novaAvaliacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get("/avaliacoes", async (req, res) => {
    try {
      const avaliacoes = await Avaliacao.find()
        .populate("id_cliente", "nome email")
        .populate("id_profissional", "nome email tipo_user")
        .populate("id_consulta", "dt_consulta tipo_consulta");
  
      res.status(200).json(avaliacoes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  app.get("/avaliacoes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const avaliacao = await Avaliacao.findById(id)
        .populate("id_cliente", "nome email")
        .populate("id_profissional", "nome email tipo_user")
        .populate("id_consulta", "dt_consulta tipo_consulta");
  
      if (!avaliacao) {
        return res.status(404).json({ message: "Avaliação não encontrada!" });
      }
  
      res.status(200).json(avaliacao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/avaliacoes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const avaliacaoDeletada = await Avaliacao.findByIdAndDelete(id);
  
      if (!avaliacaoDeletada) {
        return res.status(404).json({ message: "Avaliação não encontrada!" });
      }
  
      res.status(200).json({
        message: "Avaliação deletada com sucesso!",
        avaliacao: avaliacaoDeletada,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  


connectDatabase()
    .then(() => {
        app.listen(5000, () => console.log("Conectado"))
    })
    .catch((error) => console.log(error));
