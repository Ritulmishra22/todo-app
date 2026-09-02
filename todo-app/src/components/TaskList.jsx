import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

function TaskList({
  tasks,
  onDelete,
  onToggle,
}) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;