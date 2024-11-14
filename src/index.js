import express from "express";

import User from "./models/User.js";
import connectDatabase from "./database/mongo.js";

const app = express();
app.use(express.json());

const users = [];

app.get("/users", async (request, response) => {
    const user = await User.find()
    return response.json(user);
});

app.post("/users", async (request, response) => {
    const user = request.body;

    const newUser = await User.create(user);

    return response.json(newUser);
});

connectDatabase()
    .then(() => {
        app.listen(3000, () => console.log("Conectado"))
    })
    .catch((error) => console.log(error));
