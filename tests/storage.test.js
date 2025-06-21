const { saveTasks, loadTasks } = require("../src/storage/storage");

describe("Storage Layer", () => {
  beforeEach(() => {
    saveTasks([]); // reset storage before each test
  });

  test("saveTasks stores tasks", () => {
    const tasks = [{ id: 1, description: "Test task" }];
    saveTasks(tasks);
    const loaded = loadTasks();
    expect(loaded).toEqual(tasks);
  });

  test("loadTasks returns a copy, not the original array", () => {
    const tasks = [{ id: 1, description: "Test task" }];
    saveTasks(tasks);
    const loaded = loadTasks();
    loaded.push({ id: 2, description: "Another task" });
    const reloaded = loadTasks();
    expect(reloaded.length).toBe(1); // original storage unchanged
  });
});
