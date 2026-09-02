import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";


// Create the Context
const TaskContext = createContext(null);


// Key used to store tasks in localStorage
const STORAGE_KEY = "todo_tasks";


// Get tasks from localStorage when the application starts
function getInitialTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  // If nothing is saved, return an empty array
  if (!savedTasks) {
    return [];
  }

  // Try to convert the saved string back into JavaScript data
  try {
    return JSON.parse(savedTasks);
  } catch {
    // If the saved data is invalid, start with no tasks
    return [];
  }
}


// Initial state of our application
const initialState = {
  tasks: getInitialTasks(),
};


// Reducer handles all changes to our task state
function taskReducer(state, action) {

  switch (action.type) {

    // --------------------------------
    // ADD TASK
    // --------------------------------
    case "ADD_TASK": {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      // Create a new tasks array
      const updatedTasks = [
        ...state.tasks,
        newTask,
      ];

      // Return the new state
      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    // --------------------------------
    // DELETE TASK
    // --------------------------------
    case "DELETE_TASK": {
      const updatedTasks = [];

      // Go through every task
      for (const task of state.tasks) {

        // Keep the task if its ID is NOT
        // the ID we want to delete
        if (task.id !== action.payload) {
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    // --------------------------------
    // TOGGLE TASK
    // --------------------------------
    case "TOGGLE_TASK": {
      const updatedTasks = [];

      // Go through every task
      for (const task of state.tasks) {

        // Check if this is the task
        // we want to toggle
        if (task.id === action.payload) {

          // Create a new task object
          const updatedTask = {
            ...task,
            completed: !task.completed,
          };

          // Add updated task
          updatedTasks.push(updatedTask);

        } else {

          // Keep other tasks unchanged
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    // --------------------------------
    // UPDATE TASK
    // --------------------------------
    case "UPDATE_TASK": {
      const updatedTasks = [];

      // Go through every task
      for (const task of state.tasks) {

        // Find the task that needs to be edited
        if (task.id === action.payload.id) {

          // Create a new task with
          // updated title and description
          const updatedTask = {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
          };

          updatedTasks.push(updatedTask);

        } else {

          // Keep other tasks unchanged
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    // --------------------------------
    // CLEAR COMPLETED TASKS
    // --------------------------------
    case "CLEAR_COMPLETED": {
      const updatedTasks = [];

      // Go through every task
      for (const task of state.tasks) {

        // Keep only incomplete tasks
        if (!task.completed) {
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    // --------------------------------
    // UNKNOWN ACTION
    // --------------------------------
    default:
      return state;
  }
}


// Provider component
export function TaskProvider({ children }) {

  // useReducer gives us:
  // 1. current state
  // 2. dispatch function
  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );


  // Save tasks to localStorage
  // whenever state.tasks changes
  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.tasks)
    );

  }, [state.tasks]);


  // --------------------------------
  // ADD TASK FUNCTION
  // --------------------------------

  const addTask = useCallback((task) => {

    dispatch({
      type: "ADD_TASK",
      payload: task,
    });

  }, []);


  // --------------------------------
  // DELETE TASK FUNCTION
  // --------------------------------

  const deleteTask = useCallback((id) => {

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

  }, []);


  // --------------------------------
  // TOGGLE TASK FUNCTION
  // --------------------------------

  const toggleTask = useCallback((id) => {

    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });

  }, []);


  // --------------------------------
  // UPDATE TASK FUNCTION
  // --------------------------------

  const updateTask = useCallback((id, task) => {

    dispatch({
      type: "UPDATE_TASK",

      payload: {
        id: id,
        title: task.title,
        description: task.description,
      },
    });

  }, []);


  // --------------------------------
  // CLEAR COMPLETED FUNCTION
  // --------------------------------

  const clearCompleted = useCallback(() => {

    dispatch({
      type: "CLEAR_COMPLETED",
    });

  }, []);


  // --------------------------------
  // CONTEXT VALUE
  // --------------------------------

  const value = useMemo(() => {

    return {
      tasks: state.tasks,

      addTask: addTask,

      deleteTask: deleteTask,

      toggleTask: toggleTask,

      updateTask: updateTask,

      clearCompleted: clearCompleted,
    };

  }, [
    state.tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    clearCompleted,
  ]);


  // --------------------------------
  // PROVIDE DATA TO CHILD COMPONENTS
  // --------------------------------

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}


// Export Context
export default TaskContext;