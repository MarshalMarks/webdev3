const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

let tasks = [
    { id: 1, name: "Clean dishes" },
    { id: 2, name: "Do laundry" },
    { id: 3, name: "Finish homework" },
];

app.get("/test", (req, res) => {
    res.status(200).json({ success: true });
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = { id: tasks[tasks.length-1].id + 1, nam: req.body.name };
    tasks.push(task);
    res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));