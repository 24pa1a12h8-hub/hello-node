const db = require("../models");

describe("Todo List Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test("should create a new todo", async () => {
    const todosCount = await db.Todo.count();

    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });

    const newTodosCount = await db.Todo.count();

    expect(newTodosCount).toBe(todosCount + 1);
  });

  test("should mark a todo as completed", async () => {
    const todo = await db.Todo.addTask({
      title: "Complete this todo",
      completed: false,
      dueDate: new Date(),
    });

    await db.Todo.markAsComplete(todo.id);

    const updatedTodo = await db.Todo.findByPk(todo.id);

    expect(updatedTodo.completed).toBe(true);
  });

  test("should retrieve overdue items", async () => {
    await db.Todo.create({
      title: "Overdue todo",
      dueDate: "2026-09-20",
      completed: false,
    });

    const result = await db.Todo.overdue();

    expect(result.length).toBeGreaterThan(0);
    expect(result.some((todo) => todo.title === "Overdue todo")).toBe(true);
  });

  test("should retrieve due today items", async () => {
    await db.Todo.create({
      title: "Today todo",
      dueDate: "2026-09-21",
      completed: false,
    });

    const result = await db.Todo.dueToday();

    expect(result.length).toBeGreaterThan(0);
    expect(result.some((todo) => todo.title === "Today todo")).toBe(true);
  });

  test("should retrieve due later items", async () => {
    await db.Todo.create({
      title: "Later todo",
      dueDate: "2026-09-22",
      completed: false,
    });

    const result = await db.Todo.dueLater();

    expect(result.length).toBeGreaterThan(0);
    expect(result.some((todo) => todo.title === "Later todo")).toBe(true);
  });
});
