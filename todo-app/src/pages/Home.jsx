import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";

function Home() {
  const {
    tasks,
    deleteTask,
    toggleTask,
    clearCompleted,
  } = useTasks();

  const [filter, setFilter] = useState("all");

  const activeTasks = useMemo(
    () =>
      tasks.filter(
        (task) => !task.completed
      ),
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.completed
      ),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return activeTasks;
    }

    if (filter === "completed") {
      return completedTasks;
    }

    return tasks;
  }, [
    filter,
    tasks,
    activeTasks,
    completedTasks,
  ]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>All Tasks</h1>

          <p>
            Stay organized and get things done 🚀
          </p>
        </div>

        <Link
          to="/add"
          className="primary-button add-top-button"
        >
          + Add Task
        </Link>
      </div>

      <div className="quick-add">
        <Link
          to="/add"
          className="quick-add-input"
        >
          What do you need to do?
        </Link>

        <Link
          to="/add"
          className="primary-button"
        >
          Add
        </Link>
      </div>

      <div className="filters">
        <button
          className={
            filter === "all"
              ? "filter active"
              : "filter"
          }
          onClick={() => setFilter("all")}
        >
          All ({tasks.length})
        </button>

        <button
          className={
            filter === "active"
              ? "filter active"
              : "filter"
          }
          onClick={() => setFilter("active")}
        >
          Active ({activeTasks.length})
        </button>

        <button
          className={
            filter === "completed"
              ? "filter active"
              : "filter"
          }
          onClick={() =>
            setFilter("completed")
          }
        >
          Completed ({completedTasks.length})
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />

      <div className="task-footer">
        <span>
          {activeTasks.length}{" "}
          {activeTasks.length === 1
            ? "task"
            : "tasks"}{" "}
          remaining
        </span>

        {completedTasks.length > 0 && (
          <button
            className="clear-button"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;