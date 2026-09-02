import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import useTasks from "../hooks/useTasks";

function AddTask() {
  const navigate = useNavigate();

  const { addTask } = useTasks();

  const handleAddTask = (task) => {
    addTask(task);
    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1>Add New Task</h1>

        <p>
          Create a new task to stay productive
        </p>
      </div>

      <TaskForm
        submitText="Add Task"
        onSubmit={handleAddTask}
      />

      <button
        className="secondary-button"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
}

export default AddTask;