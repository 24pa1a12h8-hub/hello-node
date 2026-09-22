const express = require("express");
const db = require("./models");

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
    try {
        const todos = await db.Todo.findAll();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const deletedCount = await db.Todo.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json(deletedCount > 0);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

module.exports = app;