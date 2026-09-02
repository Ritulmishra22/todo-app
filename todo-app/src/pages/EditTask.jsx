import {
  useNavigate,
  useParams,
} from "react-router-dom";

import TaskForm from "../components/TaskForm";
import useTasks from "../hooks/useTasks";

function EditTask() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tasks,
    updateTask,
  } = useTasks();

  const task = tasks.find(
    (task) => task.id === Number(id)
  );

  if (!task) {
    return (
      <div className="not-found-inline">
        <h2>Task not found</h2>

        <button
          className="primary-button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleUpdate = (updatedTask) => {
    updateTask(task.id, updatedTask);
    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1>Edit Task</h1>

        <p>
          Update your task details
        </p>
      </div>

      <TaskForm
        initialData={{
          title: task.title,
          description: task.description,
        }}
        submitText="Save Changes"
        onSubmit={handleUpdate}
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

export default EditTask;