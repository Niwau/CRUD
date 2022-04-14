const express = require("express");
const mongoose = require("mongoose");
const Tasks = require('./models/Tasks.js')
const app = express();

mongoose.connect(`mongodb+srv://Niwau:Gd1pIGUq1rBLPBcG@learning.zcvxb.mongodb.net/Node?retryWrites=true&w=majority`)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(() => console.log("Falha ao se conectar!"));

app.use(express.json());

app.get('/tasks', async (req,res) => {
    const AllTasks = await Tasks.find();
    res.json(AllTasks)
});

app.post('/tasks', (req, res) => {
    Tasks.create({
        task: req.body.task,
        completed: req.body.completed
    })
    .then(() => res.send("Tarefa criada com sucesso!"))
    .catch(error => res.send(error))
});

app.delete('/tasks/:id', async (req, res) => {
    
    try{
        await Tasks.findByIdAndDelete(req.params.id);
        res.send("O item foi removido com sucesso!");

    } catch (error) {
        res.send("O item não foi encontrado.");
    }
})

app.patch('/tasks/:id', async (req,res) => {
    try {
        await Tasks.findByIdAndUpdate(req.params.id, req.body);
        res.send("Atualizado!")

    } catch (error) {
        res.send("Falha ao atualizar!")
    }
})

app.listen(8080);




    