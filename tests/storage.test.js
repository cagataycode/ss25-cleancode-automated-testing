const { saveTasks, loadTasks } = require("../src/storage/storage");

describe("Storage Layer", () => {
  beforeEach(async () => {
    await saveTasks([]); // reset storage before each test
  });

  test("saveTasks stores tasks", async () => {
    const tasks = [{ id: 1, description: "Test task" }];
    await saveTasks(tasks);
    const loaded = await loadTasks();
    expect(loaded).toEqual(tasks);
  });

  test("loadTasks returns a copy, not the original array", async () => {
    const tasks = [{ id: 1, description: "Test task" }];
    await saveTasks(tasks);
    const loaded = await loadTasks();
    // mutate the loaded array
    loaded.push({ id: 2, description: "Another task" });
    // reload again
    const reloaded = await loadTasks();
    expect(reloaded.length).toBe(1); // original storage unchanged
  });
});
