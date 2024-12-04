const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// Cors is used to make sure that the frontend is allowed to talk to the API
const cors = require('cors');
app.use(cors());

// Using an in-memory sql database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize database (serialize to ensure this runs first)
db.serialize(() => {
    db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT)");
});

app.get("/test", (req, res) => {
    res.status(200).json({ success: true });
});

app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        res.json(rows);
    });
});

app.post("/tasks", (req, res) => {
    const statement = db.prepare("INSERT INTO tasks (name) VALUES (?)");
    statement.run(req.body.name, function() {
        res.status(201).json({ id: this.lastID, name:req.body.name });
    });
    statement.finalize();
});

app.delete("/tasks/:id", (req, res) => {
    db.run("DELETE FROM tasks WHERE id = ?", req.params.id, function() {
        res.status(204).send();
    });
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));