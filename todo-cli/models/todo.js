// models/todo.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueTasks = await Todo.overdue();
      const overdueTasksString = overdueTasks
        .map((task) => task.displayableString())
        .join("\n");
      console.log(overdueTasksString);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayTasks = await Todo.dueToday();
      const dueTodayTasksString = dueTodayTasks
        .map((task) => task.displayableString())
        .join("\n");
      console.log(dueTodayTasksString);

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterTasks = await Todo.dueLater();
      const dueLaterTasksString = dueLaterTasks
        .map((task) => task.displayableString())
        .join("\n");
      console.log(dueLaterTasksString);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date().toISOString().split("T")[0];
      try {
        const overdueItems = await Todo.findAll({
          where: {
            dueDate: {
              $lt: today,
            },
          },
        });
        return overdueItems;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().toISOString().split("T")[0];
      try {
        const dueTodayItems = await Todo.findAll({
          where: { dueDate: today },
        });
        return dueTodayItems;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date().toISOString().split("T")[0];
      try {
        const dueLaterItems = await Todo.findAll({
          where: {
            dueDate: {
              $gt: today,
            },
          },
        });
        return dueLaterItems;
      } catch (error) {
        console.error(error);
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        await Todo.update(
          { completed: true },
          {
            where: { id: id },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      const today = new Date().toISOString().split("T")[0];
      if (this.dueDate === today) {
        let checkbox = this.completed ? "[x]" : "[ ]";
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        let checkbox = this.completed ? "[x]" : "[ ]";
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
