const todoList = require("../todo");

describe("Todo List", () => {
  test("should create a new todo", () => {
    const todos = todoList();

    todos.add({
      title: "Buy Milk",
      dueDate: "2026-09-21",
      completed: false,
    });

    const result = todos.dueToday();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Buy Milk");
  });

  test("should mark a todo as completed", () => {
    const todos = todoList();

    todos.add({
      title: "Buy Milk",
      dueDate: "2026-09-21",
      completed: false,
    });

    todos.markAsComplete(0);

    const result = todos.dueToday();
    const display = todos.toDisplayableList(result);

    expect(display).toContain("[x] Buy Milk");
  });

  test("should retrieve overdue items", () => {
    const todos = todoList();

    todos.add({
      title: "Submit Assignment",
      dueDate: "2026-09-20",
      completed: false,
    });

    const result = todos.overdue();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Submit Assignment");
  });

  test("should retrieve due today items", () => {
    const todos = todoList();

    todos.add({
      title: "Pay Rent",
      dueDate: "2026-09-21",
      completed: false,
    });

    const result = todos.dueToday();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Pay Rent");
  });

  test("should retrieve due later items", () => {
    const todos = todoList();

    todos.add({
      title: "File Taxes",
      dueDate: "2026-09-22",
      completed: false,
    });

    const result = todos.dueLater();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("File Taxes");
  });
});
