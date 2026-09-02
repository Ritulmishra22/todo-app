import { useNavigate } from "react-router-dom";

function TaskCard({
  task,
  onDelete,
  onToggle,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
  };

  return (
    <div
      className={`task-card ${
        task.completed ? "completed" : ""
      }`}
    >
      <button
        className="check-button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? "Mark task incomplete"
            : "Mark task complete"
        }
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <h3>{task.title}</h3>

        {task.description && (
          <p>{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <button
          className="edit-button"
          onClick={handleEdit}
        >
          ✎
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskCard;