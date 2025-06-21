import {
  createTask,
  addTask,
  removeTask,
  toggleTask,
} from "../src/logic/tasks";

describe("Task management functions", () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { id: 1, description: "Task 1", completed: false },
      { id: 2, description: "Task 2", completed: true },
    ];
  });

  test("createTask creates a new task with correct properties", () => {
    const task = createTask(3, "New Task");
    expect(task).toEqual({ id: 3, description: "New Task", completed: false });
  });

  test("addTask adds a new task to the list", () => {
    const newTasks = addTask(tasks, "New Task");
    expect(newTasks.length).toBe(3);
    expect(newTasks[2]).toMatchObject({
      description: "New Task",
      completed: false,
    });
  });

  test("removeTask removes a task by id", () => {
    const newTasks = removeTask(tasks, 1);
    expect(newTasks.length).toBe(1);
    expect(newTasks[0].id).toBe(2);
  });

  test("toggleTask toggles the completed status of a task", () => {
    const newTasks = toggleTask(tasks, 1);
    expect(newTasks.find((t) => t.id === 1).completed).toBe(true);
    const toggledBack = toggleTask(newTasks, 1);
    expect(toggledBack.find((t) => t.id === 1).completed).toBe(false);
  });
});
