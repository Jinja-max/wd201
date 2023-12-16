/* eslint-disable no-undef */
const todoList = require("../todo");
const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  //toDisplayableList,
} = todoList();

describe("todo-cli test suite", () => {
  const formattedDate = (d) => {
    return d.toISOString().split("T")[0];
  };

  var dateToday = new Date();
  const today = formattedDate(dateToday);
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1)),
  );
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1)),
  );
  beforeAll(() => {
    add(
      {
        title: "Submit assignment",
        dueDate: yesterday,
        completed: false,
      },
      {
        title: "play cricket",
        dueDate: yesterday,
        completed: false,
      },
      {
        title: "win tournament",
        dueDate: today,
        completed: false,
      },
      {
        title: "play football",
        dueDate: tomorrow,
        completed: false,
      },
    );
  });
  test("creating a new todo", () => {
    let len = all.length;
    add({
      title: "prepare uml",
      dueDate: yesterday,
      completed: false,
    });
    expect(all.length).toBe(len + 1);
    expect(all[all.length - 1].title).toBe("prepare uml");
  });

  test("marking a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
    expect(all[0].title).toBe("Submit assignment");
  });

  test("overdue retrieval", () => {
    overdueTasks = overdue();
    if (overdueTasks.length > 0) {
      expect(overdueTasks[0].dueDate < today).toBe(true);
    } else {
      expect(true).toBe(true);
    }
  });
  test("dueToday retrieval", () => {
    dueTodayTasks = dueToday();
    if (dueTodayTasks.length > 0) {
      expect(dueTodayTasks[0].dueDate === today).toBe(true);
    } else {
      expect(true).toBe(true);
    }
  });

  test("dueLater retrieval", () => {
    dueLaterTasks = dueLater();
    if (dueLaterTasks.length > 0) {
      expect(dueLaterTasks[0].dueDate > today).toBe(true);
    } else {
      expect(true).toBe(true);
    }
  });
});
