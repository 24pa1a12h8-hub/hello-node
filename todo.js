const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];

    return all.filter((todo) => {
      return todo.dueDate < today;
    });
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];

    return all.filter((todo) => {
      return todo.dueDate === today;
    });
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];

    return all.filter((todo) => {
      return todo.dueDate > today;
    });
  };

  const toDisplayableList = (todos) => {
    const today = new Date().toISOString().split("T")[0];

    return todos
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";

        if (todo.dueDate === today) {
          return `${checkbox} ${todo.title}`;
        }

        return `${checkbox} ${todo.title} ${todo.dueDate}`;
      })
      .join("\n");
  };

  return {
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
