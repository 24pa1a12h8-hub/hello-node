const db = require("./models/index");
const argv = require("minimist")(process.argv.slice(2));

const markAsComplete = async (id) => {
  try {
    await db.Todo.markAsComplete(id);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;

  if (id === undefined) {
    throw new Error("Need to pass an id");
  }

  if (!Number.isInteger(Number(id))) {
    throw new Error("The id needs to be an integer");
  }

  await markAsComplete(Number(id));
  await db.Todo.showList();
})();
