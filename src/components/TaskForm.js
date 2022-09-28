import { useState } from "react";
import { addTask } from "../features/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [count, setCount] = useState(0);

  const handleChange = (ev) => {
    setTask({
      ...task,
      [ev.target.name]: ev.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setCount(count + 1);
    dispatch(
      addTask({
        ...task,
        id_v4: uuidv4(),
        id: count,
        active: true,
        completed: true,
      })
    );
  };

  return (
    <div className="center">
      <h1>New task</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input
            id="title"
            name="title"
            type="text"
            value={task.title}
            maxLength="15"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span>Title</span>
        </div>
        <div className="inputbox">
          <input
            id="description"
            name="description"
            type="text"
            value={task.description}
            maxLength="50"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span>Description</span>
        </div>
        <div className="inputbox">
          <input type="submit" value="Add +" />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
