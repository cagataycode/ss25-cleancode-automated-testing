const storage = require("./storage");
const createTaskManager = require("./taskManager");

const taskManager = createTaskManager(storage);

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`
Choose an option:
1. List tasks
2. Add task
3. Remove task
4. Toggle task
5. Exit
`);
}

function prompt() {
  showMenu();
  rl.question("Enter your choice: ", async (choice) => {
    switch (choice.trim()) {
      case "1":
        const tasks = await taskManager.getTasks();
        console.log("Tasks:", tasks);
        break;
      case "2":
        rl.question("Enter task description: ", async (desc) => {
          await taskManager.addNewTask(desc);
          console.log("Task added.");
        });
        break;
      case "3":
        rl.question("Enter task ID to remove: ", async (id) => {
          await taskManager.removeTaskById(parseInt(id));
          console.log("Task removed.");
        });
        break;
      case "4":
        rl.question("Enter task ID to toggle: ", async (id) => {
          await taskManager.toggleTask(parseInt(id));
          console.log("Task toggled.");
        });
        break;
      case "5":
        rl.close();
        return;
      default:
        console.log("Invalid choice");
    }
    setTimeout(prompt, 500); // small delay to allow async ops
  });
}

prompt();

rl.on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
