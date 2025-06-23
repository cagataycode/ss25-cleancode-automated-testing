const storage = require("./storage/storage");
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

async function prompt() {
  showMenu();
  rl.question("Enter your choice: ", async (choice) => {
    choice = choice.trim();
    switch (choice) {
      case "1": {
        const tasks = await taskManager.getTasks();
        console.log("Tasks:", tasks);
        break;
      }
      case "2": {
        rl.question("Enter task description: ", async (desc) => {
          await taskManager.addNewTask(desc);
          console.log("Task added.");
          await prompt(); // Call prompt again after completing this action
        });
        return; // Exit current callback to avoid calling prompt twice
      }
      case "3": {
        rl.question("Enter task ID to remove: ", async (id) => {
          await taskManager.removeTaskById(parseInt(id));
          console.log("Task removed.");
          await prompt();
        });
        return;
      }
      case "4": {
        rl.question("Enter task ID to toggle: ", async (id) => {
          await taskManager.toggleTask(parseInt(id));
          console.log("Task toggled.");
          await prompt();
        });
        return;
      }
      case "5": {
        rl.close();
        return;
      }
      default:
        console.log("Invalid choice");
        await prompt();
        return;
    }
    // After handling the choice, call prompt again
    await prompt();
  });
}

// Start the prompt loop
prompt();

rl.on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
