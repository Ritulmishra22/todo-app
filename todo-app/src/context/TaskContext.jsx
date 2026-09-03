import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";


const TaskContext = createContext(null);


const STORAGE_KEY = "todo_tasks";


function getInitialTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks);
  } catch {
    return [];
  }
}


const initialState = {
  tasks: getInitialTasks(),
};


function taskReducer(state, action) {

  switch (action.type) {

    case "ADD_TASK": {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      const updatedTasks = [
        ...state.tasks,
        newTask,
      ];

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    case "DELETE_TASK": {
      const updatedTasks = [];

      for (const task of state.tasks) {

        if (task.id !== action.payload) {
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    case "TOGGLE_TASK": {
      const updatedTasks = [];

      for (const task of state.tasks) {

        if (task.id === action.payload) {

          const updatedTask = {
            ...task,
            completed: !task.completed,
          };

          updatedTasks.push(updatedTask);

        } else {

          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    case "UPDATE_TASK": {
      const updatedTasks = [];

      for (const task of state.tasks) {

        if (task.id === action.payload.id) {

          const updatedTask = {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
          };

          updatedTasks.push(updatedTask);

        } else {

          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    case "CLEAR_COMPLETED": {
      const updatedTasks = [];

      for (const task of state.tasks) {

        if (!task.completed) {
          updatedTasks.push(task);
        }
      }

      return {
        ...state,
        tasks: updatedTasks,
      };
    }


    default:
      return state;
  }
}


export function TaskProvider({ children }) {

  const [state, dispatch] = useReducer(
    taskReducer,
    initialState
  );


  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.tasks)
    );

  }, [state.tasks]);


  const addTask = useCallback((task) => {

    dispatch({
      type: "ADD_TASK",
      payload: task,
    });

  }, []);


  const deleteTask = useCallback((id) => {

    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });

  }, []);


  const toggleTask = useCallback((id) => {

    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });

  }, []);


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


  const clearCompleted = useCallback(() => {

    dispatch({
      type: "CLEAR_COMPLETED",
    });

  }, []);


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


  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}


export default TaskContext;
