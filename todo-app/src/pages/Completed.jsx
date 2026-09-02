import TaskList from "../components/TaskList";
import useTasks from "../hooks/useTasks";

function Completed() {
  const {
    tasks,
    deleteTask,
    toggleTask,
  } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Completed Tasks</h1>

          <p>
            Great job! Keep it up 💪
          </p>
        </div>
      </div>

      <TaskList
        tasks={completedTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />

      {completedTasks.length > 0 && (
        <div className="task-footer">
          <span>
            {completedTasks.length} completed{" "}
            {completedTasks.length === 1
              ? "task"
              : "tasks"}
          </span>
        </div>
      )}
    </div>
  );
}

export default Completed;