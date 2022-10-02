import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: [{}],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log("estado de add", state);
      state.tasklist.push(action.payload);
      alert("Task add ok");
    },
    deleteTask: (state, action) => {
      const del = state.tasklist.find((task) => task.id === action.payload);
      del.active = false;
    },
    changeCompleted: (state, action) => {
      const comp = state.tasklist.find((task) => task.id === action.payload);
      comp.completed = !comp.completed;
    },
    editTask: (state, action) => {
      console.log("Este es el payload", action.payload);

      const taskSearch = state.tasklist.find(
        (task) => task.id == action.payload.id
      );
      if (taskSearch && taskSearch.active) {
        taskSearch.title = action.payload.title;
        taskSearch.description = action.payload.description;
      } else {
        alert("Id inexistent");
      }
    },
  },
});

export const { addTask, deleteTask, changeCompleted, editTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
