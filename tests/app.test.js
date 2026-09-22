const request = require("supertest");
const app = require("../app");
const db = require("../models");

describe("Todo API", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await db.sequelize.close();
    });

    test("GET /todos should return all todos", async () => {
        await db.Todo.create({
            title: "Test API Todo",
            dueDate: "2026-09-22",
            completed: false,
        });

        const response = await request(app).get("/todos");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe("Test API Todo");
    });

    test("DELETE /todos/:id should delete a todo", async () => {
        const todo = await db.Todo.create({
            title: "Todo to delete",
            dueDate: "2026-09-22",
            completed: false,
        });

        const response = await request(app).delete(`/todos/${todo.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);

        const deletedTodo = await db.Todo.findByPk(todo.id);

        expect(deletedTodo).toBeNull();
    });
});