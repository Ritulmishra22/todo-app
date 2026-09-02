import {
  useEffect,
  useRef,
  useState,
} from "react";

const EMPTY_TASK = {
  title: "",
  description: "",
};

function TaskForm({
  initialData = EMPTY_TASK,
  submitText = "Add Task",
  onSubmit,
}) {
  const [title, setTitle] = useState(
    initialData.title
  );

  const [description, setDescription] =
    useState(initialData.description);

  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setTitle(initialData.title);
    setDescription(initialData.description);
  }, [
    initialData.title,
    initialData.description,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setError("");

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="title">
          Task Title
        </label>

        <input
          ref={inputRef}
          id="title"
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description{" "}
          <span>(optional)</span>
        </label>

        <textarea
          id="description"
          placeholder="Enter task description..."
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />
      </div>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      <button
        className="primary-button"
        type="submit"
      >
        {submitText}
      </button>
    </form>
  );
}

export default TaskForm;