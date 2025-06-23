const path = require("path");
const createTaskManager = require("../src/taskManager");
const storage = require("../src/storage/storage");

const testFilePath = path.join(__dirname, "test_tasks.json");

jest.mock("../src/storage/storage", () => {
  const fs = require("fs").promises; // move require inside the mock factory
  const path = require("path");
  const testFilePath = path.join(__dirname, "test_tasks.json");

  return {
    saveTasks: jest.fn(async (tasks) => {
      await fs.writeFile(testFilePath, JSON.stringify(tasks));
    }),
    loadTasks: jest.fn(async () => {
      try {
        const data = await fs.readFile(testFilePath, "utf-8");
        return JSON.parse(data);
      } catch (err) {
        return [];
      }
    }),
  };
});

const taskManager = createTaskManager(storage);

describe("TaskManager Integration Tests", () => {
  beforeEach(async () => {
    await storage.saveTasks([]);
  });

  test("addNewTask adds a task and persists", async () => {
    await taskManager.addNewTask("Test task");
    const tasks = await taskManager.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe("Test task");
  });

  // Add more tests for removeTask and toggleTask
});
